import Image from "next/image";
import { siteLogoColored } from "@/lib/site";
import styles from "./LabsEntrance.module.css";

/** A short brand reveal, not a simulated loading indicator. */
export function LabsEntrance({ onSkip }: { onSkip: () => void }) {
    return (
        <div className={styles.entrance} data-labs-entrance>
            <div className={styles.cover} />
            <div className={styles.identity} aria-hidden="true">
                <div className={styles.halo} />
                <div className={styles.mark}>
                    <Image src={siteLogoColored} alt="" width={240} height={240} sizes="240px" priority />
                </div>
                <div className={styles.caption}>
                    <span className={styles.name}>somanath<span>.</span></span>
                    <span className={styles.label}>STUDIO / LABS</span>
                </div>
            </div>
            <button type="button" onClick={onSkip} className={styles.skip}>
                Skip intro <span aria-hidden="true">↗</span>
            </button>
        </div>
    );
}
