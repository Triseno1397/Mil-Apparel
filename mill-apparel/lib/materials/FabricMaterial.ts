import * as THREE from 'three';

/**
 * PBR Material factory for realistic fabric rendering
 * Supports cotton, fleece, and other apparel materials
 */
export interface FabricMaterialOptions {
    baseColor: string;
    roughness?: number;
    metalness?: number;
    normalScale?: number;
    designTexture?: THREE.Texture | null;
}

export function createFabricMaterial(options: FabricMaterialOptions): THREE.MeshStandardMaterial {
    const {
        baseColor,
        roughness = 0.85,     // Matte cotton/fleece
        metalness = 0.0,      // No metallic reflection
        normalScale = 0.3,    // Subtle fabric weave
        designTexture
    } = options;

    // Convert hex color to THREE.Color and slightly desaturate for realism
    const color = new THREE.Color(baseColor);
    color.multiplyScalar(0.95); // Reduce brightness slightly

    const material = new THREE.MeshStandardMaterial({
        color,
        roughness,
        metalness,

        // Design texture overlay
        map: designTexture || undefined,

        // Enable environment reflections (subtle)
        envMapIntensity: 0.5,

        // Proper color space
        // @ts-ignore - colorSpace is valid in newer Three.js
        colorSpace: THREE.SRGBColorSpace,
    });

    return material;
}

/**
 * Create a simple procedural normal map for fabric texture
 * This simulates subtle weave patterns without loading external textures
 */
export function createFabricNormalMap(size: number = 512): THREE.Texture {
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');

    if (!ctx) {
        throw new Error('Could not get 2D context for normal map generation');
    }

    // Create subtle weave pattern
    const imageData = ctx.createImageData(size, size);
    const data = imageData.data;

    for (let y = 0; y < size; y++) {
        for (let x = 0; x < size; x++) {
            const i = (y * size + x) * 4;

            // Simple weave pattern (checkerboard with noise)
            const weaveX = Math.sin(x * 0.5) * 0.3;
            const weaveY = Math.sin(y * 0.5) * 0.3;
            const noise = (Math.random() - 0.5) * 0.1;

            // Normal map: R=X, G=Y, B=Z (pointing up)
            data[i] = 128 + (weaveX + noise) * 20;     // R
            data[i + 1] = 128 + (weaveY + noise) * 20; // G
            data[i + 2] = 255;                          // B (up)
            data[i + 3] = 255;                          // A
        }
    }

    ctx.putImageData(imageData, 0, 0);

    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(4, 4); // Tile the pattern
    texture.needsUpdate = true;

    return texture;
}
