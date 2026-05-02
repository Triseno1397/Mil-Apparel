'use client';

import { useState, useRef, useEffect, useMemo } from 'react';
import { RotateCcw, AlertCircle } from 'lucide-react';
import { use360Rotation } from '@/hooks/use360Rotation';
import { useDesignOverlay } from '@/hooks/useDesignOverlay';
import { useFrameSequence } from '@/hooks/use360/useFrameSequence';
import { useColorComposite } from '@/hooks/use360/useColorComposite';

const FRAME_COUNT = 36;

// Fallback color map for legacy frame structure
const COLOR_MAP: Record<string, string> = {
    '#FFFFFF': 'white',
    '#000000': 'black',
    '#FAFAFA': 'white',
    '#F5F5F5': 'white',
    '#808080': 'white',
};

interface ProductPreview360Props {
    productType: 'hoodie' | 'tshirt' | 'longsleeve' | 'tank';
    productColor?: string;
    designCanvas?: HTMLCanvasElement | null;
    canvasVersion?: number;
    className?: string;
}

export default function ProductPreview360({
    productType,
    productColor = '#FFFFFF',
    designCanvas,
    canvasVersion = 0,
    className = ''
}: ProductPreview360Props) {
    const [currentFrame, setCurrentFrame] = useState(0);
    const [showHint, setShowHint] = useState(true);
    const [useLegacyFrames, setUseLegacyFrames] = useState(false);
    const [fallbackToStatic, setFallbackToStatic] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    // Try to load new shading/mask frame sequences
    const shadingSequence = useFrameSequence({
        productType,
        layerType: 'shading',
        frameCount: FRAME_COUNT,
        currentFrame,
        format: 'webp',
        preloadRadius: 3
    });

    const maskSequence = useFrameSequence({
        productType,
        layerType: 'mask',
        frameCount: FRAME_COUNT,
        currentFrame,
        format: 'webp',
        preloadRadius: 3
    });

    // Get current frame images
    const currentShadingFrame = shadingSequence.frames.get(currentFrame);
    const currentMaskFrame = maskSequence.frames.get(currentFrame);

    // Runtime color compositing
    const { compositedDataUrl, isCompositing } = useColorComposite({
        shadingFrame: currentShadingFrame?.image || null,
        maskFrame: currentMaskFrame?.image || null,
        color: productColor,
        frameIndex: currentFrame
    });

    // Detect if shading/mask frames are missing and fallback to legacy
    useEffect(() => {
        // After 2 seconds, if no frames loaded from shading/mask, try legacy
        const timeout = setTimeout(() => {
            if (shadingSequence.loadedFrames.size === 0 && maskSequence.loadedFrames.size === 0) {
                console.warn('[ProductPreview360] No shading/mask frames found, using legacy color-folder structure');
                setUseLegacyFrames(true);
            }
        }, 2000);

        return () => clearTimeout(timeout);
    }, [shadingSequence.loadedFrames.size, maskSequence.loadedFrames.size]);

    // Legacy frame loading (fallback)
    const [legacyFramesLoaded, setLegacyFramesLoaded] = useState<Set<number>>(new Set());
    const colorFolder = COLOR_MAP[productColor.toUpperCase()] || 'white';

    const getLegacyFramePath = (frameIndex: number) => {
        const frameName = `frame_${String(frameIndex).padStart(3, '0')}.png`;
        return `/360-frames/${productType}/${colorFolder}/${frameName}`;
    };

    // Preload legacy frames if using legacy mode
    useEffect(() => {
        if (!useLegacyFrames) return;

        const framesToLoad = [
            currentFrame,
            (currentFrame + 1) % FRAME_COUNT,
            (currentFrame - 1 + FRAME_COUNT) % FRAME_COUNT,
            (currentFrame + 2) % FRAME_COUNT,
            (currentFrame - 2 + FRAME_COUNT) % FRAME_COUNT,
            (currentFrame + 3) % FRAME_COUNT,
            (currentFrame - 3 + FRAME_COUNT) % FRAME_COUNT
        ];

        framesToLoad.forEach(frameIndex => {
            if (!legacyFramesLoaded.has(frameIndex)) {
                const img = new Image();
                img.src = getLegacyFramePath(frameIndex);
                img.onload = () => {
                    setLegacyFramesLoaded(prev => new Set(prev).add(frameIndex));
                };
                img.onerror = () => {
                    // If legacy frames also fail, fall back to static preview
                    if (frameIndex === 0) {
                        console.warn('[ProductPreview360] Legacy frames also missing, using static fallback');
                        setFallbackToStatic(true);
                    }
                };
            }
        });
    }, [useLegacyFrames, currentFrame, productType, productColor, legacyFramesLoaded]);

    // Custom hook for rotation logic
    const { onMouseDown, onTouchStart, resetView, isDragging } = use360Rotation({
        frameCount: FRAME_COUNT,
        currentFrame,
        setCurrentFrame,
        onInteract: () => setShowHint(false)
    });

    // Generate design overlay
    const overlayDataUrl = useDesignOverlay(
        designCanvas,
        productType as 'hoodie' | 'tshirt' | 'longsleeve' | 'tank',
        canvasVersion
    );

    // Determine current display frame
    const displayFrameUrl = useMemo(() => {
        if (fallbackToStatic) {
            // Static preview fallback
            return `/360/${productType}/preview.webp`;
        } else if (useLegacyFrames) {
            // Legacy color-folder structure
            return getLegacyFramePath(currentFrame);
        } else if (compositedDataUrl) {
            // New composited frame (shading + mask)
            return compositedDataUrl;
        } else {
            // Loading or failed
            return null;
        }
    }, [fallbackToStatic, useLegacyFrames, compositedDataUrl, currentFrame, productType]);

    // Loading state
    const isLoading = useMemo(() => {
        if (fallbackToStatic) return false;
        if (useLegacyFrames) return legacyFramesLoaded.size === 0;
        return shadingSequence.isLoading || maskSequence.isLoading || isCompositing;
    }, [fallbackToStatic, useLegacyFrames, legacyFramesLoaded, shadingSequence.isLoading, maskSequence.isLoading, isCompositing]);

    return (
        <div
            ref={containerRef}
            className={`relative w-full h-full bg-gradient-to-br from-[#1a1a1a] via-[#0a0a0a] to-[#1a1a1a] overflow-hidden ${className}`}
            onMouseDown={!fallbackToStatic ? onMouseDown : undefined}
            onTouchStart={!fallbackToStatic ? onTouchStart : undefined}
            style={{
                cursor: fallbackToStatic ? 'default' : (isDragging ? 'grabbing' : 'grab'),
                userSelect: 'none',
                WebkitUserSelect: 'none'
            }}
        >
            {/* Loading State */}
            {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="flex flex-col items-center gap-4">
                        <div className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin" />
                        <p className="text-gray-400 text-sm font-medium">Loading preview...</p>
                    </div>
                </div>
            )}

            {/* Fallback Warning */}
            {fallbackToStatic && (
                <div className="absolute top-4 left-4 z-20 bg-yellow-500/20 border border-yellow-500/50 rounded-lg px-4 py-2 backdrop-blur-sm">
                    <div className="flex items-center gap-2 text-yellow-400 text-xs">
                        <AlertCircle className="w-4 h-4" />
                        <span>360° frames unavailable - showing static preview</span>
                    </div>
                </div>
            )}

            {/* Hint Overlay */}
            {showHint && !isLoading && !fallbackToStatic && (
                <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
                    <div className="bg-black/60 backdrop-blur-sm px-6 py-3 rounded-full border border-orange-600/30 animate-pulse">
                        <p className="text-orange-500 text-sm font-semibold flex items-center gap-2">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                            </svg>
                            Drag to rotate
                        </p>
                    </div>
                </div>
            )}

            {/* Reset Button */}
            {!fallbackToStatic && (
                <div className="absolute top-4 right-4 z-20">
                    <button
                        onClick={resetView}
                        className="bg-gray-900/90 hover:bg-gray-800 text-white p-3 rounded-lg border border-gray-700 hover:border-orange-500 transition-all shadow-lg backdrop-blur-sm"
                        title="Reset View"
                        aria-label="Reset camera view"
                    >
                        <RotateCcw className="w-5 h-5" />
                    </button>
                </div>
            )}

            {/* Product Frame */}
            {!isLoading && displayFrameUrl && (
                <div className="absolute inset-0 flex items-center justify-center p-8">
                    <div className="relative w-full h-full max-w-2xl max-h-2xl">
                        {/* Base Product Image */}
                        <img
                            src={displayFrameUrl}
                            alt={`${productType} - ${fallbackToStatic ? 'preview' : `frame ${currentFrame}`}`}
                            className="w-full h-full object-contain select-none"
                            draggable={false}
                            loading="eager"
                        />

                        {/* Design Overlay */}
                        {overlayDataUrl && (
                            <img
                                src={overlayDataUrl}
                                alt="Design overlay"
                                className="absolute inset-0 w-full h-full object-contain pointer-events-none select-none"
                                draggable={false}
                                style={{
                                    mixBlendMode: 'normal',
                                    opacity: 0.95
                                }}
                            />
                        )}
                    </div>
                </div>
            )}

            {/* Frame Counter (Dev Mode) */}
            {process.env.NODE_ENV === 'development' && !fallbackToStatic && (
                <div className="absolute bottom-4 left-4 bg-black/80 text-white text-xs px-3 py-1 rounded font-mono">
                    {useLegacyFrames ? (
                        <>Frame {currentFrame + 1}/{FRAME_COUNT} | Legacy | Loaded: {legacyFramesLoaded.size}</>
                    ) : (
                        <>Frame {currentFrame + 1}/{FRAME_COUNT} | Shading: {shadingSequence.loadedFrames.size} | Mask: {maskSequence.loadedFrames.size}</>
                    )}
                </div>
            )}
        </div>
    );
}
