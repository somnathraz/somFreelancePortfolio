import type { JourneyResult } from "./helper-types";
import {
  getJourney,
  getServicesForJourney,
  getProjectsForJourney,
  getBlogsForJourney,
} from "./journey-config";

export function resolveJourney(journeyId: string): JourneyResult | null {
  const journey = getJourney(journeyId);
  if (!journey) return null;

  return {
    journey,
    services: getServicesForJourney(journeyId),
    projects: getProjectsForJourney(journeyId),
    blogs: getBlogsForJourney(journeyId),
  };
}
