/**
 * Catalog — the merge layer (SERVER ONLY).
 *
 * Combines static editorial content (lib/products.ts) with live commerce data
 * from Shopify (lib/shopify.ts), matched by handle == slug. Shopify wins for
 * price / compare-at / stock / variant ID; everything else comes from code.
 *
 * Only import this from Server Components or other server code. Client
 * components (homepage gallery, cart) use the static `products` export or the
 * commerce snapshot captured into each cart line at add-time.
 *
 * The Shopify fetch is wrapped in `unstable_cache` so prices are served from
 * cache and refreshed in the background every few minutes — no rebuild needed
 * when you change a price in the Shopify dashboard.
 */

import { unstable_cache } from "next/cache";
import { products as content, type Product } from "./products";
import { fetchShopifyCommerce } from "./shopify";

/** Cache the Shopify commerce snapshot; revalidate every 5 minutes. */
const loadCommerce = unstable_cache(
  async () => fetchShopifyCommerce(),
  ["shopify-commerce-v1"],
  { revalidate: 300, tags: ["catalog"] },
);

function formatPrice(cents: number): string {
  return `${Math.round(cents / 100).toLocaleString("en-US")} DHS`;
}

/** Full catalog with live Shopify prices/variant IDs merged in. */
export async function getCatalog(): Promise<Product[]> {
  const commerce = await loadCommerce();

  return content.map((p) => {
    const live = commerce[p.slug];
    // No live data (Shopify not connected, or product missing) → keep the
    // static fallback price so the site never shows a broken/empty price.
    if (!live) return { ...p, availableForSale: true };

    return {
      ...p,
      priceCents: live.priceCents,
      compareAtCents: live.compareAtCents ?? p.compareAtCents,
      price: formatPrice(live.priceCents),
      shopifyVariantId: live.variantId,
      availableForSale: live.availableForSale,
    };
  });
}

export async function getProduct(slug: string): Promise<Product | undefined> {
  const all = await getCatalog();
  return all.find((p) => p.slug === slug);
}

export async function getRelatedProducts(
  slug: string,
  limit = 3,
): Promise<Product[]> {
  const all = await getCatalog();
  return all.filter((p) => p.slug !== slug).slice(0, limit);
}
