import { useState, useEffect, useRef } from 'react';
import { FrameSequenceOptions, Frame } from '@/types/360-viewer';

interface UseFrameSequenceResult {
    frames: Map<number, Frame>;
    loadedFrames: Set<number>;
    isLoading: boolean;
    error: Error | null;
}

/**
 * Hook for loading and managing 360 frame sequences with preloading
 * 
 * Features:
 * - Loads webp frames with PNG fallback
 * - Preloads current frame ± preloadRadius neighbors
 * - Lazy loads remaining frames
 * - Tracks loading state per frame
 */
export function useFrameSequence({
    productType,
    layerType,
    frameCount,
    currentFrame,
    format = 'webp',
    preloadRadius = 3
}: FrameSequenceOptions): UseFrameSequenceResult {
    const [frames, setFrames] = useState<Map<number, Frame>>(new Map());
    const [loadedFrames, setLoadedFrames] = useState<Set<number>>(new Set());
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    const loadingRef = useRef<Map<number, AbortController>>(new Map());
    const imageCache = useRef<Map<number, HTMLImageElement>>(new Map());

    /**
     * Generate frame path for a given frame index
     */
    const getFramePath = (frameIndex: number, fmt: 'webp' | 'png' = format): string => {
        const frameName = `frame_${String(frameIndex).padStart(3, '0')}.${fmt}`;
        return `/360/${productType}/${layerType}/${frameName}`;
    };

    /**
     * Load a single frame with format fallback
     */
    const loadFrame = async (frameIndex: number, signal?: AbortSignal): Promise<HTMLImageElement | null> => {
        // Check cache first
        if (imageCache.current.has(frameIndex)) {
            return imageCache.current.get(frameIndex)!;
        }

        try {
            // Try webp first
            const img = await loadImage(getFramePath(frameIndex, 'webp'), signal);
            imageCache.current.set(frameIndex, img);
            return img;
        } catch (webpError) {
            try {
                // Fallback to PNG
                const img = await loadImage(getFramePath(frameIndex, 'png'), signal);
                imageCache.current.set(frameIndex, img);
                return img;
            } catch (pngError) {
                console.warn(`Failed to load frame ${frameIndex} for ${productType}/${layerType}`);
                return null;
            }
        }
    };

    /**
     * Load image helper with abort signal support
     */
    const loadImage = (url: string, signal?: AbortSignal): Promise<HTMLImageElement> => {
        return new Promise((resolve, reject) => {
            if (signal?.aborted) {
                reject(new Error('Aborted'));
                return;
            }

            const img = new Image();
            img.crossOrigin = 'anonymous';

            const onAbort = () => {
                img.src = '';
                reject(new Error('Aborted'));
            };

            if (signal) {
                signal.addEventListener('abort', onAbort);
            }

            img.onload = () => {
                signal?.removeEventListener('abort', onAbort);
                resolve(img);
            };

            img.onerror = () => {
                signal?.removeEventListener('abort', onAbort);
                reject(new Error(`Failed to load ${url}`));
            };

            img.src = url;
        });
    };

    /**
     * Preload frames around current frame
     */
    useEffect(() => {
        const loadFrames = async () => {
            // Determine which frames to load
            const framesToLoad: number[] = [];

            // Always load current frame first
            framesToLoad.push(currentFrame);

            // Add frames within preload radius
            for (let i = 1; i <= preloadRadius; i++) {
                framesToLoad.push((currentFrame + i) % frameCount);
                framesToLoad.push((currentFrame - i + frameCount) % frameCount);
            }

            // Load priority frames (current ± preloadRadius)
            for (const frameIndex of framesToLoad) {
                if (!loadedFrames.has(frameIndex)) {
                    // Cancel any in-flight request for this frame
                    if (loadingRef.current.has(frameIndex)) {
                        loadingRef.current.get(frameIndex)?.abort();
                    }

                    // Create new abort controller
                    const controller = new AbortController();
                    loadingRef.current.set(frameIndex, controller);

                    // Load frame
                    const image = await loadFrame(frameIndex, controller.signal);

                    if (image && !controller.signal.aborted) {
                        const frame: Frame = {
                            index: frameIndex,
                            url: image.src,
                            loaded: true,
                            image
                        };

                        setFrames(prev => new Map(prev).set(frameIndex, frame));
                        setLoadedFrames(prev => new Set(prev).add(frameIndex));
                        loadingRef.current.delete(frameIndex);
                    }
                }
            }

            // Mark as not loading after initial load
            if (loadedFrames.size > 0) {
                setIsLoading(false);
            }
        };

        loadFrames();

        // Cleanup: abort in-flight requests when dependencies change
        return () => {
            loadingRef.current.forEach(controller => controller.abort());
            loadingRef.current.clear();
        };
    }, [productType, layerType, currentFrame, frameCount, preloadRadius]);

    // Lazy load remaining frames on idle
    useEffect(() => {
        if (loadedFrames.size >= frameCount) return;

        const timeout = setTimeout(() => {
            const loadRemainingFrames = async () => {
                for (let i = 0; i < frameCount; i++) {
                    if (!loadedFrames.has(i)) {
                        const image = await loadFrame(i);
                        if (image) {
                            const frame: Frame = {
                                index: i,
                                url: image.src,
                                loaded: true,
                                image
                            };

                            setFrames(prev => new Map(prev).set(i, frame));
                            setLoadedFrames(prev => new Set(prev).add(i));
                        }
                    }
                }
            };

            loadRemainingFrames();
        }, 1000); // Wait 1s before lazy loading

        return () => clearTimeout(timeout);
    }, [loadedFrames, frameCount]);

    return {
        frames,
        loadedFrames,
        isLoading,
        error
    };
}
