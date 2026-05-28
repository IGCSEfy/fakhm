"use client";

import React from "react";
import { ShoppingBag } from "lucide-react";
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
      <ShoppingBag className="h-5 w-5" />
      {displayCount > 0 && (
        <span className="absolute -top-2 -right-2 min-w-[22px] h-[22px] px-1.5 rounded-full bg-white text-black text-xs font-bold flex items-center justify-center">
          {displayCount}
        </span>
      )}
    </button>
  );
}
