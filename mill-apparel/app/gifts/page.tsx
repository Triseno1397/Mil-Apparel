import Link from 'next/link';
import ProductCard from '@/components/product/ProductCard';
import FadeUp from '@/components/ui/FadeUp';
import { getBestSellers } from '@/lib/products';
import { ArrowRight, Gift, Heart, Star, Medal, TrendingUp, MapPin, Package, Pen } from 'lucide-react';

const giftCategories = [
    {
        title: 'Retirement Gifts',
        slug: 'retirement',
        icon: Medal,
        description: 'Honor 20+ years of sacrifice with something they\'ll treasure forever. From personalized gear to display-worthy keepsakes.',
        gradient: 'from-amber-900 via-amber-800 to-yellow-700',
        accent: 'border-l-amber-600',
        cta: 'Shop Retirement',
    },
    {
        title: 'Promotion Gifts',
        slug: 'promotion',
        icon: TrendingUp,
        description: 'Rank up in style. Celebrate that hard-earned promotion with premium apparel and accessories that show the achievement.',
        gradient: 'from-[#1a2634] via-[var(--color-military-olive)] to-[#3d4a2e]',
        accent: 'border-l-[var(--color-military-olive)]',
        cta: 'Shop Promotions',
    },
    {
        title: 'PCS Gifts',
        slug: 'pcs',
        icon: MapPin,
        description: 'Moving on to the next duty station? Send them off right with a farewell gift they\'ll carry to every new post.',
        gradient: 'from-slate-800 via-slate-700 to-slate-600',
        accent: 'border-l-slate-500',
        cta: 'Shop PCS',
    },
];

const whyUs = [
    { icon: Heart, title: 'Made for the Community', desc: 'Designed by people who understand military life — not just apparel brands.' },
    { icon: Star, title: 'Premium Quality', desc: 'Heavyweight fabrics, sharp embroidery, and prints that hold up through the wash.' },
    { icon: Gift, title: 'Gift-Ready Packaging', desc: 'Add gift wrapping and a personal note at checkout for just $5.' },
];

