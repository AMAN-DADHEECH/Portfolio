"use client";

import { useMemo, useRef, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { MeshRefractionMaterial, Sparkles } from "@react-three/drei";
import * as THREE from "three";

/**
 * Fixed full-page WebGL layer: round-brilliant-cut diamonds that float in the
 * side margins, drift with the scroll and pick up a tint from the live --edge
 * CSS variable written by <ScrollTint /> (gold → sapphire → emerald → ruby → gold).
 *
 * The stones use true ray-traced refraction (MeshRefractionMaterial: internal
 * bounces, IOR 2.4, fresnel, chromatic "fire") against a studio environment
 * that is painted procedurally below — no external assets.
 */

// Compat shim: drei's MeshRefractionMaterial still `#include`s <cube_uv_reflection_fragment>,
// which three r18x removed. We sample an *equirect* env map (equirectUv from <common>), so the
// cube-UV helpers are never used — an empty chunk lets the shader compile.
const chunks = THREE.ShaderChunk as unknown as Record<string, string>;
if (!("cube_uv_reflection_fragment" in chunks)) chunks.cube_uv_reflection_fragment = "";

type GemSpec = {
  pos: [number, number, number];
  scale: number;
  speed: number;
  tilt: number;
};

// Laid out down a tall column; the whole group scrolls up with the page.
const DESKTOP_GEMS: GemSpec[] = [
  { pos: [-1, 1.6, -6], scale: 0.62, speed: 0.35, tilt: 0.4 },
  { pos: [1, -2.2, -7], scale: 0.8, speed: 0.25, tilt: -0.3 },
  { pos: [-1, -7.5, -6], scale: 0.5, speed: 0.45, tilt: 0.6 },
  { pos: [1, -11.5, -6.5], scale: 0.68, speed: 0.3, tilt: -0.5 },
  { pos: [-1, -16, -7], scale: 0.85, speed: 0.22, tilt: 0.2 },
  { pos: [1, -20.5, -6], scale: 0.52, speed: 0.4, tilt: 0.7 },
  { pos: [-1, -25, -6.5], scale: 0.7, speed: 0.33, tilt: -0.4 },
  { pos: [1, -29.5, -7], scale: 0.78, speed: 0.27, tilt: 0.3 },
  { pos: [-1, -34, -6], scale: 0.55, speed: 0.38, tilt: -0.6 },
];
// Phones: fewer, smaller stones tucked half off-screen so they never sit on text
const MOBILE_GEMS: GemSpec[] = DESKTOP_GEMS.filter((_, i) => i % 2 === 0).map((g) => ({
  ...g,
  pos: [g.pos[0], g.pos[1], -6] as [number, number, number],
  scale: g.scale * 0.55,
}));
const TRAVEL = 34; // world units the column travels over the full page scroll

/** Round brilliant: culet → pavilion → girdle → star/crown → table, 16 facets around. */
function useBrilliantGeometry() {
  return useMemo(() => {
    const profile = [
      new THREE.Vector2(0, -1.0), // culet
      new THREE.Vector2(0.98, -0.02), // girdle (lower)
      new THREE.Vector2(1.0, 0.04), // girdle (upper)
      new THREE.Vector2(0.8, 0.25), // upper-girdle / star break
      new THREE.Vector2(0.56, 0.4), // table edge
      new THREE.Vector2(0, 0.4), // table centre
    ];
    // non-indexed + recomputed normals → every facet is flat and catches light on its own
    const g = new THREE.LatheGeometry(profile, 16).toNonIndexed();
    g.computeVertexNormals();
    return g;
  }, []);
}

/** Procedural studio environment: black room, soft white strip lights, warm gold bounces. */
function useStudioEnvironment() {
  return useMemo(() => {
    const c = document.createElement("canvas");
    c.width = 1024;
    c.height = 512;
    const ctx = c.getContext("2d")!;
    // lit studio: bright ceiling fading to a dark floor (diamonds only shine if there's light to bend)
    const base = ctx.createLinearGradient(0, 0, 0, c.height);
    base.addColorStop(0, "#9a968e");
    base.addColorStop(0.42, "#3a352d");
    base.addColorStop(0.55, "#16130f");
    base.addColorStop(1, "#050505");
    ctx.fillStyle = base;
    ctx.fillRect(0, 0, c.width, c.height);

    const softbox = (x: number, y: number, w: number, h: number, color: string, alpha: number, vertical = true) => {
      const g = vertical ? ctx.createLinearGradient(x, y, x, y + h) : ctx.createLinearGradient(x, y, x + w, y);
      g.addColorStop(0, `rgba(${color},0)`);
      g.addColorStop(0.2, `rgba(${color},${alpha})`);
      g.addColorStop(0.8, `rgba(${color},${alpha})`);
      g.addColorStop(1, `rgba(${color},0)`);
      ctx.fillStyle = g;
      ctx.fillRect(x, y, w, h);
    };
    // ceiling band of large white softboxes
    for (let i = 0; i < 4; i++) softbox(20 + i * 256, 20, 210, 90, "255,255,255", 1);
    // eight tall vertical strips all the way around (these create the facet "flashes")
    for (let i = 0; i < 8; i++) softbox(40 + i * 128, 120, 34, 200, "255,255,255", 0.95, false);
    // warm gold bounces near the horizon
    softbox(150, 300, 240, 50, "217,180,90", 0.9);
    softbox(620, 305, 280, 45, "241,223,174", 0.85);
    // pin-point glints (seeded so the environment is identical on every render)
    let seed = 7;
    const rand = () => ((seed = (seed * 16807) % 2147483647) - 1) / 2147483646;
    for (let i = 0; i < 140; i++) {
      ctx.fillStyle = `rgba(255,255,255,${0.4 + rand() * 0.6})`;
      ctx.fillRect(rand() * c.width, rand() * c.height * 0.7, 3, 3);
    }

    const tex = new THREE.CanvasTexture(c);
    tex.mapping = THREE.EquirectangularReflectionMapping;
    tex.colorSpace = THREE.SRGBColorSpace;
    return tex;
  }, []);
}

const WHITE = new THREE.Color("#ffffff");

const readEdge = (target: THREE.Color) => {
  const v = document.documentElement.style.getPropertyValue("--edge").trim();
  if (!v) return target.set("#d9b45a");
  const [r, g, b] = v.split(/\s+/).map(Number);
  return target.setRGB(r / 255, g / 255, b / 255, THREE.SRGBColorSpace);
};

type RefractionMat = THREE.ShaderMaterial & { color: THREE.Color };

function Gems({ specs, animate }: { specs: GemSpec[]; animate: boolean }) {
  const group = useRef<THREE.Group>(null);
  const meshes = useRef<(THREE.Mesh | null)[]>([]);
  const geometry = useBrilliantGeometry();
  const env = useStudioEnvironment();
  const edge = useMemo(() => new THREE.Color(), []);
  const tint = useMemo(() => new THREE.Color("#f6e7c1"), []);

  useFrame((state, delta) => {
    // tint = diamond-white blended toward the section colour
    readEdge(edge);
    tint.lerp(WHITE.clone().lerp(edge, 0.32), 0.06);
    meshes.current.forEach((m) => {
      const mat = m?.material as RefractionMat | undefined;
      if (mat?.color) mat.color.copy(tint);
    });

    // scroll parallax + small pointer drift
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const progress = max > 0 ? window.scrollY / max : 0;
    if (group.current) {
      group.current.position.y = THREE.MathUtils.damp(group.current.position.y, progress * TRAVEL, 4, delta);
      // translation, not rotation — rotating the deep group would swing stones into the text
      group.current.position.x = THREE.MathUtils.damp(group.current.position.x, state.pointer.x * 0.25, 2, delta);
      group.current.rotation.x = THREE.MathUtils.damp(group.current.rotation.x, -state.pointer.y * 0.02, 2, delta);
    }

    // keep every stone in the side margins: x is derived from the visible width at its depth
    const cam = state.camera as THREE.PerspectiveCamera;
    const edgeFrac = state.size.width < 768 ? 1.02 : 0.95;
    const t = state.clock.elapsedTime;
    meshes.current.forEach((m, i) => {
      if (!m) return;
      const s = specs[i];
      const halfW = Math.tan(THREE.MathUtils.degToRad(cam.fov / 2)) * (cam.position.z - s.pos[2]) * cam.aspect;
      m.position.x = Math.sign(s.pos[0]) * halfW * edgeFrac;
      if (!animate) return;
      m.rotation.y += delta * s.speed;
      m.rotation.z = Math.sin(t * s.speed) * 0.2 + s.tilt;
      m.position.y = s.pos[1] + Math.sin(t * s.speed * 1.4 + i) * 0.25;
    });
  });

  return (
    <group ref={group}>
      {specs.map((s, i) => (
        <mesh
          key={i}
          ref={(el) => {
            meshes.current[i] = el;
          }}
          geometry={geometry}
          position={s.pos}
          scale={s.scale}
          rotation={[0.45, i, s.tilt]}
        >
          <MeshRefractionMaterial
            envMap={env}
            bounces={3}
            ior={2.4}
            fresnel={1}
            aberrationStrength={0.012}
            fastChroma
            toneMapped={false}
          />
        </mesh>
      ))}
      {/* faint gold dust that travels with the stones */}
      <Sparkles
        count={animate ? 70 : 0}
        scale={[18, 42, 6]}
        position={[0, -16, -6]}
        size={2.2}
        speed={0.25}
        opacity={0.55}
        color="#f1dfae"
      />
    </group>
  );
}

export default function GemScene() {
  const [mobile, setMobile] = useState(false);
  const [animate, setAnimate] = useState(true);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const rm = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => {
      setMobile(mq.matches);
      setAnimate(!rm.matches);
    };
    sync();
    mq.addEventListener("change", sync);
    rm.addEventListener("change", sync);
    return () => {
      mq.removeEventListener("change", sync);
      rm.removeEventListener("change", sync);
    };
  }, []);

  return (
    <Canvas
      style={{ position: "fixed", inset: 0, zIndex: -1, pointerEvents: "none" }}
      aria-hidden="true"
      dpr={[1, mobile ? 1.5 : 2]}
      camera={{ position: [0, 0, 10], fov: 35 }}
      gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
      eventSource={typeof document !== "undefined" ? document.body : undefined}
      eventPrefix="client"
    >
      <Gems specs={mobile ? MOBILE_GEMS : DESKTOP_GEMS} animate={animate} />
    </Canvas>
  );
}
