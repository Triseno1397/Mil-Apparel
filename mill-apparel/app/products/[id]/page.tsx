import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Star, Share2, ChevronRight } from 'lucide-react';
import { getProductById, getAllProducts } from '@/lib/products';
import collections from '@/config/collections.json';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import ProductGallery from '@/components/product/ProductGallery';
import VariantSelector from '@/components/product/VariantSelector';
import QuantitySelector from '@/components/product/QuantitySelector';
import ProductTabs from '@/components/product/ProductTabs';
import RelatedProducts from '@/components/product/RelatedProducts';
import AddToCartButton from '@/components/product/AddToCartButton';

export async function generateStaticParams() {
    const products = getAllProducts();
    return products.map((product) => ({
        id: product.id,
    }));
}

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const product = getProductById(id);

    if (!product) {
        notFound();
    }

    const productCollections = collections.filter(c =>
        product.collections?.includes(c.id)
    );
    const primaryCollection = productCollections[0];

    return (
        <div className="bg-white min-h-[100dvh]">
            {/* Breadcrumb */}
            <div className="border-b border-[var(--color-light-gray)]">
                <div className="container mx-auto py-3.5">
                    <nav className="flex items-center gap-1.5 text-xs">
                        <Link href="/" className="text-[var(--color-muted)] hover:text-[var(--color-dark)] transition-colors duration-200">
                            Home
                        </Link>
                        <ChevronRight className="h-3 w-3 text-[var(--color-muted)]" />
                        <Link href="/shop" className="text-[var(--color-muted)] hover:text-[var(--color-dark)] transition-colors duration-200">
                            Shop
                        </Link>
                        {primaryCollection && (
                            <>
                                <ChevronRight className="h-3 w-3 text-[var(--color-muted)]" />
                                <Link
                                    href={`/collections/${primaryCollection.slug}`}
                                    className="text-[var(--color-muted)] hover:text-[var(--color-dark)] transition-colors duration-200"
                                >
                                    {primaryCollection.name}
                                </Link>
                            </>
                        )}
                        <ChevronRight className="h-3 w-3 text-[var(--color-muted)]" />
                        <span className="text-[var(--color-dark)] font-medium">{product.name}</span>
                    </nav>
                </div>
            </div>

            {/* Product Detail */}
            <div className="container mx-auto py-10 md:py-14">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
                    {/* Left Column - Images */}
                    <div>
                        <ProductGallery product={product} />
                    </div>

                    {/* Right Column - Product Info */}
                    <div className="space-y-6">
                        {/* Badges */}
                        <div className="flex flex-wrap gap-2">
                            {product.isNew && <Badge variant="new">New</Badge>}
                            {product.isBestSeller && <Badge variant="bestseller">Best Seller</Badge>}
                            {product.isCustomizable && <Badge variant="customizable">Customizable</Badge>}
                            {!product.inStock && <Badge variant="lowstock">Out of Stock</Badge>}
                        </div>

                        {/* Title + Price */}
                        <div>
                            <h1 className="font-display text-3xl md:text-4xl font-bold text-[var(--color-dark)] tracking-[-0.02em] mb-3">
                                {product.name}
                            </h1>

                            <div className="flex items-center gap-4">
                                <span className="font-display text-2xl font-bold text-[var(--color-dark)]">
                                    ${product.price.toFixed(2)}
                                </span>
                                {product.isCustomizable && (
                                    <span className="text-sm text-[var(--color-muted)]">
                                        + customization fees
                                    </span>
                                )}
                            </div>
                        </div>

                        {/* Rating */}
                        {product.rating && (
                            <div className="flex items-center gap-2">
                                <Star className="h-4 w-4 fill-[var(--color-gold)] text-[var(--color-gold)]" />
                                <span className="text-sm font-medium text-[var(--color-dark)]">{product.rating}</span>
                                <span className="text-sm text-[var(--color-muted)]">({product.reviewCount} reviews)</span>
                            </div>
                        )}

                        {/* Description */}
                        <p className="text-[var(--color-body-text)] leading-relaxed max-w-[55ch]">
                            {product.description}
                        </p>

                        {/* Variant Selection */}
                        <VariantSelector product={product} />

                        {/* Quantity & Add to Cart */}
                        <div className="border-t border-[var(--color-light-gray)] pt-6 space-y-4">
                            <QuantitySelector />
                            <AddToCartButton product={product} />
                        </div>

                        {/* Share */}
                        <div className="flex items-center gap-3 pt-2">
                            <span className="text-xs font-medium text-[var(--color-muted)] uppercase tracking-[0.05em]">Share</span>
                            <button className="p-2 hover:bg-[var(--color-gray-bg)] rounded-sm transition-colors duration-200">
                                <Share2 className="h-4 w-4 text-[var(--color-muted)]" />
                            </button>
                        </div>

                        {/* Product Details */}
                        <div className="space-y-0">
                            <h3 className="text-xs font-semibold text-[var(--color-muted)] uppercase tracking-[0.08em] mb-3">Product Details</h3>
                            {product.material && (
                                <div className="flex items-start py-2.5 border-b border-[var(--color-light-gray)]">
                                    <span className="text-sm font-medium text-[var(--color-muted)] w-28 shrink-0">Material</span>
                                    <span className="text-sm text-[var(--color-body-text)]">{product.material}</span>
                                </div>
                            )}
                            {product.sizes && (
                                <div className="flex items-start py-2.5 border-b border-[var(--color-light-gray)]">
                                    <span className="text-sm font-medium text-[var(--color-muted)] w-28 shrink-0">Sizes</span>
                                    <span className="text-sm text-[var(--color-body-text)]">{product.sizes.join(', ')}</span>
                                </div>
                            )}
                            {product.colors && (
                                <div className="flex items-start py-2.5">
                                    <span className="text-sm font-medium text-[var(--color-muted)] w-28 shrink-0">Colors</span>
                                    <span className="text-sm text-[var(--color-body-text)]">{product.colors.join(', ')}</span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Product Tabs */}
                <div className="mt-20">
                    <ProductTabs product={product} />
                </div>

                {/* Related Products */}
                <div className="mt-20">
                    <RelatedProducts product={product} />
                </div>
            </div>
        </div>
    );
}
