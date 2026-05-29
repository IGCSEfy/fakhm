"use client";

import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

/**
 * Product image gallery: one large image with prev/next arrows overlaid on the
 * left and right edges to cycle through photos. With a single image it just
 * renders that image (no controls).
 */
export default function ProductGallery({
  images,
  alt,
}: {
  images: string[];
  alt: string;
}) {
  const safe = images.length > 0 ? images : [""];
  const [active, setActive] = React.useState(0);
  const count = safe.length;
  const current = safe[((active % count) + count) % count];

  const go = (delta: number) => setActive((i) => (i + delta + count) % count);

  return (
    <div className="relative aspect-square overflow-hidden rounded-3xl border border-white/10">
      <img
        src={current}
        alt={alt}
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Prev / next arrows — overlaid on the sides, only when >1 image */}
      {count > 1 && (
        <>
          <button
            type="button"
            onClick={() => go(-1)}
            aria-label="Previous photo"
            className="absolute left-3 top-1/2 -translate-y-1/2 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-white/30 bg-black/40 text-white backdrop-blur-sm transition hover:bg-black/60 hover:scale-105"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={() => go(1)}
            aria-label="Next photo"
            className="absolute right-3 top-1/2 -translate-y-1/2 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-white/30 bg-black/40 text-white backdrop-blur-sm transition hover:bg-black/60 hover:scale-105"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </>
      )}
    </div>
  );
}
