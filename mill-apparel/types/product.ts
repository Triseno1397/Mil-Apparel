// Product Types

export interface Product {
    id: string;
    name: string;
    category: 'apparel' | 'accessories';
    type: 'tshirt' | 'hoodie' | 'cap' | 'patch' | 'mug' | 'wallet';
    price: number;
    description: string;
    images: string[];
    inStock: boolean;
    collections: string[];
    branch: 'army' | 'navy' | 'air-force' | 'marines' | 'coast-guard' | 'specialty' | 'other';
    isNew?: boolean;
    isBestSeller?: boolean;
    isCustomizable?: boolean;
    customizationOptions?: CustomizationOptions;
    sizes?: string[];
    colors?: string[];
    material?: string;
    rating?: number;
    reviewCount?: number;
}

export interface CustomizationOptions {
    unitText?: boolean;
    name?: boolean;
    number?: boolean;
    dates?: boolean;
    colors?: boolean;
}

export interface ProductVariant {
    id: string;
    size?: string;
    color?: string;
    sku: string;
    price: number;
    inStock: boolean;
    quantity: number;
}

export interface CustomizationPricing {
    unitText: number; // +$5
    name: number; // +$3
    number: number; // +$2
    dates: number; // +$3
    colorUpgrade: number; // +$4
}

export const CUSTOMIZATION_PRICES: CustomizationPricing = {
    unitText: 5,
    name: 3,
    number: 2,
    dates: 3,
    colorUpgrade: 4,
};
