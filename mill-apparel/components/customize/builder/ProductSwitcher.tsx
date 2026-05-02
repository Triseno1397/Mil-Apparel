'use client';

import React from 'react';
import { Shirt, Package } from 'lucide-react';

interface ProductSwitcherProps {
    currentProductId: string;
    onProductChange: (productId: string) => void;
}

const PRODUCTS = [
    { id: 'army-infantry-tee', name: 'Army Infantry Tee', icon: Shirt },
    { id: 'marines-dress-polo', name: 'Marines Polo', icon: Shirt },
    { id: 'navy-anchor-hoodie', name: 'Navy Hoodie', icon: Package },
    { id: 'air-force-wings-cap', name: 'Air Force Cap', icon: Package },
];

export default function ProductSwitcher({
    currentProductId,
    onProductChange,
}: ProductSwitcherProps) {
    return (
        <div className="p-4 border-b border-[var(--builder-border)]">
            <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--builder-text-secondary)] mb-3">
                Product
            </label>
            <div className="grid grid-cols-2 gap-2">
                {PRODUCTS.map((product) => {
                    const Icon = product.icon;
                    const isActive = product.id === currentProductId;

                    return (
                        <button
                            key={product.id}
                            onClick={() => onProductChange(product.id)}
                            className={`
                flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-all
                ${isActive
                                    ? 'bg-[var(--builder-accent)] text-[var(--color-dark)] font-semibold'
                                    : 'bg-[var(--builder-control-bg)] hover:bg-[var(--builder-hover)] text-[var(--builder-text-primary)]'
                                }
              `}
                        >
                            <Icon className="w-4 h-4" />
                            <span className="truncate">{product.name}</span>
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
