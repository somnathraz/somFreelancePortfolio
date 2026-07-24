import Link from "next/link";

export function AuthorBio() {
  return (
    <aside className="mt-12 flex flex-col gap-3 border-t border-white/10 pt-8 sm:flex-row sm:items-start sm:gap-5">
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5 text-sm font-semibold text-white">
        SK
      </div>
      <div className="min-w-0">
        <p className="text-sm font-semibold text-white">Somanath Khadanga</p>
        <p className="mt-2 text-sm leading-relaxed text-zinc-400">
          Somanath leads a flexible software engineering studio helping founders and agencies
          build, improve, and operate SaaS products. Clients work directly with experienced
          engineers, with specialists added according to the product&apos;s requirements.
        </p>
        <Link
          href="/contact"
          className="mt-3 inline-flex text-sm font-medium text-zinc-300 underline underline-offset-4 hover:text-white"
        >
          Talk to an engineer
        </Link>
      </div>
    </aside>
  );
}
