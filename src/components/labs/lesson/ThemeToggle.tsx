"use client";

import { Moon, Sun } from "lucide-react";

export const LESSON_THEME_KEY = "lesson-theme";

/**
 * Flips the nearest lesson root between light and dark and remembers the choice.
 * Which icon shows is pure CSS (lesson-light variant), so server and client markup always match.
 */
export function ThemeToggle() {
    const toggle = (event: React.MouseEvent<HTMLButtonElement>) => {
        const root = event.currentTarget.closest<HTMLElement>("[data-lesson-theme]");
        if (!root) return;
        const next = root.dataset.lessonTheme === "light" ? "dark" : "light";
        root.dataset.lessonTheme = next;
        try { localStorage.setItem(LESSON_THEME_KEY, next); } catch { /* private mode: the toggle still works for this visit */ }
    };

    return (
        <button
            type="button"
            onClick={toggle}
            aria-label="Switch between light and dark reading theme"
            title="Light or dark"
            className="grid h-8 w-8 place-items-center rounded-full border border-(--l-border) text-(--l-muted) transition-colors hover:border-(--l-border-strong) hover:text-(--l-fg)"
        >
            <Sun size={15} aria-hidden="true" className="lesson-light:hidden" />
            <Moon size={15} aria-hidden="true" className="hidden lesson-light:block" />
        </button>
    );
}

/** Runs before paint so a saved light theme never flashes dark. Placed as the root's first child. */
export const themeBootScript = `try{var t=localStorage.getItem("${LESSON_THEME_KEY}");if(t==="light"||t==="dark")document.currentScript.parentElement.dataset.lessonTheme=t}catch(e){}`;
