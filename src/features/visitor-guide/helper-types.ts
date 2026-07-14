export type HelperAction =
  | "scroll-to-section"
  | "highlight-section"
  | "open-service"
  | "open-case-study"
  | "open-blog"
  | "open-booking"
  | "start-project-brief"
  | "reset-experience";

export type Service = {
  id: string;
  title: string;
  summary: string;
  audience: string[];
  problems: string[];
  tags: string[];
  sectionId: string;
  pageUrl: string;
  relatedProjects: string[];
  relatedBlogs: string[];
  primaryCTA: string;
};

export type Project = {
  id: string;
  title: string;
  description: string;
  tech: string[];
  role: string;
  serviceId: string;
  url?: string;
  caseStudyUrl?: string;
};

export type Blog = {
  slug: string;
  title: string;
  serviceIds: string[];
  journeyIds: string[];
};

export type JourneyConfig = {
  id: string;
  title: string;
  label: string;
  icon: string;
  serviceIds: string[];
  projectIds: string[];
  blogSlugs: string[];
  firstSectionId: string;
  message: string;
  primaryCTA: { label: string; action: HelperAction };
};

export type VisitorPreference = {
  selectedJourney?: string;
  viewedServices: string[];
  viewedProjects: string[];
  viewedBlogs: string[];
  helperDismissedAt?: string;
  lastVisitedAt: string;
};

export type BriefData = {
  building: string;
  stage: string;
  challenge: string;
  timeline: string;
  name: string;
  email: string;
  phone: string;
};

export type HelperStep = "journey-select" | "journey-result" | "project-brief";

export type JourneyResult = {
  journey: JourneyConfig;
  services: Service[];
  projects: Project[];
  blogs: Blog[];
};
