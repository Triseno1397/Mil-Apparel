import { useEffect, useState, useCallback } from 'react';
import * as THREE from 'three';
import { DesignLayer } from '@/types/customizer';

/**
 * Hook to generate a Three.js texture from design layers
 * Handles async image loading and reactive updates
 */
export function useDesignTexture(layers: DesignLayer[]): THREE.Texture | null {
    const [texture, setTexture] = useState<THREE.Texture | null>(null);

    const generateTexture = useCallback(async () => {
        // Create an offscreen canvas
        const canvas = document.createElement('canvas');
        canvas.width = 1024;
        canvas.height = 1024;
        const ctx = canvas.getContext('2d');

        if (!ctx) {
            console.error('Failed to get 2D context');
            return null;
        }

        // Clear canvas with transparent background
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Sort layers by zIndex
        const sortedLayers = [...layers].sort((a, b) => a.zIndex - b.zIndex);

        // Scale factor (canvas is 1024x1024, design canvas is 600x700)
        const scaleX = canvas.width / 600;
        const scaleY = canvas.height / 700;

        // Load all images first
        const imagePromises: Promise<void>[] = [];

        for (const layer of sortedLayers) {
            if (!layer.visible) continue;

            if ((layer.type === 'image' || layer.type === 'graphic') && layer.imageUrl) {
                // Create a promise for image loading
                const promise = new Promise<void>((resolve) => {
                    const img = new Image();
                    img.crossOrigin = 'anonymous';
                    img.onload = () => {
                        ctx.save();
                        ctx.globalAlpha = layer.opacity;

                        // Scale coordinates to texture size
                        const x = layer.position.x * scaleX;
                        const y = layer.position.y * scaleY;
                        const width = layer.size.width * scaleX;
                        const height = layer.size.height * scaleY;

                        // Apply rotation
                        ctx.translate(x + width / 2, y + height / 2);
                        ctx.rotate((layer.rotation * Math.PI) / 180);
                        ctx.translate(-(x + width / 2), -(y + height / 2));

                        // Draw image
                        ctx.drawImage(img, x, y, width, height);

                        ctx.restore();
                        resolve();
                    };
                    img.onerror = () => {
                        console.error('Failed to load image:', layer.imageUrl || 'unknown');
                        resolve(); // Resolve anyway to not block other layers
                    };
                    img.src = layer.imageUrl || '';
                });
                imagePromises.push(promise);
            }
        }

        // Wait for all images to load
        await Promise.all(imagePromises);

        // Now render text layers (they don't need async loading)
        for (const layer of sortedLayers) {
            if (!layer.visible) continue;

            if (layer.type === 'text' && layer.text) {
                ctx.save();
                ctx.globalAlpha = layer.opacity;

                // Scale coordinates to texture size
                const x = layer.position.x * scaleX;
                const y = layer.position.y * scaleY;
                const width = layer.size.width * scaleX;
                const height = layer.size.height * scaleY;

                // Apply rotation
                ctx.translate(x + width / 2, y + height / 2);
                ctx.rotate((layer.rotation * Math.PI) / 180);
                ctx.translate(-(x + width / 2), -(y + height / 2));

                // Render text
                const fontSize = (layer.fontSize || 48) * scaleX;
                ctx.font = `${layer.fontWeight || 'bold'} ${fontSize}px ${layer.fontFamily || 'Arial'}`;
                ctx.fillStyle = layer.color || '#000000';
                ctx.textAlign = layer.textAlign || 'center';
                ctx.textBaseline = 'middle';
                ctx.fillText(
                    layer.text || '',
                    x + width / 2,
                    y + height / 2
                );

                ctx.restore();
            }
        }

        // Create Three.js texture from canvas
        const newTexture = new THREE.CanvasTexture(canvas);
        newTexture.needsUpdate = true;
        newTexture.flipY = false; // Important for UV mapping
        newTexture.colorSpace = THREE.SRGBColorSpace;
        newTexture.minFilter = THREE.LinearFilter;
        newTexture.magFilter = THREE.LinearFilter;

        return newTexture;
    }, [layers]);

    useEffect(() => {
        generateTexture().then(tex => {
            if (tex) {
                setTexture(tex);
            }
        });
    }, [generateTexture]);

    return texture;
}

// Legacy class-based API (kept for backwards compatibility)
export class DesignTextureGenerator {
    static generateBlankTexture(): THREE.Texture {
        const canvas = document.createElement('canvas');
        canvas.width = 1024;
        canvas.height = 1024;
        const ctx = canvas.getContext('2d');

        if (ctx) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        }

        const texture = new THREE.CanvasTexture(canvas);
        texture.needsUpdate = true;
        texture.flipY = false;
        texture.colorSpace = THREE.SRGBColorSpace;

        return texture;
    }
}
