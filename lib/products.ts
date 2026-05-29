export type Product = {
  slug: string;
  name: string;
  /** Short descriptor shown as the card eyebrow. */
  tagline: string;
  /** Comma/dot separated scent notes. Omitted for non-wearable items (bakhoor). */
  scentProfile?: string;
  shortDescription: string;
  longDescription: string;
  /** Display price, e.g. "45 DHS". */
  price: string;
  /** Price in fils (1 DHS = 100), used for cart subtotals. */
  priceCents: number;
  /** Optional "was" price in fils, shown struck through for anchoring. */
  compareAtCents?: number;
  /** Volume / quantity, e.g. "6ml" or "25g". */
  volume: string;
  /** Primary image — used on cards and as the default detail image. */
  imageUrl: string;
  /** Optional extra images for the product-page gallery (includes the primary). */
  images?: string[];
};

export const products: Product[] = [
  {
    slug: "shams",
    name: "Shams",
    tagline: "The Sun",
    scentProfile: "Oud · Spices · Leather · Ambroxin",
    shortDescription:
      "Warm, spiced and bold — oud wrapped in leather and amber.",
    longDescription:
      "Shams — “the sun” — is our warmest blend. Smoky oud is layered with dark spices, a stroke of leather, and a long ambroxin trail that radiates off the skin.\n\nMade for cooler evenings and people who like to be remembered.",
    price: "45 DHS",
    priceCents: 4500,
    compareAtCents: 6000,
    volume: "6ml",
    imageUrl: "/products/shams.jpg",
    images: ["/products/shams.jpg", "/products/shams-2.jpg"],
  },
  {
    slug: "qamr",
    name: "Qamr",
    tagline: "The Moon",
    scentProfile: "Oud · Cardamom · Rose · Citrus",
    shortDescription:
      "Soft and luminous — rose and cardamom over a quiet oud base.",
    longDescription:
      "Qamr — “the moon” — opens bright with citrus and green cardamom, settles into a powdery rose, and rests on a soft, clean oud.\n\nUnderstated and elegant — equally at home day or night.",
    price: "45 DHS",
    priceCents: 4500,
    compareAtCents: 6000,
    volume: "6ml",
    imageUrl: "/products/qamr.jpg",
    images: ["/products/qamr.jpg", "/products/qamr-2.jpg"],
  },
  {
    slug: "falaq",
    name: "Falaq",
    tagline: "Daybreak",
    scentProfile: "Oud · Amber · Florals · Citrus",
    shortDescription:
      "Bright and ambery — florals and citrus lifted over warm oud.",
    longDescription:
      "Falaq — “the break of dawn” — is our most radiant scent. Sparkling citrus and white florals sit over a warm amber-oud heart that glows rather than overpowers.\n\nFresh, optimistic, and easy to wear.",
    price: "45 DHS",
    priceCents: 4500,
    compareAtCents: 6000,
    volume: "6ml",
    imageUrl: "/products/falaq.jpg",
    images: ["/products/falaq.jpg", "/products/falaq-2.jpg"],
  },
  {
    slug: "oud-zahabi",
    name: "Oud Zahabi",
    tagline: "The Golden",
    scentProfile: "Strong Oud · Smoky · Woody · Amber",
    shortDescription:
      "Our most intense oud — deep, smoky, and unapologetically strong.",
    longDescription:
      "Oud Zahabi — “golden oud” — is for the oud lover who wants it strong. A dense, smoky oud with woody depth and a golden amber warmth that announces itself and holds for hours.\n\nNot subtle. Not for the faint-hearted.",
    price: "30 DHS",
    priceCents: 3000,
    compareAtCents: 4000,
    volume: "6ml",
    imageUrl: "/products/oud-zahabi.jpg",
  },
  {
    slug: "musk-rijali",
    name: "Musk Rijali",
    tagline: "Clean Musk",
    scentProfile: "Musk · Sweet · Light notes",
    shortDescription:
      "Soft, sweet, and clean — an everyday musk that sits close to the skin.",
    longDescription:
      "Musk Rijali is light, sweet, and effortless — a soft white musk with a gentle sweetness and a clean finish.\n\nThe easiest place to start, and the one you reach for without thinking.",
    price: "40 DHS",
    priceCents: 4000,
    compareAtCents: 5300,
    volume: "12ml",
    imageUrl: "/products/musk-rijali.jpg",
  },
  {
    slug: "oud-iraqi-bhukoor",
    name: "Oud Iraqi Bhukoor",
    tagline: "Bakhoor · For Burning",
    shortDescription:
      "Traditional Iraqi oud bakhoor — scented wood chips for burning at home.",
    longDescription:
      "Oud Iraqi Bhukoor is traditional bakhoor — oud-soaked wood chips meant to be burned over charcoal or in an electric burner.\n\nA few minutes fills a room with deep, smoky oud. The classic way to scent a home and welcome guests.",
    price: "25 DHS",
    priceCents: 2500,
    compareAtCents: 3570,
    volume: "25g",
    imageUrl: "/products/oud-iraqi-bhukoor.jpg",
    images: [
      "/products/oud-iraqi-bhukoor.jpg",
      "/products/oud-iraqi-bhukoor-2.jpg",
    ],
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getOtherProducts(slug: string, limit = 3): Product[] {
  return products.filter((p) => p.slug !== slug).slice(0, limit);
}
