import Link from 'next/link';
import Image from 'next/image';
import Button from '@/components/ui/Button';
import ProductCard from '@/components/product/ProductCard';
import FadeUp from '@/components/ui/FadeUp';
import Marquee from '@/components/ui/Marquee';
import { getBestSellers } from '@/lib/products';
import collections from '@/config/collections.json';
import { ArrowRight, Shield, Truck, Lock, Medal, TrendingUp, MapPin } from 'lucide-react';

export default function HomePage() {
  const bestSellers = getBestSellers().slice(0, 4);
  const branches = collections.filter(c => c.type === 'branch');

  // Bento grid order: Army (large), Navy (wide), then Marines, Air Force, Coast Guard
  const branchOrder = ['army', 'navy', 'marines', 'air-force', 'coast-guard'];
  const sortedBranches = branchOrder
    .map(slug => branches.find(b => b.slug === slug))
    .filter(Boolean);

  const giftCategories = [
    { title: 'Retirement Gifts', desc: 'Honor years of dedicated service with apparel that tells their story.', icon: Medal, href: '/collections/retirement' },
    { title: 'Promotion Gifts', desc: 'Celebrate their next rank with custom gear they\'ll wear with pride.', icon: TrendingUp, href: '/collections/promotion' },
    { title: 'PCS Gifts', desc: 'A meaningful farewell for the next chapter of their journey.', icon: MapPin, href: '/collections/pcs-gifts' },
  ];

  return (
    <div>
      {/* ════════════════════════════════════════════════════════════════
          SECTION 1: HERO — Asymmetric Editorial Split
          ════════════════════════════════════════════════════════════════ */}
      <section className="relative min-h-[100dvh] bg-[var(--color-dark)] overflow-hidden">
        <div className="container mx-auto h-full">
          <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_1fr] min-h-[100dvh] items-center gap-0">
            {/* Left — Text Content */}
            <div className="relative z-10 py-24 lg:py-0 lg:pr-16 xl:pr-24">
              <FadeUp delay={100}>
                <div className="flex items-center gap-3 mb-8">
                  <div className="h-px w-8 bg-[var(--color-gold)]" />
                  <span className="text-[11px] tracking-[0.15em] uppercase font-semibold text-[var(--color-gold)]">
                    Military Apparel & Gifts
                  </span>
                </div>
              </FadeUp>

              <FadeUp delay={200}>
                <h1 className="font-display text-[clamp(2.75rem,6vw,6.5rem)] font-bold leading-[0.92] tracking-[-0.02em] text-white mb-8">
                  Premium Apparel<br />
                  <span className="text-white/60">for Those Who</span><br />
                  Serve
                </h1>
              </FadeUp>

              <FadeUp delay={350}>
                <p className="text-lg md:text-xl text-white/50 max-w-md leading-relaxed mb-10">
                  Celebrate service with custom apparel for every branch, milestone, and moment.
                </p>
              </FadeUp>

              <FadeUp delay={450}>
                <div className="flex flex-col sm:flex-row gap-5 mb-10">
                  <Link href="/collections/all">
                    <span className="group/btn relative inline-flex items-center justify-center overflow-hidden w-full sm:w-auto">
                      <span className="absolute inset-0 bg-gradient-to-r from-[var(--color-gold)] via-[#E8C84A] to-[var(--color-gold)] rounded-none" />
                      <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover/btn:translate-x-[200%] transition-transform duration-700 ease-out" />
                      <span className="relative inline-flex items-center justify-center px-10 py-4 text-[13px] tracking-[0.18em] uppercase font-bold text-[var(--color-dark)] transition-all duration-300 group-hover/btn:-translate-y-[1px]">
                        Shop Collection
                        <ArrowRight className="ml-3 h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
                      </span>
                    </span>
                  </Link>
                  <Link href="/collections/all">
                    <span className="group/btn relative inline-flex items-center justify-center w-full sm:w-auto">
                      <span className="absolute inset-0 border border-[var(--color-gold)]/40 rounded-none" />
                      <span className="absolute inset-0 border border-[var(--color-gold)] rounded-none opacity-0 group-hover/btn:opacity-100 transition-opacity duration-500" />
                      <span className="relative inline-flex items-center justify-center px-10 py-4 text-[13px] tracking-[0.18em] uppercase font-bold text-[var(--color-gold)] transition-all duration-300 group-hover/btn:text-white group-hover/btn:-translate-y-[1px]">
                        Our Story
                      </span>
                    </span>
                  </Link>
                </div>
              </FadeUp>

              <FadeUp delay={550}>
                <div className="flex items-center gap-6 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-gold)]" />
                    <span className="text-white/45">10K+ orders shipped</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-gold)]" />
                    <span className="text-white/45">Ships in 5-7 days</span>
                  </div>
                </div>
              </FadeUp>
            </div>

            {/* Right — Hero Image */}
            <div className="relative hidden lg:block h-full min-h-[100dvh]">
              <div className="absolute inset-0 -right-12 xl:-right-24">
                <Image
                  src="/images/hero/hero-military.png"
                  alt="Premium military apparel"
                  fill
                  className="object-cover object-center"
                  priority
                />
                {/* Subtle left edge blend */}
                <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[var(--color-dark)] to-transparent" />
              </div>
            </div>

            {/* Mobile hero image (behind text) */}
            <div className="absolute inset-0 lg:hidden opacity-20">
              <Image
                src="/images/hero/hero-military.png"
                alt=""
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════
          SECTION 2: TRUST BAR — Scrolling Marquee
          ════════════════════════════════════════════════════════════════ */}
      <section className="border-y border-[var(--color-light-gray)] bg-white py-4">
        <Marquee speed={40}>
          {[
            { icon: Shield, label: 'Premium Quality' },
            { icon: Truck, label: 'Fast Shipping' },
            { icon: Lock, label: 'Secure Checkout' },
            { icon: Shield, label: 'Veteran Owned' },
            { icon: Truck, label: 'Free Shipping Over $75' },
            { icon: Lock, label: 'Easy Returns' },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-2.5 mx-8 md:mx-12">
              <item.icon className="h-3.5 w-3.5 text-[var(--color-military-olive)]" />
              <span className="text-[12px] tracking-[0.06em] uppercase font-medium text-[var(--color-muted)]">
                {item.label}
              </span>
            </div>
          ))}
        </Marquee>
      </section>

      {/* ════════════════════════════════════════════════════════════════
          SECTION 3: SHOP BY BRANCH — Asymmetric Bento Grid
          ════════════════════════════════════════════════════════════════ */}
      <section className="py-20 md:py-28 bg-white">
        <div className="container mx-auto">
          <FadeUp>
            <div className="flex items-end justify-between mb-10 md:mb-14">
              <div>
                <span className="text-[11px] tracking-[0.15em] uppercase font-semibold text-[var(--color-muted)] block mb-3">Collections</span>
                <h2 className="font-display text-3xl md:text-5xl font-bold text-[var(--color-dark)] tracking-[-0.02em]">
                  Shop by Branch
                </h2>
              </div>
              <Link
                href="/collections/all"
                className="hidden md:flex items-center gap-2 text-sm font-medium text-[var(--color-military-olive)] hover:text-[var(--color-gold)] transition-colors duration-200 group"
              >
                View All
                <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
              </Link>
            </div>
          </FadeUp>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-3 md:gap-4 auto-rows-[160px] md:auto-rows-[180px]">
            {sortedBranches.map((branch, index) => {
              if (!branch) return null;

              return (
                <FadeUp key={branch.id} delay={index * 80}>
                  <Link
                    href={`/collections/${branch.slug}`}
                    className="group relative overflow-hidden rounded-sm block h-full"
                  >
                    <div className="absolute inset-0">
                      <Image
                        src={branch.image}
                        alt={branch.name}
                        fill
                        className="object-cover transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                    </div>
                    <div className="absolute inset-0 flex items-end p-5 md:p-6">
                      <div className="flex items-center justify-between w-full">
                        <h3 className="font-display text-base md:text-lg font-bold text-white tracking-[-0.01em]">
                          {branch.name}
                        </h3>
                        <ArrowRight className="h-4 w-4 text-white/50 group-hover:text-white group-hover:translate-x-1 transition-all duration-300" />
                      </div>
                    </div>
                  </Link>
                </FadeUp>
              );
            })}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════
          SECTION 4: BEST SELLERS — Editorial Product Showcase
          ════════════════════════════════════════════════════════════════ */}
      <section className="py-20 md:py-28 bg-[var(--color-gray-bg)]">
        <div className="container mx-auto">
          <FadeUp>
            <div className="flex items-end justify-between mb-10 md:mb-14">
              <div>
                <span className="text-[11px] tracking-[0.15em] uppercase font-semibold text-[var(--color-muted)] block mb-3">Most Popular</span>
                <h2 className="font-display text-3xl md:text-5xl font-bold text-[var(--color-dark)] tracking-[-0.02em]">
                  Best Sellers
                </h2>
              </div>
              <Link
                href="/shop?sort=bestsellers"
                className="hidden md:flex items-center gap-2 text-sm font-medium text-[var(--color-military-olive)] hover:text-[var(--color-gold)] transition-colors duration-200 group"
              >
                View All
                <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
              </Link>
            </div>
          </FadeUp>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {bestSellers.map((product, index) => (
              <FadeUp key={product.id} delay={index * 100}>
                <ProductCard product={product} showQuickAdd={false} minimal />
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════
          SECTION 5: GIFTING — Premium Editorial Cards
          ════════════════════════════════════════════════════════════════ */}
      <section className="py-24 md:py-32 bg-[var(--color-dark)] relative overflow-hidden">
        {/* Subtle background texture */}
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} />

        <div className="container mx-auto relative z-10">
          <FadeUp>
            <div className="text-center mb-14 md:mb-20">
              <div className="flex items-center justify-center gap-4 mb-6">
                <div className="h-px w-12 bg-gradient-to-r from-transparent to-[var(--color-gold)]/60" />
                <span className="text-[11px] tracking-[0.2em] uppercase font-semibold text-[var(--color-gold)]">
                  Gift Ideas
                </span>
                <div className="h-px w-12 bg-gradient-to-l from-transparent to-[var(--color-gold)]/60" />
              </div>
              <h2 className="font-display text-4xl md:text-6xl font-bold text-white tracking-[-0.02em] mb-4">
                Perfect for Gifting
              </h2>
              <p className="text-white/50 text-lg max-w-lg mx-auto">
                Meaningful apparel for the milestones that matter most.
              </p>
            </div>
          </FadeUp>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
            {giftCategories.map((gift, index) => (
              <FadeUp key={gift.title} delay={index * 120}>
                <Link
                  href={gift.href}
                  className="group relative block overflow-hidden rounded-sm bg-[var(--color-charcoal)] border border-white/[0.06] hover:border-[var(--color-gold)]/30 transition-all duration-500 ease-[var(--ease-spring)] hover:-translate-y-1"
                >
                  {/* Placeholder image area */}
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <div className={`absolute inset-0 ${
                      index === 0
                        ? 'bg-gradient-to-br from-[#4A5240] via-[#3A4230] to-[#2A3220]'
                        : index === 1
                          ? 'bg-gradient-to-br from-[#3D4A5A] via-[#2D3A4A] to-[#1D2A3A]'
                          : 'bg-gradient-to-br from-[#5A4A3A] via-[#4A3A2A] to-[#3A2A1A]'
                    }`} />
                    {/* Decorative overlay pattern */}
                    <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'linear-gradient(135deg, transparent 25%, rgba(255,255,255,0.05) 25%, rgba(255,255,255,0.05) 50%, transparent 50%, transparent 75%, rgba(255,255,255,0.05) 75%)', backgroundSize: '60px 60px' }} />
                    {/* Icon centered */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-20 h-20 rounded-full bg-white/[0.08] backdrop-blur-sm flex items-center justify-center border border-white/[0.08] group-hover:scale-110 transition-transform duration-500">
                        <gift.icon className="h-8 w-8 text-[var(--color-gold)]/80" />
                      </div>
                    </div>
                    {/* Bottom gradient fade */}
                    <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[var(--color-charcoal)] to-transparent" />
                  </div>

                  {/* Text content */}
                  <div className="p-6 md:p-7 pt-2">
                    <h3 className="font-display text-lg md:text-xl font-bold text-white mb-2 tracking-[-0.01em] group-hover:text-[var(--color-gold)] transition-colors duration-300">
                      {gift.title}
                    </h3>
                    <p className="text-sm text-white/50 leading-relaxed mb-5">
                      {gift.desc}
                    </p>
                    <div className="flex items-center gap-2">
                      <span className="text-[12px] tracking-[0.15em] uppercase font-semibold text-[var(--color-gold)]/70 group-hover:text-[var(--color-gold)] transition-colors duration-300">
                        Shop Now
                      </span>
                      <ArrowRight className="h-3.5 w-3.5 text-[var(--color-gold)]/70 group-hover:text-[var(--color-gold)] transition-all duration-300 ease-[var(--ease-spring)] group-hover:translate-x-1.5" />
                    </div>
                  </div>
                </Link>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
