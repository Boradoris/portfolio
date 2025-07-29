export type Panel = "about" | "project" | "history";

export type ProjectT = {
  id: number;
  title: string;
  period: string;
  description: string;
  tech: string;
  image?: string;
  contain?: boolean;
};

export type CompanyHistoryT = {
  id: number;
  company: string;
  logo: string;
  position: string;
  duration: string;
  projects: ProjectT[];
};
