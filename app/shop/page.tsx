import Link from "next/link";
import { Clock, Sparkles, Package, RotateCcw } from "lucide-react";
import { ElitePlanCard } from "@/components/ui/elite-plan-card";
import ButtonWithIcon from "@/components/ui/button-with-icon";
import { Dirham, Price, PriceTag } from "@/components/ui/dirham";
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
            Oud-forward attars and bakhoor, blended to last. Free shipping on
            orders over <Dirham className="me-1" />200.
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
            price={
              <PriceTag
                cents={featuredProduct.priceCents}
                compareAtCents={featuredProduct.compareAtCents}
              />
            }
            volume={featuredProduct.volume}
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
                  price={
                    <PriceTag
                      cents={p.priceCents}
                      compareAtCents={p.compareAtCents}
                    />
                  }
                  volume={p.volume}
                />
              </Link>
            ))}
          </div>
        </div>

        {/* Trust strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-10 border-y border-white/10 mb-24">
          {[
            {
              icon: <Clock className="h-5 w-5" />,
              label: "Long-Lasting",
              detail: "Hours on the skin",
            },
            {
              icon: <Sparkles className="h-5 w-5" />,
              label: "Oud-Forward",
              detail: "Rich, authentic blends",
            },
            {
              icon: <Package className="h-5 w-5" />,
              label: "Free Shipping",
              detail: "On orders over 200 dirham",
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
            Sun, moon,
            <br />
            and daybreak.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
            <div>
              <p className="text-[10px] uppercase tracking-[0.3em] text-white/40 mb-3">
                01 — The Collection
              </p>
              <h3 className="text-xl font-bold uppercase text-white mb-3 leading-tight">
                Three signatures
              </h3>
              <p className="text-sm text-white/60 leading-relaxed">
                Shams, Qamr, and Falaq — named for the sun, the moon, and the
                break of dawn. Each its own mood, all built on oud.
              </p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-[0.3em] text-white/40 mb-3">
                02 — Made to Last
              </p>
              <h3 className="text-xl font-bold uppercase text-white mb-3 leading-tight">
                Concentrated &amp; rich
              </h3>
              <p className="text-sm text-white/60 leading-relaxed">
                Oud-forward attars that stay close to the skin and last through
                the day — a little goes a long way.
              </p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-[0.3em] text-white/40 mb-3">
                03 — Honestly Priced
              </p>
              <h3 className="text-xl font-bold uppercase text-white mb-3 leading-tight">
                Oud, without the markup
              </h3>
              <p className="text-sm text-white/60 leading-relaxed">
                Real oud character at a price that makes sense. Plus
                traditional bakhoor to scent your home.
              </p>
            </div>
          </div>
        </div>

        {/* Closing CTA */}
        <div className="text-center py-12 border-t border-white/10">
          <p className="text-xs uppercase tracking-[0.3em] text-white/50 mb-3">
            New to oud?
          </p>
          <h3 className="text-2xl md:text-3xl font-bold uppercase text-white mb-6">
            Start with Musk Rijali.
          </h3>
          <ButtonWithIcon href="/shop/musk-rijali">
            Shop Musk Rijali — <Price cents={4000} />
          </ButtonWithIcon>
        </div>
      </div>
    </section>
  );
}
