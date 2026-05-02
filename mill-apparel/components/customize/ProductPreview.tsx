'use client';

import { useState, useEffect, useRef } from 'react';
import { useCustomizer } from '@/context/CustomizerContext';
import { DesignLayer } from '@/types/customizer';
import AnglePreview from './AnglePreview';

/**
 * Helper to generate design canvas from layers with proper async image loading
 */
function useDesignCanvas(layers: DesignLayer[]): { canvas: HTMLCanvasElement | null; version: number } {
    const [canvas, setCanvas] = useState<HTMLCanvasElement | null>(null);
    const [version, setVersion] = useState(0);
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => {
        const renderCanvas = async () => {
            console.log('[useDesignCanvas] Rendering', layers.length, 'layers');

            if (!canvasRef.current) {
                canvasRef.current = document.createElement('canvas');
                canvasRef.current.width = 600;
                canvasRef.current.height = 700;
            }

            const designCanvas = canvasRef.current;
            const ctx = designCanvas.getContext('2d');

            if (!ctx) return;

            // Clear canvas
            ctx.clearRect(0, 0, designCanvas.width, designCanvas.height);

            // Sort layers by zIndex
            const sortedLayers = [...layers].sort((a, b) => a.zIndex - b.zIndex);

            // Load all images first
            const loadedImages = new Map<string, HTMLImageElement>();

            for (const layer of sortedLayers) {
                if (!layer.visible) continue;

                if ((layer.type === 'image' || layer.type === 'graphic') && layer.imageUrl) {
                    try {
                        const img = await new Promise<HTMLImageElement>((resolve, reject) => {
                            const image = new Image();
                            image.crossOrigin = 'anonymous';
                            image.onload = () => resolve(image);
                            image.onerror = reject;
                            image.src = layer.imageUrl!;
                        });
                        loadedImages.set(layer.id, img);
                    } catch (err) {
                        console.warn(`[useDesignCanvas] Failed to load image for layer ${layer.id}:`, err);
                    }
                }
            }

            // Render all layers
            sortedLayers.forEach(layer => {
                if (!layer.visible) return;

                ctx.save();
                ctx.globalAlpha = layer.opacity;
                ctx.translate(layer.position.x + layer.size.width / 2, layer.position.y + layer.size.height / 2);
                ctx.rotate((layer.rotation * Math.PI) / 180);
                ctx.translate(-(layer.position.x + layer.size.width / 2), -(layer.position.y + layer.size.height / 2));

                if (layer.type === 'text' && layer.text) {
                    ctx.font = `${layer.fontWeight || 'bold'} ${layer.fontSize || 48}px ${layer.fontFamily || 'Arial'}`;
                    ctx.fillStyle = layer.color || '#000000';
                    ctx.textAlign = layer.textAlign || 'center';
                    ctx.textBaseline = 'middle';
                    ctx.fillText(
                        layer.text,
                        layer.position.x + layer.size.width / 2,
                        layer.position.y + layer.size.height / 2
                    );
                } else if ((layer.type === 'image' || layer.type === 'graphic') && layer.imageUrl) {
                    const img = loadedImages.get(layer.id);
                    if (img) {
                        ctx.drawImage(
                            img,
                            layer.position.x,
                            layer.position.y,
                            layer.size.width,
                            layer.size.height
                        );
                    }
                }

                ctx.restore();
            });

            setCanvas(designCanvas);
            setVersion(v => v + 1);
        };

        renderCanvas();
    }, [layers]);

    return { canvas, version };
}

export default function ProductPreview() {
    const { productType, productColor, layers } = useCustomizer();

    // Generate design canvas from layers
    const { canvas: designCanvas, version: canvasVersion } = useDesignCanvas(layers);

    return (
        <AnglePreview
            productType={productType}
            productColor={productColor}
            designCanvas={designCanvas}
            canvasVersion={canvasVersion}
        />
    );
}
