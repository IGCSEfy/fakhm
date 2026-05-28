import React from "react";

/**
 * Shared shopping-bag icon used by the navbar cart button and the empty-cart
 * drawer state. A bag body with a handle arc on top — reads clearly as a
 * shopping bag at any size, without lucide's "smile" curve that looked
 * cartoonish when enlarged.
 */
export function BagIcon({
  className,
  strokeWidth = 1.75,
}: {
  className?: string;
  strokeWidth?: number;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {/* Bag body */}
      <path d="M4 7h16l-1 13a2 2 0 0 1-2 1.8H7a2 2 0 0 1-2-1.8L4 7Z" />
      {/* Handle arc */}
      <path d="M8.5 7V6a3.5 3.5 0 0 1 7 0v1" />
    </svg>
  );
}
