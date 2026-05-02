import { Product } from '@/types/product';
import productsData from '@/config/products.json';

const products = productsData as Product[];

/**
 * Get all products
 */
export function getProducts(): Product[] {
    return products;
}

/**
 * Alias for getProducts
 */
export function getAllProducts(): Product[] {
    return products;
}

/**
 * Get product by ID
 */
export function getProductById(id: string): Product | undefined {
    return products.find((p) => p.id === id);
}

/**
 * Filter products by collection
 */
export function getProductsByCollection(collectionId: string): Product[] {
    return products.filter((p) => p.collections.includes(collectionId));
}

/**
 * Filter products by branch (strict filtering for branch pages)
 */
export function getProductsByBranch(branch: string): Product[] {
    return products.filter((p) => p.branch === branch);
}


/**
 * Filter products by category
 */
export function getProductsByCategory(category: string): Product[] {
    return products.filter((p) => p.category === category);
}

/**
 * Filter products by type
 */
export function getProductsByType(type: string): Product[] {
    return products.filter((p) => p.type === type);
}

/**
 * Get best seller products
 */
export function getBestSellers(): Product[] {
    return products.filter((p) => p.isBestSeller);
}

/**
 * Get new products
 */
export function getNewProducts(): Product[] {
    return products.filter((p) => p.isNew);
}

/**
 * Get customizable products
 */
export function getCustomizableProducts(): Product[] {
    return products.filter((p) => p.isCustomizable);
}

/**
 * Sort products
 */
export function sortProducts(
    products: Product[],
    sortBy: 'featured' | 'price-low' | 'price-high' | 'newest' | 'best-selling'
): Product[] {
    const sorted = [...products];

    switch (sortBy) {
        case 'price-low':
            return sorted.sort((a, b) => a.price - b.price);
        case 'price-high':
            return sorted.sort((a, b) => b.price - a.price);
        case 'newest':
            return sorted.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
        case 'best-selling':
            return sorted.sort((a, b) => (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0));
        default:
            return sorted;
    }
}

/**
 * Search products
 */
export function searchProducts(query: string): Product[] {
    const lowerQuery = query.toLowerCase();
    return products.filter((p) =>
        p.name.toLowerCase().includes(lowerQuery) ||
        p.description.toLowerCase().includes(lowerQuery)
    );
}
