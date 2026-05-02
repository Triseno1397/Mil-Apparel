import Link from 'next/link';
import { Shield, Zap, Users, Heart, ArrowRight, Star } from 'lucide-react';

const values = [
    {
        icon: Shield,
        title: 'Built for Service',
        desc: 'Every product is designed with servicemembers in mind — durable, meaningful, and mission-ready for life after the uniform.',
    },
    {
        icon: Zap,
        title: 'Premium Quality',
        desc: 'We use heavyweight fabrics, sharp embroidery, and durable prints that hold up through the wash and look sharp on parade.',
    },
    {
        icon: Heart,
        title: 'Community First',
        desc: 'A portion of every sale goes toward veteran organizations supporting mental health, transition assistance, and family programs.',
    },
    {
        icon: Users,
        title: 'Veteran Owned',
        desc: 'Founded by veterans who understand the pride, sacrifice, and identity that comes with service. We wear our mission.',
    },
];

const stats = [
    { value: '10K+', label: 'Orders Shipped' },
    { value: '4.8★', label: 'Average Rating' },
    { value: '5', label: 'Branches Served' },
    { value: '100%', label: 'Satisfaction Goal' },
];

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-white">
            {/* Hero */}
            <section className="bg-[var(--color-dark)] text-white py-28 relative overflow-hidden">
                <div className="container mx-auto px-4 relative z-10 max-w-4xl">
                    <p className="text-[var(--color-gold)] font-semibold uppercase tracking-widest mb-4 text-sm">
                        Our Story
                    </p>
                    <h1 className="font-display text-5xl md:text-7xl font-bold mb-6 leading-tight">
                        Apparel That<br />Honors Service
                    </h1>
                    <p className="text-xl text-white/55 max-w-2xl leading-relaxed">
                        Mil Apparel was built from a simple idea: servicemembers, veterans, and their families deserve premium gear that reflects the pride and identity of their service &mdash; not generic brand merchandise.
                    </p>
                </div>
            </section>

            {/* Stats */}
            <section className="py-14 bg-[var(--color-military-olive)]">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                        {stats.map(({ value, label }) => (
                            <div key={label}>
                                <p className="font-display text-4xl md:text-5xl font-bold tracking-[-0.02em] text-white mb-1">{value}</p>
                                <p className="text-white/70 text-sm font-medium uppercase tracking-wider">{label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Mission */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4 max-w-4xl text-center">
                    <h2 className="font-display text-3xl md:text-4xl font-bold text-[var(--color-dark)] mb-6">
                        Our Mission
                    </h2>
                    <p className="text-xl text-[var(--color-muted)] leading-relaxed max-w-3xl mx-auto">
                        We create premium military identity apparel that celebrates the service, sacrifice, and camaraderie of every branch. From first day in-country to the last salute at retirement — we make gear worthy of the journey.
                    </p>
                </div>
            </section>

            {/* Values */}
            <section className="py-20 bg-[var(--color-gray-bg)]">
                <div className="container mx-auto px-4 max-w-6xl">
                    <h2 className="font-display text-3xl md:text-4xl font-bold text-[var(--color-dark)] text-center mb-14">
                        What We Stand For
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {values.map(({ icon: Icon, title, desc }) => (
                            <div
                                key={title}
                                className="bg-white rounded-sm p-8 ring-1 ring-black/5 hover:shadow-none border border-transparent hover:border-[var(--color-military-olive)]/20 transition-all duration-300 flex gap-5"
                            >
                                <div className="flex-shrink-0 w-14 h-14 bg-[var(--color-military-olive)]/10 rounded-full flex items-center justify-center">
                                    <Icon className="h-7 w-7 text-[var(--color-military-olive)]" />
                                </div>
                                <div>
                                    <h3 className="font-display text-xl font-bold text-[var(--color-dark)] mb-2">
                                        {title}
                                    </h3>
                                    <p className="text-[var(--color-muted)] leading-relaxed">{desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Quote */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4 max-w-3xl text-center">
                    <div className="border-l-4 border-[var(--color-military-olive)] pl-8 text-left">
                        <p className="font-display text-2xl md:text-3xl font-semibold text-[var(--color-dark)] italic leading-relaxed mb-6">
                            &quot;We didn&apos;t start this company to sell T-shirts. We started it to honor the identity that the uniform gave us — and to keep that pride alive long after it&apos;s folded and put away.&quot;
                        </p>
                        <p className="font-semibold text-[var(--color-military-olive)]">— Mil Apparel Founders</p>
                    </div>
                </div>
            </section>

            {/* Reviews */}
            <section className="py-20 bg-[var(--color-gray-bg)]">
                <div className="container mx-auto px-4 max-w-6xl">
                    <h2 className="font-display text-3xl md:text-4xl font-bold text-[var(--color-dark)] text-center mb-14">
                        What Our Customers Say
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[
                            { name: 'SGT Mike R., U.S. Army', review: 'Best military apparel I\'ve found. The quality is legit — washed it 20 times and it still looks fresh.', stars: 5 },
                            { name: 'Petty Officer Chen, U.S. Navy', review: 'Ordered the hoodie for my husband\'s retirement. He wore it out of the box. Says it\'s his favorite piece of gear.', stars: 5 },
                            { name: 'Cpl Davis, USMC', review: 'Finally, a brand that gets the Marine Corps pride. The EGA tee is exactly what I wanted. Already ordered three more for my squad.', stars: 5 },
                        ].map(({ name, review, stars }) => (
                            <div key={name} className="bg-white rounded-sm p-7 ring-1 ring-black/5">
                                <div className="flex gap-1 mb-4">
                                    {Array.from({ length: stars }).map((_, i) => (
                                        <Star key={i} className="h-5 w-5 fill-[var(--color-gold)] text-[var(--color-gold)]" />
                                    ))}
                                </div>
                                <p className="text-[var(--color-body-text)] leading-relaxed mb-5 italic">&quot;{review}&quot;</p>
                                <p className="font-semibold text-[var(--color-dark)] text-sm">{name}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-20 bg-[var(--color-dark)] text-white text-center">
                <div className="container mx-auto px-4">
                    <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
                        Ready to Wear Your Service?
                    </h2>
                    <p className="text-xl text-white/55 mb-10 max-w-xl mx-auto">
                        Browse our full collection of premium military apparel, or customize your own.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            href="/shop"
                            className="inline-flex items-center gap-2 px-8 py-4 bg-[var(--color-military-olive)] text-white font-bold text-lg rounded-full hover:bg-[var(--color-gold)] hover:text-[var(--color-dark)] transition-all"
                        >
                            Shop Now <ArrowRight className="h-5 w-5" />
                        </Link>
                        <Link
                            href="/customize"
                            className="inline-flex items-center gap-2 px-8 py-4 border-2 border-white/30 text-white font-bold text-lg rounded-full hover:border-[var(--color-gold)] hover:text-[var(--color-gold)] transition-all"
                        >
                            Customize Yours
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
