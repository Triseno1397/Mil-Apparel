'use client';

import { useState } from 'react';
import { ProductAngle } from '@/types/angle-preview';
import { useAngleRenders } from '@/hooks/useAngleRenders';
import { useCustomizer } from '@/context/CustomizerContext';
import AngleTabs from './AngleTabs';

interface AnglePreviewProps {
    productType: 'tshirt' | 'hoodie' | 'longsleeve' | 'tank';
    productColor: string; // Hex color
    designCanvas?: HTMLCanvasElement | null;
    canvasVersion?: number;
    className?: string;
}

export default function AnglePreview({
    productType,
    productColor,
    designCanvas,
    canvasVersion = 0,
    className = ''
}: AnglePreviewProps) {
    // Use angle from context instead of local state
    const { currentView, setCurrentView } = useCustomizer();
    const [isTransitioning, setIsTransitioning] = useState(false);

    // currentView from context is ProductView which matches ProductAngle
    const currentAngle = currentView as ProductAngle;

    const { getRenderUrl, isLoading } = useAngleRenders({
        productType,
        currentAngle
    });

    const handleAngleChange = (newAngle: ProductAngle) => {
        if (newAngle === currentAngle) return;

        setIsTransitioning(true);
        setTimeout(() => {
            setCurrentView(newAngle);  // Update context state
            setIsTransitioning(false);
        }, 150);
    };

    return (
        <div className={`flex flex-col h-full ${className}`}>
            {/* Angle selector tabs */}
            <div className="flex-shrink-0 py-4">
                <AngleTabs
                    currentAngle={currentAngle}
                    onAngleChange={handleAngleChange}
                />
            </div>

            {/* Preview area */}
            <div className="flex-1 relative overflow-hidden">
                {/* Studio background gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-gray-100 via-white to-gray-50" />

                {/* Loading state */}
                {isLoading && (
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="flex flex-col items-center gap-4">
                            <div className="w-12 h-12 border-4 border-[#6B7C3C] border-t-transparent rounded-full animate-spin" />
                            <p className="text-gray-500 text-sm font-medium">Loading preview...</p>
                        </div>
                    </div>
                )}

                {/* Product preview with color tinting */}
                {!isLoading && (
                    <div className="absolute inset-0 flex items-center justify-center p-8">
                        <div className="relative w-full h-full max-w-2xl max-h-2xl">
                            {/* Color overlay layer (behind product) */}
                            <div
                                className="absolute inset-0 rounded-lg"
                                style={{
                                    backgroundColor: productColor,
                                    zIndex: 1
                                }}
                            />

                            {/* Product render (neutral gray base with blend mode) */}
                            <img
                                src={getRenderUrl(currentAngle)}
                                alt={`${productType} - ${currentAngle} view`}
                                className="absolute inset-0 w-full h-full object-contain select-none transition-opacity duration-200"
                                style={{
                                    opacity: isTransitioning ? 0 : 1,
                                    mixBlendMode: productColor === '#000000' ? 'normal' : 'multiply',
                                    zIndex: 2,
                                    filter: 'drop-shadow(0 20px 40px rgba(0, 0, 0, 0.15))'
                                }}
                                draggable={false}
                            />

                            {/* Design overlay (if designCanvas provided) */}
                            {designCanvas && (
                                <div
                                    className="absolute inset-0 pointer-events-none"
                                    style={{ zIndex: 3 }}
                                >
                                    {/* TODO: Render design canvas overlay */}
                                </div>
                            )}
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
}
