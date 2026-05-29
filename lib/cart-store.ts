import { create } from "zustand";
import { persist } from "zustand/middleware";

export type CartItem = {
  productSlug: string;
  productName: string;
  sizeLabel: string;
  /** Display price string, e.g. "$480" or "$1,650" */
  priceLabel: string;
  /** Numeric price in cents, used for subtotal */
  priceCents: number;
  imageUrl: string;
  qty: number;
};

type CartState = {
  items: CartItem[];
  isOpen: boolean;

  // UI actions
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;

  // Cart actions
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

// Selectors — call as useCartStore(selectTotalQty) etc.
export const selectTotalQty = (state: CartState) =>
  state.items.reduce((sum, i) => sum + i.qty, 0);

export const selectSubtotalCents = (state: CartState) =>
  state.items.reduce((sum, i) => sum + i.priceCents * i.qty, 0);

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
