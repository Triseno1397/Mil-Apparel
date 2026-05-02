// Utility to detect WebGL support
export function supportsWebGL(): boolean {
    try {
        const canvas = document.createElement('canvas');
        const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
        return !!gl;
    } catch (e) {
        return false;
    }
}

// Utility to detect if device is low-end (for performance optimization)
export function isLowEndDevice(): boolean {
    // Check for reduced motion preference
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        return true;
    }

    // Check for low memory (if available)
    const nav = navigator as any;
    if (nav.deviceMemory && nav.deviceMemory < 4) {
        return true;
    }

    // Check for low core count
    if (navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4) {
        return true;
    }

    return false;
}
