import { useEffect, useState } from 'react';

// Print safe area definitions (coordinates on 1024x1024 frame)
const PRINT_AREAS = {
    hoodie: { x: 312, y: 350, width: 400, height: 400 },
    tshirt: { x: 312, y: 300, width: 400, height: 450 },
    longsleeve: { x: 312, y: 320, width: 400, height: 420 },
    tank: { x: 312, y: 280, width: 400, height: 480 }
} as const;

type ProductType = keyof typeof PRINT_AREAS;

/**
 * Converts design canvas/texture to overlay image at correct scale/position
 */
export function useDesignOverlay(
    designCanvas: HTMLCanvasElement | null | undefined,
    productType: ProductType = 'tshirt',
    canvasVersion: number = 0
): string | null {
    const [overlayDataUrl, setOverlayDataUrl] = useState<string | null>(null);

    useEffect(() => {
        console.log('[useDesignOverlay] Effect triggered. designCanvas:', designCanvas, 'productType:', productType);

        if (!designCanvas) {
            console.log('[useDesignOverlay] No design canvas provided');
            setOverlayDataUrl(null);
            return;
        }

        console.log('[useDesignOverlay] Design canvas dimensions:', designCanvas.width, 'x', designCanvas.height);

        // Create overlay canvas at frame resolution
        const overlayCanvas = document.createElement('canvas');
        overlayCanvas.width = 1024;
        overlayCanvas.height = 1024;
        const ctx = overlayCanvas.getContext('2d');

        if (!ctx) {
            console.error('[useDesignOverlay] Failed to get 2D context');
            setOverlayDataUrl(null);
            return;
        }

        // Get print area for this product type
        const area = PRINT_AREAS[productType] || PRINT_AREAS.tshirt;
        console.log('[useDesignOverlay] Print area for', productType, ':', area);

        // Clear canvas
        ctx.clearRect(0, 0, overlayCanvas.width, overlayCanvas.height);

        // Draw design canvas into print area
        // drawImage(source, srcX, srcY, srcWidth, srcHeight, destX, destY, destWidth, destHeight)
        // Scale the entire design canvas to fit the print area on the 1024x1024 frame
        ctx.drawImage(
            designCanvas,
            0, 0, designCanvas.width, designCanvas.height,  // Source: entire design canvas
            area.x, area.y, area.width, area.height          // Dest: print area on frame
        );

        console.log('[useDesignOverlay] Drawing complete, converting to data URL');

        // Optional: Add subtle fabric texture overlay for realism
        // This could be enhanced with a texture image asset

        // Convert to data URL
        const dataUrl = overlayCanvas.toDataURL('image/png');
        console.log('[useDesignOverlay] Data URL generated, length:', dataUrl.length);
        setOverlayDataUrl(dataUrl);

    }, [designCanvas, productType, canvasVersion]);

    return overlayDataUrl;
}
