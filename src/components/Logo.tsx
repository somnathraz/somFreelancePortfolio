"use client";

import Image from "next/image";
import { Space_Grotesk } from "next/font/google";
import { useEffect, useState, useSyncExternalStore, type CSSProperties } from "react";
import styles from "./Logo.module.css";
import {
  siteLogoBlack,
  siteLogoColored,
  siteLogoWhite,
} from "@/lib/site";

type LogoTone = "colored" | "white" | "black" | "auto";

const brandFont = Space_Grotesk({ subsets: ["latin"], weight: "600", display: "swap" });

type LogoProps = {
  className?: string;
  /**
   * `auto` (default) — picks by color scheme / site theme:
   * dark → colored, light → black
   * Or force `colored` | `white` | `black`
   */
  tone?: LogoTone;
  /** Show brand tagline under the name (footer / about) */
  showTagline?: boolean;
  /** Compact desktop mark unfolds into the full name on hover / keyboard focus. */
  expandable?: boolean;
};

function resolveAutoTone(): "colored" | "black" {
  if (typeof document !== "undefined") {
    // Site theme class wins when present
    if (document.documentElement.classList.contains("light")) return "black";
    if (document.documentElement.classList.contains("dark")) return "colored";
  }
  if (typeof window !== "undefined" && window.matchMedia) {
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "colored"
      : "black";
  }
  // SSR / unknown — site is dark-first
  return "colored";
}

const MARK = {
  colored: siteLogoColored,
  white: siteLogoWhite,
  black: siteLogoBlack,
} as const;

function subscribeTheme(onChange: () => void) {
  const mq = window.matchMedia("(prefers-color-scheme: dark)");
  mq.addEventListener("change", onChange);
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
  return () => {
    mq.removeEventListener("change", onChange);
    observer.disconnect();
  };
}

const serverTone = () => "colored" as const;

/**
 * Somanath Studio mark + wordmark.
 * Transparent variants auto-switch with light/dark theme unless `tone` is forced.
 */
export const Logo = ({
  className = "h-9 w-auto",
  tone = "auto",
  showTagline = false,
  expandable = false,
}: LogoProps) => {
  const [intro, setIntro] = useState(expandable);
  const autoTone = useSyncExternalStore(subscribeTheme, resolveAutoTone, serverTone);
  const active = tone === "auto" ? autoTone : tone;

  useEffect(() => {
    if (!expandable) return;
    const timer = window.setTimeout(() => setIntro(false), 2800);
    return () => window.clearTimeout(timer);
  }, [expandable]);

  return (
    <span
      role="img"
      aria-label="Somanath Studio"
      className={`${styles.logo} ${brandFont.className} ${expandable ? styles.expandable : ""} ${intro ? styles.intro : ""} ${className}`}
      data-tone={active}
    >
      {/* Keep both in DOM for instant swap without layout shift */}
      <span className={styles.markSlot}>
        <Image
          src={MARK.colored}
          alt=""
          width={40}
          height={40}
          className={`${styles.mark} ${active === "colored" ? styles.markVisible : styles.markHidden}`}
          priority
        />
        <Image
          src={MARK.white}
          alt=""
          width={40}
          height={40}
          className={`${styles.mark} ${active === "white" ? styles.markVisible : styles.markHidden}`}
          priority
        />
        <Image
          src={MARK.black}
          alt=""
          width={40}
          height={40}
          className={`${styles.mark} ${active === "black" ? styles.markVisible : styles.markHidden}`}
          priority
        />
      </span>
      <span aria-hidden="true" className={styles.wordmark}>
        <span className={styles.name}>
          {Array.from("somanath").map((letter, i) => (
            <span key={i} style={{ "--letter": i } as CSSProperties}>{letter}</span>
          ))}
          <span className={styles.period}>.</span>
        </span>
        <span className={styles.studio}>STUDIO</span>
        {showTagline ? (
          <span className={styles.tagline}>
            Engineering digital products and experiences
          </span>
        ) : null}
      </span>
    </span>
  );
};
