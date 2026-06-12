"use client";

import React from "react";
import { useCartStore } from "@/lib/cart-store";
import type { Product } from "@/lib/products";
import ButtonWithIcon from "@/components/ui/button-with-icon";
import { DiscountBadge, PriceTag } from "@/components/ui/dirham";

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
      shopifyVariantId: product.shopifyVariantId,
    });
  };

  return (
    <div className="flex flex-col gap-4 mt-auto pt-4 border-t border-white/10">
      <div className="flex flex-col gap-2">
        {/* Discount badge, above the price */}
        <DiscountBadge
          cents={product.priceCents}
          compareAtCents={product.compareAtCents}
          className="self-start text-lg"
        />
        {/* Price on the left, size aligned to the right */}
        <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1">
          <p className="text-3xl font-bold text-white">
            <PriceTag
              cents={product.priceCents}
              compareAtCents={product.compareAtCents}
              showDiscount={false}
            />
          </p>
          {product.volume && (
            <span className="text-3xl font-normal text-white/50">
              {product.volume}
            </span>
          )}
        </div>
      </div>
      <ButtonWithIcon onClick={handleAddToCart}>Add to cart</ButtonWithIcon>
    </div>
  );
}
