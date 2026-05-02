import { notFound } from 'next/navigation';
import Image from 'next/image';
import ProductCard from '@/components/product/ProductCard';
import { getProductsByCollection, getProductsByBranch } from '@/lib/products';
import collections from '@/config/collections.json';
import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';

export async function generateStaticParams() {
    return collections.map((collection) => ({
        slug: collection.slug,
    }));
}

export default async function CollectionPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const collection = collections.find((c) => c.slug === slug);

    if (!collection) {
        notFound();
    }

    const isBranchCollection = collection.type === 'branch';
    const products = isBranchCollection
        ? getProductsByBranch(collection.id)
        : getProductsByCollection(collection.id);

    return (
        <div className="bg-white min-h-[100dvh]">
            {/* Hero Section */}
            <div className="relative h-[45vh] md:h-[50vh] bg-[var(--color-dark)] overflow-hidden">
                <div className="absolute inset-0">
                    {collection.image && (
                        <Image
                            src={collection.image}
                            alt={collection.name}
                            fill
                            className="object-cover opacity-35"
                        />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-dark)] via-[var(--color-dark)]/50 to-transparent" />
                </div>

                <div className="container mx-auto h-full relative z-10 flex flex-col justify-end pb-10 md:pb-14">
                    <Link
                        href="/shop"
                        className="inline-flex items-center gap-2 text-sm text-white/50 hover:text-white mb-5 transition-colors duration-200 group w-fit"
                    >
                        <ArrowLeft className="h-3.5 w-3.5 group-hover:-translate-x-1 transition-transform duration-200" />
                        Back to Shop
                    </Link>

                    <div className="max-w-2xl">
                        <span className="inline-block px-3 py-1 bg-[var(--color-military-olive)] rounded-sm text-[10px] font-semibold tracking-[0.08em] uppercase text-white mb-4">
                            {collection.type === 'branch' && 'Military Branch'}
                            {collection.type === 'role' && 'Specialty'}
                            {collection.type === 'gift' && 'Gift Collection'}
                        </span>

                        <h1 className="font-display text-4xl md:text-6xl font-bold text-white tracking-[-0.02em] mb-3">
                            {collection.name}
                        </h1>
                        <p className="text-lg text-white/50">
                            {collection.description}
                        </p>
                    </div>
                </div>
            </div>

            {/* Products Section */}
            <div className="container mx-auto py-12 md:py-16">
                <div className="flex justify-between items-center mb-8">
                    <p className="text-sm text-[var(--color-muted)]">
                        <span className="font-semibold text-[var(--color-dark)]">{products.length}</span>{' '}
                        {products.length === 1 ? 'product' : 'products'}
                    </p>
                    <Link
                        href="/shop"
                        className="flex items-center gap-2 text-sm font-medium text-[var(--color-military-olive)] hover:text-[var(--color-gold)] transition-colors duration-200 group"
                    >
                        View All Products
                        <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform duration-200" />
                    </Link>
                </div>

                {products.length === 0 ? (
                    <div className="text-center py-16">
                        <p className="text-lg text-[var(--color-muted)] mb-6">
                            No products available in this collection yet.
                        </p>
                        <Link
                            href="/shop"
                            className="inline-block px-8 py-3 bg-[var(--color-military-olive)] text-white font-semibold rounded-full hover:bg-[var(--color-olive-light)] transition-all duration-300"
                        >
                            Browse All Products
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-5">
                        {products.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                )}
            </div>

            {/* Related Collections */}
            {collection.type === 'branch' && (
                <div className="bg-[var(--color-gray-bg)] py-14 md:py-16">
                    <div className="container mx-auto">
                        <div className="flex items-end justify-between mb-8">
                            <h2 className="font-display text-2xl md:text-3xl font-bold text-[var(--color-dark)] tracking-[-0.02em]">
                                Explore by Specialty
                            </h2>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
                            {collections
                                .filter((c) => c.type === 'role')
                                .slice(0, 4)
                                .map((roleCollection) => (
                                    <Link
                                        key={roleCollection.id}
                                        href={`/collections/${roleCollection.slug}`}
                                        className="group relative aspect-square rounded-sm overflow-hidden"
                                    >
                                        {roleCollection.image && (
                                            <Image
                                                src={roleCollection.image}
                                                alt={roleCollection.name}
                                                fill
                                                className="object-cover transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-105"
                                            />
                                        )}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                                        <div className="absolute inset-0 flex items-end p-4 md:p-5">
                                            <h3 className="font-display text-sm md:text-base font-bold text-white">
                                                {roleCollection.name}
                                            </h3>
                                        </div>
                                    </Link>
                                ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
