// Customization Utility Functions

import {
    CustomizationData,
    CustomizationOptions,
    CUSTOMIZATION_PRICES,
    VALIDATION_RULES,
    FontStyle,
} from '@/types/customization';

/**
 * Calculate the total cost of customizations
 */
export function calculateCustomizationCost(options: CustomizationOptions): number {
    let cost = 0;

    if (options.name && options.name.trim()) {
        cost += CUSTOMIZATION_PRICES.name;
    }

    if (options.rank && options.rank.trim()) {
        cost += CUSTOMIZATION_PRICES.rank;
    }

    if (options.unit && options.unit.trim()) {
        cost += CUSTOMIZATION_PRICES.unit;
    }

    if (options.serviceDates && options.serviceDates.trim()) {
        cost += CUSTOMIZATION_PRICES.serviceDates;
    }

    if (options.customNumber && options.customNumber.trim()) {
        cost += CUSTOMIZATION_PRICES.customNumber;
    }

    // Premium font style
    if (options.fontStyle === 'script') {
        cost += CUSTOMIZATION_PRICES.scriptFont;
    }

    return cost;
}

/**
 * Calculate total price (base + customization)
 */
export function calculateTotalPrice(basePrice: number, options: CustomizationOptions): number {
    const customizationCost = calculateCustomizationCost(options);
    return basePrice + customizationCost;
}

/**
 * Validate customization text input
 */
export function validateCustomizationField(
    field: keyof typeof VALIDATION_RULES,
    value: string
): { valid: boolean; error?: string } {
    if (!value || value.trim() === '') {
        return { valid: true }; // Optional fields
    }

    const rules = VALIDATION_RULES[field];

    // Check length for text fields
    if ('min' in rules && 'max' in rules) {
        const length = value.trim().length;

        if (field === 'customNumber') {
            const num = parseInt(value, 10);
            if (isNaN(num) || num < rules.min || num > rules.max) {
                return {
                    valid: false,
                    error: `Number must be between ${rules.min} and ${rules.max}`,
                };
            }
        } else {
            if (length < rules.min) {
                return {
                    valid: false,
                    error: `Must be at least ${rules.min} characters`,
                };
            }
            if (length > rules.max) {
                return {
                    valid: false,
                    error: `Must be no more than ${rules.max} characters`,
                };
            }
        }
    }

    // Check pattern for date/number fields
    if ('pattern' in rules && rules.pattern) {
        if (!rules.pattern.test(value.trim())) {
            if (field === 'serviceDates') {
                return {
                    valid: false,
                    error: 'Format: YYYY or YYYY-YYYY (e.g., 2010-2020)',
                };
            }
            if (field === 'customNumber') {
                return {
                    valid: false,
                    error: 'Must be a number (1-999)',
                };
            }
        }
    }

    return { valid: true };
}

/**
 * Validate all customization options
 */
export function validateAllOptions(options: CustomizationOptions): {
    valid: boolean;
    errors: Record<string, string>;
} {
    const errors: Record<string, string> = {};

    // Validate each field
    const fields: Array<keyof typeof VALIDATION_RULES> = [
        'name',
        'rank',
        'unit',
        'serviceDates',
        'customNumber',
    ];

    fields.forEach((field) => {
        const value = options[field];
        if (value) {
            const result = validateCustomizationField(field, value);
            if (!result.valid && result.error) {
                errors[field] = result.error;
            }
        }
    });

    // Check that at least one customization is selected
    const hasAnyCustomization =
        options.name ||
        options.rank ||
        options.unit ||
        options.serviceDates ||
        options.customNumber;

    if (!hasAnyCustomization) {
        errors.general = 'Please add at least one customization';
    }

    // Check that at least one placement is assigned
    if (options.placements.length === 0 && hasAnyCustomization) {
        errors.placements = 'Please choose where to place your customizations';
    }

    return {
        valid: Object.keys(errors).length === 0,
        errors,
    };
}

/**
 * Format customization data for cart
 */
export function formatCustomizationForCart(data: CustomizationData): string {
    const parts: string[] = [];

    if (data.options.name) {
        parts.push(`Name: ${data.options.name}`);
    }

    if (data.options.rank) {
        parts.push(`Rank: ${data.options.rank}`);
    }

    if (data.options.unit) {
        parts.push(`Unit: ${data.options.unit}`);
    }

    if (data.options.serviceDates) {
        parts.push(`Dates: ${data.options.serviceDates}`);
    }

    if (data.options.customNumber) {
        parts.push(`Number: ${data.options.customNumber}`);
    }

    parts.push(`Thread: ${data.options.threadColor}`);
    parts.push(`Font: ${data.options.fontStyle}`);
    parts.push(`Size: ${data.options.textSize}`);

    return parts.join(' | ');
}

/**
 * Create price breakdown array
 */
export function getPriceBreakdown(basePrice: number, options: CustomizationOptions): Array<{
    label: string;
    price: number;
}> {
    const breakdown = [
        { label: 'Base Product', price: basePrice },
    ];

    if (options.name && options.name.trim()) {
        breakdown.push({ label: 'Name/Call Sign', price: CUSTOMIZATION_PRICES.name });
    }

    if (options.rank && options.rank.trim()) {
        breakdown.push({ label: 'Rank', price: CUSTOMIZATION_PRICES.rank });
    }

    if (options.unit && options.unit.trim()) {
        breakdown.push({ label: 'Unit/Squadron', price: CUSTOMIZATION_PRICES.unit });
    }

    if (options.serviceDates && options.serviceDates.trim()) {
        breakdown.push({ label: 'Service Dates', price: CUSTOMIZATION_PRICES.serviceDates });
    }

    if (options.customNumber && options.customNumber.trim()) {
        breakdown.push({ label: 'Custom Number', price: CUSTOMIZATION_PRICES.customNumber });
    }

    if (options.fontStyle === 'script') {
        breakdown.push({ label: 'Premium Script Font', price: CUSTOMIZATION_PRICES.scriptFont });
    }

    return breakdown;
}

/**
 * Check if customization options have been modified
 */
export function hasCustomizations(options: CustomizationOptions): boolean {
    return !!(
        options.name ||
        options.rank ||
        options.unit ||
        options.serviceDates ||
        options.customNumber
    );
}

/**
 * Get default customization options
 */
export function getDefaultCustomizationOptions(): CustomizationOptions {
    return {
        name: '',
        rank: '',
        unit: '',
        serviceDates: '',
        customNumber: '',
        threadColor: '#D4AF37', // Gold
        fontStyle: 'block',
        textSize: 'medium',
        placements: [],
    };
}

/**
 * Sanitize text input (remove special characters, trim)
 */
export function sanitizeTextInput(input: string): string {
    return input
        .trim()
        .replace(/[^\w\s\-\.]/gi, '') // Allow letters, numbers, spaces, hyphens, periods
        .toUpperCase(); // Military style all caps
}
