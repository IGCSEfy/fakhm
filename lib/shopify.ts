/**
 * Shopify Storefront API — server-side commerce data.
 *
 * We use Shopify as the single source of truth for *commerce* data:
 * live price, compare-at price, stock status, and the variant ID used at
 * checkout. Editorial content (names, taglines, scent profiles, photos)
 * stays in `lib/products.ts` because it's tightly coupled to the custom UI.
 *
 * The public Storefront Access Token is safe to expose, but we only ever
 * call this from Server Components / cached server functions, so it never
 * ships to the browser at all.
 */

const DOMAIN =
  process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN ?? "fakhm-oud.myshopify.com";
const TOKEN = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN ?? "";

/** True once the store credentials are configured. */
export const shopifyConfigured = Boolean(DOMAIN && TOKEN);

/** Live commerce data for a single product, keyed by handle (= our slug). */
export type ShopifyCommerce = {
  handle: string;
  /** First variant's ID as a raw number string, e.g. "44123456789". */
  variantId: string;
  priceCents: number;
  compareAtCents?: number;
  availableForSale: boolean;
};

type ProductsResponse = {
  products: {
    edges: {
      node: {
        handle: string;
        variants: {
          edges: {
            node: {
              id: string;
              availableForSale: boolean;
              price: { amount: string };
              compareAtPrice: { amount: string } | null;
            };
          }[];
        };
      };
    }[];
  };
};

const PRODUCTS_QUERY = `
  query AllProducts {
    products(first: 100) {
      edges {
        node {
          handle
          variants(first: 1) {
            edges {
              node {
                id
                availableForSale
                price { amount }
                compareAtPrice { amount }
              }
            }
          }
        }
      }
    }
  }
`;

/** Convert a Storefront money string ("45.00") to integer fils/cents. */
function toCents(amount: string): number {
  return Math.round(parseFloat(amount) * 100);
}

/** Extract the numeric ID from a variant GID (for cart permalinks). */
function numericVariantId(gid: string): string {
  const match = gid.match(/(\d+)(?:\?.*)?$/);
  return match ? match[1] : gid;
}

/**
 * Fetch live commerce data for every product, keyed by handle.
 * Returns an empty map (never throws) if Shopify isn't configured or the
 * request fails — callers fall back to the static catalog prices.
 */
export async function fetchShopifyCommerce(): Promise<
  Record<string, ShopifyCommerce>
> {
  if (!shopifyConfigured) return {};

  try {
    const res = await fetch(`https://${DOMAIN}/api/2024-10/graphql.json`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token": TOKEN,
      },
      body: JSON.stringify({ query: PRODUCTS_QUERY }),
    });

    if (!res.ok) {
      console.error("[Shopify] HTTP", res.status, await res.text());
      return {};
    }

    const json = (await res.json()) as {
      data?: ProductsResponse;
      errors?: unknown;
    };

    if (json.errors) {
      console.error("[Shopify] GraphQL errors", json.errors);
      return {};
    }

    const out: Record<string, ShopifyCommerce> = {};
    for (const { node } of json.data?.products.edges ?? []) {
      const variant = node.variants.edges[0]?.node;
      if (!variant) continue;
      out[node.handle] = {
        handle: node.handle,
        variantId: numericVariantId(variant.id),
        priceCents: toCents(variant.price.amount),
        compareAtCents: variant.compareAtPrice
          ? toCents(variant.compareAtPrice.amount)
          : undefined,
        availableForSale: variant.availableForSale,
      };
    }
    return out;
  } catch (err) {
    console.error("[Shopify] fetch failed", err);
    return {};
  }
}

/**
 * Build a Shopify cart permalink that hands the bag off to Shopify's hosted,
 * PCI-compliant checkout. Format: /cart/{variantId}:{qty},{variantId}:{qty}
 *
 * Returns null if no line items have a known variant ID (e.g. Shopify isn't
 * connected yet) — the UI uses that to keep checkout disabled.
 */
export function buildCheckoutUrl(
  lines: { variantId?: string; qty: number }[],
): string | null {
  if (!DOMAIN) return null;
  const parts = lines
    .filter((l) => l.variantId && l.qty > 0)
    .map((l) => `${l.variantId}:${l.qty}`);
  if (parts.length === 0) return null;
  return `https://${DOMAIN}/cart/${parts.join(",")}`;
}
