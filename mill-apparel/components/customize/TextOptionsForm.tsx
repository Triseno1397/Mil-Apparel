'use client';

import React, { useState } from 'react';
import { CustomizationOptions, CUSTOMIZATION_PRICES } from '@/types/customization';
import { validateCustomizationField, sanitizeTextInput } from '@/lib/customization';
import { Type, Award, Users, Calendar, Hash } from 'lucide-react';

interface TextOptionsFormProps {
    options: CustomizationOptions;
    onUpdate: (options: Partial<CustomizationOptions>) => void;
}

export default function TextOptionsForm({ options, onUpdate }: TextOptionsFormProps) {
    const [errors, setErrors] = useState<Record<string, string>>({});

    const handleChange = (field: keyof CustomizationOptions, value: string) => {
        // Clear error for this field
        setErrors((prev) => {
            const newErrors = { ...prev };
            delete newErrors[field];
            return newErrors;
        });

        // Sanitize input (uppercase, remove special chars)
        const sanitized = sanitizeTextInput(value);

        // Validate
        const validation = validateCustomizationField(field as any, sanitized);
        if (!validation.valid && validation.error) {
            setErrors((prev) => ({ ...prev, [field]: validation.error! }));
        }

        // Update options
        onUpdate({ [field]: sanitized });
    };

    const inputClasses = (fieldName: string) =>
        `w-full px-4 py-3 border border-[var(--color-light-gray)] rounded-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-military-olive)]/30 focus:border-[var(--color-military-olive)] transition-all ${errors[fieldName]
            ? 'border-[var(--color-error)] bg-[var(--color-error)]/5'
            : 'border-[var(--color-light-gray)] bg-white'
        }`;

    return (
        <div className="space-y-6">
            <div className="text-center max-w-2xl mx-auto mb-8">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-[var(--color-military-olive)]/8 rounded-full mb-4">
                    <Type className="w-6 h-6 text-[var(--color-military-olive)]" />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-[var(--color-dark)] mb-2">
                    Add Your Text
                </h2>
                <p className="text-[var(--color-muted)]">
                    Choose what you'd like embroidered on your gear. All fields are optional.
                </p>
            </div>

            {/* Name/Call Sign */}
            <div className="bg-white rounded-sm ring-1 ring-black/5 p-5 hover:ring-[var(--color-military-olive)]/20 transition-all duration-200">
                <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 bg-[var(--color-military-olive)]/8 rounded-full flex items-center justify-center">
                        <Type className="w-5 h-5 text-[var(--color-military-olive)]" />
                    </div>

                    <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                            <label htmlFor="name" className="text-sm font-semibold text-[var(--color-dark)]">
                                Name / Call Sign
                            </label>
                            <span className="text-sm font-medium text-[var(--color-gold)]">
                                +${CUSTOMIZATION_PRICES.name}
                            </span>
                        </div>

                        <input
                            id="name"
                            type="text"
                            placeholder="e.g., JOHNSON or MAVERICK"
                            maxLength={20}
                            value={options.name || ''}
                            onChange={(e) => handleChange('name', e.target.value)}
                            className={inputClasses('name')}
                        />

                        {errors.name && (
                            <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                        )}

                        <p className="mt-1 text-xs text-[var(--color-muted)]">
                            2-20 characters. Your last name or military call sign.
                        </p>
                    </div>
                </div>
            </div>

            {/* Rank */}
            <div className="bg-white rounded-sm ring-1 ring-black/5 p-5 hover:ring-[var(--color-military-olive)]/20 transition-all duration-200">
                <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 bg-[var(--color-military-olive)]/8 rounded-full flex items-center justify-center">
                        <Award className="w-5 h-5 text-[var(--color-military-olive)]" />
                    </div>

                    <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                            <label htmlFor="rank" className="text-sm font-semibold text-[var(--color-dark)]">
                                Rank
                            </label>
                            <span className="text-sm font-medium text-[var(--color-gold)]">
                                +${CUSTOMIZATION_PRICES.rank}
                            </span>
                        </div>

                        <input
                            id="rank"
                            type="text"
                            placeholder="e.g., SGT or CAPT"
                            maxLength={15}
                            value={options.rank || ''}
                            onChange={(e) => handleChange('rank', e.target.value)}
                            className={inputClasses('rank')}
                        />

                        {errors.rank && (
                            <p className="mt-1 text-sm text-red-600">{errors.rank}</p>
                        )}

                        <p className="mt-1 text-xs text-[var(--color-muted)]">
                            2-15 characters. Your military rank or rate.
                        </p>
                    </div>
                </div>
            </div>

            {/* Unit/Squadron */}
            <div className="bg-white rounded-sm ring-1 ring-black/5 p-5 hover:ring-[var(--color-military-olive)]/20 transition-all duration-200">
                <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 bg-[var(--color-military-olive)]/8 rounded-full flex items-center justify-center">
                        <Users className="w-5 h-5 text-[var(--color-military-olive)]" />
                    </div>

                    <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                            <label htmlFor="unit" className="text-sm font-semibold text-[var(--color-dark)]">
                                Unit / Squadron
                            </label>
                            <span className="text-sm font-medium text-[var(--color-gold)]">
                                +${CUSTOMIZATION_PRICES.unit}
                            </span>
                        </div>

                        <input
                            id="unit"
                            type="text"
                            placeholder="e.g., 82ND AIRBORNE or SEAL TEAM 3"
                            maxLength={30}
                            value={options.unit || ''}
                            onChange={(e) => handleChange('unit', e.target.value)}
                            className={inputClasses('unit')}
                        />

                        {errors.unit && (
                            <p className="mt-1 text-sm text-red-600">{errors.unit}</p>
                        )}

                        <p className="mt-1 text-xs text-[var(--color-muted)]">
                            5-30 characters. Your unit, squadron, or ship name.
                        </p>
                    </div>
                </div>
            </div>

            {/* Service Dates */}
            <div className="bg-white rounded-sm ring-1 ring-black/5 p-5 hover:ring-[var(--color-military-olive)]/20 transition-all duration-200">
                <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 bg-[var(--color-military-olive)]/8 rounded-full flex items-center justify-center">
                        <Calendar className="w-5 h-5 text-[var(--color-military-olive)]" />
                    </div>

                    <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                            <label htmlFor="serviceDates" className="text-sm font-semibold text-[var(--color-dark)]">
                                Service Dates
                            </label>
                            <span className="text-sm font-medium text-[var(--color-gold)]">
                                +${CUSTOMIZATION_PRICES.serviceDates}
                            </span>
                        </div>

                        <input
                            id="serviceDates"
                            type="text"
                            placeholder="e.g., 2010-2020 or 2015"
                            value={options.serviceDates || ''}
                            onChange={(e) => handleChange('serviceDates', e.target.value)}
                            className={inputClasses('serviceDates')}
                        />

                        {errors.serviceDates && (
                            <p className="mt-1 text-sm text-red-600">{errors.serviceDates}</p>
                        )}

                        <p className="mt-1 text-xs text-[var(--color-muted)]">
                            Format: YYYY or YYYY-YYYY (e.g., 2010-2020)
                        </p>
                    </div>
                </div>
            </div>

            {/* Custom Number */}
            <div className="bg-white rounded-sm ring-1 ring-black/5 p-5 hover:ring-[var(--color-military-olive)]/20 transition-all duration-200">
                <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 bg-[var(--color-military-olive)]/8 rounded-full flex items-center justify-center">
                        <Hash className="w-5 h-5 text-[var(--color-military-olive)]" />
                    </div>

                    <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                            <label htmlFor="customNumber" className="text-sm font-semibold text-[var(--color-dark)]">
                                Custom Number
                            </label>
                            <span className="text-sm font-medium text-[var(--color-gold)]">
                                +${CUSTOMIZATION_PRICES.customNumber}
                            </span>
                        </div>

                        <input
                            id="customNumber"
                            type="text"
                            placeholder="e.g., 1 or 99"
                            maxLength={3}
                            value={options.customNumber || ''}
                            onChange={(e) => handleChange('customNumber', e.target.value)}
                            className={inputClasses('customNumber')}
                        />

                        {errors.customNumber && (
                            <p className="mt-1 text-sm text-red-600">{errors.customNumber}</p>
                        )}

                        <p className="mt-1 text-xs text-[var(--color-muted)]">
                            1-3 digits. Jersey-style number or badge number.
                        </p>
                    </div>
                </div>
            </div>

            {/* Info Box */}
            <div className="mt-8 p-4 bg-[var(--color-military-olive)]/5 ring-1 ring-[var(--color-military-olive)]/15 rounded-sm">
                <h4 className="text-sm font-semibold text-[var(--color-dark)] mb-2">
                    Customization Guidelines
                </h4>
                <ul className="text-sm text-[var(--color-body-text)] space-y-1">
                    <li>• All text is automatically converted to UPPERCASE military style</li>
                    <li>• Special characters are removed for clean embroidery</li>
                    <li>• Select at least one option to proceed</li>
                    <li>• Preview your design in the next step</li>
                </ul>
            </div>
        </div>
    );
}
