'use client';

import React from 'react';
import { CustomizationOptions, THREAD_COLORS, FONT_STYLES, FontStyle, TextSize } from '@/types/customization';
import { Palette, Check } from 'lucide-react';

interface StyleSelectorProps {
    options: CustomizationOptions;
    onUpdate: (options: Partial<CustomizationOptions>) => void;
}

export default function StyleSelector({ options, onUpdate }: StyleSelectorProps) {
    const handleColorSelect = (color: string) => {
        onUpdate({ threadColor: color });
    };

    const handleFontSelect = (font: FontStyle) => {
        onUpdate({ fontStyle: font });
    };

    const handleSizeSelect = (size: TextSize) => {
        onUpdate({ textSize: size });
    };

    return (
        <div className="space-y-8">
            <div className="text-center max-w-2xl mx-auto">
                <div className="inline-flex items-center justify-center w-11 h-11 bg-[var(--color-military-olive)]/8 rounded-full mb-4">
                    <Palette className="w-5 h-5 text-[var(--color-military-olive)]" />
                </div>
                <h2 className="text-2xl md:text-3xl font-display font-bold text-[var(--color-dark)] tracking-[-0.02em] mb-2">
                    Choose Your Style
                </h2>
                <p className="text-[var(--color-muted)]">
                    Select thread color, font style, and text size for your customization
                </p>
            </div>

            {/* Thread Color Selector */}
            <div className="bg-white rounded-sm ring-1 ring-black/5 p-5 md:p-6">
                <h3 className="text-xs font-semibold text-[var(--color-muted)] uppercase tracking-[0.08em] mb-4">
                    Thread Color
                </h3>

                <div className="grid grid-cols-4 sm:grid-cols-7 gap-3">
                    {THREAD_COLORS.map((color) => {
                        const isSelected = options.threadColor === color.value;

                        return (
                            <button
                                key={color.value}
                                onClick={() => handleColorSelect(color.value)}
                                className={`flex flex-col items-center gap-2 p-3 rounded-sm transition-all duration-200 ${isSelected
                                        ? 'ring-2 ring-[var(--color-military-olive)] ring-offset-2 bg-[var(--color-gray-bg)]'
                                        : 'hover:bg-[var(--color-gray-bg)] ring-1 ring-black/5'
                                    }`}
                            >
                                <div
                                    className={`w-10 h-10 rounded-full ${color.name === 'White' ? 'ring-1 ring-black/10' : ''}`}
                                    style={{ backgroundColor: color.hex }}
                                />
                                <span className="text-[10px] font-medium text-[var(--color-muted)] text-center leading-tight">
                                    {color.name}
                                </span>
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Font Style Selector */}
            <div className="bg-white rounded-sm ring-1 ring-black/5 p-5 md:p-6">
                <h3 className="text-xs font-semibold text-[var(--color-muted)] uppercase tracking-[0.08em] mb-4">
                    Font Style
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {FONT_STYLES.map((font) => {
                        const isSelected = options.fontStyle === font.id;
                        const isPremium = font.id === 'script';

                        return (
                            <button
                                key={font.id}
                                onClick={() => handleFontSelect(font.id)}
                                className={`relative p-5 rounded-sm transition-all duration-200 text-left ${isSelected
                                        ? 'ring-2 ring-[var(--color-military-olive)] ring-offset-2 bg-[var(--color-gray-bg)]'
                                        : 'ring-1 ring-black/5 hover:ring-[var(--color-military-olive)]/30'
                                    }`}
                            >
                                {isPremium && (
                                    <span className="absolute top-3 right-3 text-[10px] font-semibold text-[var(--color-gold)] bg-[var(--color-gold)]/10 px-2 py-0.5 rounded-sm">
                                        +$2
                                    </span>
                                )}

                                <div className="mb-2">
                                    <p className="text-xs font-semibold text-[var(--color-dark)] mb-1.5">
                                        {font.name}
                                    </p>
                                    <p
                                        className={`text-xl font-bold tracking-wider text-[var(--color-dark)] ${font.id === 'block' ? 'font-sans' :
                                                font.id === 'script' ? 'font-serif italic' :
                                                    font.id === 'stencil' ? 'font-mono' :
                                                        'font-sans'
                                            }`}
                                        style={{
                                            letterSpacing: font.id === 'stencil' ? '0.2em' : font.id === 'block' ? '0.1em' : 'normal'
                                        }}
                                    >
                                        {font.preview}
                                    </p>
                                </div>

                                {isSelected && (
                                    <div className="flex items-center gap-1.5 text-[var(--color-military-olive)]">
                                        <Check className="w-3.5 h-3.5" />
                                        <span className="text-xs font-medium">Selected</span>
                                    </div>
                                )}
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Text Size Selector */}
            <div className="bg-white rounded-sm ring-1 ring-black/5 p-5 md:p-6">
                <h3 className="text-xs font-semibold text-[var(--color-muted)] uppercase tracking-[0.08em] mb-4">
                    Text Size
                </h3>

                <div className="grid grid-cols-3 gap-3">
                    {(['small', 'medium', 'large'] as TextSize[]).map((size) => {
                        const isSelected = options.textSize === size;

                        return (
                            <button
                                key={size}
                                onClick={() => handleSizeSelect(size)}
                                className={`p-5 rounded-sm transition-all duration-200 ${isSelected
                                        ? 'ring-2 ring-[var(--color-military-olive)] ring-offset-2 bg-[var(--color-gray-bg)]'
                                        : 'ring-1 ring-black/5 hover:ring-[var(--color-military-olive)]/30'
                                    }`}
                            >
                                <div className="text-center">
                                    <p className={`font-bold mb-1.5 text-[var(--color-dark)] ${size === 'small' ? 'text-lg' :
                                            size === 'medium' ? 'text-2xl' :
                                                'text-3xl'
                                        }`}>
                                        Aa
                                    </p>
                                    <p className="text-xs font-semibold text-[var(--color-dark)] capitalize">
                                        {size}
                                    </p>
                                    <p className="text-[10px] text-[var(--color-muted)] mt-0.5">
                                        {size === 'small' ? '1"' : size === 'medium' ? '2"' : '3"'} height
                                    </p>
                                </div>
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Preview Box */}
            <div className="p-6 bg-[var(--color-dark)] rounded-sm">
                <p className="text-[10px] text-white/30 uppercase tracking-[0.1em] font-semibold mb-3">Style Preview</p>
                <div className="text-center py-4">
                    <p
                        className={`font-bold tracking-wider ${options.fontStyle === 'block' ? 'font-sans' :
                                options.fontStyle === 'script' ? 'font-serif italic' :
                                    options.fontStyle === 'stencil' ? 'font-mono' :
                                        'font-sans'
                            } ${options.textSize === 'small' ? 'text-2xl' :
                                options.textSize === 'medium' ? 'text-4xl' :
                                    'text-5xl'
                            }`}
                        style={{
                            color: options.threadColor,
                            letterSpacing: options.fontStyle === 'stencil' ? '0.2em' : options.fontStyle === 'block' ? '0.1em' : 'normal'
                        }}
                    >
                        {options.name || options.unit || options.rank || 'YOUR TEXT'}
                    </p>
                </div>
            </div>
        </div>
    );
}
