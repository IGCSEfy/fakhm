export type ProductFamily = "attars" | "dhan-al-oud" | "bukhoor";

export type AttarCollection =
  | "prime-collection"
  | "musk"
  | "mukhalat"
  | "dunya-collection";

export type Product = {
  slug: string;
  name: string;
  tagline: string;
  scentProfile?: string;
  shortDescription: string;
  longDescription: string;
  price: string;
  priceCents: number;
  compareAtCents?: number;
  volume: string;
  imageUrl: string;
  images?: string[];
  shopifyVariantId?: string;
  availableForSale?: boolean;
  family: ProductFamily;
  attarCollection?: AttarCollection;
};

const temporaryImage = "/lingers.jpg";

type NewProduct = Omit<Product, "imageUrl"> & { imageUrl?: string };

const newProduct = (product: NewProduct): Product => ({
  ...product,
  imageUrl: product.imageUrl ?? temporaryImage,
});

export const products: Product[] = [
  newProduct({
    slug: "pour-homme",
    name: "Pour Homme",
    tagline: "Prime Collection",
    shortDescription: "A refined everyday attar from the Prime Collection.",
    longDescription:
      "Pour Homme is part of the Fakhm Oud Prime Collection. Full scent notes and product imagery will be added shortly.",
    price: "35 DHS",
    priceCents: 3500,
    compareAtCents: 5000,
    volume: "12ml",
    imageUrl: "/products/pour-homme.jpeg",
    family: "attars",
    attarCollection: "prime-collection",
  }),
  newProduct({
    slug: "vanilla-dish",
    name: "Vanilla Dish",
    tagline: "Prime Collection",
    shortDescription: "A warm vanilla-led attar from the Prime Collection.",
    longDescription:
      "Vanilla Dish is part of the Fakhm Oud Prime Collection. Full scent notes and product imagery will be added shortly.",
    price: "35 DHS",
    priceCents: 3500,
    compareAtCents: 5400,
    volume: "12ml",
    imageUrl: "/products/vanilla-dish-1.jpeg",
    images: [
      "/products/vanilla-dish-1.jpeg",
      "/products/vanilla-dish-2.jpeg",
    ],
    family: "attars",
    attarCollection: "prime-collection",
  }),
  newProduct({
    slug: "sweet-oud",
    name: "Sweet Oud",
    tagline: "Prime Collection",
    shortDescription: "A sweet oud attar from the Prime Collection.",
    longDescription:
      "Sweet Oud is part of the Fakhm Oud Prime Collection. Full scent notes and product imagery will be added shortly.",
    price: "35 DHS",
    priceCents: 3500,
    compareAtCents: 5800,
    volume: "12ml",
    imageUrl: "/products/sweet-oud-1.jpeg",
    images: ["/products/sweet-oud-1.jpeg", "/products/sweet-oud-2.jpeg"],
    family: "attars",
    attarCollection: "prime-collection",
  }),
  newProduct({
    slug: "tobac",
    name: "Tobac",
    tagline: "Prime Collection",
    shortDescription: "A rich tobacco attar from the Prime Collection.",
    longDescription:
      "Tobac is part of the Fakhm Oud Prime Collection. Full scent notes and product imagery will be added shortly.",
    price: "40 DHS",
    priceCents: 4000,
    compareAtCents: 5000,
    volume: "12ml",
    imageUrl: "/products/tobac-1.jpeg",
    images: ["/products/tobac-1.jpeg", "/products/tobac-2.jpeg"],
    family: "attars",
    attarCollection: "prime-collection",
  }),
  newProduct({
    slug: "fantasy",
    name: "Fantasy",
    tagline: "Prime Collection",
    shortDescription: "An expressive attar from the Prime Collection.",
    longDescription:
      "Fantasy is part of the Fakhm Oud Prime Collection. Full scent notes and product imagery will be added shortly.",
    price: "35 DHS",
    priceCents: 3500,
    compareAtCents: 6400,
    volume: "12ml",
    imageUrl: "/products/fantasy-1.jpeg",
    images: ["/products/fantasy-1.jpeg", "/products/fantasy-2.jpeg"],
    family: "attars",
    attarCollection: "prime-collection",
  }),
  {
    slug: "musk-rijali",
    name: "Musk Rijali",
    tagline: "Prime Collection",
    scentProfile: "Musk · Sweet · Light notes",
    shortDescription:
      "Soft, sweet, and clean - an everyday musk that sits close to the skin.",
    longDescription:
      "Musk Rijali is light, sweet, and effortless - a soft white musk with a gentle sweetness and a clean finish.\n\nThe easiest place to start, and the one you reach for without thinking.",
    price: "40 DHS",
    priceCents: 4000,
    compareAtCents: 5300,
    volume: "12ml",
    shopifyVariantId: "53097434972527",
    imageUrl: "/products/musk-rijali.jpg",
    images: ["/products/musk-rijali.jpg", "/products/musk-rijali-2.jpg"],
    family: "attars",
    attarCollection: "prime-collection",
  },
  newProduct({
    slug: "nomad",
    name: "Nomad",
    tagline: "Prime Collection",
    shortDescription: "A distinctive attar from the Prime Collection.",
    longDescription:
      "Nomad is part of the Fakhm Oud Prime Collection. Full scent notes and product imagery will be added shortly.",
    price: "40 DHS",
    priceCents: 4000,
    compareAtCents: 5700,
    volume: "12ml",
    imageUrl: "/products/nomad-1.jpeg",
    images: ["/products/nomad-1.jpeg", "/products/nomad-2.jpeg"],
    family: "attars",
    attarCollection: "prime-collection",
  }),
  newProduct({
    slug: "al-thair",
    name: "Al Thair",
    tagline: "Prime Collection",
    shortDescription: "A signature attar from the Prime Collection.",
    longDescription:
      "Al Thair is part of the Fakhm Oud Prime Collection. Full scent notes and product imagery will be added shortly.",
    price: "35 DHS",
    priceCents: 3500,
    compareAtCents: 4400,
    volume: "12ml",
    imageUrl: "/products/al-thair-1.jpeg",
    images: ["/products/al-thair-1.jpeg", "/products/al-thair-2.jpeg"],
    family: "attars",
    attarCollection: "prime-collection",
  }),
  newProduct({
    slug: "musk-tahara",
    name: "Musk Tahara",
    tagline: "Musk",
    shortDescription: "A clean musk attar for everyday wear.",
    longDescription:
      "Musk Tahara belongs to the Fakhm Oud Musk collection. Full scent notes and product imagery will be added shortly.",
    price: "25 DHS",
    priceCents: 2500,
    compareAtCents: 4200,
    volume: "6ml",
    imageUrl: "/products/musk-tahara-1.jpeg",
    images: [
      "/products/musk-tahara-1.jpeg",
      "/products/musk-tahara-2.jpeg",
    ],
    family: "attars",
    attarCollection: "musk",
  }),
  newProduct({
    slug: "mukhalat-zaffron",
    name: "Mukhalat Zaffron",
    tagline: "Mukhalat",
    shortDescription: "A saffron-forward mukhalat attar.",
    longDescription:
      "Mukhalat Zaffron belongs to the Fakhm Oud Mukhalat collection. Full scent notes and product imagery will be added shortly.",
    price: "35 DHS",
    priceCents: 3500,
    compareAtCents: 5000,
    volume: "3ml",
    imageUrl: "/products/mukhalat-zaffron-1.jpeg",
    images: [
      "/products/mukhalat-zaffron-1.jpeg",
      "/products/mukhalat-zaffron-2.jpeg",
      "/products/mukhalat-zaffron-3.jpeg",
    ],
    family: "attars",
    attarCollection: "mukhalat",
  }),
  {
    slug: "qamr",
    name: "Qamr",
    tagline: "Dunya Collection",
    scentProfile: "Oud · Cardamom · Rose · Citrus",
    shortDescription:
      "Soft and luminous - rose and cardamom over a quiet oud base.",
    longDescription:
      "Qamr - the moon - opens bright with citrus and green cardamom, settles into a powdery rose, and rests on a soft, clean oud.\n\nUnderstated and elegant - equally at home day or night.",
    price: "45 DHS",
    priceCents: 4500,
    compareAtCents: 6000,
    volume: "6ml",
    shopifyVariantId: "53097432121711",
    imageUrl: "/products/qamr.jpg",
    images: ["/products/qamr.jpg", "/products/qamr-2.jpg"],
    family: "attars",
    attarCollection: "dunya-collection",
  },
  {
    slug: "falaq",
    name: "Falaq",
    tagline: "Dunya Collection",
    scentProfile: "Oud · Amber · Florals · Citrus",
    shortDescription:
      "Bright and ambery - florals and citrus lifted over warm oud.",
    longDescription:
      "Falaq - daybreak - is our most radiant blend. Sparkling citrus and white florals sit over a warm amber-oud heart that glows rather than overpowers.\n\nFresh, optimistic, and easy to wear.",
    price: "45 DHS",
    priceCents: 4500,
    compareAtCents: 6900,
    volume: "6ml",
    shopifyVariantId: "53097433104751",
    imageUrl: "/products/falaq.jpg",
    images: ["/products/falaq.jpg", "/products/falaq-2.jpg"],
    family: "attars",
    attarCollection: "dunya-collection",
  },
  {
    slug: "shams",
    name: "Shams",
    tagline: "Dunya Collection",
    scentProfile: "Oud · Spices · Leather · Ambroxin",
    shortDescription:
      "Warm, spiced and bold - oud wrapped in leather and amber.",
    longDescription:
      "Shams - the sun - is our warmest blend. Smoky oud is layered with dark spices, a stroke of leather, and a long ambroxin trail that radiates off the skin.\n\nMade for cooler evenings and people who like to be remembered.",
    price: "45 DHS",
    priceCents: 4500,
    compareAtCents: 7500,
    volume: "6ml",
    shopifyVariantId: "53097431007599",
    imageUrl: "/products/shams.jpg",
    images: ["/products/shams.jpg", "/products/shams-2.jpg"],
    family: "attars",
    attarCollection: "dunya-collection",
  },
  {
    slug: "oud-zahabi",
    name: "Oud Zahabi",
    tagline: "Dhan Al Oud",
    scentProfile: "Strong Oud · Smoky · Woody · Amber",
    shortDescription:
      "Our most intense oud - deep, smoky, and unapologetically strong.",
    longDescription:
      "Oud Zahabi is for the oud lover who wants it strong. A dense, smoky oud with woody depth and a golden amber warmth that announces itself and holds for hours.",
    price: "35 DHS",
    priceCents: 3500,
    compareAtCents: 5800,
    volume: "6ml",
    shopifyVariantId: "53097433629039",
    imageUrl: "/products/oud-zahabi.jpg",
    images: ["/products/oud-zahabi.jpg", "/products/oud-zahabi-2.jpg"],
    family: "dhan-al-oud",
  },
  newProduct({
    slug: "oud-qadeem",
    name: "Oud Qadeem",
    tagline: "Dhan Al Oud",
    shortDescription: "A distinguished pure oud oil.",
    longDescription:
      "Oud Qadeem is part of the Fakhm Oud Dhan Al Oud selection. Full scent notes and product imagery will be added shortly.",
    price: "60 DHS",
    priceCents: 6000,
    compareAtCents: 10000,
    volume: "6ml",
    imageUrl: "/products/oud-qadeem-1.jpeg",
    images: [
      "/products/oud-qadeem-1.jpeg",
      "/products/oud-qadeem-2.jpeg",
      "/products/oud-qadeem-3.jpeg",
    ],
    family: "dhan-al-oud",
  }),
  newProduct({
    slug: "oud-misri",
    name: "Oud Misri",
    tagline: "Bukhoor & Oud Chips",
    shortDescription: "Fragrant oud chips for burning at home.",
    longDescription:
      "Oud Misri is part of the Fakhm Oud Bukhoor and Oud Chips collection. Full scent notes and product imagery will be added shortly.",
    price: "25 DHS",
    priceCents: 2500,
    compareAtCents: 4200,
    volume: "",
    imageUrl: "/products/oud-misri.jpeg",
    family: "bukhoor",
  }),
  {
    slug: "oud-iraqi-bhukoor",
    name: "Oud Iraqi Bhukoor",
    tagline: "Bukhoor & Oud Chips",
    shortDescription:
      "Traditional Iraqi oud bakhoor - scented wood chips for burning at home.",
    longDescription:
      "Oud Iraqi Bhukoor is traditional bakhoor - oud-soaked wood chips meant to be burned over charcoal or in an electric burner.\n\nA few minutes fills a room with deep, smoky oud. The classic way to scent a home and welcome guests.",
    price: "25 DHS",
    priceCents: 2500,
    compareAtCents: 4200,
    volume: "25g",
    shopifyVariantId: "53097435103599",
    imageUrl: "/products/oud-iraqi-bhukoor.jpg",
    images: [
      "/products/oud-iraqi-bhukoor.jpg",
      "/products/oud-iraqi-bhukoor-2.jpg",
    ],
    family: "bukhoor",
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((product) => product.slug === slug);
}

export function getOtherProducts(slug: string, limit = 3): Product[] {
  const product = getProductBySlug(slug);
  return products
    .filter(
      (item) =>
        item.slug !== slug && (!product || item.family === product.family),
    )
    .slice(0, limit);
}
