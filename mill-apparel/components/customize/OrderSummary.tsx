'use client';

import { useCustomizer } from '@/context/CustomizerContext';
import { ShoppingCart, TruckIcon, RefreshCw, ShieldCheck } from 'lucide-react';
import { useMemo } from 'react';

// Pricing configuration
const BASE_PRICES: Record<string, number> = {
    'tshirt': 24.99,
    'hoodie': 39.99,
    'longsleeve': 29.99,
    'tank': 22.99,
};

const ADDON_PRICES = {
    backPrint: 5.00,
    sleevePrint: 4.00,
    embroidery: 8.00,
};

const SIZES = ['XS', 'S', 'M', 'L', 'XL', '2XL', '3XL'];

interface OrderSummaryProps {
    onAddToCart?: () => void;
    onCheckout?: () => void;
}

export default function OrderSummary({ onAddToCart, onCheckout }: OrderSummaryProps) {
    const {
        productType,
        productSize,
        setProductSize,
        quantity,
        setQuantity,
        addOns,
        toggleAddOn,
        isGiftMode,
        setGiftMode,
    } = useCustomizer();

    // Calculate total price
    const totalPrice = useMemo(() => {
        const basePrice = BASE_PRICES[productType] || 29.99;
        let addOnsTotal = 0;

        if (addOns.backPrint) addOnsTotal += ADDON_PRICES.backPrint;
        if (addOns.sleevePrint) addOnsTotal += ADDON_PRICES.sleevePrint;
        if (addOns.embroidery) addOnsTotal += ADDON_PRICES.embroidery;

        return (basePrice + addOnsTotal) * quantity;
    }, [productType, addOns, quantity]);

    const basePrice = BASE_PRICES[productType] || 29.99;

    return (
        <div className="p-4 space-y-4">
            {/* Header */}
            <div className="flex items-center gap-2 pb-3 border-b border-gray-800">
                <ShoppingCart className="h-5 w-5 text-[#FF6B35]" />
                <h3 className="text-white font-bold text-lg">Order Summary</h3>
            </div>

            {/* Price Breakdown */}
            <div className="space-y-2">
                <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Base Price</span>
                    <span className="text-white font-semibold">${basePrice.toFixed(2)}</span>
                </div>

                {addOns.backPrint && (
                    <div className="flex justify-between text-sm">
                        <span className="text-gray-400">+ Back Print</span>
                        <span className="text-white">+${ADDON_PRICES.backPrint.toFixed(2)}</span>
                    </div>
                )}

                {addOns.sleevePrint && (
                    <div className="flex justify-between text-sm">
                        <span className="text-gray-400">+ Sleeve Print</span>
                        <span className="text-white">+${ADDON_PRICES.sleevePrint.toFixed(2)}</span>
                    </div>
                )}

                {addOns.embroidery && (
                    <div className="flex justify-between text-sm">
                        <span className="text-gray-400">+ Embroidery Upgrade</span>
                        <span className="text-white">+${ADDON_PRICES.embroidery.toFixed(2)}</span>
                    </div>
                )}
            </div>

            {/* Size & Quantity */}
            <div className="grid grid-cols-2 gap-3">
                <div>
                    <label className="text-gray-400 text-xs mb-1 block">Size</label>
                    <select
                        value={productSize}
                        onChange={(e) => setProductSize(e.target.value)}
                        className="w-full bg-[#0a0a0a] text-white text-sm px-3 py-2 rounded border border-gray-700 focus:border-[#FF6B35] focus:outline-none"
                    >
                        {SIZES.map((size) => (
                            <option key={size} value={size}>
                                {size}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="text-gray-400 text-xs mb-1 block">Quantity</label>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => setQuantity(quantity - 1)}
                            disabled={quantity <= 1}
                            className="w-8 h-8 bg-[#0a0a0a] text-white rounded border border-gray-700 hover:border-[#FF6B35] disabled:opacity-30 disabled:cursor-not-allowed"
                        >
                            -
                        </button>
                        <input
                            type="number"
                            value={quantity}
                            onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                            className="w-12 bg-[#0a0a0a] text-white text-sm text-center px-2 py-2 rounded border border-gray-700 focus:border-[#FF6B35] focus:outline-none"
                            min="1"
                        />
                        <button
                            onClick={() => setQuantity(quantity + 1)}
                            className="w-8 h-8 bg-[#0a0a0a] text-white rounded border border-gray-700 hover:border-[#FF6B35]"
                        >
                            +
                        </button>
                    </div>
                </div>
            </div>

            {/* Add-Ons */}
            <div>
                <h4 className="text-gray-400 text-xs mb-2 font-semibold">Add-Ons</h4>
                <div className="space-y-2">
                    <label className="flex items-center justify-between cursor-pointer group">
                        <div className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                checked={addOns.backPrint}
                                onChange={() => toggleAddOn('backPrint')}
                                className="w-4 h-4 rounded border-gray-700 bg-[#0a0a0a] checked:bg-[#FF6B35] focus:ring-[#FF6B35]"
                            />
                            <span className="text-sm text-gray-300 group-hover:text-white">Back Print</span>
                        </div>
                        <span className="text-sm text-gray-400">+${ADDON_PRICES.backPrint.toFixed(2)}</span>
                    </label>

                    <label className="flex items-center justify-between cursor-pointer group">
                        <div className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                checked={addOns.sleevePrint}
                                onChange={() => toggleAddOn('sleevePrint')}
                                className="w-4 h-4 rounded border-gray-700 bg-[#0a0a0a] checked:bg-[#FF6B35] focus:ring-[#FF6B35]"
                            />
                            <span className="text-sm text-gray-300 group-hover:text-white">Sleeve Print</span>
                        </div>
                        <span className="text-sm text-gray-400">+${ADDON_PRICES.sleevePrint.toFixed(2)}</span>
                    </label>

                    <label className="flex items-center justify-between cursor-pointer group">
                        <div className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                checked={addOns.embroidery}
                                onChange={() => toggleAddOn('embroidery')}
                                className="w-4 h-4 rounded border-gray-700 bg-[#0a0a0a] checked:bg-[#FF6B35] focus:ring-[#FF6B35]"
                            />
                            <span className="text-sm text-gray-300 group-hover:text-white">Embroidery Upgrade</span>
                        </div>
                        <span className="text-sm text-gray-400">+${ADDON_PRICES.embroidery.toFixed(2)}</span>
                    </label>
                </div>
            </div>

            {/* Gift Mode */}
            <div className="pt-3 border-t border-gray-800">
                <label className="flex items-center gap-2 cursor-pointer">
                    <input
                        type="checkbox"
                        checked={isGiftMode}
                        onChange={(e) => setGiftMode(e.target.checked)}
                        className="w-4 h-4 rounded border-gray-700 bg-[#0a0a0a] checked:bg-[#FF6B35] focus:ring-[#FF6B35]"
                    />
                    <span className="text-sm text-gray-300">Is this a gift?</span>
                </label>

                {isGiftMode && (
                    <div className="mt-3 space-y-2">
                        <textarea
                            placeholder="Add a gift message..."
                            className="w-full bg-[#0a0a0a] text-white text-sm px-3 py-2 rounded border border-gray-700 focus:border-[#FF6B35] focus:outline-none resize-none"
                            rows={3}
                        />
                        <p className="text-xs text-gray-500">
                            💡 Bundle with hat + patch for 15% off
                        </p>
                    </div>
                )}
            </div>

            {/* Total Price */}
            <div className="pt-3 border-t border-gray-800">
                <div className="flex justify-between items-baseline mb-4">
                    <span className="text-gray-400 text-sm">Total</span>
                    <span className="text-white font-bold text-2xl">${totalPrice.toFixed(2)}</span>
                </div>

                {/* CTA Buttons */}
                <div className="space-y-2">
                    <button
                        onClick={onAddToCart}
                        className="w-full px-6 py-3 bg-[#FF6B35] hover:bg-[#ff5722] text-white font-bold rounded-lg transition-colors shadow-lg"
                    >
                        Add to Cart
                    </button>
                    <button
                        onClick={onCheckout}
                        className="w-full px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white font-semibold rounded-lg transition-colors"
                    >
                        Checkout
                    </button>
                </div>
            </div>

            {/* Trust Indicators */}
            <div className="grid grid-cols-3 gap-2 pt-3 border-t border-gray-800">
                <div className="text-center">
                    <TruckIcon className="h-4 w-4 text-gray-500 mx-auto mb-1" />
                    <p className="text-[10px] text-gray-500">Fast Ship</p>
                </div>
                <div className="text-center">
                    <RefreshCw className="h-4 w-4 text-gray-500 mx-auto mb-1" />
                    <p className="text-[10px] text-gray-500">Easy Returns</p>
                </div>
                <div className="text-center">
                    <ShieldCheck className="h-4 w-4 text-gray-500 mx-auto mb-1" />
                    <p className="text-[10px] text-gray-500">Secure</p>
                </div>
            </div>
        </div>
    );
}
