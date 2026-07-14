import type { VisitorPreference } from "./helper-types";

const STORAGE_KEY = "som_visitor_pref";

export function loadVisitorPreference(): VisitorPreference | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as VisitorPreference;
  } catch {
    return null;
  }
}

export function saveVisitorPreference(
  update: Partial<VisitorPreference>
): void {
  if (typeof window === "undefined") return;
  try {
    const existing = loadVisitorPreference();
    const merged: VisitorPreference = {
      viewedServices: [],
      viewedProjects: [],
      viewedBlogs: [],
      lastVisitedAt: new Date().toISOString(),
      ...existing,
      ...update,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
  } catch {
    // Storage full or unavailable — fail silently
  }
}

export function clearVisitorPreference(): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // fail silently
  }
}

export function isReturningVisitor(): boolean {
  return loadVisitorPreference() !== null;
}

export function trackViewedService(serviceId: string): void {
  const pref = loadVisitorPreference();
  const viewed = new Set(pref?.viewedServices ?? []);
  viewed.add(serviceId);
  saveVisitorPreference({ viewedServices: Array.from(viewed) });
}

export function trackViewedProject(projectId: string): void {
  const pref = loadVisitorPreference();
  const viewed = new Set(pref?.viewedProjects ?? []);
  viewed.add(projectId);
  saveVisitorPreference({ viewedProjects: Array.from(viewed) });
}

export function trackViewedBlog(slug: string): void {
  const pref = loadVisitorPreference();
  const viewed = new Set(pref?.viewedBlogs ?? []);
  viewed.add(slug);
  saveVisitorPreference({ viewedBlogs: Array.from(viewed) });
}
