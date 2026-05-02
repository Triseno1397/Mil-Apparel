import React from 'react';
import * as THREE from 'three';

interface ShadowCatcherProps {
    position?: [number, number, number];
    size?: number;
}

/**
 * Invisible ground plane that only receives shadows
 * Creates a professional studio look with grounded shadows
 */
export default function ShadowCatcher({
    position = [0, -2.5, 0],
    size = 10
}: ShadowCatcherProps) {
    return (
        <mesh
            rotation={[-Math.PI / 2, 0, 0]}
            position={position}
            receiveShadow
        >
            <planeGeometry args={[size, size]} />
            <shadowMaterial opacity={0.3} />
        </mesh>
    );
}
