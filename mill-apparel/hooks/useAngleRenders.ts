'use client';

import { useState, useEffect } from 'react';
import { ProductAngle } from '@/types/angle-preview';

interface UseAngleRenders {
    productType: string;
    currentAngle: ProductAngle;
}

export function useAngleRenders({ productType, currentAngle }: UseAngleRenders) {
    const [loadedAngles, setLoadedAngles] = useState<Set<ProductAngle>>(new Set());
    const [isLoading, setIsLoading] = useState(true);

    // Get render URL for specific angle
    const getRenderUrl = (angle: ProductAngle): string => {
        return `/renders/${productType}/base/${angle}.png`;
    };

    // Preload all angles
    useEffect(() => {
        const angles: ProductAngle[] = ['front', 'back', 'left', 'right'];

        const preloadImages = async () => {
            const promises = angles.map((angle) => {
                return new Promise<ProductAngle>((resolve, reject) => {
                    const img = new Image();
                    img.src = getRenderUrl(angle);
                    img.onload = () => resolve(angle);
                    img.onerror = () => reject(angle);
                });
            });

            try {
                const loaded = await Promise.all(promises);
                setLoadedAngles(new Set(loaded));
                setIsLoading(false);
            } catch (error) {
                console.warn('[useAngleRenders] Some angles failed to load:', error);
                setIsLoading(false);
            }
        };

        preloadImages();
    }, [productType]);

    return {
        getRenderUrl,
        loadedAngles,
        isLoading,
        isAngleLoaded: (angle: ProductAngle) => loadedAngles.has(angle),
    };
}
