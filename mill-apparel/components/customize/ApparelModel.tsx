import { useRef, useEffect, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { ProductType } from '@/types/customizer';
import * as THREE from 'three';
import { createFabricMaterial, createFabricNormalMap } from '@/lib/materials/FabricMaterial';

interface ApparelModelProps {
    productType: ProductType;
    productColor: string;
    designTexture: THREE.Texture | null;
}

/**
 * Enhanced procedural 3D apparel model with realistic proportions
 * Features beveled edges, proper topology, and PBR materials
 */
export default function ApparelModel({ productType, productColor, designTexture }: ApparelModelProps) {
    const groupRef = useRef<THREE.Group>(null);
    const torsoRef = useRef<THREE.Mesh>(null);

    // Generate fabric normal map once
    const fabricNormalMap = useMemo(() => createFabricNormalMap(512), []);

    // Create fabric material with PBR properties
    const fabricMaterial = useMemo(() => {
        return createFabricMaterial({
            baseColor: productColor,
            designTexture,
        });
    }, [productColor, designTexture]);

    // Update material when props change
    useEffect(() => {
        if (fabricMaterial) {
            fabricMaterial.color.set(productColor);
            fabricMaterial.map = designTexture;
            fabricMaterial.normalMap = fabricNormalMap;
            fabricMaterial.normalScale = new THREE.Vector2(0.3, 0.3);
            fabricMaterial.needsUpdate = true;
        }
    }, [productColor, designTexture, fabricMaterial, fabricNormalMap]);

    // Create enhanced torso geometry (using box with better proportions)
    const { torsoGeometry, torsoScale } = useMemo(() => {
        let width, height, depth;

        switch (productType) {
            case 'hoodie':
                width = 2.4;
                height = 3.2;
                depth = 0.4;
                break;
            case 'tank':
                width = 1.8;
                height = 2.8;
                depth = 0.3;
                break;
            case 'longsleeve':
            case 'tshirt':
            default:
                width = 2.2;
                height = 3.0;
                depth = 0.35;
                break;
        }

        // Use BoxGeometry with beveled edges for better shape
        const geometry = new THREE.BoxGeometry(width, height, depth, 1, 1, 1);

        // Round the corners slightly for a softer look
        const positions = geometry.attributes.position;
        for (let i = 0; i < positions.count; i++) {
            const x = positions.getX(i);
            const y = positions.getY(i);
            const z = positions.getZ(i);

            // Apply subtle rounding to corners
            const roundFactor = 0.05;
            if (Math.abs(x) > width / 2 - roundFactor && Math.abs(y) > height / 2 - roundFactor) {
                const offsetX = Math.sign(x) * roundFactor * (1 - Math.abs(y) / (height / 2));
                const offsetY = Math.sign(y) * roundFactor * (1 - Math.abs(x) / (width / 2));
                positions.setX(i, x - offsetX);
                positions.setY(i, y - offsetY);
            }
        }

        geometry.computeVertexNormals();

        return {
            torsoGeometry: geometry,
            torsoScale: [1, 1, 1] as [number, number, number]
        };
    }, [productType]);

    // Sleeves (for hoodie, longsleeve, tshirt)
    const renderSleeves = () => {
        if (productType === 'tank') return null;

        const sleeveLength = productType === 'longsleeve' ? 2.2 :
            productType === 'hoodie' ? 1.8 : 1.2;

        // Create plain fabric material for sleeves (no design texture)
        const sleeveMaterial = createFabricMaterial({
            baseColor: productColor,
            designTexture: null, // Sleeves should not show the design
        });
        sleeveMaterial.normalMap = fabricNormalMap;
        sleeveMaterial.normalScale = new THREE.Vector2(0.3, 0.3);

        return (
            <>
                {/* Left sleeve */}
                <mesh position={[-1.45, 0.8, 0]} rotation={[0, 0, Math.PI / 12]} castShadow>
                    <cylinderGeometry args={[0.32, 0.28, sleeveLength, 16]} />
                    <primitive object={sleeveMaterial} />
                </mesh>

                {/* Right sleeve */}
                <mesh position={[1.45, 0.8, 0]} rotation={[0, 0, -Math.PI / 12]} castShadow>
                    <cylinderGeometry args={[0.32, 0.28, sleeveLength, 16]} />
                    <primitive object={sleeveMaterial.clone()} />
                </mesh>
            </>
        );
    };

    // Hood (for hoodie only)
    const renderHood = () => {
        if (productType !== 'hoodie') return null;

        const hoodMaterial = createFabricMaterial({
            baseColor: productColor,
            designTexture: null,
        });
        hoodMaterial.normalMap = fabricNormalMap;
        hoodMaterial.normalScale = new THREE.Vector2(0.3, 0.3);

        return (
            <mesh position={[0, 1.65, 0.15]} rotation={[-Math.PI / 6, 0, 0]} castShadow>
                <sphereGeometry args={[0.55, 20, 20, 0, Math.PI * 2, 0, Math.PI / 2]} />
                <primitive object={hoodMaterial} />
            </mesh>
        );
    };

    // Kangaroo pocket (for hoodie only)
    const renderPocket = () => {
        if (productType !== 'hoodie') return null;

        return (
            <mesh position={[0, -0.3, 0.13]} castShadow>
                <boxGeometry args={[0.8, 0.5, 0.08]} />
                <meshStandardMaterial
                    color={productColor}
                    roughness={0.9}
                    metalness={0}
                    normalMap={fabricNormalMap}
                />
            </mesh>
        );
    };

    return (
        <group ref={groupRef}>
            {/* Main torso body */}
            <mesh
                ref={torsoRef}
                geometry={torsoGeometry}
                material={fabricMaterial}
                castShadow
                receiveShadow
                scale={torsoScale}
            />

            {/* Sleeves */}
            {renderSleeves()}

            {/* Hood (hoodie only) */}
            {renderHood()}

            {/* Pocket (hoodie only) */}
            {renderPocket()}
        </group>
    );
}
