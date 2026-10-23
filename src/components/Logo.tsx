import styles from "./Logo.module.css";

type LogoProps = {
  className?: string;
};

/** Inline vectors stay sharp at navigation size and animate without JavaScript. */
export const Logo = ({ className = "h-9 w-auto" }: LogoProps) => (
  <span role="img" aria-label="Somanath Studio" className={`${styles.logo} ${className}`}>
    <svg viewBox="0 0 56 60" fill="none" aria-hidden="true" className={styles.mark}>
      <path d="M46 6H20L6 20L31 45H14L6 53H33L47 39L22 14H38L46 6Z" fill="#E6EDF3" />
      <path d="M31 45H14L6 53H33L47 39L41 33L31 45Z" fill="#67E8F9" />
      <path d="M6 20L31 45L35 40L10 16L6 20Z" fill="#A6B5C4" />
      <path
        d="M40 10H22L12 20L41 39L31 49H14"
        pathLength="100"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        className={styles.trace}
      />
      <path d="M49 8L43 14" stroke="#67E8F9" strokeWidth="2" className={styles.signal} />
    </svg>
    <span aria-hidden="true" className={styles.wordmark}>
      <span className={styles.name}>somanath<span className={styles.period}>.</span></span>
      <span className={styles.studio}>STUDIO</span>
    </span>
  </span>
);
