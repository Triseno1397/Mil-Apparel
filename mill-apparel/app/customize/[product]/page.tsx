'use client';

import { CustomizerProvider } from '@/context/CustomizerContext';
import TopBar from '@/components/customize/TopBar';
import TemplateLibrary from '@/components/customize/TemplateLibrary';
import ProductPreview from '@/components/customize/ProductPreview';
import LayersPanel from '@/components/customize/builder/LayersPanel';
import PropertiesPanel from '@/components/customize/builder/PropertiesPanel';
import OrderSummary from '@/components/customize/OrderSummary';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';

interface PageProps {
    params: {
        product: string;
    };
}

export default function CustomizeProductPage({ params }: PageProps) {
    const router = useRouter();

    const handleSave = useCallback(() => {
        // TODO: Save design to localStorage
        console.log('Saving design...');
    }, []);

    const handleSaveAndExit = useCallback(() => {
        // TODO: Save design and return to previous page
        console.log('Saving and exiting...');
        router.push('/customize');
    }, [router]);

    const handleCheckout = useCallback(() => {
        // TODO: Add to cart and proceed to checkout
        console.log('Adding to cart and checking out...');
        router.push('/cart');
    }, [router]);

    return (
        <CustomizerProvider>
            <div className="h-screen flex flex-col bg-[#f5f5f5]">
                {/* Sticky Top Bar */}
                <TopBar
                    onSave={handleSave}
                    onSaveAndExit={handleSaveAndExit}
                    onCheckout={handleCheckout}
                    showStepIndicator={false}
                />

                {/* Main 3-Column Layout - Desktop */}
                <div className="flex-1 flex overflow-hidden">
                    {/* Left Panel: Templates & Layers */}
                    <div className="hidden lg:block w-80 bg-[#1a1a1a] border-r border-gray-800 flex flex-col">
                        {/* Layers Panel at top */}
                        <div className="border-b border-gray-800">
                            <LayersPanel />
                        </div>

                        {/* Template Library below */}
                        <div className="flex-1 overflow-y-auto">
                            <TemplateLibrary />
                        </div>
                    </div>

                    {/* Center Panel: Canvas Preview */}
                    <div className="flex-1 bg-gradient-to-br from-[#e8e8e8] to-[#f5f5f5]">
                        <ProductPreview />
                    </div>

                    {/* Right Panel: Properties & Order Summary */}
                    <div className="hidden lg:block w-80 bg-[#1a1a1a] border-l border-gray-800 overflow-y-auto">
                        <PropertiesPanel />

                        {/* Order Summary */}
                        <div className="border-t border-gray-800">
                            <OrderSummary
                                onAddToCart={handleCheckout}
                                onCheckout={handleCheckout}
                            />
                        </div>
                    </div>
                </div>

                {/* Mobile Layout - Bottom Drawer (TODO: implement MobileDrawer component) */}
                <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-[#1a1a1a] border-t border-gray-800 p-4">
                    <button
                        onClick={handleCheckout}
                        className="w-full px-6 py-3 bg-[#FF6B35] text-white font-bold rounded-lg"
                    >
                        Add to Cart - $29.99
                    </button>
                </div>
            </div>
        </CustomizerProvider>
    );
}
