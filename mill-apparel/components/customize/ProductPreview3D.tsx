'use client';

import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, PresentationControls } from '@react-three/drei';
import { Suspense, useState, useRef } from 'react';
import { useCustomizer } from '@/context/CustomizerContext';
import { RotateCcw, ZoomIn, ZoomOut } from 'lucide-react';
import * as THREE from 'three';
import ApparelModel from './ApparelModel';
import ShadowCatcher from './ShadowCatcher';
import { useDesignTexture } from './DesignTextureGenerator';

function LoadingFallback() {
    return (
        <mesh>
            <boxGeometry args={[2, 3, 0.1]} />
            <meshStandardMaterial color="#666666" />
        </mesh>
    );
}

export default function ProductPreview3D() {
    const { productType, productColor, layers, canvasZoom } = useCustomizer();
    const [showHint, setShowHint] = useState(true);
    const controlsRef = useRef<any>(null);

    // Generate design texture from layers using the hook
    const designTexture = useDesignTexture(layers);

    const handleReset = () => {
        if (controlsRef.current) {
            controlsRef.current.reset();
        }
    };

    const handleZoomIn = () => {
        if (controlsRef.current) {
            const camera = controlsRef.current.object;
            camera.position.z = Math.max(camera.position.z - 0.5, 3);
        }
    };

    const handleZoomOut = () => {
        if (controlsRef.current) {
            const camera = controlsRef.current.object;
            camera.position.z = Math.min(camera.position.z + 0.5, 8);
        }
    };

    return (
        <div className="w-full h-full relative bg-gradient-to-br from-[#1a1a1a] via-[#0a0a0a] to-[#1a1a1a]">
            {/* Hint Overlay */}
            {showHint && (
                <div className="absolute inset-0 pointer-events-none z-10 flex items-center justify-center">
                    <div className="bg-black/60 backdrop-blur-sm px-6 py-3 rounded-full border border-orange-600/30 animate-pulse">
                        <p className="text-orange-500 text-sm font-semibold flex items-center gap-2">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                            </svg>
                            Drag to rotate
                        </p>
                    </div>
                </div>
            )}

            {/* Control Panel */}
            <div className="absolute top-4 right-4 z-20 flex flex-col gap-2">
                <button
                    onClick={handleReset}
                    className="bg-gray-900/90 hover:bg-gray-800 text-white p-3 rounded-lg border border-gray-700 hover:border-orange-500 transition-all shadow-lg backdrop-blur-sm"
                    title="Reset View"
                    aria-label="Reset camera view"
                >
                    <RotateCcw className="w-5 h-5" />
                </button>
                <button
                    onClick={handleZoomIn}
                    className="bg-gray-900/90 hover:bg-gray-800 text-white p-3 rounded-lg border border-gray-700 hover:border-orange-500 transition-all shadow-lg backdrop-blur-sm"
                    title="Zoom In"
                    aria-label="Zoom in"
                >
                    <ZoomIn className="w-5 h-5" />
                </button>
                <button
                    onClick={handleZoomOut}
                    className="bg-gray-900/90 hover:bg-gray-800 text-white p-3 rounded-lg border border-gray-700 hover:border-orange-500 transition-all shadow-lg backdrop-blur-sm"
                    title="Zoom Out"
                    aria-label="Zoom out"
                >
                    <ZoomOut className="w-5 h-5" />
                </button>
            </div>

            {/* 3D Canvas */}
            <Canvas
                camera={{
                    position: [0, 0.5, 6], // Further back for full view
                    fov: 35, // Less distortion, more catalog-like
                }}
                gl={{
                    preserveDrawingBuffer: true,
                    antialias: true,
                    alpha: true,
                    toneMapping: THREE.ACESFilmicToneMapping,
                    toneMappingExposure: 1.2,
                    powerPreference: "high-performance"
                }}
                shadows="soft" // Enable soft shadows
                dpr={Math.min(window.devicePixelRatio, 2)} // Cap pixel ratio for performance
                frameloop="demand" // Render only when needed
                style={{ transform: `scale(${canvasZoom})`, transformOrigin: 'center' }}
            >
                <Suspense fallback={<LoadingFallback />}>
                    {/* Professional 3-Point Lighting Rig */}

                    {/* Key Light - Main light source */}
                    <directionalLight
                        position={[5, 8, 5]}
                        intensity={1.2}
                        color="#fff8e7" // Warm white
                        castShadow
                        shadow-mapSize-width={2048}
                        shadow-mapSize-height={2048}
                        shadow-camera-far={50}
                        shadow-camera-left={-10}
                        shadow-camera-right={10}
                        shadow-camera-top={10}
                        shadow-camera-bottom={-10}
                        shadow-bias={-0.0001}
                    />

                    {/* Fill Light - Softens shadows */}
                    <directionalLight
                        position={[-3, 4, -3]}
                        intensity={0.4}
                        color="#e7f0ff" // Cool white
                    />

                    {/* Rim Light - Edge highlights */}
                    <directionalLight
                        position={[0, 2, -5]}
                        intensity={0.6}
                    />

                    {/* Ambient Light - Base illumination */}
                    <ambientLight intensity={0.3} />

                    {/* Studio Environment for realistic reflections */}
                    <Environment preset="studio" />

                    {/* 3D Model */}
                    <ApparelModel
                        productType={productType}
                        productColor={productColor}
                        designTexture={designTexture}
                    />

                    {/* Shadow Catcher - Ground plane for realistic shadows */}
                    <ShadowCatcher />

                    {/* Orbit Controls */}
                    <OrbitControls
                        ref={controlsRef}
                        enableDamping
                        dampingFactor={0.05}
                        rotateSpeed={0.8}
                        enableZoom={true}
                        minDistance={3}
                        maxDistance={8}
                        enablePan={false}
                        minPolarAngle={Math.PI / 6} // Limit vertical rotation (don't go too high)
                        maxPolarAngle={Math.PI / 2} // Limit vertical rotation (don't go below horizon)
                        onStart={() => setShowHint(false)}
                        touches={{
                            ONE: THREE.TOUCH.ROTATE,
                            TWO: THREE.TOUCH.DOLLY_PAN
                        }}
                    />
                </Suspense>
            </Canvas>
        </div>
    );
}
