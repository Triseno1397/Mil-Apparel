'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Cart, CartItem, CartContextType } from '@/types/cart';
import { CUSTOMIZATION_PRICES } from '@/types/product';

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
    const [cart, setCart] = useState<Cart>({
        items: [],
        subtotal: 0,
        itemCount: 0
    });

    // Load cart from localStorage on mount
    useEffect(() => {
        const savedCart = localStorage.getItem('mill-apparel-cart');
        if (savedCart) {
            try {
                setCart(JSON.parse(savedCart));
            } catch (error) {
                console.error('Failed to parse saved cart:', error);
            }
        }
    }, []);

    // Save cart to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem('mill-apparel-cart', JSON.stringify(cart));
    }, [cart]);

    // Calculate total for a single item including customization
    const getItemTotal = (item: CartItem): number => {
        let total = item.product.price * item.quantity;
        if (item.customization) {
            total += item.customization.totalCustomizationCost * item.quantity;
        }
        return total;
    };

    // Recalculate cart totals
    const recalculateCart = (items: CartItem[]) => {
        const subtotal = items.reduce((sum, item) => sum + getItemTotal(item), 0);
        const itemCount = items.reduce((count, item) => count + item.quantity, 0);
        return { items, subtotal, itemCount };
    };

    const addToCart = (newItem: CartItem) => {
        setCart(currentCart => {
            // Check if item already exists (same product, size, color, customization)
            const existingIndex = currentCart.items.findIndex(item =>
                item.product.id === newItem.product.id &&
                item.selectedSize === newItem.selectedSize &&
                item.selectedColor === newItem.selectedColor &&
                JSON.stringify(item.customization) === JSON.stringify(newItem.customization)
            );

            let updatedItems;
            if (existingIndex > -1) {
                // Update quantity of existing item
                updatedItems = [...currentCart.items];
                updatedItems[existingIndex].quantity += newItem.quantity;
            } else {
                // Add new item
                updatedItems = [...currentCart.items, newItem];
            }

            return recalculateCart(updatedItems);
        });
    };

    const removeFromCart = (productId: string) => {
        setCart(currentCart => {
            const updatedItems = currentCart.items.filter(item => item.product.id !== productId);
            return recalculateCart(updatedItems);
        });
    };

    const updateQuantity = (productId: string, quantity: number) => {
        setCart(currentCart => {
            if (quantity <= 0) {
                return recalculateCart(currentCart.items.filter(item => item.product.id !== productId));
            }

            const updatedItems = currentCart.items.map(item =>
                item.product.id === productId ? { ...item, quantity } : item
            );
            return recalculateCart(updatedItems);
        });
    };

    const clearCart = () => {
        setCart({
            items: [],
            subtotal: 0,
            itemCount: 0
        });
    };

    return (
        <CartContext.Provider value={{
            cart,
            addToCart,
            removeFromCart,
            updateQuantity,
            clearCart,
            getItemTotal
        }}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
}
