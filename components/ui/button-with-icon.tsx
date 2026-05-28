"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight, ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";

type ButtonWithIconProps = {
  children: React.ReactNode;
  href?: string;
  target?: string;
  rel?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  className?: string;
  fullWidth?: boolean;
  /** "forward" (default) puts arrow on the right and slides left on hover; "back" mirrors it. */
  direction?: "forward" | "back";
  /** Render as a non-interactive <span>. Use when this lives inside a parent <Link> or <button>. */
  asSpan?: boolean;
};

// Use a *named* group (`group/btn`) so this button's hover state cannot be
// triggered by a parent `.group` ancestor (e.g. a card link that wraps it).
const baseClasses =
  "relative inline-flex items-center text-sm font-semibold rounded-full h-12 p-1 group/btn transition-all duration-500 overflow-hidden cursor-pointer bg-primary text-primary-foreground uppercase tracking-widest disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none";

const forwardPaddingClasses = "ps-6 pe-14 hover:ps-14 hover:pe-6";
const backPaddingClasses = "ps-14 pe-6 hover:ps-6 hover:pe-14";

const forwardIconClasses =
  "absolute right-1 w-10 h-10 bg-background text-foreground rounded-full flex items-center justify-center transition-all duration-500 group-hover/btn:right-[calc(100%-44px)] group-hover/btn:rotate-45";

const backIconClasses =
  "absolute left-1 w-10 h-10 bg-background text-foreground rounded-full flex items-center justify-center transition-all duration-500 group-hover/btn:left-[calc(100%-44px)]";

export default function ButtonWithIcon({
  children,
  href,
  target,
  rel,
  onClick,
  type = "button",
  disabled,
  className,
  fullWidth = false,
  direction = "forward",
  asSpan = false,
}: ButtonWithIconProps) {
  const isForward = direction === "forward";
  const widthClass = fullWidth ? "w-full" : "w-fit";
  const paddingClass = isForward ? forwardPaddingClasses : backPaddingClasses;
  const allClasses = cn(baseClasses, paddingClass, widthClass, className);

  const Icon = isForward ? ArrowUpRight : ArrowLeft;
  const iconWrapperClass = isForward ? forwardIconClasses : backIconClasses;

  const content = (
    <>
      <span className="relative z-10 transition-all duration-500">
        {children}
      </span>
      <div className={iconWrapperClass} aria-hidden>
        <Icon size={16} />
      </div>
    </>
  );

  if (asSpan) {
    return <span className={allClasses}>{content}</span>;
  }

  if (href && !disabled) {
    return (
      <Link
        href={href}
        target={target}
        rel={rel}
        onClick={onClick}
        className={allClasses}
      >
        {content}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={allClasses}
    >
      {content}
    </button>
  );
}
