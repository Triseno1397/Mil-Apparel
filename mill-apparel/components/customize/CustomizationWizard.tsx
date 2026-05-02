'use client';

import React, { useState, useMemo } from 'react';
import { Product } from '@/types/product';
import { CustomizationOptions } from '@/types/customization';
import {
    calculateCustomizationCost,
    calculateTotalPrice,
    getPriceBreakdown,
    getDefaultCustomizationOptions,
    hasCustomizations,
} from '@/lib/customization';
import ProgressStepper, { Step } from './ProgressStepper';
import ProductSelector from './ProductSelector';
import TextOptionsForm from './TextOptionsForm';
import StyleSelector from './StyleSelector';
import PriceBreakdown from './PriceBreakdown';
import Button from '@/components/ui/Button';
import { ArrowLeft, ArrowRight, ShoppingCart } from 'lucide-react';

interface CustomizationWizardProps {
    products: Product[];
    preselectedProductId?: string;
    onAddToCart?: (productId: string, customization: CustomizationOptions, totalPrice: number) => void;
}

const STEPS: Step[] = [
    { id: 1, name: 'Select Product', description: 'Choose your item' },
    { id: 2, name: 'Add Text', description: 'Personalize it' },
    { id: 3, name: 'Choose Style', description: 'Pick colors & fonts' },
    { id: 4, name: 'Review', description: 'Finalize & add to cart' },
];

