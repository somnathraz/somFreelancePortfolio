import { permanentRedirect } from "next/navigation";

// Tracks are listed on the trap library's front page.
export default function SystemsIndex() {
    permanentRedirect("/labs/traps");
}
