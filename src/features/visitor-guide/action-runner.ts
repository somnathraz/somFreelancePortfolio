"use client";

const HIGHLIGHT_DURATION = 2800;

export const helperActions = {
  scrollToSection(sectionId: string) {
    const el = document.getElementById(sectionId);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  },

  highlightSection(sectionId: string) {
    const el = document.getElementById(sectionId);
    if (!el) return;
    el.setAttribute("data-helper-highlight", "true");
    window.setTimeout(() => {
      el.removeAttribute("data-helper-highlight");
    }, HIGHLIGHT_DURATION);
  },

  scrollAndHighlight(sectionId: string) {
    this.scrollToSection(sectionId);
    // Slight delay so scroll starts before highlight appears
    window.setTimeout(() => {
      this.highlightSection(sectionId);
    }, 300);
  },

  openBooking() {
    window.location.href = "/book";
  },

  openService(pageUrl: string) {
    window.location.href = pageUrl;
  },

  openCaseStudy(url: string) {
    window.location.href = url;
  },

  openBlog(slug: string) {
    window.location.href = `/blog/${slug}`;
  },
};
