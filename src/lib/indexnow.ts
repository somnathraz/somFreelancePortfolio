const HOST = "somanathkhadanga.com";
const BASE_URL = `https://${HOST}`;
const ENDPOINT = "https://api.indexnow.org/indexnow";

export type IndexNowResult = {
  ok: boolean;
  status: number;
  submitted: string[];
  skipped: boolean;
  reason?: string;
};

function getKey() {
  return process.env.INDEXNOW_KEY?.trim() || "";
}

function keyLocation(key: string) {
  return `${BASE_URL}/${key}.txt`;
}

/** Normalize path or absolute URL into a canonical site URL. */
export function toSiteUrl(input: string): string | null {
  const raw = input.trim();
  if (!raw) return null;

  if (raw.startsWith("http://") || raw.startsWith("https://")) {
    try {
      const u = new URL(raw);
      if (u.hostname !== HOST && u.hostname !== `www.${HOST}`) return null;
      return `https://${HOST}${u.pathname}${u.search}`.replace(/\/$/, "") || BASE_URL;
    } catch {
      return null;
    }
  }

  const path = raw.startsWith("/") ? raw : `/${raw}`;
  return `${BASE_URL}${path}`.replace(/\/$/, "") || BASE_URL;
}

export async function submitIndexNow(urls: string[]): Promise<IndexNowResult> {
  const key = getKey();
  if (!key) {
    return {
      ok: false,
      status: 0,
      submitted: [],
      skipped: true,
      reason: "INDEXNOW_KEY not set",
    };
  }

  const unique = [
    ...new Set(
      urls
        .map(toSiteUrl)
        .filter((u): u is string => Boolean(u))
    ),
  ];

  if (unique.length === 0) {
    return {
      ok: false,
      status: 0,
      submitted: [],
      skipped: true,
      reason: "No valid URLs to submit",
    };
  }

  const res = await fetch(ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify({
      host: HOST,
      key,
      keyLocation: keyLocation(key),
      urlList: unique,
    }),
  });

  return {
    ok: res.status === 200 || res.status === 202,
    status: res.status,
    submitted: unique,
    skipped: false,
    reason: res.ok ? undefined : await res.text().catch(() => res.statusText),
  };
}
