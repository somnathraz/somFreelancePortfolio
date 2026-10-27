/** Live Premium Frontend app (one Next.js deploy, route per showcase). */
export const LABS_DEMO_ORIGIN = "https://demo.somanathkhadanga.com";

export const LABS_DEMO_GITHUB =
  "https://github.com/somnathraz/premium-frontend";

export const LABS_DEMO_ZIP = `${LABS_DEMO_ORIGIN}/api/template-zip`;

export function labsDemoUrl(path: string = "/"): string {
  if (!path || path === "/") return LABS_DEMO_ORIGIN;
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${LABS_DEMO_ORIGIN}${normalized}`;
}
