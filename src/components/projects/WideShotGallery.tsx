import Image from "next/image";
import { cn } from "@/lib/utils";

type WideShot = {
  src: string;
  alt: string;
};

type WideShotGalleryProps = {
  images: WideShot[];
  caption?: string;
  className?: string;
};

/** Stacked or grid gallery for ~16:9 / desktop product screenshots. */
export function WideShotGallery({ images, caption, className }: WideShotGalleryProps) {
  return (
    <div className={cn("w-full", className)}>
      <div
        className={cn(
          "grid gap-4",
          images.length > 1 ? "md:grid-cols-1" : "grid-cols-1"
        )}
      >
        {images.map((image) => (
          <figure
            key={image.src}
            className="relative overflow-hidden rounded-2xl border border-white/10 bg-zinc-950 shadow-[0_24px_80px_-32px_rgba(0,0,0,0.85)]"
          >
            <div className="relative aspect-[16/9] w-full">
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="(max-width: 768px) 100vw, 960px"
                className="object-cover object-top"
              />
            </div>
          </figure>
        ))}
      </div>
      {caption ? (
        <p className="mt-4 text-center text-xs text-zinc-500">{caption}</p>
      ) : null}
    </div>
  );
}
