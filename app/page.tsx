"use client";
import React, { useEffect } from "react";
import { motion, stagger, useAnimate } from "motion/react";
import ButtonWithIcon from "@/components/ui/button-with-icon";
import { VideoScrollHero } from "@/components/ui/video-scroll-hero";
import Floating, {
  FloatingElement,
} from "@/components/ui/parallax-floating";
import { TextRevealByWord } from "@/components/ui/text-reveal";
import { StaggerTestimonials } from "@/components/ui/stagger-testimonials";
import Link from "next/link";
import { products } from "@/lib/products";

// Real product photos for the hero scatter — each image links to its product
// page. Includes every product's cover plus the extra gallery shots some
// products have (9 images across 8 scatter slots, so all products appear).
const galleryImages = [
  ...products.map((p) => ({ src: p.imageUrl, slug: p.slug, name: p.name })),
  ...products.flatMap((p) =>
    (p.images ?? []).slice(1).map((src) => ({ src, slug: p.slug, name: p.name })),
  ),
];

// Scatter positions + sizes, tuned for visual balance (kept from the original
// layout). Each entry lines up by index with galleryImages.
const galleryPositions: { depth: number; position: string; size: string }[] = [
  { depth: 0.5, position: "top-[8%] left-[11%]", size: "w-16 h-16 md:w-24 md:h-24" },
  { depth: 1, position: "top-[10%] left-[32%]", size: "w-20 h-20 md:w-28 md:h-28" },
  { depth: 2, position: "top-[2%] left-[53%]", size: "w-28 h-40 md:w-40 md:h-52" },
  { depth: 1, position: "top-[0%] left-[83%]", size: "w-24 h-24 md:w-32 md:h-32" },
  { depth: 1, position: "top-[40%] left-[2%] hidden sm:block", size: "w-28 h-28 md:w-36 md:h-36" },
  { depth: 2, position: "top-[70%] left-[77%]", size: "w-28 h-28 md:w-36 md:h-48" },
  { depth: 4, position: "top-[73%] left-[15%]", size: "w-40 md:w-52 h-full" },
  { depth: 1, position: "top-[80%] left-[50%] hidden sm:block", size: "w-24 h-24 md:w-32 md:h-32" },
];

function ParallaxGallery() {
  const [scope, animate] = useAnimate();

  useEffect(() => {
    animate("img", { opacity: [0, 1] }, { duration: 0.5, delay: stagger(0.15) });
  }, []);

  return (
    <div
      // `isolate` creates a new stacking context so the inner `z-50`
      // elements (logo, Shop now button) can't escape this section
      // and overlap the sticky navbar above.
      className="relative isolate flex w-full h-full min-h-[600px] justify-center items-center bg-background overflow-hidden"
      ref={scope}
    >
      <motion.div
        className="z-50 text-center space-y-4 items-center flex flex-col"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.88, delay: 1.5 }}
      >
        <img
          src="/logo.svg"
          alt="Fakhm Oud"
          className="h-16 md:h-24 w-auto z-50"
        />
        <ButtonWithIcon href="/shop">Shop now</ButtonWithIcon>
      </motion.div>

      <Floating sensitivity={-1} className="overflow-hidden">
        {galleryPositions.map((slot, i) => {
          const img = galleryImages[i % galleryImages.length];
          return (
            <FloatingElement key={i} depth={slot.depth} className={slot.position}>
              <Link href={`/shop/${img.slug}`} aria-label={img.name}>
                <motion.img
                  initial={{ opacity: 0 }}
                  src={img.src}
                  alt={img.name}
                  className={`${slot.size} object-cover hover:scale-105 duration-200 cursor-pointer transition-transform`}
                />
              </Link>
            </FloatingElement>
          );
        })}
      </Floating>
    </div>
  );
}

export default function Home() {
  return (
    <>
      <ParallaxGallery />
      <TextRevealByWord text="Every bottle tells a story. Every scent leaves a mark." />
      <VideoScrollHero
        videoSrc="/lingers.mp4"
        title="A scent that lingers."
        subtitle=""
      />
      <section className="bg-background pt-8 pb-20">
        <div className="max-w-6xl mx-auto px-6 mb-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white">
            What people say
          </h2>
        </div>
        <StaggerTestimonials />
      </section>
    </>
  );
}
