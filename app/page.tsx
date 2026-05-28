"use client";
import React, { useEffect } from "react";
import { motion, stagger, useAnimate } from "motion/react";
import ButtonWithIcon from "@/components/ui/button-with-icon";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import Floating, {
  FloatingElement,
} from "@/components/ui/parallax-floating";
import { TextRevealByWord } from "@/components/ui/text-reveal";
import { StaggerTestimonials } from "@/components/ui/stagger-testimonials";

// Oud / perfume bottle photos — placeholders until real Fakhm Oud product photography is available.
const exampleImages = [
  {
    url: "https://images.unsplash.com/photo-1610461888750-10bfc601b874?w=800&q=80",
    title: "Amber oud bottle, dark studio",
  },
  {
    url: "https://images.unsplash.com/photo-1547887537-6158d64c35b3?w=800&q=80",
    title: "Perfume bottle, low light",
  },
  {
    url: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=800&q=80",
    title: "Glass perfume with roses",
  },
  {
    url: "https://images.unsplash.com/photo-1615634260167-c8cdede054de?w=800&q=80",
    title: "Crystal perfume bottle",
  },
  {
    url: "https://images.unsplash.com/photo-1541643600914-78b084683601?w=800&q=80",
    title: "Vintage perfume bottle",
  },
  {
    url: "https://images.unsplash.com/photo-1594035910387-fea47794261f?w=800&q=80",
    title: "Minimalist perfume bottle",
  },
  {
    url: "https://images.unsplash.com/photo-1605559911160-a3d95d213904?w=800&q=80",
    title: "Glass spray bottle",
  },
  {
    url: "https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=800&q=80",
    title: "Dark cologne bottle",
  },
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
        <FloatingElement depth={0.5} className="top-[8%] left-[11%]">
          <motion.img
            initial={{ opacity: 0 }}
            src={exampleImages[0].url}
            className="w-16 h-16 md:w-24 md:h-24 object-cover hover:scale-105 duration-200 cursor-pointer transition-transform"
          />
        </FloatingElement>
        <FloatingElement depth={1} className="top-[10%] left-[32%]">
          <motion.img
            initial={{ opacity: 0 }}
            src={exampleImages[1].url}
            className="w-20 h-20 md:w-28 md:h-28 object-cover hover:scale-105 duration-200 cursor-pointer transition-transform"
          />
        </FloatingElement>
        <FloatingElement depth={2} className="top-[2%] left-[53%]">
          <motion.img
            initial={{ opacity: 0 }}
            src={exampleImages[2].url}
            className="w-28 h-40 md:w-40 md:h-52 object-cover hover:scale-105 duration-200 cursor-pointer transition-transform"
          />
        </FloatingElement>
        <FloatingElement depth={1} className="top-[0%] left-[83%]">
          <motion.img
            initial={{ opacity: 0 }}
            src={exampleImages[3].url}
            className="w-24 h-24 md:w-32 md:h-32 object-cover hover:scale-105 duration-200 cursor-pointer transition-transform"
          />
        </FloatingElement>

        <FloatingElement depth={1} className="top-[40%] left-[2%]">
          <motion.img
            initial={{ opacity: 0 }}
            src={exampleImages[4].url}
            className="w-28 h-28 md:w-36 md:h-36 object-cover hover:scale-105 duration-200 cursor-pointer transition-transform"
          />
        </FloatingElement>
        <FloatingElement depth={2} className="top-[70%] left-[77%]">
          <motion.img
            initial={{ opacity: 0 }}
            src={exampleImages[7].url}
            className="w-28 h-28 md:w-36 md:h-48 object-cover hover:scale-105 duration-200 cursor-pointer transition-transform"
          />
        </FloatingElement>

        <FloatingElement depth={4} className="top-[73%] left-[15%]">
          <motion.img
            initial={{ opacity: 0 }}
            src={exampleImages[5].url}
            className="w-40 md:w-52 h-full object-cover hover:scale-105 duration-200 cursor-pointer transition-transform"
          />
        </FloatingElement>
        <FloatingElement depth={1} className="top-[80%] left-[50%]">
          <motion.img
            initial={{ opacity: 0 }}
            src={exampleImages[6].url}
            className="w-24 h-24 md:w-32 md:h-32 object-cover hover:scale-105 duration-200 cursor-pointer transition-transform"
          />
        </FloatingElement>
      </Floating>
    </div>
  );
}

export default function Home() {
  return (
    <>
      <ParallaxGallery />
      <TextRevealByWord text="Every bottle tells a story. Every scent leaves a mark." />
      <div className="flex flex-col overflow-hidden">
        <ContainerScroll
          titleComponent={
            <h1 className="text-4xl md:text-6xl font-bold leading-tight text-black dark:text-white">
              A scent that lingers.
            </h1>
          }
        >
          <img
            src="/lingers.jpg"
            alt="Black perfume bottle in smoke — a scent that lingers"
            className="mx-auto rounded-2xl object-cover h-full w-full"
            draggable={false}
          />
        </ContainerScroll>
      </div>
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
