// Customization Type Definitions

export type PlacementLocation =
    | 'front-left'
    | 'front-center'
    | 'front-right'
    | 'back-upper'
    | 'back-center'
    | 'sleeve-left'
    | 'sleeve-right';

export type TextType =
    | 'name'
    | 'rank'
    | 'unit'
    | 'dates'
    | 'number';

export type FontStyle =
    | 'block'
    | 'script'
    | 'stencil'
    | 'modern';

export type TextSize =
    | 'small'
    | 'medium'
    | 'large';

export interface Placement {
    location: PlacementLocation;
    text: string;
    type: TextType;
}

export interface CustomizationOptions {
    // Text Options
    name?: string;
    rank?: string;
    unit?: string;
    serviceDates?: string;
    customNumber?: string;

    // Style Options
    threadColor: string;
    fontStyle: FontStyle;
    textSize: TextSize;

    // Placement
    placements: Placement[];
}

export interface CustomizationData {
    // Product Info
    productId: string;
    productName: string;
    productImage: string;
    basePrice: number;

    // Customization Details
    options: CustomizationOptions;

    // Pricing
    customizationCost: number;
    totalPrice: number;

    // Metadata
    createdAt: string;
    savedDesignId?: string;
}

export interface CustomizationPricing {
    name: number;          // +$8
    rank: number;          // +$5
    unit: number;          // +$8
    serviceDates: number;  // +$5
    customNumber: number;  // +$3
    scriptFont: number;    // +$2 (premium font)
}

export const CUSTOMIZATION_PRICES: CustomizationPricing = {
    name: 8,
    rank: 5,
    unit: 8,
    serviceDates: 5,
    customNumber: 3,
    scriptFont: 2,
};

export interface ValidationRules {
    name: { min: number; max: number };
    rank: { min: number; max: number };
    unit: { min: number; max: number };
    serviceDates: { pattern: RegExp };
    customNumber: { min: number; max: number; pattern: RegExp };
}

export const VALIDATION_RULES: ValidationRules = {
    name: { min: 2, max: 20 },
    rank: { min: 2, max: 15 },
    unit: { min: 5, max: 30 },
    serviceDates: { pattern: /^\d{4}(-\d{4})?$/ }, // e.g., "2010-2020" or "2015"
    customNumber: { min: 0, max: 999, pattern: /^\d{1,3}$/ },
};

export const THREAD_COLORS = [
    { name: 'Gold', value: '#D4AF37', hex: '#D4AF37' },
    { name: 'Silver', value: '#C0C0C0', hex: '#C0C0C0' },
    { name: 'Black', value: '#000000', hex: '#000000' },
    { name: 'White', value: '#FFFFFF', hex: '#FFFFFF' },
    { name: 'Navy Blue', value: '#000080', hex: '#000080' },
    { name: 'Olive Drab', value: '#6B7C3C', hex: '#6B7C3C' },
    { name: 'Red', value: '#DC143C', hex: '#DC143C' },
];

export const FONT_STYLES: Array<{ id: FontStyle; name: string; preview: string }> = [
    { id: 'block', name: 'Block Letters', preview: 'MILITARY' },
    { id: 'script', name: 'Script (Premium +$2)', preview: 'Military' },
    { id: 'stencil', name: 'Stencil', preview: 'MILITARY' },
    { id: 'modern', name: 'Modern Sans', preview: 'MILITARY' },
];

export const PLACEMENT_LOCATIONS: Array<{
    id: PlacementLocation;
    name: string;
    description: string;
    recommended: TextType[];
}> = [
        {
            id: 'front-left',
            name: 'Front Left Chest',
            description: 'Traditional name tape position',
            recommended: ['name', 'rank']
        },
        {
            id: 'front-center',
            name: 'Front Center Chest',
            description: 'Bold, centered placement',
            recommended: ['unit', 'name']
        },
        {
            id: 'front-right',
            name: 'Front Right Chest',
            description: 'Branch or unit insignia area',
            recommended: ['unit', 'rank']
        },
        {
            id: 'back-upper',
            name: 'Upper Back',
            description: 'Between shoulders',
            recommended: ['unit', 'name']
        },
        {
            id: 'back-center',
            name: 'Center Back',
            description: 'Large, prominent display',
            recommended: ['unit', 'name', 'dates']
        },
        {
            id: 'sleeve-left',
            name: 'Left Sleeve',
            description: 'Flag or unit patch position',
            recommended: ['unit', 'dates']
        },
        {
            id: 'sleeve-right',
            name: 'Right Sleeve',
            description: 'Rank or specialty insignia',
            recommended: ['rank', 'number']
        },
    ];
