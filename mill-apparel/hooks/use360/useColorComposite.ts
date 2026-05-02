import { useState, useEffect, useRef, useMemo } from 'react';
import { ColorCompositeOptions } from '@/types/360-viewer';

interface UseColorCompositeResult {
    compositedDataUrl: string | null;
    isCompositing: boolean;
}

/**
 * Hook for runtime color compositing of shading + mask layers
 * 
 * Algorithm:
 * 1. Create offscreen canvas
 * 2. Draw shading layer (preserves lighting and fabric detail)
 * 3. Draw mask layer with color tint using multiply blend mode
 * 4. Export as data URL
 * 5. Cache result by frameIndex + color
 * 
 * This allows unlimited colors without re-rendering 3D assets
 */
export function useColorComposite({
    shadingFrame,
    maskFrame,
    color,
    frameIndex
}: ColorCompositeOptions): UseColorCompositeResult {
    const [compositedDataUrl, setCompositedDataUrl] = useState<string | null>(null);
    const [isCompositing, setIsCompositing] = useState(false);

    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const cacheRef = useRef<Map<string, string>>(new Map());

    /**
     * Generate cache key from frame index and color
     */
    const cacheKey = useMemo(() => {
        return `${frameIndex}-${color}`;
    }, [frameIndex, color]);

    /**
     * Convert hex color to RGB
     */
    const hexToRgb = (hex: string): { r: number; g: number; b: number } => {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : { r: 255, g: 255, b: 255 };
    };

    /**
     * Composite shading + mask layers with color tinting
     */
    useEffect(() => {
        // Check cache first
        if (cacheRef.current.has(cacheKey)) {
            setCompositedDataUrl(cacheRef.current.get(cacheKey)!);
            setIsCompositing(false);
            return;
        }

        // Both frames must be loaded
        if (!shadingFrame || !maskFrame) {
            setCompositedDataUrl(null);
            setIsCompositing(false);
            return;
        }

        setIsCompositing(true);

        // Create or reuse canvas
        if (!canvasRef.current) {
            canvasRef.current = document.createElement('canvas');
        }

        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d', { alpha: true });

        if (!ctx) {
            console.error('[useColorComposite] Failed to get canvas context');
            setIsCompositing(false);
            return;
        }

        // Set canvas size to match frame size
        canvas.width = shadingFrame.width;
        canvas.height = shadingFrame.height;

        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        try {
            // Step 1: Draw shading layer (base lighting and detail)
            ctx.globalCompositeOperation = 'source-over';
            ctx.drawImage(shadingFrame, 0, 0);

            // Step 2: Draw mask layer with color tint
            // First, create a colored version of the mask
            const tempCanvas = document.createElement('canvas');
            tempCanvas.width = maskFrame.width;
            tempCanvas.height = maskFrame.height;
            const tempCtx = tempCanvas.getContext('2d');

            if (tempCtx) {
                // Draw mask
                tempCtx.drawImage(maskFrame, 0, 0);

                // Apply color tinting
                const rgb = hexToRgb(color);
                const imageData = tempCtx.getImageData(0, 0, tempCanvas.width, tempCanvas.height);
                const data = imageData.data;

                // Tint each pixel
                for (let i = 0; i < data.length; i += 4) {
                    // Multiply blend: (base * tint) / 255
                    data[i] = (data[i] * rgb.r) / 255;       // R
                    data[i + 1] = (data[i + 1] * rgb.g) / 255; // G
                    data[i + 2] = (data[i + 2] * rgb.b) / 255; // B
                    // Alpha remains unchanged
                }

                tempCtx.putImageData(imageData, 0, 0);

                // Step 3: Blend tinted mask with shading
                // Use 'multiply' to preserve lighting, or 'normal' for flat color
                ctx.globalCompositeOperation = 'multiply';
                ctx.globalAlpha = 0.9; // Slight transparency to blend better
                ctx.drawImage(tempCanvas, 0, 0);
                ctx.globalAlpha = 1.0;
            }

            // Export as data URL
            const dataUrl = canvas.toDataURL('image/png');

            // Cache result
            cacheRef.current.set(cacheKey, dataUrl);
            setCompositedDataUrl(dataUrl);
            setIsCompositing(false);

        } catch (error) {
            console.error('[useColorComposite] Compositing error:', error);
            setCompositedDataUrl(null);
            setIsCompositing(false);
        }
    }, [shadingFrame, maskFrame, color, frameIndex, cacheKey]);

    // Cleanup cache on unmount (prevent memory leaks)
    useEffect(() => {
        return () => {
            // Keep cache size reasonable (max 100 entries)
            if (cacheRef.current.size > 100) {
                const keysToDelete = Array.from(cacheRef.current.keys()).slice(0, 50);
                keysToDelete.forEach(key => cacheRef.current.delete(key));
            }
        };
    }, []);

    return {
        compositedDataUrl,
        isCompositing
    };
}
