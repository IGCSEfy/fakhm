"use client";

import React from "react";
import {
  parsePriceToCents,
  useCartStore,
} from "@/lib/cart-store";
import type { Product } from "@/lib/products";
import ButtonWithIcon from "@/components/ui/button-with-icon";
import {
  ButtonGroup,
  ButtonGroupItem,
} from "@/components/ui/button-group";

type Props = {
  product: Product;
};

export default function ProductActions({ product }: Props) {
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const addItem = useCartStore((s) => s.addItem);

  const selected = product.sizes[selectedIndex];

  const handleAddToCart = () => {
    addItem({
      productSlug: product.slug,
      productName: product.name,
      sizeLabel: selected.label,
      priceLabel: selected.price,
      priceCents: parsePriceToCents(selected.price),
      imageUrl: product.imageUrl,
    });
  };

  return (
    <>
      {/* Size selector (only if multiple sizes) */}
      {product.sizes.length > 1 && (
        <div>
          <p className="text-xs uppercase tracking-widest text-white/50 mb-3">
            Size
          </p>
          <ButtonGroup hasDivider={false}>
            {product.sizes.map((size, i) => {
              const isSelected = i === selectedIndex;
              return (
                <ButtonGroupItem
                  key={size.label}
                  variant={isSelected ? "default" : "outline"}
                  size="default"
                  roundedRadius="full"
                  onClick={() => setSelectedIndex(i)}
                >
                  <span className="font-bold">{size.label}</span>
                  {/* Hide price on small screens to prevent group overflow;
                      the full price still shows below the selector. */}
                  <span className="opacity-60 ml-1 hidden sm:inline">
                    {size.price}
                  </span>
                </ButtonGroupItem>
              );
            })}
          </ButtonGroup>
        </div>
      )}

      {/* Price + Add to cart */}
      <div className="flex flex-wrap items-center justify-between gap-4 mt-auto pt-4 border-t border-white/10">
        <p className="text-3xl font-bold text-white">{selected.price}</p>
        <ButtonWithIcon onClick={handleAddToCart}>Add to cart</ButtonWithIcon>
      </div>
    </>
  );
}
