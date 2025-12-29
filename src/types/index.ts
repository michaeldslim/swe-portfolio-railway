export interface INavItem {
  id: string;
  label: string;
  href: string;
}

export interface IExperience {
  id: string;
  company: string;
  role: string;
  period: string;
  location?: string;
  description: string;
  techStack?: string[];
}

export type ProjectCategory = "web" | "mobile" | "other";

export interface IProject {
  id: string;
  name: string;
  description: string;
  techStack: string[];
  href?: string;
  category: ProjectCategory;
  note?: string;
  screenshotNames?: string[];
}
