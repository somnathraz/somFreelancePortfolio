import Image from "next/image";
import { cn } from "@/lib/utils";

type PhoneShot = {
  src: string;
  alt: string;
};

type PhoneFrameGalleryProps = {
  images: PhoneShot[];
  caption?: string;
  /** Match surrounding UI — case study pages are dark; Selected Work modal is light. */
  tone?: "dark" | "light";
  className?: string;
};

/** Horizontal gallery sized for 9:16 mobile app screenshots — shows every image. */
export function PhoneFrameGallery({
  images,
  caption,
  tone = "dark",
  className,
}: PhoneFrameGalleryProps) {
  const isDark = tone === "dark";

  return (
    <div className={cn("w-full", className)}>
      <div className="-mx-1 flex gap-3 overflow-x-auto px-1 pb-3 pt-1 snap-x snap-mandatory [scrollbar-width:thin] sm:gap-4 md:gap-5">
        {images.map((image) => (
          <figure
            key={image.src}
            className="relative w-[150px] shrink-0 snap-center sm:w-[180px] md:w-[200px] lg:w-[220px]"
          >
            <div
              className={cn(
                "relative aspect-[9/16] overflow-hidden rounded-[1.5rem] shadow-2xl ring-1",
                isDark
                  ? "border border-white/15 bg-zinc-950 ring-white/5 shadow-black/50"
                  : "border border-neutral-200 bg-neutral-100 ring-black/5 shadow-neutral-400/30 dark:border-white/10 dark:bg-neutral-950 dark:ring-white/5"
              )}
            >
              <div className="pointer-events-none absolute inset-x-0 top-0 z-10 flex justify-center pt-2">
                <span
                  className={cn(
                    "h-1.5 w-14 rounded-full",
                    isDark ? "bg-black/50" : "bg-black/40"
                  )}
                />
              </div>
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="(max-width: 640px) 150px, (max-width: 1024px) 180px, 220px"
                className="object-cover object-top"
              />
            </div>
          </figure>
        ))}
      </div>
      {caption ? (
        <p
          className={cn(
            "mt-1 text-center text-xs",
            isDark ? "text-zinc-500" : "text-neutral-500"
          )}
        >
          {caption}
        </p>
      ) : null}
    </div>
  );
}
