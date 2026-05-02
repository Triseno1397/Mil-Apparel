'use client';

interface SidebarFiltersProps {
    availableSizes: string[];
    availableColors: string[];
    selectedSizes: string[];
    selectedColors: string[];
    selectedTypes: string[];
    priceRange: [number, number];
    onSizeToggle: (size: string) => void;
    onColorToggle: (color: string) => void;
    onTypeToggle: (type: string) => void;
    onPriceChange: (range: [number, number]) => void;
    onClearAll: () => void;
}

const productTypes = [
    { id: 'tshirt', label: 'T-Shirts' },
    { id: 'hoodie', label: 'Hoodies' },
    { id: 'cap', label: 'Caps' },
    { id: 'patch', label: 'Patches' },
    { id: 'mug', label: 'Mugs' },
    { id: 'wallet', label: 'Wallets' },
];

// Color name to hex mapping for visual swatches
const colorMap: Record<string, string> = {
    'Black': '#000000',
    'White': '#FFFFFF',
    'Navy': '#001F3D',
    'OD Green': '#4A5D23',
    'Gray': '#808080',
    'Scarlet': '#C41E3A',
    'Gold': '#FFD700',
    'Air Force Blue': '#00308F',
    'Orange': '#FF6600',
    'Tan': '#D2B48C',
};

export default function SidebarFilters({
    availableSizes,
    availableColors,
    selectedSizes,
    selectedColors,
    selectedTypes,
    priceRange,
    onSizeToggle,
    onColorToggle,
    onTypeToggle,
    onPriceChange,
    onClearAll,
}: SidebarFiltersProps) {
    return (
        <div className="space-y-8">
            {/* Size Filter */}
            <div className="space-y-3">
                <h3 className="text-sm font-bold uppercase tracking-wide text-[var(--color-dark)]">
                    SIZE
                </h3>
                <div className="space-y-2">
                    {availableSizes.map((size) => {
                        const isSelected = selectedSizes.includes(size);
                        return (
                            <button
                                key={size}
                                onClick={() => onSizeToggle(size)}
                                className={`block w-full text-left px-3 py-2 text-sm rounded transition-colors ${isSelected
                                        ? 'bg-[var(--color-dark)] text-white font-semibold'
                                        : 'text-gray-700 hover:bg-gray-100'
                                    }`}
                            >
                                {size}
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Color Filter */}
            <div className="space-y-3">
                <h3 className="text-sm font-bold uppercase tracking-wide text-[var(--color-dark)]">
                    COLOR
                </h3>
                <div className="grid grid-cols-5 gap-2">
                    {availableColors.map((color) => {
                        const isSelected = selectedColors.includes(color);
                        const hexColor = colorMap[color] || '#CCCCCC';

                        return (
                            <button
                                key={color}
                                onClick={() => onColorToggle(color)}
                                title={color}
                                className={`relative w-10 h-10 rounded-full border-2 transition-all ${isSelected
                                        ? 'border-[var(--color-military-olive)] ring-2 ring-[var(--color-military-olive)]/30 scale-110'
                                        : 'border-gray-300 hover:border-gray-400 hover:scale-105'
                                    }`}
                                style={{ backgroundColor: hexColor }}
                            >
                                {/* White border for light colors */}
                                {(color === 'White' || color === 'Tan') && (
                                    <div className="absolute inset-0 rounded-full border border-gray-300" />
                                )}
                                {/* Checkmark for selected */}
                                {isSelected && (
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div className="w-3 h-3 bg-white rounded-full border-2 border-[var(--color-dark)]" />
                                    </div>
                                )}
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Product Type Filter */}
            <div className="space-y-3">
                <h3 className="text-sm font-bold uppercase tracking-wide text-[var(--color-dark)]">
                    CATEGORY
                </h3>
                <div className="space-y-2">
                    {productTypes.map((type) => {
                        const isSelected = selectedTypes.includes(type.id);
                        return (
                            <label
                                key={type.id}
                                className="flex items-center gap-3 cursor-pointer group"
                            >
                                <input
                                    type="checkbox"
                                    checked={isSelected}
                                    onChange={() => onTypeToggle(type.id)}
                                    className="w-4 h-4 rounded border-gray-300 text-[var(--color-military-olive)] focus:ring-[var(--color-military-olive)] cursor-pointer"
                                />
                                <span className="text-sm text-gray-700 group-hover:text-[var(--color-dark)]">
                                    {type.label}
                                </span>
                            </label>
                        );
                    })}
                </div>
            </div>

            {/* Price Range Filter */}
            <div className="space-y-3">
                <h3 className="text-sm font-bold uppercase tracking-wide text-[var(--color-dark)]">
                    PRICE
                </h3>
                <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                        <span className="font-semibold">${priceRange[0]}</span>
                        <span className="text-gray-500">to</span>
                        <span className="font-semibold">${priceRange[1]}</span>
                    </div>
                    <input
                        type="range"
                        min="0"
                        max="100"
                        value={priceRange[1]}
                        onChange={(e) => onPriceChange([priceRange[0], Number(e.target.value)])}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[var(--color-military-olive)]"
                    />
                </div>
            </div>

            {/* Clear All */}
            <button
                onClick={onClearAll}
                className="w-full py-2 text-sm font-semibold text-[var(--color-military-olive)] hover:text-[var(--color-gold)] underline"
            >
                Clear All Filters
            </button>
        </div>
    );
}
