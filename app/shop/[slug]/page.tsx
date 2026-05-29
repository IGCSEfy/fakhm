import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import {
  getOtherProducts,
  getProductBySlug,
  products,
} from "@/lib/products";
import ProductActions from "@/components/product-actions";
import { Button } from "@/components/ui/button";
import { ElitePlanCard } from "@/components/ui/elite-plan-card";
import { PriceTag } from "@/components/ui/dirham";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) {
    return { title: "Not found — Fakhm Oud" };
  }
  return {
    title: `${product.name} — Fakhm Oud`,
    description: product.shortDescription,
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const related = getOtherProducts(product.slug);

  return (
    <article className="pt-12 pb-16 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Breadcrumb */}
        <div className="mb-8">
          <Button
            variant="ghost"
            className="group"
            nativeButton={false}
            render={<Link href="/shop" />}
          >
            <ArrowLeft
              className="-ms-1 me-2 opacity-60 transition-transform group-hover:-translate-x-0.5"
              size={16}
              strokeWidth={2}
              aria-hidden="true"
            />
            Back to shop
          </Button>
        </div>

        {/* Hero: image + details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 mb-20">
          <div className="relative aspect-square overflow-hidden rounded-3xl border border-white/10">
            <img
              src={product.imageUrl}
              alt={product.name}
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
          <div className="flex flex-col gap-10">
            <div>
              <p className="text-[10px] uppercase tracking-[0.3em] text-white/50 mb-4">
                {product.tagline}
              </p>
              <h1 className="text-5xl md:text-7xl font-bold uppercase leading-none mb-6 text-white">
                {product.name}
              </h1>
              <p className="text-base text-white/70 leading-relaxed">
                {product.shortDescription}
              </p>
            </div>

            <ProductActions product={product} />
          </div>
        </div>

        {/* Long description */}
        <section className="max-w-3xl mb-20">
          <h2 className="text-3xl md:text-4xl font-bold uppercase mb-6 text-white">
            About {product.name}
          </h2>
          <p className="whitespace-pre-line text-base md:text-lg text-white/70 leading-relaxed">
            {product.longDescription}
          </p>
        </section>

        {/* Scent profile */}
        {product.scentProfile && (
          <section className="mb-20 border-t border-white/10 pt-12">
            <h2 className="text-xs uppercase tracking-[0.3em] text-white/50 mb-6">
              Scent Profile
            </h2>
            <p className="text-white text-2xl md:text-3xl font-bold">
              {product.scentProfile}
            </p>
          </section>
        )}

        {/* Related */}
        <section className="border-t border-white/10 pt-12">
          <h2 className="text-xs uppercase tracking-[0.3em] text-white/50 mb-8">
            You may also like
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 justify-items-center">
            {related.map((p) => (
              <Link
                key={p.slug}
                href={`/shop/${p.slug}`}
                className="block w-full max-w-sm"
              >
                <ElitePlanCard
                  imageUrl={p.imageUrl}
                  title={p.name}
                  subtitle={p.tagline}
                  price={
                    <PriceTag
                      cents={p.priceCents}
                      compareAtCents={p.compareAtCents}
                      volume={p.volume}
                    />
                  }
                />
              </Link>
            ))}
          </div>
        </section>
      </div>
    </article>
  );
}
