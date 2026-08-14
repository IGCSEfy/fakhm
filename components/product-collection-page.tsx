import Link from "next/link";
import { ElitePlanCard } from "@/components/ui/elite-plan-card";
import { DiscountBadge, PriceTag } from "@/components/ui/dirham";
import type { Product } from "@/lib/products";

type CollectionSection = {
  title: string;
  products: Product[];
};

type ProductCollectionPageProps = {
  title: string;
  description: string;
  sections: CollectionSection[];
};

export default function ProductCollectionPage({
  title,
  description,
  sections,
}: ProductCollectionPageProps) {
  return (
    <section className="pt-12 pb-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-16">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 text-white">
            {title}
          </h1>
          <p className="text-white/60 max-w-xl text-base font-normal">
            {description}
          </p>
        </div>

        <div className="space-y-20">
          {sections.map((section) => (
            <section key={section.title}>
              <h2 className="text-xs uppercase tracking-[0.3em] text-white/50 mb-8">
                {section.title}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 justify-items-center">
                {section.products.map((product) => (
                  <Link
                    key={product.slug}
                    href={`/shop/${product.slug}`}
                    className="block w-full max-w-sm"
                  >
                    <ElitePlanCard
                      imageUrl={product.imageUrl}
                      title={product.name}
                      subtitle={product.tagline}
                      badge={
                        <DiscountBadge
                          cents={product.priceCents}
                          compareAtCents={product.compareAtCents}
                        />
                      }
                      price={
                        <span className="flex w-full items-center justify-between gap-2">
                          <PriceTag
                            cents={product.priceCents}
                            compareAtCents={product.compareAtCents}
                            showDiscount={false}
                          />
                          {product.volume && (
                            <span className="font-normal text-white/50">
                              {product.volume}
                            </span>
                          )}
                        </span>
                      }
                    />
                  </Link>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </section>
  );
}