export default function GiftsPage() {
    const featured = getBestSellers().slice(0, 4);

    return (
        <div className="bg-white min-h-screen">
            {/* ════════════════════════════════════════════════════════════════
                HERO — Cinematic, Editorial Opening
                ════════════════════════════════════════════════════════════════ */}
            <section className="relative bg-[var(--color-dark)] text-white py-32 md:py-44 overflow-hidden">
                {/* Subtle dot pattern texture */}
                <div
                    className="absolute inset-0 opacity-[0.03]"
                    style={{
                        backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
                        backgroundSize: '40px 40px',
                    }}
                />
                {/* Radial glow accent */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-[var(--color-military-olive)] opacity-[0.06] blur-[120px] rounded-full" />

                <div className="container mx-auto px-4 relative z-10 max-w-7xl">
                    <FadeUp delay={100}>
                        <div className="flex items-center gap-3 mb-8">
                            <div className="h-px w-10 bg-gradient-to-r from-[var(--color-gold)] to-[var(--color-gold)]/40" />
                            <span className="text-[11px] tracking-[0.2em] uppercase font-semibold text-[var(--color-gold)]">
                                Military Gift Guide
                            </span>
                        </div>
                    </FadeUp>

                    <FadeUp delay={200}>
                        <h1 className="font-display text-[clamp(2.75rem,6vw,6.5rem)] font-bold leading-[0.92] tracking-[-0.02em] mb-8">
                            The Perfect Gift<br />
                            <span className="text-white/50">for Those Who</span><br />
                            Serve
                        </h1>
                    </FadeUp>

                    <FadeUp delay={350}>
                        <p className="text-lg md:text-xl text-white/45 max-w-lg leading-relaxed mb-12">
                            Retirement, promotion, PCS, or just because — find premium military apparel for every milestone worth honoring.
                        </p>
                    </FadeUp>

                    <FadeUp delay={450}>
                        <div className="flex flex-col sm:flex-row gap-5 mb-12">
                            <Link href="/shop">
                                <span className="group/btn relative inline-flex items-center justify-center overflow-hidden w-full sm:w-auto">
                                    <span className="absolute inset-0 bg-gradient-to-r from-[var(--color-gold)] via-[#E8C84A] to-[var(--color-gold)]" />
                                    <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover/btn:translate-x-[200%] transition-transform duration-700 ease-out" />
                                    <span className="relative inline-flex items-center justify-center px-10 py-4 text-[13px] tracking-[0.18em] uppercase font-bold text-[var(--color-dark)] transition-all duration-300 group-hover/btn:-translate-y-[1px]">
                                        Browse All Gifts
                                        <ArrowRight className="ml-3 h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
                                    </span>
                                </span>
                            </Link>
                            <Link href="#occasions">
                                <span className="group/btn relative inline-flex items-center justify-center w-full sm:w-auto">
                                    <span className="absolute inset-0 border border-[var(--color-gold)]/40" />
                                    <span className="absolute inset-0 border border-[var(--color-gold)] opacity-0 group-hover/btn:opacity-100 transition-opacity duration-500" />
                                    <span className="relative inline-flex items-center justify-center px-10 py-4 text-[13px] tracking-[0.18em] uppercase font-bold text-[var(--color-gold)] transition-all duration-300 group-hover/btn:text-white group-hover/btn:-translate-y-[1px]">
                                        Shop by Occasion
                                    </span>
                                </span>
                            </Link>
                        </div>
                    </FadeUp>

                    <FadeUp delay={550}>
                        <div className="flex items-center gap-6 text-sm">
                            <div className="flex items-center gap-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-gold)]" />
                                <span className="text-white/40">Gift wrapping available</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-gold)]" />
                                <span className="text-white/40">Personal notes included</span>
                            </div>
                            <div className="hidden sm:flex items-center gap-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-gold)]" />
                                <span className="text-white/40">Ships in 5-7 days</span>
                            </div>
                        </div>
                    </FadeUp>
                </div>
            </section>

            {/* ════════════════════════════════════════════════════════════════
                GIFT CATEGORIES — Immersive Occasion Cards
                ════════════════════════════════════════════════════════════════ */}
            <section id="occasions" className="py-24 md:py-32 bg-[var(--color-gray-bg)]">
                <div className="container mx-auto px-4 max-w-7xl">
                    <FadeUp>
                        <div className="text-center mb-16 md:mb-20">
                            <span className="text-[11px] tracking-[0.2em] uppercase font-semibold text-[var(--color-muted)] block mb-4">
                                Curated Collections
                            </span>
                            <h2 className="font-display text-[clamp(2rem,4vw,3.5rem)] font-bold text-[var(--color-dark)] tracking-[-0.02em] mb-4">
                                Shop by Occasion
                            </h2>
                            <p className="text-[var(--color-muted)] text-lg max-w-md mx-auto">
                                The right gift for every military milestone.
                            </p>
                        </div>
                    </FadeUp>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
                        {giftCategories.map((cat, index) => {
                            const CatIcon = cat.icon;
                            return (
                                <FadeUp key={cat.slug} delay={index * 120}>
                                    <Link
                                        href={`/collections/${cat.slug}`}
                                        className="group relative block overflow-hidden rounded-sm"
                                    >
                                        {/* Card with gradient background */}
                                        <div className={`relative bg-gradient-to-br ${cat.gradient} aspect-[3/4] flex flex-col justify-end`}>
                                            {/* Diagonal stripe pattern overlay */}
                                            <div
                                                className="absolute inset-0 opacity-[0.06]"
                                                style={{
                                                    backgroundImage: 'linear-gradient(135deg, transparent 25%, rgba(255,255,255,0.08) 25%, rgba(255,255,255,0.08) 50%, transparent 50%, transparent 75%, rgba(255,255,255,0.08) 75%)',
                                                    backgroundSize: '60px 60px',
                                                }}
                                            />

                                            {/* Floating icon */}
                                            <div className="absolute top-8 right-8">
                                                <div className="w-16 h-16 rounded-full bg-white/[0.08] backdrop-blur-sm flex items-center justify-center border border-white/[0.08] group-hover:scale-110 group-hover:bg-white/[0.12] transition-all duration-500 ease-[var(--ease-spring)]">
                                                    <CatIcon className="h-7 w-7 text-white/70" />
                                                </div>
                                            </div>

                                            {/* Bottom gradient for text legibility */}
                                            <div className="absolute inset-x-0 bottom-0 h-3/5 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />

                                            {/* Text content */}
                                            <div className="relative z-10 p-8 md:p-9">
                                                <h3 className="font-display text-2xl md:text-[1.75rem] font-bold text-white mb-3 tracking-[-0.01em] group-hover:text-[var(--color-gold)] transition-colors duration-300">
                                                    {cat.title}
                                                </h3>
                                                <p className="text-white/65 text-sm leading-relaxed mb-6 max-w-[28ch]">
                                                    {cat.description}
                                                </p>
                                                <div className="flex items-center gap-2">
                                                    <span className="text-[12px] tracking-[0.15em] uppercase font-semibold text-[var(--color-gold)]/80 group-hover:text-[var(--color-gold)] transition-colors duration-300">
                                                        {cat.cta}
                                                    </span>
                                                    <ArrowRight className="h-3.5 w-3.5 text-[var(--color-gold)]/80 group-hover:text-[var(--color-gold)] group-hover:translate-x-1.5 transition-all duration-300 ease-[var(--ease-spring)]" />
                                                </div>
                                            </div>
                                        </div>

                                        {/* Gold accent border on hover */}
                                        <div className="absolute inset-0 border border-transparent group-hover:border-[var(--color-gold)]/20 rounded-sm transition-colors duration-500" />
                                    </Link>
                                </FadeUp>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* ════════════════════════════════════════════════════════════════
                GIFT WRAPPING — Premium Split CTA
                ════════════════════════════════════════════════════════════════ */}
            <section className="relative bg-[var(--color-dark)] overflow-hidden">
                {/* Dot pattern texture */}
                <div
                    className="absolute inset-0 opacity-[0.03]"
                    style={{
                        backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
                        backgroundSize: '40px 40px',
                    }}
                />

                <div className="container mx-auto px-4 max-w-7xl relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 items-center">
                        {/* Left — Editorial content */}
                        <div className="py-20 md:py-28 lg:pr-20">
                            <FadeUp>
                                <div className="flex items-center gap-3 mb-8">
                                    <div className="h-px w-10 bg-gradient-to-r from-[var(--color-gold)] to-[var(--color-gold)]/40" />
                                    <span className="text-[11px] tracking-[0.2em] uppercase font-semibold text-[var(--color-gold)]">
                                        The Finishing Touch
                                    </span>
                                </div>
                            </FadeUp>

                            <FadeUp delay={100}>
                                <h2 className="font-display text-[clamp(2rem,4vw,3.5rem)] font-bold text-white tracking-[-0.02em] leading-[1.05] mb-6">
                                    Gift Wrapping &<br />
                                    <span className="text-white/50">Personal Notes</span>
                                </h2>
                            </FadeUp>

                            <FadeUp delay={200}>
                                <p className="text-white/45 text-lg leading-relaxed mb-10 max-w-md">
                                    Every order can be wrapped in our signature packaging with a handwritten-style personal note. Because the presentation should match the sentiment.
                                </p>
                            </FadeUp>

                            <FadeUp delay={300}>
                                <div className="flex flex-col sm:flex-row gap-8 mb-10">
                                    <div className="flex items-start gap-4">
                                        <div className="w-10 h-10 rounded-full bg-[var(--color-gold)]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                                            <Package className="h-4.5 w-4.5 text-[var(--color-gold)]" />
                                        </div>
                                        <div>
                                            <p className="text-white font-semibold text-sm mb-1">Premium Wrapping</p>
                                            <p className="text-white/40 text-sm leading-relaxed">Matte black box with<br />gold foil seal</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-4">
                                        <div className="w-10 h-10 rounded-full bg-[var(--color-gold)]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                                            <Pen className="h-4.5 w-4.5 text-[var(--color-gold)]" />
                                        </div>
                                        <div>
                                            <p className="text-white font-semibold text-sm mb-1">Personal Message</p>
                                            <p className="text-white/40 text-sm leading-relaxed">Custom note card<br />included free</p>
                                        </div>
                                    </div>
                                </div>
                            </FadeUp>

                            <FadeUp delay={400}>
                                <Link href="/shop">
                                    <span className="group/btn relative inline-flex items-center justify-center overflow-hidden">
                                        <span className="absolute inset-0 border border-[var(--color-gold)]/40" />
                                        <span className="absolute inset-0 border border-[var(--color-gold)] opacity-0 group-hover/btn:opacity-100 transition-opacity duration-500" />
                                        <span className="relative inline-flex items-center justify-center px-10 py-4 text-[13px] tracking-[0.18em] uppercase font-bold text-[var(--color-gold)] transition-all duration-300 group-hover/btn:text-white group-hover/btn:-translate-y-[1px]">
                                            Add to Any Order
                                            <ArrowRight className="ml-3 h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
                                        </span>
                                    </span>
                                </Link>
                            </FadeUp>
                        </div>

                        {/* Right — Visual accent block */}
                        <div className="hidden lg:flex items-center justify-center py-20 md:py-28">
                            <FadeUp delay={200}>
                                <div className="relative">
                                    {/* Decorative layered squares */}
                                    <div className="w-72 h-80 bg-[var(--color-charcoal)] border border-white/[0.06] rounded-sm" />
                                    <div className="absolute -top-4 -left-4 w-72 h-80 border border-[var(--color-gold)]/20 rounded-sm" />
                                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
                                        <Gift className="h-12 w-12 text-[var(--color-gold)]/40 mx-auto mb-4" />
                                        <p className="font-display text-2xl font-bold text-white/80 mb-2">Just $5</p>
                                        <p className="text-white/30 text-sm">per gift-wrapped item</p>
                                    </div>
                                </div>
                            </FadeUp>
                        </div>
                    </div>
                </div>
            </section>

            {/* ════════════════════════════════════════════════════════════════
                WHY MIL APPAREL — Editorial Trust Section
                ════════════════════════════════════════════════════════════════ */}
            <section className="py-24 md:py-32 bg-white relative overflow-hidden">
                {/* Subtle radial glow */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-[var(--color-gold)] opacity-[0.03] blur-[100px] rounded-full" />

                <div className="container mx-auto px-4 max-w-6xl relative z-10">
                    <FadeUp>
                        <div className="text-center mb-16 md:mb-20">
                            <div className="flex items-center justify-center gap-4 mb-6">
                                <div className="h-px w-12 bg-gradient-to-r from-transparent to-[var(--color-light-gray)]" />
                                <span className="text-[11px] tracking-[0.2em] uppercase font-semibold text-[var(--color-muted)]">
                                    The Mil Apparel Difference
                                </span>
                                <div className="h-px w-12 bg-gradient-to-l from-transparent to-[var(--color-light-gray)]" />
                            </div>
                            <h2 className="font-display text-[clamp(2rem,4vw,3.5rem)] font-bold text-[var(--color-dark)] tracking-[-0.02em]">
                                Why Mil Apparel?
                            </h2>
                        </div>
                    </FadeUp>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-0 md:divide-x md:divide-[var(--color-light-gray)]">
                        {whyUs.map(({ icon: Icon, title, desc }, index) => (
                            <FadeUp key={title} delay={index * 120}>
                                <div className="text-center px-8 md:px-10 py-8 md:py-4 group">
                                    <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-[var(--color-gray-bg)] border border-[var(--color-light-gray)] mb-6 group-hover:border-[var(--color-gold)]/40 group-hover:bg-[var(--color-gold)]/5 transition-all duration-500">
                                        <Icon className="h-6 w-6 text-[var(--color-military-olive)] group-hover:text-[var(--color-gold)] transition-colors duration-500" />
                                    </div>
                                    <h3 className="font-display text-lg font-bold text-[var(--color-dark)] mb-3 tracking-[-0.01em]">
                                        {title}
                                    </h3>
                                    <p className="text-[var(--color-muted)] text-sm leading-relaxed max-w-[26ch] mx-auto">
                                        {desc}
                                    </p>
                                </div>
                            </FadeUp>
                        ))}
                    </div>
                </div>
            </section>

            {/* ════════════════════════════════════════════════════════════════
                FEATURED PRODUCTS — Editorial Product Showcase
                ════════════════════════════════════════════════════════════════ */}
            <section className="py-24 md:py-32 bg-[var(--color-gray-bg)]">
                <div className="container mx-auto px-4 max-w-7xl">
                    <FadeUp>
                        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 md:mb-16">
                            <div>
                                <span className="text-[11px] tracking-[0.2em] uppercase font-semibold text-[var(--color-muted)] block mb-3">
                                    Most Gifted
                                </span>
                                <h2 className="font-display text-[clamp(2rem,4vw,3.5rem)] font-bold text-[var(--color-dark)] tracking-[-0.02em] mb-3">
                                    Fan Favorites
                                </h2>
                                <p className="text-[var(--color-muted)] text-base max-w-md">
                                    Our most-loved items — and the ones people keep coming back to gift again.
                                </p>
                            </div>
                            <Link
                                href="/shop"
                                className="hidden md:flex items-center gap-2 text-sm font-medium text-[var(--color-military-olive)] hover:text-[var(--color-gold)] transition-colors duration-200 group mt-4 md:mt-0"
                            >
                                View All
                                <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                            </Link>
                        </div>
                    </FadeUp>

                    {/* Testimonial accent */}
                    <FadeUp delay={50}>
                        <div className="mb-12 md:mb-14 pl-6 border-l-2 border-[var(--color-gold)]/30 max-w-xl">
                            <p className="font-display text-lg md:text-xl text-[var(--color-dark)]/70 italic leading-relaxed">
                                &ldquo;Got this for my husband&apos;s retirement — he hasn&apos;t taken it off since.&rdquo;
                            </p>
                            <p className="text-sm text-[var(--color-muted)] mt-3">— Verified Buyer</p>
                        </div>
                    </FadeUp>

                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                        {featured.map((product, index) => (
                            <FadeUp key={product.id} delay={index * 100}>
                                <ProductCard product={product} />
                            </FadeUp>
                        ))}
                    </div>

                    {/* Mobile view all link */}
                    <FadeUp delay={500}>
                        <div className="flex justify-center mt-10 md:hidden">
                            <Link
                                href="/shop"
                                className="inline-flex items-center gap-2 text-sm font-medium text-[var(--color-military-olive)] hover:text-[var(--color-gold)] transition-colors duration-200 group"
                            >
                                View All Products
                                <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                            </Link>
                        </div>
                    </FadeUp>
                </div>
            </section>

            {/* ════════════════════════════════════════════════════════════════
                CLOSING CTA — Cinematic Final Section
                ════════════════════════════════════════════════════════════════ */}
            <section className="relative py-28 md:py-40 bg-[var(--color-dark)] overflow-hidden">
                {/* Dot pattern */}
                <div
                    className="absolute inset-0 opacity-[0.03]"
                    style={{
                        backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
                        backgroundSize: '40px 40px',
                    }}
                />
                {/* Radial gold glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-[var(--color-gold)] opacity-[0.04] blur-[120px] rounded-full" />

                <div className="container mx-auto px-4 max-w-4xl relative z-10 text-center">
                    <FadeUp>
                        <div className="flex items-center justify-center gap-4 mb-8">
                            <div className="h-px w-12 bg-gradient-to-r from-transparent to-[var(--color-gold)]/50" />
                            <Gift className="h-5 w-5 text-[var(--color-gold)]/60" />
                            <div className="h-px w-12 bg-gradient-to-l from-transparent to-[var(--color-gold)]/50" />
                        </div>
                    </FadeUp>

                    <FadeUp delay={100}>
                        <h2 className="font-display text-[clamp(2rem,5vw,4rem)] font-bold text-white tracking-[-0.02em] leading-[1.05] mb-6">
                            Honor Their Service.<br />
                            <span className="text-white/40">Make It Personal.</span>
                        </h2>
                    </FadeUp>

                    <FadeUp delay={200}>
                        <p className="text-white/40 text-lg max-w-lg mx-auto mb-12 leading-relaxed">
                            From first enlistment to final salute — find something that speaks to the journey.
                        </p>
                    </FadeUp>

                    <FadeUp delay={300}>
                        <div className="flex flex-col sm:flex-row gap-5 justify-center">
                            <Link href="/shop">
                                <span className="group/btn relative inline-flex items-center justify-center overflow-hidden w-full sm:w-auto">
                                    <span className="absolute inset-0 bg-gradient-to-r from-[var(--color-gold)] via-[#E8C84A] to-[var(--color-gold)]" />
                                    <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover/btn:translate-x-[200%] transition-transform duration-700 ease-out" />
                                    <span className="relative inline-flex items-center justify-center px-10 py-4 text-[13px] tracking-[0.18em] uppercase font-bold text-[var(--color-dark)] transition-all duration-300 group-hover/btn:-translate-y-[1px]">
                                        Shop All Gifts
                                        <ArrowRight className="ml-3 h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
                                    </span>
                                </span>
                            </Link>
                            <Link href="/customize">
                                <span className="group/btn relative inline-flex items-center justify-center w-full sm:w-auto">
                                    <span className="absolute inset-0 border border-white/20" />
                                    <span className="absolute inset-0 border border-white/40 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-500" />
                                    <span className="relative inline-flex items-center justify-center px-10 py-4 text-[13px] tracking-[0.18em] uppercase font-bold text-white/70 transition-all duration-300 group-hover/btn:text-white group-hover/btn:-translate-y-[1px]">
                                        Customize a Gift
                                    </span>
                                </span>
                            </Link>
                        </div>
                    </FadeUp>
                </div>
            </section>
        </div>
    );
}
