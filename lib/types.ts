export type SocialId = "github" | "linkedin" | "x" | "hashnode" | "medium";

export interface Social {
  id: SocialId;
  label: string;
  href: string;
  short: string;
}

export interface SkillCategory {
  id: string;
  icon: string;
  title: string;
  skills: string[];
}

export interface ProjectLink {
  label: "GitHub" | "Live Demo";
  href: string;
}

export interface Project {
  number: string; // "01"
  title: string;
  description: string;
  tags: string[];
  links: ProjectLink[];
  featured?: boolean;
  domain?: string; // e.g. "Fintech", "E-Commerce"
  year?: string; // e.g. "2025"
  status?: "Live" | "In Progress" | "Archived";
}

export interface ExperienceItem {
  role: string;
  org: string;
  period: string;
  location: string;
  kind: "work" | "build" | "community";
  points: string[];
}

export interface WritingPlatform {
  id: "hashnode" | "medium" | "github";
  label: string;
  title: string;
  description: string;
  href: string;
}

