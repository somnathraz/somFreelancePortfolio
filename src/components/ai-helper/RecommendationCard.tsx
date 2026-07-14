"use client";

import { useHelperStore } from "@/features/visitor-guide/helper-store";
import { helperAnalytics } from "@/features/visitor-guide/helper-analytics";
import { helperActions } from "@/features/visitor-guide/action-runner";
import {
  trackViewedService,
  trackViewedProject,
  trackViewedBlog,
} from "@/features/visitor-guide/visitor-memory";
import { ArrowRight, FileText, FolderOpen, Newspaper } from "lucide-react";
import type { Service, Project, Blog } from "@/features/visitor-guide/helper-types";

export function RecommendationCard() {
  const { journeyResult, selectedJourneyId, reset, startBrief } = useHelperStore();

  if (!journeyResult) return null;

  const { services, projects, blogs, journey } = journeyResult;

  const handleServiceClick = (service: Service) => {
    helperAnalytics.serviceOpened(service.id, selectedJourneyId ?? undefined);
    trackViewedService(service.id);

    // Scroll to services section and highlight, then optionally navigate
    helperActions.scrollAndHighlight(service.sectionId);
  };

  const handleServiceNavigate = (service: Service) => {
    helperAnalytics.serviceOpened(service.id, selectedJourneyId ?? undefined);
    trackViewedService(service.id);
    helperActions.openService(service.pageUrl);
  };

  const handleProjectClick = (project: Project) => {
    helperAnalytics.caseStudyOpened(
      project.id,
      selectedJourneyId ?? undefined
    );
    trackViewedProject(project.id);

    if (project.caseStudyUrl) {
      helperActions.openCaseStudy(project.caseStudyUrl);
    } else if (project.url) {
      window.open(project.url, "_blank", "noopener,noreferrer");
    }
  };

  const handleBlogClick = (blog: Blog) => {
    helperAnalytics.blogOpened(blog.slug, selectedJourneyId ?? undefined);
    trackViewedBlog(blog.slug);
    helperActions.openBlog(blog.slug);
  };

  const handlePrimaryCTA = () => {
    helperAnalytics.bookingOpened(selectedJourneyId ?? undefined);
    helperActions.openBooking();
  };

  return (
    <div className="space-y-3">
      <p className="text-[11px] font-medium uppercase tracking-widest text-zinc-500">
        Recommended for you
      </p>

      {/* Services */}
      {services.length > 0 && (
        <div className="space-y-1">
          {services.map((service) => (
            <button
              key={service.id}
              type="button"
              onClick={() => handleServiceClick(service)}
              onDoubleClick={() => handleServiceNavigate(service)}
              className="group flex w-full items-center gap-2.5 rounded-lg border border-white/5 bg-white/[0.02] px-3 py-2 text-left text-sm transition-all hover:border-white/10 hover:bg-white/[0.04]"
            >
              <FileText className="h-3.5 w-3.5 shrink-0 text-emerald-400/70" />
              <span className="flex-1 text-zinc-300 group-hover:text-white">
                {service.title}
              </span>
              <ArrowRight className="h-3 w-3 shrink-0 text-zinc-600 transition-transform group-hover:translate-x-0.5" />
            </button>
          ))}
        </div>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <div className="space-y-1">
          {projects.map((project) => (
            <button
              key={project.id}
              type="button"
              onClick={() => handleProjectClick(project)}
              className="group flex w-full items-center gap-2.5 rounded-lg border border-white/5 bg-white/[0.02] px-3 py-2 text-left text-sm transition-all hover:border-white/10 hover:bg-white/[0.04]"
            >
              <FolderOpen className="h-3.5 w-3.5 shrink-0 text-amber-400/70" />
              <span className="flex-1 text-zinc-300 group-hover:text-white">
                {project.title}
              </span>
              <ArrowRight className="h-3 w-3 shrink-0 text-zinc-600 transition-transform group-hover:translate-x-0.5" />
            </button>
          ))}
        </div>
      )}

      {/* Blogs */}
      {blogs.length > 0 && (
        <div className="space-y-1">
          {blogs.slice(0, 2).map((blog) => (
            <button
              key={blog.slug}
              type="button"
              onClick={() => handleBlogClick(blog)}
              className="group flex w-full items-center gap-2.5 rounded-lg border border-white/5 bg-white/[0.02] px-3 py-2 text-left text-sm transition-all hover:border-white/10 hover:bg-white/[0.04]"
            >
              <Newspaper className="h-3.5 w-3.5 shrink-0 text-cyan-400/70" />
              <span className="flex-1 truncate text-zinc-300 group-hover:text-white">
                {blog.title}
              </span>
              <ArrowRight className="h-3 w-3 shrink-0 text-zinc-600 transition-transform group-hover:translate-x-0.5" />
            </button>
          ))}
        </div>
      )}

      {/* Project Brief CTA */}
      <button
        type="button"
        onClick={startBrief}
        className="flex w-full items-center justify-center gap-2 rounded-lg border border-white/10 bg-white/5 py-2.5 text-xs font-semibold text-zinc-300 transition-colors hover:bg-white/10"
      >
        Prepare a project brief
      </button>

      {/* Primary CTA */}
      <button
        type="button"
        onClick={handlePrimaryCTA}
        data-helper-cta
        className="flex w-full items-center justify-center gap-2 rounded-lg bg-white py-2.5 text-sm font-semibold text-black transition-colors hover:bg-zinc-200"
      >
        {journey.primaryCTA.label}
        <ArrowRight className="h-3.5 w-3.5" />
      </button>

      {/* Reset */}
      <button
        type="button"
        onClick={reset}
        className="w-full text-center text-[11px] text-zinc-600 transition-colors hover:text-zinc-400"
      >
        Reset recommendations
      </button>
    </div>
  );
}
