import React from "react";

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
      {dhs}
      <Dirham className="ms-1" />
    </span>
  );
}
