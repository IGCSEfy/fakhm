export type Product = {
  slug: string;
  name: string;
  tagline: string;
  shortDescription: string;
  longDescription: string;
  origin?: string;
  imageUrl: string;
  glowColor: "orange" | "red" | "purple" | "blue";
  sizes: { label: string; price: string }[];
  notes?: { top: string[]; heart: string[]; base: string[] };
  contents?: string[];
};

export const products: Product[] = [
  {
    slug: "hindi",
    name: "Hindi",
    tagline: "The Classic",
    shortDescription:
      "Smoky, leather-forward, deeply resinous. Hand-distilled from select aquilaria in Assam.",
    longDescription:
      "Hindi oud is the standard against which all others are measured. Distilled from aquilaria malaccensis grown in the foothills of Assam and aged a minimum of ten years before bottling, our Hindi carries the smoky, leather-forward profile that defines traditional oud. It opens dry and woody, settles into a resinous heart over the first hour, and finishes in a smolder that can linger on cloth for days.\n\nThis is the oud you wear to be remembered.",
    origin: "Assam, India",
    imageUrl:
      "https://images.unsplash.com/photo-1610461888750-10bfc601b874?w=1600&q=80",
    glowColor: "orange",
    sizes: [
      { label: "3ml", price: "$480" },
      { label: "6ml", price: "$890" },
      { label: "12ml", price: "$1,650" },
    ],
    notes: {
      top: ["incense", "dry leather", "char"],
      heart: ["aged wood", "resin", "animal musk"],
      base: ["smoke", "dark amber", "tobacco"],
    },
  },
  {
    slug: "cambodi",
    name: "Cambodi",
    tagline: "The Beloved",
    shortDescription:
      "Sweet, floral, long-lasting. The lighter cousin of Hindi, equally rare.",
    longDescription:
      "Cambodi oud opens brighter than its Indian cousin — sweeter, floral, almost honeyed in the early hours. It softens through a long mid-life of warm resin and dried fruit, and lands in a sweet, woody base that compliments skin in a way few ouds do.\n\nOur Cambodi comes from the Trat highlands of Thailand and the border regions of Cambodia. It is the most accessible of our pure ouds, and the one most often gifted.",
    origin: "Trat Highlands · Cambodia",
    imageUrl:
      "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=1600&q=80",
    glowColor: "red",
    sizes: [
      { label: "3ml", price: "$560" },
      { label: "6ml", price: "$1,020" },
      { label: "12ml", price: "$1,920" },
    ],
    notes: {
      top: ["honey", "stone fruit", "soft leather"],
      heart: ["sweet resin", "rose", "powdered wood"],
      base: ["dried tobacco", "amber", "creamy musk"],
    },
  },
  {
    slug: "maroki",
    name: "Maroki",
    tagline: "The Rare",
    shortDescription:
      "Balsamic, mineral, earthy. The deepest expression in our collection.",
    longDescription:
      "Maroki sits at the far end of the oud spectrum. Where Hindi is smoke and Cambodi is sweetness, Maroki is mineral and earth — the smell of an old wooden chest in a stone room. Heavy in balsamic resins and notes of damp wood, it is slow to bloom and even slower to leave.\n\nThis is not a starter oud. It rewards patience and asks for restraint — two or three drops, no more.",
    origin: "Sourced privately · Batch numbered",
    imageUrl:
      "https://images.unsplash.com/photo-1541643600914-78b084683601?w=1600&q=80",
    glowColor: "purple",
    sizes: [
      { label: "3ml", price: "$620" },
      { label: "6ml", price: "$1,160" },
      { label: "12ml", price: "$2,200" },
    ],
    notes: {
      top: ["damp earth", "balsamic resin", "moss"],
      heart: ["aged sandalwood", "cedar", "mineral musk"],
      base: ["dry oud char", "deep amber", "leather"],
    },
  },
  {
    slug: "discovery-set",
    name: "Discovery Set",
    tagline: "The Introduction",
    shortDescription:
      "Sample all three of our signatures in one curated set.",
    longDescription:
      "Choosing an oud should not be a guess. Our Discovery Set carries 1ml of each of our three signatures — Hindi, Cambodi, and Maroki — in numbered glass vials, packaged in a small linen-lined case.\n\nIt's the easiest way to find your signature before committing to a full bottle. Buy this first.",
    imageUrl:
      "https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=1600&q=80",
    glowColor: "blue",
    sizes: [{ label: "3 × 1ml", price: "$120" }],
    contents: [
      "Hindi — 1ml",
      "Cambodi — 1ml",
      "Maroki — 1ml",
      "Linen-lined case",
      "Wear notes & care card",
    ],
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getOtherProducts(slug: string, limit = 3): Product[] {
  return products.filter((p) => p.slug !== slug).slice(0, limit);
}
