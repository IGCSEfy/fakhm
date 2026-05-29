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
            className="rounded-xl object-cover object-center w-full h-[240px] md:h-[460px]"
            src="/products/oud-zahabi.jpg"
            alt="Fakhm Oud — Oud Zahabi"
          />

          <div className="grid gap-6 md:grid-cols-2 md:gap-12 pt-8">
            <h1 className="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white leading-snug">
              Oud, made <span className="text-primary">for every day</span>
              <span className="text-gray-500 dark:text-gray-400">
                {" "}
                — rich, oud-forward blends and traditional bakhoor, at a price
                that makes sense.
              </span>
            </h1>
            <div className="space-y-6 text-muted-foreground">
              <p>
                Oud has always carried a reputation for being rare and
                expensive. Fakhm Oud exists to change that — concentrated,
                long-lasting scents built around oud, made approachable.
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
              We blend oud-forward attars and prepare traditional bakhoor for
              people who love the scent of oud but don't want to pay a
              fortune for it. Small batches, honest prices, made to last.
            </p>
          </div>

          {/* ---------------- CARD LAYOUT ---------------- */}
          <div className="flex flex-col md:flex-row gap-6 mt-16">
            {/* LEFT BIG IMAGE */}
            <div className="md:flex-1">
              <img
                src="/products/shams.jpg"
                alt="Shams — a Fakhm Oud signature"
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
                    src="/products/musk-rijali.jpg"
                    alt="Fakhm Oud — Musk Rijali"
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute bottom-0 h-12 w-full bg-gradient-to-t from-black to-transparent" />
                </motion.div>
                <div className="p-6">
                  <h3 className="text-xl font-bold">Three Signatures</h3>
                  <p className="mt-2 text-sm text-gray-300">
                    Shams, Qamr, and Falaq — named for the sun, the moon, and
                    the break of dawn. Three oud blends, three moods.
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
                  src="/products/oud-iraqi-bhukoor-2.jpg"
                  alt="Oud Iraqi bakhoor — oud wood chips for burning"
                  className="h-full w-full object-cover min-h-[220px] sm:min-h-[240px] md:min-h-[220px]"
                />
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent text-white">
                  <h3 className="text-xl font-bold">Made to Last</h3>
                  <p className="mt-2 text-sm text-gray-200">
                    Concentrated oils that stay close and last for hours — plus
                    traditional bakhoor to scent your home.
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
