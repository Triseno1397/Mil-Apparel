'use client';

import Button from '@/components/ui/Button';
import { Product } from '@/types/product';
import { ShoppingCart } from 'lucide-react';

interface AddToCartButtonProps {
    product: Product;
}

export default function AddToCartButton({ product }: AddToCartButtonProps) {
    const handleAddToCart = () => {
        console.log('Add to cart:', product.id);
    };

    return (
        <Button
            variant="accent"
            onClick={handleAddToCart}
            disabled={!product.inStock}
            className="w-full text-lg py-4"
        >
            <ShoppingCart className="mr-2 h-5 w-5" />
            {product.inStock ? 'Add to Cart' : 'Out of Stock'}
        </Button>
    );
}
