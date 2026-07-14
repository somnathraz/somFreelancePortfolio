import { permanentRedirect } from "next/navigation";

/** SEO alias — keep case-study URL while PaperChai lives under /projects. */
export default function PaperChaiCaseStudyAliasPage() {
  permanentRedirect("/projects/paperchai");
}
