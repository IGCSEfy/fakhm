"use client";

import React from "react";
import { useCartStore } from "@/lib/cart-store";
import type { Product } from "@/lib/products";
import ButtonWithIcon from "@/components/ui/button-with-icon";
import { PriceTag } from "@/components/ui/dirham";

type Props = {
  product: Product;
};

export default function ProductActions({ product }: Props) {
  const addItem = useCartStore((s) => s.addItem);

  const handleAddToCart = () => {
    addItem({
      productSlug: product.slug,
      productName: product.name,
      sizeLabel: product.volume,
      priceLabel: product.price,
      priceCents: product.priceCents,
      imageUrl: product.imageUrl,
    });
  };

  return (
    <div className="flex flex-wrap items-center justify-between gap-4 mt-auto pt-4 border-t border-white/10">
      <p className="text-3xl font-bold text-white">
        <PriceTag
          cents={product.priceCents}
          compareAtCents={product.compareAtCents}
          volume={product.volume}
        />
      </p>
      <ButtonWithIcon onClick={handleAddToCart}>Add to cart</ButtonWithIcon>
    </div>
  );
}
