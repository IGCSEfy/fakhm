import ProductCollectionPage from "@/components/product-collection-page";
import { getCatalog } from "@/lib/catalog";

export default async function DhanAlOudPage() {
  const catalog = await getCatalog();

  return (
    <ProductCollectionPage
      title="Dhan Al Oud"
      description="Pure oud oils with deep character and lasting presence."
      sections={[
        {
          title: "Dhan Al Oud",
          products: catalog.filter((product) => product.family === "dhan-al-oud"),
        },
      ]}
    />
  );
}