export default function CustomizationWizard({
    products,
    preselectedProductId,
    onAddToCart,
}: CustomizationWizardProps) {
    const [currentStep, setCurrentStep] = useState(preselectedProductId ? 2 : 1);
    const [selectedProductId, setSelectedProductId] = useState<string | null>(
        preselectedProductId || null
    );
    const [options, setOptions] = useState<CustomizationOptions>(
        getDefaultCustomizationOptions()
    );

    // Get selected product
    const selectedProduct = useMemo(
        () => products.find((p) => p.id === selectedProductId),
        [products, selectedProductId]
    );

    // Calculate pricing
    const customizationCost = useMemo(
        () => calculateCustomizationCost(options),
        [options]
    );

    const totalPrice = useMemo(
        () => (selectedProduct ? calculateTotalPrice(selectedProduct.price, options) : 0),
        [selectedProduct, options]
    );

    const priceBreakdown = useMemo(
        () => (selectedProduct ? getPriceBreakdown(selectedProduct.price, options) : []),
        [selectedProduct, options]
    );

    // Navigation handlers
    const goToNextStep = () => {
        if (currentStep < STEPS.length) {
            setCurrentStep(currentStep + 1);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    const goToPreviousStep = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    const handleProductSelect = (productId: string) => {
        setSelectedProductId(productId);
    };

    const handleOptionsUpdate = (updates: Partial<CustomizationOptions>) => {
        setOptions((prev) => ({ ...prev, ...updates }));
    };

    const handleAddToCart = () => {
        if (selectedProduct && onAddToCart) {
            onAddToCart(selectedProduct.id, options, totalPrice);
        }
    };

    // Check if can proceed to next step
    const canProceed = () => {
        switch (currentStep) {
            case 1:
                return selectedProductId !== null;
            case 2:
                return hasCustomizations(options);
            case 3:
                return true; // Style has defaults
            case 4:
                return hasCustomizations(options) && selectedProductId !== null;
            default:
                return false;
        }
    };

    return (
        <div className="min-h-[100dvh] bg-[var(--color-gray-bg)] py-8 md:py-12">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Progress Stepper */}
                <ProgressStepper steps={STEPS} currentStep={currentStep} />

                {/* Main Content Area */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
                    {/* Left Column - Steps */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-sm ring-1 ring-black/5 p-6 md:p-8">
                            {/* Step 1: Product Selection */}
                            {currentStep === 1 && (
                                <ProductSelector
                                    products={products}
                                    selectedProductId={selectedProductId}
                                    onSelectProduct={handleProductSelect}
                                />
                            )}

                            {/* Step 2: Text Options */}
                            {currentStep === 2 && (
                                <TextOptionsForm options={options} onUpdate={handleOptionsUpdate} />
                            )}

                            {/* Step 3: Style Selection */}
                            {currentStep === 3 && (
                                <StyleSelector options={options} onUpdate={handleOptionsUpdate} />
                            )}

                            {/* Step 4: Review & Finalize */}
                            {currentStep === 4 && selectedProduct && (
                                <div className="space-y-6">
                                    <div className="text-center max-w-2xl mx-auto">
                                        <div className="inline-flex items-center justify-center w-12 h-12 bg-[var(--color-military-olive)]/8 rounded-full mb-4">
                                            <ShoppingCart className="w-6 h-6 text-[var(--color-military-olive)]" />
                                        </div>
                                        <h2 className="text-2xl md:text-3xl font-bold text-[var(--color-dark)] mb-2">
                                            Review Your Design
                                        </h2>
                                        <p className="text-[var(--color-muted)]">
                                            Double-check everything looks good before adding to your cart
                                        </p>
                                    </div>

                                    {/* Product Summary */}
                                    <div className="bg-[var(--color-gray-bg)] rounded-sm p-6">
                                        <h3 className="text-lg font-semibold text-[var(--color-dark)] mb-4">
                                            Product: {selectedProduct.name}
                                        </h3>

                                        <div className="space-y-3">
                                            {options.name && (
                                                <div className="flex justify-between">
                                                    <span className="text-[var(--color-muted)]">Name/Call Sign:</span>
                                                    <span className="font-semibold text-[var(--color-dark)]">{options.name}</span>
                                                </div>
                                            )}
                                            {options.rank && (
                                                <div className="flex justify-between">
                                                    <span className="text-[var(--color-muted)]">Rank:</span>
                                                    <span className="font-semibold text-[var(--color-dark)]">{options.rank}</span>
                                                </div>
                                            )}
                                            {options.unit && (
                                                <div className="flex justify-between">
                                                    <span className="text-[var(--color-muted)]">Unit/Squadron:</span>
                                                    <span className="font-semibold text-[var(--color-dark)]">{options.unit}</span>
                                                </div>
                                            )}
                                            {options.serviceDates && (
                                                <div className="flex justify-between">
                                                    <span className="text-[var(--color-muted)]">Service Dates:</span>
                                                    <span className="font-semibold text-[var(--color-dark)]">{options.serviceDates}</span>
                                                </div>
                                            )}
                                            {options.customNumber && (
                                                <div className="flex justify-between">
                                                    <span className="text-[var(--color-muted)]">Custom Number:</span>
                                                    <span className="font-semibold text-[var(--color-dark)]">{options.customNumber}</span>
                                                </div>
                                            )}

                                            <div className="border-t border-[var(--color-light-gray)] pt-3 mt-3">
                                                <div className="flex justify-between">
                                                    <span className="text-[var(--color-muted)]">Font Style:</span>
                                                    <span className="font-semibold text-[var(--color-dark)] capitalize">{options.fontStyle}</span>
                                                </div>
                                                <div className="flex justify-between mt-2">
                                                    <span className="text-[var(--color-muted)]">Text Size:</span>
                                                    <span className="font-semibold text-[var(--color-dark)] capitalize">{options.textSize}</span>
                                                </div>
                                                <div className="flex justify-between mt-2 items-center">
                                                    <span className="text-[var(--color-muted)]">Thread Color:</span>
                                                    <div className="flex items-center gap-2">
                                                        <div
                                                            className="w-5 h-5 rounded-full border border-neutral-300"
                                                            style={{ backgroundColor: options.threadColor }}
                                                        />
                                                        <span className="font-semibold text-[var(--color-dark)]">Selected</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Important Notes */}
                                    <div className="bg-[var(--color-military-olive)]/5 ring-1 ring-[var(--color-military-olive)]/15 rounded-sm p-4">
                                        <h4 className="text-sm font-semibold text-[var(--color-dark)] mb-2">
                                            Production & Shipping
                                        </h4>
                                        <ul className="text-sm text-[var(--color-body-text)] space-y-1">
                                            <li>• Customized items are made to order and ship in 5-7 business days</li>
                                            <li>• All customizations are final sale and cannot be returned</li>
                                            <li>• Free shipping on orders over $75</li>
                                        </ul>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Navigation Buttons */}
                        <div className="flex items-center justify-between mt-6">
                            <Button
                                variant="ghost"
                                onClick={goToPreviousStep}
                                disabled={currentStep === 1}
                                className="gap-2"
                            >
                                <ArrowLeft className="w-4 h-4" />
                                Back
                            </Button>

                            {currentStep < STEPS.length ? (
                                <Button
                                    variant="primary"
                                    onClick={goToNextStep}
                                    disabled={!canProceed()}
                                    className="gap-2"
                                >
                                    Continue
                                    <ArrowRight className="w-4 h-4" />
                                </Button>
                            ) : (
                                <Button
                                    variant="primary"
                                    onClick={handleAddToCart}
                                    disabled={!canProceed()}
                                    className="gap-2"
                                >
                                    <ShoppingCart className="w-5 h-5" />
                                    Add to Cart
                                </Button>
                            )}
                        </div>
                    </div>

                    {/* Right Column - Price Breakdown (Sticky) */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-8">
                            {selectedProduct && (
                                <PriceBreakdown
                                    items={priceBreakdown}
                                    total={totalPrice}
                                    className="shadow-lg"
                                />
                            )}

                            {!selectedProduct && currentStep > 1 && (
                                <div className="bg-[var(--color-gray-bg)] rounded-sm ring-1 ring-black/5 p-6 text-center">
                                    <p className="text-[var(--color-muted)]">Select a product to see pricing</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
