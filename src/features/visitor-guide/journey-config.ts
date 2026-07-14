import servicesData from "@/content/assistant/services.json";
import projectsData from "@/content/assistant/projects.json";
import blogsData from "@/content/assistant/blogs.json";
import journeysData from "@/content/assistant/journeys.json";
import type { Service, Project, Blog, JourneyConfig } from "./helper-types";

const services = servicesData as Service[];
const projects = projectsData as Project[];
const blogs = blogsData as Blog[];
const journeys = journeysData as JourneyConfig[];

export function getAllJourneys(): JourneyConfig[] {
  return journeys;
}

export function getJourney(id: string): JourneyConfig | undefined {
  return journeys.find((j) => j.id === id);
}

export function getServiceById(id: string): Service | undefined {
  return services.find((s) => s.id === id);
}

export function getProjectById(id: string): Project | undefined {
  return projects.find((p) => p.id === id);
}

export function getBlogBySlug(slug: string): Blog | undefined {
  return blogs.find((b) => b.slug === slug);
}

export function getServicesForJourney(journeyId: string): Service[] {
  const journey = getJourney(journeyId);
  if (!journey) return [];
  return journey.serviceIds
    .map(getServiceById)
    .filter((s): s is Service => s !== undefined);
}

export function getProjectsForJourney(journeyId: string): Project[] {
  const journey = getJourney(journeyId);
  if (!journey) return [];
  return journey.projectIds
    .map(getProjectById)
    .filter((p): p is Project => p !== undefined);
}

export function getBlogsForJourney(journeyId: string): Blog[] {
  const journey = getJourney(journeyId);
  if (!journey) return [];
  return journey.blogSlugs
    .map(getBlogBySlug)
    .filter((b): b is Blog => b !== undefined);
}
