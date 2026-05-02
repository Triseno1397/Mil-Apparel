'use client';

import { useState } from 'react';
import { ChevronDown, Search } from 'lucide-react';
import faqs from '@/config/faqs.json';
import Link from 'next/link';

const categoryLabels: Record<string, string> = {
    customization: 'Customization',
    shipping: 'Shipping',
    returns: 'Returns & Exchanges',
    products: 'Products & Sizing',
    gifts: 'Gift Options',
    orders: 'Orders',
    payment: 'Payment',
};

export default function FAQPage() {
    const [openId, setOpenId] = useState<string | null>(null);
    const [search, setSearch] = useState('');
    const [activeCategory, setActiveCategory] = useState<string>('all');

    const categories = ['all', ...Array.from(new Set(faqs.map(f => f.category)))];

    const filtered = faqs.filter(faq => {
        const matchesSearch = !search ||
            faq.question.toLowerCase().includes(search.toLowerCase()) ||
            faq.answer.toLowerCase().includes(search.toLowerCase());
        const matchesCategory = activeCategory === 'all' || faq.category === activeCategory;
        return matchesSearch && matchesCategory;
    });

    return (
        <div className="min-h-[100dvh] bg-[var(--color-gray-bg)]">
            {/* Header */}
            <div className="bg-white border-b border-[var(--color-light-gray)]">
                <div className="container mx-auto py-14 md:py-20">
                    <span className="text-[11px] tracking-[0.15em] uppercase font-semibold text-[var(--color-muted)] block mb-3">Support</span>
                    <h1 className="font-display text-4xl md:text-5xl font-bold text-[var(--color-dark)] tracking-[-0.02em] mb-3">
                        Frequently Asked Questions
                    </h1>
                    <p className="text-lg text-[var(--color-muted)] mb-8 max-w-xl">
                        Quick answers to common questions about our products, shipping, and more.
                    </p>
                    {/* Search */}
                    <div className="relative max-w-lg">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--color-muted)]" />
                        <input
                            type="text"
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                            placeholder="Search questions..."
                            className="w-full pl-11 pr-5 py-3 border border-[var(--color-light-gray)] rounded-sm text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-military-olive)]/30 focus:border-[var(--color-military-olive)] transition-all duration-200"
                        />
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-12 max-w-4xl">
                {/* Category Tabs */}
                <div className="flex flex-wrap gap-2 mb-10">
                    {categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={`px-4 py-2 rounded-sm text-xs font-semibold tracking-[0.02em] transition-all duration-200 ${activeCategory === cat
                                    ? 'bg-[var(--color-military-olive)] text-white'
                                    : 'bg-white text-[var(--color-muted)] hover:text-[var(--color-dark)] ring-1 ring-black/5'
                                }`}
                        >
                            {cat === 'all' ? 'All Questions' : categoryLabels[cat] || cat}
                        </button>
                    ))}
                </div>

                {/* FAQ Accordion */}
                {filtered.length === 0 ? (
                    <div className="text-center py-16">
                        <p className="text-xl text-gray-500">No questions found for &quot;{search}&quot;</p>
                        <button
                            onClick={() => { setSearch(''); setActiveCategory('all'); }}
                            className="mt-4 text-[var(--color-military-olive)] font-semibold hover:underline"
                        >
                            Clear search
                        </button>
                    </div>
                ) : (
                    <div className="space-y-3">
                        {filtered.map(faq => (
                            <div
                                key={faq.id}
                                className="bg-white rounded-sm ring-1 ring-black/5 overflow-hidden hover:ring-[var(--color-military-olive)]/20 transition-all duration-200"
                            >
                                <button
                                    onClick={() => setOpenId(openId === faq.id ? null : faq.id)}
                                    className="w-full flex items-center justify-between px-6 py-5 text-left gap-4"
                                >
                                    <span className="font-semibold text-[var(--color-dark)] text-base leading-snug">
                                        {faq.question}
                                    </span>
                                    <ChevronDown
                                        className={`h-5 w-5 text-[var(--color-military-olive)] flex-shrink-0 transition-transform duration-300 ${openId === faq.id ? 'rotate-180' : ''
                                            }`}
                                    />
                                </button>
                                {openId === faq.id && (
                                    <div className="px-6 pb-6">
                                        <div className="border-t border-gray-100 pt-4">
                                            <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}

                {/* Still need help */}
                <div className="mt-14 bg-[var(--color-dark)] rounded-sm p-8 text-center text-white">
                    <h3 className="font-display text-2xl font-bold mb-2">Didn&apos;t find your answer?</h3>
                    <p className="text-white/55 mb-6">Our team typically responds within 24 hours.</p>
                    <Link
                        href="/contact"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--color-military-olive)] text-white font-semibold rounded-full hover:bg-[var(--color-olive-light)] transition-all duration-300"
                    >
                        Contact Support
                    </Link>
                </div>
            </div>
        </div>
    );
}
