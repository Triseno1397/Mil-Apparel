'use client';

import { useState } from 'react';
import { Minus, Plus } from 'lucide-react';

export default function QuantitySelector() {
    const [quantity, setQuantity] = useState(1);

    const increment = () => setQuantity((prev) => Math.min(prev + 1, 99));
    const decrement = () => setQuantity((prev) => Math.max(prev - 1, 1));

    return (
        <div>
            <h3 className="text-sm font-bold uppercase tracking-wide text-[var(--color-dark)] mb-3">
                Quantity
            </h3>
            <div className="flex items-center gap-3">
                <button
                    onClick={decrement}
                    disabled={quantity <= 1}
                    className="p-3 border-2 border-gray-300 rounded-lg hover:border-gray-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    aria-label="Decrease quantity"
                >
                    <Minus className="h-4 w-4" />
                </button>
                <input
                    type="number"
                    value={quantity}
                    onChange={(e) => {
                        const val = parseInt(e.target.value) || 1;
                        setQuantity(Math.max(1, Math.min(val, 99)));
                    }}
                    className="w-20 text-center text-lg font-semibold border-2 border-gray-300 rounded-lg py-2 focus:outline-none focus:ring-2 focus:ring-[var(--color-military-olive)] focus:border-transparent"
                    min="1"
                    max="99"
                />
                <button
                    onClick={increment}
                    disabled={quantity >= 99}
                    className="p-3 border-2 border-gray-300 rounded-lg hover:border-gray-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    aria-label="Increase quantity"
                >
                    <Plus className="h-4 w-4" />
                </button>
            </div>
        </div>
    );
}
