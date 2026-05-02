/**
 * Type definitions for 360 product viewer
 * Supports frame sequences, runtime compositing, and performance optimizations
 */

export type FrameLayerType = 'base' | 'shading' | 'mask';
export type FrameFormat = 'webp' | 'png';

export interface Frame {
    index: number;
    url: string;
    loaded: boolean;
    image?: HTMLImageElement;
}

export interface FrameSequence {
    layerType: FrameLayerType;
    frames: Map<number, Frame>;
    totalFrames: number;
    format: FrameFormat;
}

export interface CompositedFrame {
    index: number;
    dataUrl: string;
    color: string;
    timestamp: number;
}

export interface FrameSequenceOptions {
    productType: string;
    layerType: FrameLayerType;
    frameCount: number;
    currentFrame: number;
    format?: FrameFormat;
    preloadRadius?: number; // Number of frames to preload around current frame
}

export interface ColorCompositeOptions {
    shadingFrame: HTMLImageElement | null;
    maskFrame: HTMLImageElement | null;
    color: string; // hex color
    frameIndex: number;
}

export interface CompositeCache {
    key: string; // frameIndex + color
    dataUrl: string;
    timestamp: number;
}
