'use client';

import { useState } from 'react';
import { Product } from '@/types/product';

interface ProductTabsProps {
    product: Product;
}

export default function ProductTabs({ product }: ProductTabsProps) {
    const [activeTab, setActiveTab] = useState<'description' | 'specs' | 'shipping'>('description');

    const tabs = [
        { id: 'description' as const, label: 'Description' },
        { id: 'specs' as const, label: 'Specifications' },
        { id: 'shipping' as const, label: 'Shipping & Returns' },
    ];

    return (
        <div>
            {/* Tab Headers */}
            <div className="border-b border-[var(--color-light-gray)]">
                <div className="flex gap-8">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`pb-4 text-sm font-semibold tracking-[0.02em] uppercase transition-colors duration-200 relative ${
                                activeTab === tab.id
                                    ? 'text-[var(--color-dark)]'
                                    : 'text-[var(--color-muted)] hover:text-[var(--color-dark)]'
                            }`}
                        >
                            {tab.label}
                            {activeTab === tab.id && (
                                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[var(--color-military-olive)]" />
                            )}
                        </button>
                    ))}
                </div>
            </div>

            {/* Tab Content */}
            <div className="py-8 max-w-[65ch]">
                {activeTab === 'description' && (
                    <div>
                        <p className="text-[var(--color-body-text)] leading-relaxed mb-8">
                            {product.description}
                        </p>
                        <h3 className="font-display text-lg font-semibold text-[var(--color-dark)] mb-4">
                            Features
                        </h3>
                        <ul className="space-y-2.5 text-[var(--color-body-text)]">
                            <li className="flex items-start gap-2.5">
                                <span className="w-1 h-1 rounded-full bg-[var(--color-military-olive)] mt-2.5 shrink-0" />
                                Premium quality materials for long-lasting durability
                            </li>
                            <li className="flex items-start gap-2.5">
                                <span className="w-1 h-1 rounded-full bg-[var(--color-military-olive)] mt-2.5 shrink-0" />
                                Designed specifically for military servicemembers and veterans
                            </li>
                            <li className="flex items-start gap-2.5">
                                <span className="w-1 h-1 rounded-full bg-[var(--color-military-olive)] mt-2.5 shrink-0" />
                                Comfortable fit for all-day wear
                            </li>
                            <li className="flex items-start gap-2.5">
                                <span className="w-1 h-1 rounded-full bg-[var(--color-military-olive)] mt-2.5 shrink-0" />
                                Professional, respectful design
                            </li>
                        </ul>
                    </div>
                )}

                {activeTab === 'specs' && (
                    <div className="space-y-0">
                        {product.material && (
                            <div className="flex items-start py-3.5 border-b border-[var(--color-light-gray)]">
                                <span className="text-sm font-medium text-[var(--color-muted)] w-36 shrink-0">Material</span>
                                <span className="text-sm text-[var(--color-body-text)]">{product.material}</span>
                            </div>
                        )}
                        {product.sizes && (
                            <div className="flex items-start py-3.5 border-b border-[var(--color-light-gray)]">
                                <span className="text-sm font-medium text-[var(--color-muted)] w-36 shrink-0">Sizes</span>
                                <span className="text-sm text-[var(--color-body-text)]">{product.sizes.join(', ')}</span>
                            </div>
                        )}
                        {product.colors && (
                            <div className="flex items-start py-3.5 border-b border-[var(--color-light-gray)]">
                                <span className="text-sm font-medium text-[var(--color-muted)] w-36 shrink-0">Colors</span>
                                <span className="text-sm text-[var(--color-body-text)]">{product.colors.join(', ')}</span>
                            </div>
                        )}
                        <div className="flex items-start py-3.5 border-b border-[var(--color-light-gray)]">
                            <span className="text-sm font-medium text-[var(--color-muted)] w-36 shrink-0">Care</span>
                            <span className="text-sm text-[var(--color-body-text)]">Machine wash cold, tumble dry low. Do not bleach.</span>
                        </div>
                        <div className="flex items-start py-3.5 border-b border-[var(--color-light-gray)]">
                            <span className="text-sm font-medium text-[var(--color-muted)] w-36 shrink-0">Type</span>
                            <span className="text-sm text-[var(--color-body-text)] capitalize">{product.type}</span>
                        </div>
                        <div className="flex items-start py-3.5">
                            <span className="text-sm font-medium text-[var(--color-muted)] w-36 shrink-0">Stock</span>
                            <span className={`text-sm font-medium ${product.inStock ? 'text-[var(--color-success)]' : 'text-[var(--color-error)]'}`}>
                                {product.inStock ? 'In Stock' : 'Out of Stock'}
                            </span>
                        </div>
                    </div>
                )}

                {activeTab === 'shipping' && (
                    <div className="space-y-8">
                        <div>
                            <h3 className="font-display text-lg font-semibold text-[var(--color-dark)] mb-4">
                                Shipping Information
                            </h3>
                            <div className="space-y-2.5 text-[var(--color-body-text)]">
                                <p><strong className="font-medium">Free Shipping:</strong> Orders over $75</p>
                                <p><strong className="font-medium">Standard:</strong> 5-7 business days ($5.99)</p>
                                <p><strong className="font-medium">Express:</strong> 2-3 business days ($14.99)</p>
                                <p><strong className="font-medium">Overnight:</strong> Next business day ($29.99)</p>
                            </div>
                        </div>
                        <div>
                            <h3 className="font-display text-lg font-semibold text-[var(--color-dark)] mb-4">
                                Returns & Exchanges
                            </h3>
                            <div className="space-y-2.5 text-[var(--color-body-text)]">
                                <p>We offer a <strong className="font-medium">30-day return policy</strong> on all non-customized items.</p>
                                <p>Items must be unworn, unwashed, and in original condition with tags attached.</p>
                                <p>Customized items are final sale and cannot be returned or exchanged.</p>
                                <p>Return shipping is free for exchanges. Returns are subject to a $5.99 restocking fee.</p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
