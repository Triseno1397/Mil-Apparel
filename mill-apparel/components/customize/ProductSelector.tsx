'use client';

import React from 'react';
import Image from 'next/image';
import { Product } from '@/types/product';
import { formatPrice } from '@/lib/utils';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import { Sparkles } from 'lucide-react';

interface ProductSelectorProps {
    products: Product[];
    selectedProductId: string | null;
    onSelectProduct: (productId: string) => void;
}

export default function ProductSelector({
    products,
    selectedProductId,
    onSelectProduct,
}: ProductSelectorProps) {
    // Filter only customizable products
    const customizableProducts = products.filter((p) => p.isCustomizable);

    return (
        <div className="space-y-6">
            <div className="text-center max-w-2xl mx-auto">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-[var(--color-military-olive)]/8 rounded-full mb-4">
                    <Sparkles className="w-6 h-6 text-[var(--color-military-olive)]" />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-[var(--color-dark)] mb-2">
                    Choose Your Product
                </h2>
                <p className="text-[var(--color-muted)]">
                    Select the item you'd like to customize with your personal details
                </p>
            </div>

            {customizableProducts.length === 0 ? (
                <div className="text-center py-12">
                    <p className="text-[var(--color-muted)]">No customizable products available.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {customizableProducts.map((product) => {
                        const isSelected = product.id === selectedProductId;

                        return (
                            <div
                                key={product.id}
                                className={`bg-white rounded-sm transition-all hover:shadow-lg ${isSelected
                                    ? 'ring-2 ring-[var(--color-military-olive)] ring-offset-2'
                                    : 'ring-1 ring-black/5 hover:ring-[var(--color-military-olive)]/30'
                                    }`}
                            >
                                {/* Product Image */}
                                <div className="relative aspect-square bg-[var(--color-gray-bg)] rounded-t-sm overflow-hidden">
                                    <Image
                                        src={product.images[0]}
                                        alt={product.name}
                                        fill
                                        className="object-cover"
                                    />

                                    {/* Badges */}
                                    <div className="absolute top-3 left-3 flex gap-2">
                                        <Badge variant="customizable">Customizable</Badge>
                                        {product.isBestSeller && <Badge variant="bestseller">Best Seller</Badge>}
                                        {product.isNew && <Badge variant="new">New</Badge>}
                                    </div>

                                    {/* Selected Indicator */}
                                    {isSelected && (
                                        <div className="absolute top-3 right-3 bg-[var(--color-military-olive)] text-white rounded-full p-2">
                                            <svg
                                                className="w-5 h-5"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M5 13l4 4L19 7"
                                                />
                                            </svg>
                                        </div>
                                    )}
                                </div>

                                {/* Product Info */}
                                <div className="p-4">
                                    <h3 className="font-semibold text-[var(--color-dark)] mb-1">
                                        {product.name}
                                    </h3>
                                    <p className="text-sm text-[var(--color-muted)] mb-3 line-clamp-2">
                                        {product.description}
                                    </p>

                                    <div className="flex items-center justify-between mb-3">
                                        <span className="text-lg font-bold text-[var(--color-dark)]">
                                            {formatPrice(product.price)}
                                        </span>
                                        <span className="text-xs text-[var(--color-muted)]">
                                            + customization
                                        </span>
                                    </div>

                                    <Button
                                        variant={isSelected ? 'primary' : 'secondary'}
                                        className="w-full"
                                        onClick={() => onSelectProduct(product.id)}
                                    >
                                        {isSelected ? 'Selected' : 'Select Product'}
                                    </Button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}

            {customizableProducts.length > 0 && (
                <div className="mt-8 p-4 bg-[var(--color-gray-bg)] rounded-sm ring-1 ring-black/5">
                    <p className="text-sm text-[var(--color-muted)] text-center">
                        <strong>Note:</strong> Customization costs range from $3 to $8 per option.
                        You'll see exact pricing as you add personalization.
                    </p>
                </div>
            )}
        </div>
    );
}
