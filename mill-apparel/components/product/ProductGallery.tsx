'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Product } from '@/types/product';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ProductGalleryProps {
    product: Product;
}

export default function ProductGallery({ product }: ProductGalleryProps) {
    const [currentImage, setCurrentImage] = useState(0);
    const images = product.images || ['/images/products/placeholder.png'];

    return (
        <div className="space-y-3">
            {/* Main Image */}
            <div className="relative aspect-square bg-[var(--color-gray-bg)] rounded-sm overflow-hidden group cursor-zoom-in">
                <Image
                    src={images[currentImage]}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-110"
                    priority
                />

                {/* Navigation Arrows */}
                {images.length > 1 && (
                    <>
                        <button
                            onClick={() => setCurrentImage((prev) => (prev === 0 ? images.length - 1 : prev - 1))}
                            className="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 bg-white/90 hover:bg-white rounded-sm shadow-sm opacity-0 group-hover:opacity-100 transition-all duration-200"
                            aria-label="Previous image"
                        >
                            <ChevronLeft className="h-5 w-5 text-[var(--color-dark)]" />
                        </button>
                        <button
                            onClick={() => setCurrentImage((prev) => (prev === images.length - 1 ? 0 : prev + 1))}
                            className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 bg-white/90 hover:bg-white rounded-sm shadow-sm opacity-0 group-hover:opacity-100 transition-all duration-200"
                            aria-label="Next image"
                        >
                            <ChevronRight className="h-5 w-5 text-[var(--color-dark)]" />
                        </button>
                    </>
                )}

                {/* Image Counter */}
                {images.length > 1 && (
                    <div className="absolute bottom-3 right-3 px-2.5 py-1 bg-[var(--color-dark)]/60 text-white text-xs font-medium rounded-sm">
                        {currentImage + 1} / {images.length}
                    </div>
                )}
            </div>

            {/* Thumbnails */}
            {images.length > 1 && (
                <div className="grid grid-cols-4 gap-2">
                    {images.map((image, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentImage(index)}
                            className={`relative aspect-square bg-[var(--color-gray-bg)] rounded-sm overflow-hidden transition-all duration-200 ${
                                index === currentImage
                                    ? 'ring-2 ring-[var(--color-military-olive)]'
                                    : 'ring-1 ring-black/5 hover:ring-black/15'
                            }`}
                        >
                            <Image
                                src={image}
                                alt={`${product.name} - Image ${index + 1}`}
                                fill
                                className="object-cover"
                            />
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
