'use client';

import React from 'react';
import { formatPrice } from '@/lib/utils';

interface PriceBreakdownItem {
    label: string;
    price: number;
}

interface PriceBreakdownProps {
    items: PriceBreakdownItem[];
    total: number;
    className?: string;
}

export default function PriceBreakdown({ items, total, className = '' }: PriceBreakdownProps) {
    return (
        <div className={`bg-white rounded-sm ring-1 ring-black/5 p-6 ${className}`}>
            <h3 className="text-xs font-semibold text-[var(--color-muted)] uppercase tracking-[0.08em] mb-4">
                Price Breakdown
            </h3>

            <div className="space-y-2.5">
                {items.map((item, index) => (
                    <div key={index} className="flex justify-between items-center">
                        <span className="text-sm text-[var(--color-muted)]">{item.label}</span>
                        <span className="text-sm font-medium text-[var(--color-dark)]">
                            {index === 0 ? formatPrice(item.price) : `+${formatPrice(item.price)}`}
                        </span>
                    </div>
                ))}
            </div>

            <div className="border-t border-[var(--color-light-gray)] mt-4 pt-4">
                <div className="flex justify-between items-center">
                    <span className="text-sm font-semibold text-[var(--color-dark)]">Total</span>
                    <span className="text-xl font-display font-bold text-[var(--color-military-olive)]">
                        {formatPrice(total)}
                    </span>
                </div>
            </div>

            <div className="mt-4 p-3 bg-[var(--color-military-olive)]/5 rounded-sm">
                <p className="text-xs text-[var(--color-body-text)]">
                    <strong>Free Shipping</strong> on orders over $75
                </p>
            </div>
        </div>
    );
}
