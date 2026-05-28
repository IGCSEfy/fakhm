"use client";

import React from "react";
import { selectTotalQty, useCartStore } from "@/lib/cart-store";

export default function CartButton() {
  const openCart = useCartStore((s) => s.openCart);
  const totalQty = useCartStore(selectTotalQty);

  // Avoid hydration mismatch: only show the count after mount.
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);
  const displayCount = mounted ? totalQty : 0;

  return (
    <button
      type="button"
      onClick={openCart}
      className="relative h-10 w-10 rounded-lg border border-white/20 text-white hover:bg-white/10 hover:border-transparent transition-colors flex items-center justify-center"
      aria-label={`Open cart${displayCount > 0 ? ` (${displayCount} items)` : ""}`}
    >
      {/* Minimal shopping bag (no "smile" — luxury-brand friendly) */}
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-5 w-5"
        aria-hidden
      >
        <path d="M3.103 6.034h17.794" />
        <path d="M3.4 5.467a2 2 0 0 0-.4 1.2V20a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6.667a2 2 0 0 0-.4-1.2l-2-2.667A2 2 0 0 0 17 2H7a2 2 0 0 0-1.6.8z" />
      </svg>
      {displayCount > 0 && (
        <span className="absolute -top-2 -right-2 min-w-[22px] h-[22px] px-1.5 rounded-full bg-white text-black text-xs font-bold flex items-center justify-center">
          {displayCount}
        </span>
      )}
    </button>
  );
}
