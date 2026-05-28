"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

export default function AboutPage() {
  return (
    <div className="flex flex-col">
      {/* ---------------- HERO SECTION ---------------- */}
      <section className="py-16 md:py-28 bg-background">
        <div className="mx-auto max-w-6xl space-y-2 px-6">
          <img
            className="rounded-xl object-cover w-full h-[240px] md:h-[460px]"
            src="/lingers.jpg"
            alt="Dark perfume bottle in smoke — Fakhm Oud"
          />

          <div className="grid gap-6 md:grid-cols-2 md:gap-12 pt-8">
            <h1 className="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white leading-snug">
              The <span className="text-primary">art</span> of oud
              <span className="text-gray-500 dark:text-gray-400">
                {" "}
                — distilled by hand, aged in secrecy, bottled in small
                numbered editions.
              </span>
            </h1>
            <div className="space-y-6 text-muted-foreground">
              <p>
                Every bottle of Fakhm Oud is traceable to the forest it came
                from. Every drop has rested in clay for years before reaching
                you. No reconstitution. No shortcuts.
              </p>
              <Button
                variant="secondary"
                size="sm"
                className="gap-1 pr-1.5"
                nativeButton={false}
                render={<Link href="/shop" />}
              >
                <span>Shop the Collection</span>
                <ChevronRight className="size-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- ABOUT SECTION ---------------- */}
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-6xl space-y-16 px-6">
          {/* Header */}
          <div className="grid gap-6 text-center md:grid-cols-2 md:gap-12 md:text-left">
            <h1 className="text-4xl md:text-5xl font-semibold text-gray-900 dark:text-white">
              About Us
            </h1>
            <p className="text-muted-foreground">
              Fakhm Oud was founded on a simple idea — that real oud, sourced
              from real forests, distilled by real hands, deserves to be in
              your collection. We are small, deliberate, and patient.
            </p>
          </div>

          {/* ---------------- CARD LAYOUT ---------------- */}
          <div className="flex flex-col md:flex-row gap-6 mt-16">
            {/* LEFT BIG IMAGE */}
            <div className="md:flex-1">
              <img
                src="https://images.unsplash.com/photo-1610461888750-10bfc601b874?w=1600&q=80"
                alt="Aged amber oud — Fakhm Oud heritage"
                className="rounded-xl object-cover w-full h-[300px] sm:h-[360px] md:h-full"
              />
            </div>

            {/* RIGHT TWO CARDS */}
            <div className="flex flex-col gap-6 md:flex-1">
              {/* CARD 1 — Hand-Distilled */}
              <motion.div
                whileHover={{ scale: 1.03 }}
                transition={{ type: "spring", stiffness: 250, damping: 20 }}
                className="relative overflow-hidden rounded-xl bg-black text-white shadow-lg"
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.4 }}
                  className="relative h-60 sm:h-64 md:h-48 w-full overflow-hidden"
                >
                  <img
                    src="https://images.unsplash.com/photo-1547887537-6158d64c35b3?w=1200&q=80"
                    alt="Hand-distilled perfume bottle"
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute bottom-0 h-32 w-full bg-gradient-to-t from-black via-black/70 to-transparent" />
                </motion.div>
                <div className="p-6">
                  <h3 className="text-xl font-bold">Hand-Distilled</h3>
                  <p className="mt-2 text-sm text-gray-300">
                    Traditional deg-bhapka. Low heat over copper alembics for
                    weeks. Patience over yield, always.
                  </p>
                  <Button
                    variant="outline"
                    className="mt-4 border-white text-black dark:text-white hover:bg-white hover:text-black"
                    nativeButton={false}
                    render={<Link href="/shop" />}
                  >
                    Explore
                  </Button>
                </div>
              </motion.div>

              {/* CARD 2 — Built for Memory */}
              <motion.div
                whileHover={{ scale: 1.03 }}
                transition={{ type: "spring", stiffness: 250, damping: 20 }}
                className="relative overflow-hidden rounded-xl bg-muted shadow-lg"
              >
                <img
                  src="https://images.unsplash.com/photo-1615634260167-c8cdede054de?w=1200&q=80"
                  alt="Crystal perfume bottle"
                  className="h-full w-full object-cover min-h-[220px] sm:min-h-[240px] md:min-h-[220px]"
                />
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent text-white">
                  <h3 className="text-xl font-bold">Built for Memory</h3>
                  <p className="mt-2 text-sm text-gray-200">
                    Pure oud lingers — on skin, on cloth, in moments. Wear
                    what stays.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
