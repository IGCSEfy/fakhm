"use client";

import React from "react";
import { selectTotalQty, useCartStore } from "@/lib/cart-store";
import { BagIcon } from "@/components/ui/bag-icon";

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
      className="relative p-2 text-white hover:text-white/70 transition-colors flex items-center justify-center"
      aria-label={`Open cart${displayCount > 0 ? ` (${displayCount} items)` : ""}`}
    >
      <BagIcon className="h-6 w-6" strokeWidth={1.75} />
      {displayCount > 0 && (
        <span className="absolute top-0 right-0 min-w-[18px] h-[18px] px-1 rounded-full bg-white text-black text-[10px] font-bold flex items-center justify-center">
          {displayCount}
        </span>
      )}
    </button>
  );
}
