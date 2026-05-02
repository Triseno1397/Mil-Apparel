'use client';

import { useCart } from '@/context/CartContext';
import Image from 'next/image';
import Link from 'next/link';
import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft, Package, Truck, Shield } from 'lucide-react';

export default function CartPage() {
    const { cart, removeFromCart, updateQuantity } = useCart();

    const shipping = cart.subtotal >= 75 ? 0 : 5.99;
    const tax = cart.subtotal * 0.08;
    const total = cart.subtotal + shipping + tax;

    if (cart.items.length === 0) {
        return (
            <div className="min-h-[100dvh] bg-[var(--color-gray-bg)] flex items-center justify-center">
                <div className="text-center px-4 py-20">
                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-full ring-1 ring-black/10 bg-white mb-6">
                        <ShoppingBag className="h-8 w-8 text-[var(--color-muted)]" />
                    </div>
                    <h1 className="font-display text-2xl font-bold text-[var(--color-dark)] mb-3">
                        Your cart is empty
                    </h1>
                    <p className="text-[var(--color-muted)] mb-8 max-w-sm mx-auto">
                        Looks like you haven&apos;t added anything yet. Browse our collections to find the perfect piece.
                    </p>
                    <Link
                        href="/shop"
                        className="inline-flex items-center gap-2 px-8 py-3.5 bg-[var(--color-military-olive)] text-white font-semibold rounded-full hover:bg-[var(--color-olive-light)] transition-all duration-300 ease-[var(--ease-spring)] hover:scale-[1.02] active:scale-[0.98]"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Continue Shopping
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-[100dvh] bg-[var(--color-gray-bg)]">
            {/* Header */}
            <div className="bg-white border-b border-[var(--color-light-gray)]">
                <div className="container mx-auto py-10 md:py-14">
                    <h1 className="font-display text-3xl md:text-4xl font-bold text-[var(--color-dark)] tracking-[-0.02em] mb-1">Shopping Cart</h1>
                    <p className="text-[var(--color-muted)] text-sm">
                        {cart.itemCount} {cart.itemCount === 1 ? 'item' : 'items'}
                    </p>
                </div>
            </div>

            <div className="container mx-auto py-8 md:py-10">
                <div className="flex flex-col lg:flex-row gap-8">

                    {/* Cart Items */}
                    <div className="flex-1 space-y-3">
                        <Link
                            href="/shop"
                            className="inline-flex items-center gap-2 text-sm text-[var(--color-military-olive)] hover:text-[var(--color-gold)] font-medium transition-colors duration-200 mb-3"
                        >
                            <ArrowLeft className="h-3.5 w-3.5" />
                            Continue Shopping
                        </Link>

                        {cart.items.map((item) => (
                            <div
                                key={`${item.product.id}-${item.selectedSize}-${item.selectedColor}`}
                                className="bg-white rounded-sm ring-1 ring-black/5 p-4 md:p-5 flex gap-4 md:gap-5"
                            >
                                {/* Product Image */}
                                <div className="relative w-20 h-20 sm:w-28 sm:h-28 flex-shrink-0 rounded-sm overflow-hidden bg-[var(--color-gray-bg)]">
                                    <Image
                                        src={item.product.images?.[0] || '/images/placeholder.png'}
                                        alt={item.product.name}
                                        fill
                                        className="object-cover"
                                    />
                                </div>

                                {/* Info */}
                                <div className="flex-1 min-w-0">
                                    <div className="flex justify-between">
                                        <div>
                                            <Link
                                                href={`/products/${item.product.id}`}
                                                className="font-display text-base font-semibold text-[var(--color-dark)] hover:text-[var(--color-military-olive)] transition-colors duration-200 line-clamp-2"
                                            >
                                                {item.product.name}
                                            </Link>
                                            <div className="flex flex-wrap gap-1.5 mt-1.5">
                                                {item.selectedColor && (
                                                    <span className="text-xs text-[var(--color-muted)] bg-[var(--color-gray-bg)] px-2 py-0.5 rounded-sm">
                                                        {item.selectedColor}
                                                    </span>
                                                )}
                                                {item.selectedSize && (
                                                    <span className="text-xs text-[var(--color-muted)] bg-[var(--color-gray-bg)] px-2 py-0.5 rounded-sm">
                                                        Size: {item.selectedSize}
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => removeFromCart(item.product.id)}
                                            className="ml-3 p-1.5 text-[var(--color-muted)] hover:text-[var(--color-error)] hover:bg-[var(--color-error)]/5 rounded-sm transition-all duration-200"
                                            aria-label="Remove item"
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </button>
                                    </div>

                                    {/* Price + Qty */}
                                    <div className="flex items-center justify-between mt-4">
                                        <div className="flex items-center gap-0 ring-1 ring-black/10 rounded-sm overflow-hidden">
                                            <button
                                                onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                                                className="p-2 hover:bg-[var(--color-gray-bg)] transition-colors duration-200"
                                                disabled={item.quantity <= 1}
                                            >
                                                <Minus className="h-3.5 w-3.5" />
                                            </button>
                                            <span className="px-3 font-semibold text-sm text-[var(--color-dark)] min-w-[32px] text-center">
                                                {item.quantity}
                                            </span>
                                            <button
                                                onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                                                className="p-2 hover:bg-[var(--color-gray-bg)] transition-colors duration-200"
                                            >
                                                <Plus className="h-3.5 w-3.5" />
                                            </button>
                                        </div>

                                        <div className="text-right">
                                            <p className="font-display text-lg font-bold text-[var(--color-dark)]">
                                                ${(item.product.price * item.quantity).toFixed(2)}
                                            </p>
                                            {item.quantity > 1 && (
                                                <p className="text-xs text-[var(--color-muted)]">
                                                    ${item.product.price.toFixed(2)} each
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Order Summary */}
                    <div className="lg:w-96">
                        <div className="bg-white rounded-sm ring-1 ring-black/5 p-6 sticky top-32">
                            <h2 className="font-display text-xl font-bold text-[var(--color-dark)] mb-6">
                                Order Summary
                            </h2>

                            <div className="space-y-3 mb-6">
                                <div className="flex justify-between text-sm text-[var(--color-muted)]">
                                    <span>Subtotal ({cart.itemCount} items)</span>
                                    <span className="font-medium text-[var(--color-dark)]">
                                        ${cart.subtotal.toFixed(2)}
                                    </span>
                                </div>
                                <div className="flex justify-between text-sm text-[var(--color-muted)]">
                                    <span>Shipping</span>
                                    <span className={`font-medium ${shipping === 0 ? 'text-[var(--color-success)]' : 'text-[var(--color-dark)]'}`}>
                                        {shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}
                                    </span>
                                </div>
                                <div className="flex justify-between text-sm text-[var(--color-muted)]">
                                    <span>Estimated Tax</span>
                                    <span className="font-medium text-[var(--color-dark)]">
                                        ${tax.toFixed(2)}
                                    </span>
                                </div>

                                {/* Free Shipping Progress */}
                                {cart.subtotal < 75 && (
                                    <div className="bg-[var(--color-gold)]/5 ring-1 ring-[var(--color-gold)]/20 rounded-sm p-3 mt-2">
                                        <p className="text-xs text-[var(--color-dark)] font-medium">
                                            Add <strong>${(75 - cart.subtotal).toFixed(2)}</strong> more for free shipping
                                        </p>
                                        <div className="h-1 bg-[var(--color-gold)]/15 rounded-full mt-2 overflow-hidden">
                                            <div
                                                className="h-full bg-[var(--color-gold)] rounded-full transition-all duration-500"
                                                style={{ width: `${Math.min((cart.subtotal / 75) * 100, 100)}%` }}
                                            />
                                        </div>
                                    </div>
                                )}

                                <div className="border-t border-[var(--color-light-gray)] pt-3 flex justify-between font-bold text-base">
                                    <span className="text-[var(--color-dark)]">Total</span>
                                    <span className="text-[var(--color-dark)] font-display">${total.toFixed(2)}</span>
                                </div>
                            </div>

                            <button
                                disabled
                                className="w-full py-3.5 bg-[var(--color-gold)] text-[var(--color-dark)] font-semibold rounded-full opacity-70 cursor-not-allowed mb-2"
                            >
                                Proceed to Checkout
                            </button>
                            <p className="text-[10px] text-center text-[var(--color-muted)] mb-5">
                                Checkout integration coming soon
                            </p>

                            {/* Trust Badges */}
                            <div className="border-t border-[var(--color-light-gray)] pt-4 space-y-2.5">
                                <div className="flex items-center gap-2.5 text-xs text-[var(--color-muted)]">
                                    <Shield className="h-3.5 w-3.5 text-[var(--color-military-olive)] flex-shrink-0" />
                                    Secure checkout encryption
                                </div>
                                <div className="flex items-center gap-2.5 text-xs text-[var(--color-muted)]">
                                    <Truck className="h-3.5 w-3.5 text-[var(--color-military-olive)] flex-shrink-0" />
                                    Free shipping on orders over $75
                                </div>
                                <div className="flex items-center gap-2.5 text-xs text-[var(--color-muted)]">
                                    <Package className="h-3.5 w-3.5 text-[var(--color-military-olive)] flex-shrink-0" />
                                    30-day easy returns
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
