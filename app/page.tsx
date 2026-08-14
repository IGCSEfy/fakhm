"use client";
import React from "react";
import { motion } from "motion/react";
import ButtonWithIcon from "@/components/ui/button-with-icon";
import ScrollExpandMedia from "@/components/ui/scroll-expansion-hero";
import { StaggerTestimonials } from "@/components/ui/stagger-testimonials";

function ProductHero() {
  return (
    <motion.section
      className="relative isolate min-h-[calc(100svh-80px)] overflow-hidden bg-background"
      initial={{ opacity: 0, filter: "blur(18px)", scale: 1.035 }}
      animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
      transition={{ duration: 1.7, ease: [0.22, 1, 0.36, 1] }}
    >
      <img
        src="/home-page-oud-zahabi-v3.png"
        alt="Fakhm Oud Zahabi"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <p className="absolute inset-x-0 top-[12%] z-10 px-6 text-center text-xs font-medium uppercase tracking-[0.45em] text-white/80">
        The art of oud
      </p>
      <div className="absolute inset-x-0 bottom-[8%] z-10 flex flex-col items-center gap-4 px-6 text-center">
        <p className="text-xs font-medium uppercase tracking-[0.35em] text-white/80">
          Oud Zahabi
        </p>
        <ButtonWithIcon href="/attars">Shop now</ButtonWithIcon>
      </div>
      <h1 className="sr-only">Fakhm Oud</h1>
    </motion.section>
  );
}

export default function Home() {
  return (
    <>
      <ProductHero />
      <ScrollExpandMedia
        mediaType="video"
        mediaSrc="/lingers.mp4"
        title="A scent that lingers."
        scrollToExpand="Scroll to expand"
      >
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-white">
            The world&apos;s finest bakhoor.
          </h2>
          <p className="text-lg mb-10 text-white/80">
            Oud Iraqi Bhukoor is traditional bakhoor — oud-soaked wood chips
            meant to be burned over charcoal or in an electric burner. A few
            minutes fills a room with deep, smoky oud.
          </p>
          <p className="text-lg mb-10 text-white/80">
            The classic way to scent a home and welcome guests: rich,
            long-lasting, and unmistakably oud — the finest Iraqi bakhoor, made
            approachable.
          </p>
          <ButtonWithIcon href="/shop/oud-iraqi-bhukoor">
            Shop Oud Iraqi Bhukoor
          </ButtonWithIcon>
        </div>
      </ScrollExpandMedia>
      <section className="bg-background pt-20 pb-20">
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
