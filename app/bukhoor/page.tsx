import ProductCollectionPage from "@/components/product-collection-page";
import { getCatalog } from "@/lib/catalog";

export default async function BukhoorPage() {
  const catalog = await getCatalog();

  return (
    <ProductCollectionPage
      title="Bukhoor & Oud Chips"
      description="Traditional oud chips and bakhoor to scent your home."
      sections={[
        {
          title: "Bukhoor & Oud Chips",
          products: catalog.filter((product) => product.family === "bukhoor"),
        },
      ]}
    />
  );
}
