'use client';

import CustomizationWizard from '@/components/customize/CustomizationWizard';
import { getAllProducts } from '@/lib/products';
import { useCart } from '@/context/CartContext';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

function CustomizeContent() {
    const { addToCart } = useCart();
    const searchParams = useSearchParams();
    const preselectedProductId = searchParams.get('product') || undefined;
    const allProducts = getAllProducts();

    const handleAddToCart = (productId: string, customization: any, totalPrice: number) => {
        const product = allProducts.find(p => p.id === productId);
        if (product) {
            addToCart({
                product,
                quantity: 1,
                selectedSize: product.sizes?.[0],
                selectedColor: product.colors?.[0],
                customization,
            });
        }
    };

    return (
        <CustomizationWizard
            products={allProducts}
            preselectedProductId={preselectedProductId}
            onAddToCart={handleAddToCart}
        />
    );
}

export default function CustomizePage() {
    return (
        <Suspense fallback={
            <div className="min-h-[100dvh] bg-[var(--color-gray-bg)] flex items-center justify-center">
                <div className="text-center">
                    <div className="h-8 w-8 border-2 border-[var(--color-military-olive)]/30 border-t-[var(--color-military-olive)] rounded-full animate-spin mx-auto mb-4" />
                    <p className="text-sm text-[var(--color-muted)]">Loading customizer...</p>
                </div>
            </div>
        }>
            <CustomizeContent />
        </Suspense>
    );
}
