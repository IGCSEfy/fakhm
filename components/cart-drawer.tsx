"use client";

import React from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { X, Minus, Plus } from "lucide-react";
import { selectSubtotalCents, useCartStore } from "@/lib/cart-store";
import ButtonWithIcon from "@/components/ui/button-with-icon";
import { BagIcon } from "@/components/ui/bag-icon";
import { Price } from "@/components/ui/dirham";

export default function CartDrawer() {
  const isOpen = useCartStore((s) => s.isOpen);
  const closeCart = useCartStore((s) => s.closeCart);
  const items = useCartStore((s) => s.items);
  const updateQty = useCartStore((s) => s.updateQty);
  const removeItem = useCartStore((s) => s.removeItem);
  const subtotalCents = useCartStore(selectSubtotalCents);

  // Lock body scroll while open
  React.useEffect(() => {
    if (isOpen) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [isOpen]);

  // Close on Escape
  React.useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeCart();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, closeCart]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={closeCart}
            aria-hidden
          />

          {/* Panel */}
          <motion.aside
            className="fixed right-0 top-0 z-[70] h-full w-full max-w-md bg-background border-l border-white/10 flex flex-col"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3, ease: "easeOut" }}
            role="dialog"
            aria-modal="true"
            aria-label="Shopping cart"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-white/10">
              <h2 className="text-sm font-bold uppercase tracking-[0.3em] text-white">
                Your Cart
              </h2>
              <button
                type="button"
                onClick={closeCart}
                className="p-1 text-white/70 hover:text-white transition-colors"
                aria-label="Close cart"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Items list */}
            <div className="flex-1 overflow-y-auto px-6 py-6">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center gap-4 text-white/60">
                  <BagIcon className="h-12 w-12 text-white" strokeWidth={2} />
                  <p className="text-base">Your cart is empty.</p>
                  <Link
                    href="/shop"
                    onClick={closeCart}
                    className="text-xs uppercase tracking-[0.3em] text-white border-b border-white/40 pb-1 hover:border-white transition-colors"
                  >
                    Start Shopping
                  </Link>
                </div>
              ) : (
                <ul className="flex flex-col gap-6">
                  {items.map((item) => (
                    <li
                      key={`${item.productSlug}::${item.sizeLabel}`}
                      className="flex gap-4"
                    >
                      {/* Thumbnail */}
                      <Link
                        href={`/shop/${item.productSlug}`}
                        onClick={closeCart}
                        className="block flex-shrink-0 w-20 h-24 overflow-hidden rounded-md bg-black"
                      >
                        <img
                          src={item.imageUrl}
                          alt={item.productName}
                          className="w-full h-full object-cover"
                        />
                      </Link>

                      {/* Details */}
                      <div className="flex flex-col flex-1 min-w-0 gap-2">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <Link
                              href={`/shop/${item.productSlug}`}
                              onClick={closeCart}
                              className="block text-sm font-bold uppercase tracking-wider text-white hover:underline"
                            >
                              {item.productName}
                            </Link>
                            {item.sizeLabel && (
                              <p className="text-xs text-white/50 mt-0.5">
                                {item.sizeLabel}
                              </p>
                            )}
                          </div>
                          <button
                            type="button"
                            onClick={() =>
                              removeItem(item.productSlug, item.sizeLabel)
                            }
                            className="text-white/40 hover:text-white transition-colors"
                            aria-label={`Remove ${item.productName}`}
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>

                        <div className="flex items-center justify-between mt-auto">
                          {/* Qty controls */}
                          <div className="flex items-center gap-2 border border-white/20 rounded-full">
                            <button
                              type="button"
                              onClick={() =>
                                updateQty(
                                  item.productSlug,
                                  item.sizeLabel,
                                  item.qty - 1,
                                )
                              }
                              className="p-2 text-white/70 hover:text-white transition-colors"
                              aria-label="Decrease quantity"
                            >
                              <Minus className="h-3 w-3" />
                            </button>
                            <span className="text-sm font-medium text-white w-6 text-center">
                              {item.qty}
                            </span>
                            <button
                              type="button"
                              onClick={() =>
                                updateQty(
                                  item.productSlug,
                                  item.sizeLabel,
                                  item.qty + 1,
                                )
                              }
                              className="p-2 text-white/70 hover:text-white transition-colors"
                              aria-label="Increase quantity"
                            >
                              <Plus className="h-3 w-3" />
                            </button>
                          </div>

                          {/* Line price */}
                          <p className="text-sm font-bold text-white">
                            <Price cents={item.priceCents * item.qty} />
                          </p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Footer with subtotal + checkout */}
            {items.length > 0 && (
              <div className="border-t border-white/10 px-6 py-6 flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <p className="text-xs uppercase tracking-[0.3em] text-white/50">
                    Subtotal
                  </p>
                  <p className="text-lg font-bold text-white">
                    <Price cents={subtotalCents} />
                  </p>
                </div>
                <p className="text-[10px] uppercase tracking-widest text-white/40 text-center">
                  Shipping &amp; taxes calculated at checkout
                </p>
                <ButtonWithIcon fullWidth disabled>
                  Checkout — Coming Soon
                </ButtonWithIcon>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
