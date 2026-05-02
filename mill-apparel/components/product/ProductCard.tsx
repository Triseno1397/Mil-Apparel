'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@/types/product';
import Badge from '@/components/ui/Badge';
import { formatPrice } from '@/lib/utils';
import { useCart } from '@/context/CartContext';
import { useState } from 'react';
import { Plus } from 'lucide-react';

interface ProductCardProps {
    product: Product;
    showQuickAdd?: boolean;
    hideExtrasOnMobile?: boolean;
    minimal?: boolean;
}

export default function ProductCard({ product, showQuickAdd = true, hideExtrasOnMobile = false, minimal = false }: ProductCardProps) {
    const { addToCart } = useCart();
    const [isHovered, setIsHovered] = useState(false);
    const [adding, setAdding] = useState(false);

    const handleQuickAdd = async (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setAdding(true);

        addToCart({
            product,
            quantity: 1,
            selectedSize: product.sizes?.[0],
            selectedColor: product.colors?.[0]
        });

        await new Promise(resolve => setTimeout(resolve, 600));
        setAdding(false);
    };

    return (
        <Link href={`/products/${product.id}`}>
            <div
                className="group relative bg-white rounded-sm overflow-hidden ring-1 ring-black/5 transition-[transform,box-shadow] duration-500 ease-[var(--ease-spring)] hover:-translate-y-[2px] hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)]"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                {/* Product Image */}
                <div className="relative aspect-[3/4] bg-[var(--color-gray-bg)] overflow-hidden">
                    {product.images[0] ? (
                        <Image
                            src={product.images[0]}
                            alt={product.name}
                            fill
                            className="object-cover transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-105"
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center">
                            <div className="text-center">
                                <p className="text-[var(--color-muted)] font-display text-sm font-semibold tracking-[0.1em] uppercase">{product.type}</p>
                            </div>
                        </div>
                    )}

                    {/* Badges */}
                    {!minimal && (
                        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
                            {product.isNew && <Badge variant="new">New</Badge>}
                            {product.isBestSeller && <Badge variant="bestseller">Best Seller</Badge>}
                        </div>
                    )}

                    {/* Quick Add Button */}
                    {showQuickAdd && product.inStock && !hideExtrasOnMobile && (
                        <div className={`
              absolute bottom-0 left-0 right-0 p-4
              transform transition-all duration-400 ease-[var(--ease-spring)]
              ${isHovered ? 'translate-y-0 opacity-100' : 'translate-y-3 opacity-0'}
            `}>
                            <button
                                onClick={handleQuickAdd}
                                disabled={adding}
                                className="w-full bg-[var(--color-military-olive)] text-white py-3 rounded-sm font-semibold text-sm
                  hover:bg-[var(--color-olive-light)] transition-colors duration-200
                  flex items-center justify-center gap-2"
                            >
                                {adding ? (
                                    'Added!'
                                ) : (
                                    <>
                                        <Plus className="h-4 w-4" />
                                        Quick Add
                                    </>
                                )}
                            </button>
                        </div>
                    )}
                </div>

                {/* Product Info */}
                <div className="p-4">
                    <h3 className="font-display font-semibold text-base text-[var(--color-dark)] mb-1 line-clamp-1 group-hover:text-[var(--color-military-olive)] transition-colors duration-200">
                        {product.name}
                    </h3>

                    <div className="flex items-center justify-between mt-3">
                        <p className="font-display font-bold text-lg text-[var(--color-dark)]">
                            {formatPrice(product.price)}
                        </p>

                        {product.rating && !minimal && (
                            <div className={`flex items-center gap-1 text-xs ${hideExtrasOnMobile ? 'hidden md:flex' : ''}`}>
                                <span className="text-[var(--color-gold)] text-sm">&#9733;</span>
                                <span className="font-medium text-[var(--color-charcoal)]">{product.rating}</span>
                                <span className="text-[var(--color-muted)]">({product.reviewCount})</span>
                            </div>
                        )}
                    </div>

                    {/* Color Swatches */}
                    {!minimal && product.colors && product.colors.length > 0 && (
                        <div className={`mt-3 flex gap-1.5 ${hideExtrasOnMobile ? 'hidden md:flex' : ''}`}>
                            {product.colors.slice(0, 4).map((color, index) => (
                                <div
                                    key={index}
                                    className="w-6 h-6 rounded-full border border-black/10 hover:border-[var(--color-military-olive)] transition-colors duration-200 cursor-pointer"
                                    title={color}
                                    style={{
                                        backgroundColor:
                                            color.toLowerCase() === 'black' ? '#18181B' :
                                                color.toLowerCase() === 'white' ? '#fff' :
                                                    color.toLowerCase() === 'gray' ? '#6B7280' :
                                                        color.toLowerCase() === 'navy' ? '#1E3A8A' :
                                                            color.toLowerCase() === 'od green' ? '#4A5240' :
                                                                color.toLowerCase() === 'air force blue' ? '#5D8AA8' :
                                                                    color.toLowerCase() === 'scarlet' ? '#DC143C' :
                                                                        color.toLowerCase() === 'gold' ? '#D4AF37' :
                                                                            color.toLowerCase() === 'tan' ? '#D2B48C' :
                                                                                color.toLowerCase() === 'orange' ? '#FF8C00' :
                                                                                    '#E5E7EB'
                                    }}
                                />
                            ))}
                            {product.colors.length > 4 && (
                                <div className="w-6 h-6 rounded-full border border-black/10 flex items-center justify-center text-[10px] text-[var(--color-muted)]">
                                    +{product.colors.length - 4}
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </Link>
    );
}
