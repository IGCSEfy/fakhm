import { create } from "zustand";
import { persist } from "zustand/middleware";
import { buildCheckoutUrl } from "./shopify";

export type CartItem = {
  productSlug: string;
  productName: string;
  sizeLabel: string;
  /** Display price string, e.g. "45 DHS" */
  priceLabel: string;
  /** Numeric price in cents — captured (live) at add-time. */
  priceCents: number;
  imageUrl: string;
  /**
   * Shopify variant ID captured at add-time. Required to build the checkout
   * permalink. Undefined only if the item was added before Shopify connected.
   */
  shopifyVariantId?: string;
  qty: number;
};

type CartState = {
  items: CartItem[];
  isOpen: boolean;

  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;

  addItem: (item: Omit<CartItem, "qty"> & { qty?: number }) => void;
  removeItem: (productSlug: string, sizeLabel: string) => void;
  updateQty: (productSlug: string, sizeLabel: string, qty: number) => void;
  clear: () => void;
};

const lineKey = (productSlug: string, sizeLabel: string) =>
  `${productSlug}::${sizeLabel}`;

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      isOpen: false,

      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
      toggleCart: () => set((s) => ({ isOpen: !s.isOpen })),

      addItem: (incoming) =>
        set((state) => {
          const qty = incoming.qty ?? 1;
          const key = lineKey(incoming.productSlug, incoming.sizeLabel);
          const existingIndex = state.items.findIndex(
            (i) => lineKey(i.productSlug, i.sizeLabel) === key,
          );
          if (existingIndex >= 0) {
            const items = [...state.items];
            items[existingIndex] = {
              ...items[existingIndex],
              // Refresh the variant ID / price snapshot on re-add so an older
              // line picks up Shopify data once it's connected.
              shopifyVariantId:
                incoming.shopifyVariantId ??
                items[existingIndex].shopifyVariantId,
              priceCents: incoming.priceCents ?? items[existingIndex].priceCents,
              qty: items[existingIndex].qty + qty,
            };
            return { items, isOpen: true };
          }
          return {
            items: [...state.items, { ...incoming, qty }],
            isOpen: true,
          };
        }),

      removeItem: (productSlug, sizeLabel) =>
        set((state) => ({
          items: state.items.filter(
            (i) =>
              lineKey(i.productSlug, i.sizeLabel) !==
              lineKey(productSlug, sizeLabel),
          ),
        })),

      updateQty: (productSlug, sizeLabel, qty) =>
        set((state) => {
          if (qty <= 0) {
            return {
              items: state.items.filter(
                (i) =>
                  lineKey(i.productSlug, i.sizeLabel) !==
                  lineKey(productSlug, sizeLabel),
              ),
            };
          }
          return {
            items: state.items.map((i) =>
              lineKey(i.productSlug, i.sizeLabel) ===
              lineKey(productSlug, sizeLabel)
                ? { ...i, qty }
                : i,
            ),
          };
        }),

      clear: () => set({ items: [] }),
    }),
    {
      name: "fakhm-oud-cart",
      // Only persist items — never persist whether the drawer was open.
      partialize: (state) => ({ items: state.items }),
    },
  ),
);

// ─── Selectors ────────────────────────────────────────────────────────────────

export const selectTotalQty = (state: CartState) =>
  state.items.reduce((sum, i) => sum + i.qty, 0);

export const selectSubtotalCents = (state: CartState) =>
  state.items.reduce((sum, i) => sum + i.priceCents * i.qty, 0);

/**
 * Build the Shopify checkout permalink from the current cart. Returns null
 * when no line has a known variant ID (Shopify not connected yet) — the cart
 * UI uses that to keep the Checkout button disabled with a clear message.
 */
export const selectCheckoutUrl = (state: CartState): string | null =>
  buildCheckoutUrl(
    state.items.map((i) => ({ variantId: i.shopifyVariantId, qty: i.qty })),
  );

// ─── Formatters ───────────────────────────────────────────────────────────────

/** Format a fils value as a DHS price string, e.g. "85 DHS". */
export function formatPriceCents(cents: number): string {
  const dhs = Math.round(cents / 100);
  return `${dhs.toLocaleString("en-US")} DHS`;
}

/** Parse a price string like "45 DHS" into fils (4500). */
export function parsePriceToCents(priceLabel: string): number {
  const digits = priceLabel.replace(/[^0-9.]/g, "");
  if (!digits) return 0;
  return Math.round(parseFloat(digits) * 100);
}
