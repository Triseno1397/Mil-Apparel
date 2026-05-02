'use client';

import { useState, useMemo } from 'react';
import ProductCard from '@/components/product/ProductCard';
import CategoryFilter from '@/components/shop/CategoryFilter';
import SidebarFilters from '@/components/shop/SidebarFilters';
import { getAllProducts } from '@/lib/products';
import collectionsData from '@/config/collections.json';
import { Collection } from '@/types/collection';
import { Filter, X } from 'lucide-react';

const collections = collectionsData as Collection[];

type SortOption = 'featured' | 'newest' | 'price-low' | 'price-high' | 'rating';

export default function ShopPage() {
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
    const [selectedColors, setSelectedColors] = useState<string[]>([]);
    const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
    const [priceRange, setPriceRange] = useState<[number, number]>([0, 100]);
    const [sortBy, setSortBy] = useState<SortOption>('featured');
    const [showMobileFilters, setShowMobileFilters] = useState(false);

    const allProducts = getAllProducts();

    // Get unique values for filters
    const availableSizes = useMemo(() => {
        const sizesSet = new Set<string>();
        allProducts.forEach(p => {
            if (p.sizes) p.sizes.forEach(size => sizesSet.add(size));
        });
        return Array.from(sizesSet).sort((a, b) => {
            const order = ['XS', 'S', 'M', 'L', 'XL', '2XL', '3XL'];
            return order.indexOf(a) - order.indexOf(b);
        });
    }, [allProducts]);

    const availableColors = useMemo(() => {
        const colorsSet = new Set<string>();
        allProducts.forEach(p => {
            if (p.colors) p.colors.forEach(color => colorsSet.add(color));
        });
        return Array.from(colorsSet);
    }, [allProducts]);

    // Filter products
    const filteredProducts = useMemo(() => {
        let filtered = [...allProducts];

        // Category filter
        if (selectedCategories.length > 0) {
            filtered = filtered.filter(p =>
                p.collections?.some(c => selectedCategories.includes(c)) ||
                (p.branch && selectedCategories.includes(p.branch))
            );
        }

        // Size filter
        if (selectedSizes.length > 0) {
            filtered = filtered.filter(p =>
                p.sizes?.some(s => selectedSizes.includes(s))
            );
        }

        // Color filter
        if (selectedColors.length > 0) {
            filtered = filtered.filter(p =>
                p.colors?.some(c => selectedColors.includes(c))
            );
        }

        // Type filter
        if (selectedTypes.length > 0) {
            filtered = filtered.filter(p => selectedTypes.includes(p.type));
        }

        // Price filter
        filtered = filtered.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);

        // Sort
        switch (sortBy) {
            case 'newest':
                filtered.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
                break;
            case 'price-low':
                filtered.sort((a, b) => a.price - b.price);
                break;
            case 'price-high':
                filtered.sort((a, b) => b.price - a.price);
                break;
            case 'rating':
                filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
                break;
            default:
                // Featured: best sellers first
                filtered.sort((a, b) => (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0));
        }

        return filtered;
    }, [allProducts, selectedCategories, selectedSizes, selectedColors, selectedTypes, priceRange, sortBy]);

    const clearAllFilters = () => {
        setSelectedCategories([]);
        setSelectedSizes([]);
        setSelectedColors([]);
        setSelectedTypes([]);
        setPriceRange([0, 100]);
    };

    const hasActiveFilters = selectedCategories.length > 0 || selectedSizes.length > 0 ||
        selectedColors.length > 0 || selectedTypes.length > 0;

    return (
        <div className="bg-white min-h-screen">
            {/* Header */}
            <div className="bg-white py-12 md:py-16">
                <div className="container mx-auto">
                    <div className="flex items-center gap-4">
                        <h1 className="font-display text-4xl md:text-5xl font-bold tracking-tight text-[var(--color-dark)]">Shop All</h1>
                        <span className="text-xs font-medium tracking-wide uppercase bg-[var(--color-gray-bg)] text-[var(--color-muted)] px-3 py-1 rounded-sm">{filteredProducts.length} Products</span>
                    </div>
                    <p className="text-base text-[var(--color-muted)] mt-2">Premium military apparel and gear</p>
                </div>
            </div>

            {/* Category Quick Filters - Circular like Zero Foxtrot */}
            <div className="bg-[var(--color-gray-bg)] border-b border-[var(--color-light-gray)] sticky top-0 z-40">
                <div className="container mx-auto py-6">
                    <CategoryFilter
                        collections={collections}
                        selectedCategories={selectedCategories}
                        onSelectCategory={(id) => {
                            setSelectedCategories(id ? [id] : []);
                        }}
                    />
                </div>
            </div>

            <div className="container mx-auto py-8">
                <div className="flex gap-8">
                    {/* Sidebar Filters - Desktop */}
                    <aside className="hidden lg:block w-64 flex-shrink-0">
                        <div className="sticky top-32">
                            <SidebarFilters
                                availableSizes={availableSizes}
                                availableColors={availableColors}
                                selectedSizes={selectedSizes}
                                selectedColors={selectedColors}
                                selectedTypes={selectedTypes}
                                priceRange={priceRange}
                                onSizeToggle={(size: string) => {
                                    setSelectedSizes(prev =>
                                        prev.includes(size)
                                            ? prev.filter(s => s !== size)
                                            : [...prev, size]
                                    );
                                }}
                                onColorToggle={(color: string) => {
                                    setSelectedColors(prev =>
                                        prev.includes(color)
                                            ? prev.filter(c => c !== color)
                                            : [...prev, color]
                                    );
                                }}
                                onTypeToggle={(type: string) => {
                                    setSelectedTypes(prev =>
                                        prev.includes(type)
                                            ? prev.filter(t => t !== type)
                                            : [...prev, type]
                                    );
                                }}
                                onPriceChange={setPriceRange}
                                onClearAll={clearAllFilters}
                            />
                        </div>
                    </aside>

                    {/* Main Content */}
                    <div className="flex-1">
                        {/* Toolbar */}
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                            {/* Results count */}
                            <div className="flex items-center gap-4">
                                <button
                                    onClick={() => setShowMobileFilters(!showMobileFilters)}
                                    className="lg:hidden flex items-center gap-2 px-4 py-2 border border-[var(--color-light-gray)] rounded-sm hover:bg-[var(--color-gray-bg)]"
                                >
                                    <Filter className="h-4 w-4" />
                                    Filters
                                </button>
                                <p className="text-sm text-[var(--color-muted)]">
                                    <span className="font-semibold text-[var(--color-dark)]">{filteredProducts.length}</span> products
                                    {hasActiveFilters && (
                                        <button
                                            onClick={clearAllFilters}
                                            className="ml-3 text-sm text-[var(--color-military-olive)] hover:text-[var(--color-gold)] underline"
                                        >
                                            Clear all
                                        </button>
                                    )}
                                </p>
                            </div>

                            {/* Sort */}
                            <div className="flex items-center gap-3">
                                <label htmlFor="sort" className="text-sm font-medium text-[var(--color-muted)]">
                                    SORT
                                </label>
                                <select
                                    id="sort"
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value as SortOption)}
                                    className="px-4 py-2 border border-[var(--color-light-gray)] rounded-sm bg-white text-sm font-medium hover:border-[var(--color-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--color-military-olive)] cursor-pointer"
                                >
                                    <option value="featured">Featured</option>
                                    <option value="newest">Newest</option>
                                    <option value="price-low">Price: Low to High</option>
                                    <option value="price-high">Price: High to Low</option>
                                    <option value="rating">Top Rated</option>
                                </select>
                            </div>
                        </div>

                        {/* Mobile Filters */}
                        {showMobileFilters && (
                            <div className="lg:hidden mb-6 p-6 bg-[var(--color-gray-bg)] rounded-sm border border-[var(--color-light-gray)]">
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="font-semibold text-lg">Filters</h3>
                                    <button
                                        onClick={() => setShowMobileFilters(false)}
                                        className="p-2 hover:bg-gray-200 rounded-sm"
                                    >
                                        <X className="h-5 w-5" />
                                    </button>
                                </div>
                                <SidebarFilters
                                    availableSizes={availableSizes}
                                    availableColors={availableColors}
                                    selectedSizes={selectedSizes}
                                    selectedColors={selectedColors}
                                    selectedTypes={selectedTypes}
                                    priceRange={priceRange}
                                    onSizeToggle={(size: string) => {
                                        setSelectedSizes(prev =>
                                            prev.includes(size)
                                                ? prev.filter(s => s !== size)
                                                : [...prev, size]
                                        );
                                    }}
                                    onColorToggle={(color: string) => {
                                        setSelectedColors(prev =>
                                            prev.includes(color)
                                                ? prev.filter(c => c !== color)
                                                : [...prev, color]
                                        );
                                    }}
                                    onTypeToggle={(type: string) => {
                                        setSelectedTypes(prev =>
                                            prev.includes(type)
                                                ? prev.filter(t => t !== type)
                                                : [...prev, type]
                                        );
                                    }}
                                    onPriceChange={setPriceRange}
                                    onClearAll={clearAllFilters}
                                />
                            </div>
                        )}

                        {/* Product Grid */}
                        {filteredProducts.length === 0 ? (
                            <div className="text-center py-16">
                                <p className="text-xl text-[var(--color-muted)] mb-4">No products found</p>
                                <button
                                    onClick={clearAllFilters}
                                    className="text-[var(--color-military-olive)] hover:text-[var(--color-gold)] underline"
                                >
                                    Clear all filters
                                </button>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                                {filteredProducts.map((product) => (
                                    <ProductCard key={product.id} product={product} />
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
