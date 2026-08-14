import { notFound } from "next/navigation";
import ProductCollectionPage from "@/components/product-collection-page";
import { getCatalog } from "@/lib/catalog";
import type { AttarCollection } from "@/lib/products";

const collections: Record<AttarCollection, { title: string; description: string }> = {
  "prime-collection": {
    title: "Prime Collection",
    description: "Signature attars for every day and every occasion.",
  },
  musk: {
    title: "Musk",
    description: "Clean, soft musk attars made for easy wear.",
  },
  mukhalat: {
    title: "Mukhalat",
    description: "Traditional blends with depth, warmth, and character.",
  },
  "dunya-collection": {
    title: "Dunya Collection",
    description: "The sun, moon, and daybreak - our signature trio.",
  },
};

type Props = {
  params: Promise<{ collection: string }>;
};

export function generateStaticParams() {
  return Object.keys(collections).map((collection) => ({ collection }));
}

export default async function AttarCollectionPage({ params }: Props) {
  const { collection } = await params;
  const collectionDetails = collections[collection as AttarCollection];
  if (!collectionDetails) notFound();

  const catalog = await getCatalog();
  const products = catalog.filter(
    (product) => product.attarCollection === collection,
  );

  return (
    <ProductCollectionPage
      title={collectionDetails.title}
      description={collectionDetails.description}
      sections={[{ title: collectionDetails.title, products }]}
    />
  );
}
