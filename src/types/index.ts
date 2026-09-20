import React from "react";
import { Project, Experience, SkillCategory, portfolioData } from "@/data/portfolioData";
import { ThemeConfig } from "@/services/themeService";
import { ContactPayload, ContactResponse } from "@/services/contactService";

// DOM & React Event Types
export type InputChangeEvent = React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;
export type FormSubmitEvent = React.FormEvent<HTMLFormElement>;
export type ButtonClickEvent = React.MouseEvent<HTMLButtonElement>;
export type AnchorClickEvent = React.MouseEvent<HTMLAnchorElement>;
export type KeyPressEvent = React.KeyboardEvent<HTMLElement>;
export type ElementRef<T extends HTMLElement> = React.RefObject<T | null>;

// Domain Types
export type {
  Project,
  Experience,
  SkillCategory,
  ThemeConfig,
  ContactPayload,
  ContactResponse,
};

export type PersonalData = typeof portfolioData.personal;
export type EducationData = typeof portfolioData.education;
