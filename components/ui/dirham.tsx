import React from "react";

import { cn } from "@/lib/utils";

/**
 * UAE Dirham currency symbol.
 *
 * The new (2025) dirham symbol has no reliable font support yet, so we render
 * the official mark as a CSS mask over the artwork in /public/dirham.png.
 * Using `mask` + `background: currentColor` paints the glyph's shape in the
 * surrounding text color (white on our dark pages) and ignores the source
 * image's own black fill — so it recolors and scales like a font glyph.
 */
export function Dirham({ className }: { className?: string }) {
  return (
    <span
      role="img"
      aria-label="dirham"
      className={className}
      style={{
        display: "inline-block",
        width: "0.95em",
        height: "0.82em",
        // sit nicely on the text baseline
        verticalAlign: "-0.04em",
        backgroundColor: "currentColor",
        WebkitMaskImage: "url(/dirham.png)",
        maskImage: "url(/dirham.png)",
        WebkitMaskRepeat: "no-repeat",
        maskRepeat: "no-repeat",
        WebkitMaskPosition: "center",
        maskPosition: "center",
        WebkitMaskSize: "contain",
        maskSize: "contain",
      }}
    />
  );
}

/**
 * Renders a price as "<amount> <dirham symbol>" from a value in fils
 * (1 DHS = 100). The number inherits the surrounding font size/weight; the
 * symbol inherits the text color via Dirham.
 */
export function Price({
  cents,
  className,
}: {
  cents: number;
  className?: string;
}) {
  const dhs = Math.round(cents / 100).toLocaleString("en-US");
  return (
    <span className={className}>
      <Dirham className="me-1" />
      {dhs}
    </span>
  );
}

/**
 * Current price, with an optional struck-through "was" price beside it for
 * anchoring. The compare price is only shown when it's higher than the
 * current price.
 */
export function PriceTag({
  cents,
  compareAtCents,
  volume,
  className,
  showDiscount = true,
}: {
  cents: number;
  compareAtCents?: number;
  volume?: string;
  className?: string;
  /** Show the inline "% Off" pill. Set false when the badge is shown elsewhere (e.g. next to a card title). */
  showDiscount?: boolean;
}) {
  const showCompare = compareAtCents != null && compareAtCents > cents;
  const percentOff = showCompare
    ? Math.round((1 - cents / compareAtCents) * 100)
    : 0;
  return (
    <span className={cn("inline-flex flex-wrap items-center gap-x-2", className)}>
      <Price cents={cents} />
      {showCompare && (
        <>
          {/* "Was" price: dirham symbol left uncrossed, number struck. */}
          <span className="font-normal text-neutral-400">
            <Dirham className="me-1" />
            <span className="line-through decoration-[1.5px]">
              {Math.round(compareAtCents / 100).toLocaleString("en-US")}
            </span>
          </span>
          {/* Discount badge */}
          {showDiscount && (
            <span className="rounded-full bg-white px-2 py-0.5 text-[0.6em] font-bold uppercase leading-none tracking-wider text-black">
              {percentOff}% Off
            </span>
          )}
        </>
      )}
      {volume && (
        <span className="font-normal text-white/50">· {volume}</span>
      )}
    </span>
  );
}

/**
 * Standalone discount pill (e.g. "25% Off"), sized to sit next to a title
 * rather than inline with the price. Renders nothing when there's no discount.
 */
export function DiscountBadge({
  cents,
  compareAtCents,
  className,
}: {
  cents: number;
  compareAtCents?: number;
  className?: string;
}) {
  if (compareAtCents == null || compareAtCents <= cents) return null;
  const percentOff = Math.round((1 - cents / compareAtCents) * 100);
  return (
    <span
      className={cn(
        // Padding is in `em` so the pill stays nicely proportioned (thick,
        // fully rounded) at whatever font size it's rendered at.
        "inline-flex items-center rounded-full bg-white px-[0.85em] py-[0.4em] text-[10px] font-bold uppercase leading-none tracking-wider text-black",
        className,
      )}
    >
      {percentOff}% Off
    </span>
  );
}
