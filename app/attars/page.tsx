import ProductCollectionPage from "@/components/product-collection-page";
import { getCatalog } from "@/lib/catalog";
import type { AttarCollection } from "@/lib/products";

const collections: { slug: AttarCollection; title: string }[] = [
  { slug: "prime-collection", title: "Prime Collection" },
  { slug: "musk", title: "Musk" },
  { slug: "mukhalat", title: "Mukhalat" },
  { slug: "dunya-collection", title: "Dunya Collection" },
];

export default async function AttarsPage() {
  const catalog = await getCatalog();

  return (
    <ProductCollectionPage
      title="Attars"
      description="Our complete attar collection, from everyday musks to the Dunya signatures."
      sections={collections.map((collection) => ({
        title: collection.title,
        products: catalog.filter(
          (product) => product.attarCollection === collection.slug,
        ),
      }))}
    />
  );
}
