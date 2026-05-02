import Image from 'next/image';
import Link from 'next/link';
import collectionsData from '@/config/collections.json';
import { ArrowRight, Medal, TrendingUp, MapPin } from 'lucide-react';

export default function AllCollectionsPage() {
    const branches = collectionsData.filter(c => c.type === 'branch');
    const roles = collectionsData.filter(c => c.type === 'role');
    const gifts = collectionsData.filter(c => c.type === 'gift');

    const giftMeta: Record<string, { icon: typeof Medal; gradient: string }> = {
        retirement: { icon: Medal, gradient: 'from-amber-900 to-amber-700' },
        promotion: { icon: TrendingUp, gradient: 'from-[var(--color-dark)] to-[var(--color-military-olive)]' },
        pcs: { icon: MapPin, gradient: 'from-slate-800 to-slate-600' },
    };

    return (
        <div className="bg-white min-h-[100dvh]">
            {/* Header */}
            <div className="bg-white border-b border-[var(--color-light-gray)]">
                <div className="container mx-auto py-14 md:py-20">
                    <span className="text-[11px] tracking-[0.15em] uppercase font-semibold text-[var(--color-muted)] block mb-3">
                        Collections
                    </span>
                    <h1 className="font-display text-4xl md:text-5xl font-bold text-[var(--color-dark)] tracking-[-0.02em] mb-3">
                        Shop by Collection
                    </h1>
                    <p className="text-lg text-[var(--color-muted)] max-w-2xl">
                        Explore military apparel organized by branch, specialty, and occasion.
                    </p>
                </div>
            </div>

            {/* Shop by Branch */}
            <section className="py-16 md:py-20 bg-white">
                <div className="container mx-auto">
                    <div className="flex items-end justify-between mb-10">
                        <div>
                            <h2 className="font-display text-2xl md:text-3xl font-bold text-[var(--color-dark)] tracking-[-0.02em]">
                                Shop by Branch
                            </h2>
                            <p className="text-[var(--color-muted)] text-sm mt-2">Apparel built for every branch of service.</p>
                        </div>
                        <Link href="/shop" className="hidden md:flex items-center gap-2 text-sm font-medium text-[var(--color-military-olive)] hover:text-[var(--color-gold)] transition-colors duration-200 group">
                            Shop All <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
                        </Link>
                    </div>

                    <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 md:gap-4">
                        {branches.map((branch) => (
                            <Link
                                key={branch.id}
                                href={`/collections/${branch.slug}`}
                                className="group relative aspect-square overflow-hidden rounded-sm"
                            >
                                <div className="absolute inset-0">
                                    <Image
                                        src={branch.image}
                                        alt={branch.name}
                                        fill
                                        className="object-cover transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                                </div>
                                <div className="absolute inset-0 flex items-end p-4 md:p-5">
                                    <h3 className="font-display text-base md:text-lg font-bold text-white">
                                        {branch.name}
                                    </h3>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Shop by Specialty */}
            <section className="py-16 md:py-20 bg-[var(--color-gray-bg)]">
                <div className="container mx-auto">
                    <div className="mb-10">
                        <h2 className="font-display text-2xl md:text-3xl font-bold text-[var(--color-dark)] tracking-[-0.02em]">
                            Shop by Specialty
                        </h2>
                        <p className="text-[var(--color-muted)] text-sm mt-2">Gear that honors your MOS, rate, or AFSC.</p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
                        {roles.map((role) => (
                            <Link
                                key={role.id}
                                href={`/collections/${role.slug}`}
                                className="group flex flex-col bg-white ring-1 ring-black/5 hover:ring-[var(--color-military-olive)]/20 rounded-sm overflow-hidden transition-all duration-300"
                            >
                                {role.image && (
                                    <div className="relative h-36 overflow-hidden">
                                        <Image
                                            src={role.image}
                                            alt={role.name}
                                            fill
                                            className="object-cover transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-105"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                                    </div>
                                )}
                                <div className="p-4">
                                    <h3 className="font-display text-sm font-semibold text-[var(--color-dark)] group-hover:text-[var(--color-military-olive)] transition-colors duration-200">
                                        {role.name}
                                    </h3>
                                    <p className="text-xs text-[var(--color-muted)] mt-1 line-clamp-2">
                                        {role.description}
                                    </p>
                                    <div className="flex items-center gap-1 mt-3 text-[var(--color-military-olive)] group-hover:text-[var(--color-gold)] transition-colors duration-200">
                                        <span className="text-xs font-semibold">Shop Now</span>
                                        <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform duration-200" />
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Gift Collections */}
            <section className="py-16 md:py-20 bg-white">
                <div className="container mx-auto">
                    <div className="mb-10">
                        <h2 className="font-display text-2xl md:text-3xl font-bold text-[var(--color-dark)] tracking-[-0.02em]">
                            Gift Collections
                        </h2>
                        <p className="text-[var(--color-muted)] text-sm mt-2">Hand-picked gear for every milestone.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
                        {gifts.map((gift) => {
                            const meta = giftMeta[gift.id] || { icon: Medal, gradient: 'from-slate-800 to-slate-600' };
                            const Icon = meta.icon;
                            return (
                                <Link
                                    key={gift.id}
                                    href={`/collections/${gift.slug}`}
                                    className={`group relative h-52 rounded-sm overflow-hidden bg-gradient-to-br ${meta.gradient} flex items-end p-7 hover:-translate-y-[1px] hover:shadow-[0_8px_30px_rgb(0,0,0,0.1)] transition-all duration-300 ease-[var(--ease-spring)]`}
                                >
                                    <div className="absolute top-5 right-5 opacity-20 group-hover:opacity-30 transition-opacity duration-300">
                                        <Icon className="h-16 w-16 text-white" />
                                    </div>
                                    <div className="relative z-10">
                                        <span className="text-white/50 text-[10px] font-semibold uppercase tracking-[0.1em] block mb-1">
                                            Gift Collection
                                        </span>
                                        <h3 className="font-display text-xl font-bold text-white mb-1">
                                            {gift.name}
                                        </h3>
                                        <p className="text-white/60 text-sm mb-4">{gift.description}</p>
                                        <div className="flex items-center gap-2 text-[var(--color-gold)]">
                                            <span className="font-semibold text-sm">Shop Now</span>
                                            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
                                        </div>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                </div>
            </section>
        </div>
    );
}
