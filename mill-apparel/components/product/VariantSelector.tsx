'use client';

import { useState } from 'react';
import { Product } from '@/types/product';

interface VariantSelectorProps {
    product: Product;
}

export default function VariantSelector({ product }: VariantSelectorProps) {
    const [selectedSize, setSelectedSize] = useState<string>(product.sizes?.[0] || '');
    const [selectedColor, setSelectedColor] = useState<string>(product.colors?.[0] || '');

    // Color mapping (reuse from SidebarFilters)
    const colorMap: Record<string, string> = {
        'Black': '#000000',
        'White': '#FFFFFF',
        'Navy': '#001F3D',
        'OD Green': '#4A5D23',
        'Gray': '#808080',
        'Scarlet': '#C41E3A',
        'Gold': '#FFD700',
        'Air Force Blue': '#00308F',
        'Orange': '#FF6600',
        'Tan': '#D2B48C',
    };

    return (
        <div className="space-y-6">
            {/* Size Selector */}
            {product.sizes && product.sizes.length > 0 && (
                <div>
                    <h3 className="text-sm font-bold uppercase tracking-wide text-[var(--color-dark)] mb-3">
                        Size: <span className="font-normal text-gray-700">{selectedSize}</span>
                    </h3>
                    <div className="flex flex-wrap gap-2">
                        {product.sizes.map((size) => (
                            <button
                                key={size}
                                onClick={() => setSelectedSize(size)}
                                className={`min-w-[60px] px-4 py-3 text-sm font-semibold rounded-lg border-2 transition-all ${selectedSize === size
                                        ? 'border-[var(--color-military-olive)] bg-[var(--color-military-olive)] text-white'
                                        : 'border-gray-300 hover:border-gray-400 text-[var(--color-dark)]'
                                    }`}
                            >
                                {size}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* Color Selector */}
            {product.colors && product.colors.length > 0 && (
                <div>
                    <h3 className="text-sm font-bold uppercase tracking-wide text-[var(--color-dark)] mb-3">
                        Color: <span className="font-normal text-gray-700">{selectedColor}</span>
                    </h3>
                    <div className="flex flex-wrap gap-3">
                        {product.colors.map((color) => {
                            const hexColor = colorMap[color] || '#CCCCCC';
                            const isSelected = selectedColor === color;

                            return (
                                <button
                                    key={color}
                                    onClick={() => setSelectedColor(color)}
                                    title={color}
                                    className={`relative w-12 h-12 rounded-full border-3 transition-all ${isSelected
                                            ? 'border-[var(--color-military-olive)] ring-4 ring-[var(--color-military-olive)]/30 scale-110'
                                            : 'border-gray-300 hover:border-gray-400 hover:scale-105'
                                        }`}
                                    style={{ backgroundColor: hexColor }}
                                >
                                    {/* White border for light colors */}
                                    {(color === 'White' || color === 'Tan') && (
                                        <div className="absolute inset-0 rounded-full border-2 border-gray-300" />
                                    )}
                                    {/* Checkmark for selected */}
                                    {isSelected && (
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <div className="w-4 h-4 bg-white rounded-full border-2 border-[var(--color-dark)]" />
                                        </div>
                                    )}
                                </button>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
}
