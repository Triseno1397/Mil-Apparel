// Cart Types

import { Product } from './product';

export interface CartItem {
    product: Product;
    quantity: number;
    selectedSize?: string;
    selectedColor?: string;
    customization?: CartItemCustomization;
}

export interface CartItemCustomization {
    // Text Options
    name?: string;
    rank?: string;
    unitText?: string;
    unit?: string; // Alias for unitText
    serviceDates?: string;
    dates?: string; // Alias for serviceDates
    customNumber?: string;
    number?: string; // Alias for customNumber

    // Style Options
    threadColor?: string;
    fontStyle?: string;
    textSize?: string;
    colorUpgrade?: string; // Legacy support

    // Builder-based customization
    layers?: any[]; // Layers from the interactive builder
    productId?: string; // Product ID for builder items

    // Pricing
    totalCustomizationCost: number;
}

export interface Cart {
    items: CartItem[];
    subtotal: number;
    itemCount: number;
}

export interface CartContextType {
    cart: Cart;
    addToCart: (item: CartItem) => void;
    removeFromCart: (productId: string) => void;
    updateQuantity: (productId: string, quantity: number) => void;
    clearCart: () => void;
    getItemTotal: (item: CartItem) => number;
}
