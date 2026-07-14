"use client";

import { useEffect } from "react";
import { trackViewedBlog } from "@/features/visitor-guide/visitor-memory";

interface BlogTrackerProps {
  slug: string;
}

export function BlogTracker({ slug }: BlogTrackerProps) {
  useEffect(() => {
    trackViewedBlog(slug);
  }, [slug]);

  return null;
}
