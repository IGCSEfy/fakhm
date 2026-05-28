"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import ButtonWithIcon from "@/components/ui/button-with-icon";

// framer-motion's motion.div re-declares the drag/animation event handlers
// with its own PanInfo-based signatures; omit them from the base HTML props
// so spreading {...props} doesn't fight motion.div's types.
type SafeDivProps = Omit<
  React.HTMLAttributes<HTMLDivElement>,
  | "onDrag"
  | "onDragStart"
  | "onDragEnd"
  | "onAnimationStart"
  | "onAnimationEnd"
  | "onAnimationIteration"
>;

interface ElitePlanCardProps extends SafeDivProps {
  imageUrl: string;
  title: string;
  subtitle: string;
  /** Optional. Rendered prominently below the title (white, bold). */
  price?: string;
  /** Optional long-form copy below the title/price. */
  description?: string;
  /** Optional set of short feature chips (vertical layout only). */
  highlights?: string[];
  /** When set, shows a callback CTA button at the bottom. */
  onAction?: () => void;
  /** Customize the CTA label. Defaults to "Learn More". */
  actionLabel?: string;
  /**
   * Layout variant:
   * - "vertical" (default): image on top, content below — for grid cards
   * - "horizontal": image on left, content on right with larger title — for featured products
   */
  layout?: "vertical" | "horizontal";
}

export const ElitePlanCard = React.forwardRef<
  HTMLDivElement,
  ElitePlanCardProps
>(
  (
    {
      className,
      imageUrl,
      title,
      subtitle,
      price,
      description,
      highlights = [],
      onAction,
      actionLabel = "Learn More",
      layout = "vertical",
      ...props
    },
    ref,
  ) => {
    const isHorizontal = layout === "horizontal";

    return (
      <motion.div
        ref={ref}
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 250, damping: 20 }}
        className={cn(
          "relative overflow-hidden rounded-3xl bg-black",
          isHorizontal ? "w-full" : "w-full max-w-sm",
          className,
        )}
        {...props}
      >
        <div
          className={cn(
            isHorizontal ? "grid grid-cols-1 md:grid-cols-2" : "",
          )}
        >
          {/* Image with parallax zoom on hover */}
          <motion.div
            className={cn(
              "relative w-full overflow-hidden",
              isHorizontal
                ? "aspect-square md:aspect-auto md:min-h-[500px]"
                : "h-64",
            )}
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.45 }}
          >
            <img
              src={imageUrl}
              alt={title}
              className="absolute inset-0 h-full w-full object-cover"
            />
            {/* Fade between image and the dark content panel — vertical only */}
            {!isHorizontal && (
              <div className="absolute bottom-0 h-32 w-full bg-gradient-to-t from-black via-black/80 to-transparent" />
            )}
          </motion.div>

          {/* Content panel */}
          <div
            className={cn(
              "relative z-10 bg-black text-white",
              isHorizontal
                ? "p-8 md:p-12 flex flex-col justify-between gap-10"
                : "p-6",
            )}
          >
            <div>
              <p
                className={cn(
                  "uppercase text-gray-400",
                  isHorizontal
                    ? "text-[10px] tracking-[0.3em] mb-6"
                    : "text-sm tracking-wider",
                )}
              >
                {subtitle}
              </p>
              <h3
                className={cn(
                  "font-bold uppercase text-white",
                  isHorizontal
                    ? "text-5xl md:text-6xl leading-none mb-6"
                    : "mt-1 text-2xl",
                )}
              >
                {title}
              </h3>

              {/* In vertical layout, price sits right under the title.
                  In horizontal, it goes in the bottom row alongside the CTA. */}
              {!isHorizontal && price && (
                <p className="mt-2 text-base font-bold text-white">{price}</p>
              )}

              {description && (
                <p
                  className={cn(
                    "leading-relaxed",
                    isHorizontal
                      ? "text-base text-white/70"
                      : "mt-3 text-sm text-gray-300",
                  )}
                >
                  {description}
                </p>
              )}
            </div>

            {/* Horizontal-only bottom row: price + Shop CTA pill */}
            {isHorizontal && (
              <div className="flex items-center justify-between gap-4 flex-wrap">
                {price && (
                  <p className="text-2xl font-bold text-white">{price}</p>
                )}
                {onAction ? (
                  <ButtonWithIcon onClick={onAction}>
                    {actionLabel}
                  </ButtonWithIcon>
                ) : (
                  <ButtonWithIcon asSpan>Shop {title}</ButtonWithIcon>
                )}
              </div>
            )}

            {/* Vertical-only: highlights chips */}
            {!isHorizontal && highlights.length > 0 && (
              <ul className="mt-4 grid grid-cols-2 gap-2 text-xs text-gray-400">
                {highlights.map((item, idx) => (
                  <li
                    key={idx}
                    className="flex items-center gap-2 rounded-md bg-gray-800/50 px-2 py-1"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-white" />
                    {item}
                  </li>
                ))}
              </ul>
            )}

            {/* Vertical-only: explicit CTA when onAction is provided */}
            {!isHorizontal && onAction && (
              <div className="mt-6">
                <Button
                  variant="default"
                  onClick={onAction}
                  className="w-full bg-white text-black hover:bg-gray-200"
                >
                  {actionLabel}
                </Button>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    );
  },
);

ElitePlanCard.displayName = "ElitePlanCard";
