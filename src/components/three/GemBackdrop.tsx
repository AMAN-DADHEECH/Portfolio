"use client";

import dynamic from "next/dynamic";

/** Loads the WebGL gem scene on the client only (no SSR, no blocking the first paint). */
const GemScene = dynamic(() => import("./GemScene"), { ssr: false, loading: () => null });

export const GemBackdrop = () => <GemScene />;
