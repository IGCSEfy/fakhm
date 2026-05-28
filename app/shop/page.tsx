import Link from "next/link";
import { Droplet, Mountain, Package, RotateCcw } from "lucide-react";
import { ElitePlanCard } from "@/components/ui/elite-plan-card";
import ButtonWithIcon from "@/components/ui/button-with-icon";
import { products } from "@/lib/products";

const featuredProduct = products[0];
const otherProducts = products.slice(1);

export default function ShopPage() {
  return (
    <section className="pt-12 pb-16 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 text-white">
            Shop
          </h1>
          <p className="text-white/60 max-w-xl text-base font-normal">
            Pure oud, hand-distilled, in small numbered editions. Free shipping
            on orders over $300.
          </p>
        </div>

        {/* Featured product */}
        <Link
          href={`/shop/${featuredProduct.slug}`}
          className="block mb-20"
        >
          <ElitePlanCard
            layout="horizontal"
            imageUrl={featuredProduct.imageUrl}
            title={featuredProduct.name}
            subtitle={`Featured · ${featuredProduct.tagline}`}
            price={featuredProduct.sizes[0].price}
            description={featuredProduct.shortDescription}
          />
        </Link>

        {/* Grid of remaining products */}
        <div className="mb-24">
          <h3 className="text-xs uppercase tracking-[0.3em] text-white/50 mb-8">
            The Collection
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 justify-items-center">
            {otherProducts.map((p) => (
              <Link
                key={p.slug}
                href={`/shop/${p.slug}`}
                className="block w-full max-w-sm"
              >
                <ElitePlanCard
                  imageUrl={p.imageUrl}
                  title={p.name}
                  subtitle={p.tagline}
                  price={p.sizes[0].price}
                />
              </Link>
            ))}
          </div>
        </div>

        {/* Trust strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-10 border-y border-white/10 mb-24">
          {[
            {
              icon: <Droplet className="h-5 w-5" />,
              label: "Hand-Distilled",
              detail: "Slow copper alembic",
            },
            {
              icon: <Mountain className="h-5 w-5" />,
              label: "Single Origin",
              detail: "Traceable to source",
            },
            {
              icon: <Package className="h-5 w-5" />,
              label: "Free Shipping",
              detail: "On orders over $300",
            },
            {
              icon: <RotateCcw className="h-5 w-5" />,
              label: "Easy Returns",
              detail: "14 days, no questions",
            },
          ].map((item) => (
            <div
              key={item.label}
              className="flex flex-col items-center text-center gap-2 text-white"
            >
              <span className="text-white/70">{item.icon}</span>
              <p className="text-xs uppercase tracking-[0.2em] font-bold">
                {item.label}
              </p>
              <p className="text-[11px] text-white/50">{item.detail}</p>
            </div>
          ))}
        </div>

        {/* Why Fakhm Oud */}
        <div className="mb-16">
          <p className="text-xs uppercase tracking-[0.3em] text-white/50 mb-4">
            Why Fakhm Oud
          </p>
          <h2 className="text-4xl md:text-5xl font-bold uppercase leading-none mb-12 text-white max-w-3xl">
            Built on patience.
            <br />
            Bottled for memory.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
            <div>
              <p className="text-[10px] uppercase tracking-[0.3em] text-white/40 mb-3">
                01 — Purity
              </p>
              <h3 className="text-xl font-bold uppercase text-white mb-3 leading-tight">
                Single-origin, never reconstituted
              </h3>
              <p className="text-sm text-white/60 leading-relaxed">
                Every batch is traceable to the forest it came from. No blends,
                no synthetics, no shortcuts. What's in the bottle is what was
                in the wood.
              </p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-[0.3em] text-white/40 mb-3">
                02 — Heritage
              </p>
              <h3 className="text-xl font-bold uppercase text-white mb-3 leading-tight">
                Distilled by hand
              </h3>
              <p className="text-sm text-white/60 leading-relaxed">
                Traditional deg-bhapka — copper alembics, low heat, weeks of
                patience over yield. The same method our distillers learned
                from theirs.
              </p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-[0.3em] text-white/40 mb-3">
                03 — Craft
              </p>
              <h3 className="text-xl font-bold uppercase text-white mb-3 leading-tight">
                Aged seven years, minimum
              </h3>
              <p className="text-sm text-white/60 leading-relaxed">
                Pure oud cannot be rushed. Our wood rests in clay before
                distillation; the oil rests in glass before bottling. Small,
                numbered editions only.
              </p>
            </div>
          </div>
        </div>

        {/* Closing CTA */}
        <div className="text-center py-12 border-t border-white/10">
          <p className="text-xs uppercase tracking-[0.3em] text-white/50 mb-3">
            Not sure where to start?
          </p>
          <h3 className="text-2xl md:text-3xl font-bold uppercase text-white mb-6">
            Try the Discovery Set.
          </h3>
          <ButtonWithIcon href="/shop/discovery-set">
            Shop Discovery Set — $120
          </ButtonWithIcon>
        </div>
      </div>
    </section>
  );
}
