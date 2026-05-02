import { Product } from '@/types/product';
import { getAllProducts } from '@/lib/products';
import ProductCard from '@/components/product/ProductCard';

interface RelatedProductsProps {
    product: Product;
}

export default function RelatedProducts({ product }: RelatedProductsProps) {
    const allProducts = getAllProducts();

    // Get products from same collections or same type
    const related = allProducts
        .filter(p => {
            if (p.id === product.id) return false;

            // Check if shares any collections
            const sharesCollection = p.collections?.some(c =>
                product.collections?.includes(c)
            );

            // Or same type
            const sameType = p.type === product.type;

            return sharesCollection || sameType;
        })
        .slice(0, 4); // Show max 4 related products

    if (related.length === 0) {
        return null;
    }

    return (
        <div>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-[var(--color-dark)] mb-8">
                You May Also Like
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {related.map((relatedProduct) => (
                    <ProductCard key={relatedProduct.id} product={relatedProduct} />
                ))}
            </div>
        </div>
    );
}
