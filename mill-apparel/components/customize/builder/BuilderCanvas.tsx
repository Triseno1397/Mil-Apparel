'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import { Layer, TextLayer } from '@/types/builder';

interface BuilderCanvasProps {
    productId: string;
    view: 'front' | 'back' | 'left-sleeve' | 'right-sleeve';
    layers: Layer[];
    selectedLayerId: string | null;
    zoom: number;
    onSelectLayer: (layerId: string | null) => void;
    onUpdateLayer: (layerId: string, updates: Partial<Layer>) => void;
    onZoom: (delta: number) => void;
}

export default function BuilderCanvas({
    productId,
    view,
    layers,
    selectedLayerId,
    zoom,
    onSelectLayer,
    onUpdateLayer,
    onZoom,
}: BuilderCanvasProps) {
    const canvasRef = useRef<HTMLDivElement>(null);
    const [isDragging, setIsDragging] = React.useState(false);
    const [dragLayerId, setDragLayerId] = React.useState<string | null>(null);
    const [dragStart, setDragStart] = React.useState({ x: 0, y: 0 });

    const productImage = '/images/products/army-infantry-tee.png'; // TODO: Dynamic based on productId

    const handleMouseDown = (e: React.MouseEvent, layerId: string) => {
        e.stopPropagation();
        onSelectLayer(layerId);
        setIsDragging(true);
        setDragLayerId(layerId);
        setDragStart({ x: e.clientX, y: e.clientY });
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isDragging || !dragLayerId || !canvasRef.current) return;

        const canvas = canvasRef.current;
        const rect = canvas.getBoundingClientRect();

        const deltaX = ((e.clientX - dragStart.x) / rect.width) * 100;
        const deltaY = ((e.clientY - dragStart.y) / rect.height) * 100;

        const layer = layers.find(l => l.id === dragLayerId);
        if (layer) {
            onUpdateLayer(dragLayerId, {
                position: {
                    x: Math.max(0, Math.min(100, layer.position.x + deltaX)),
                    y: Math.max(0, Math.min(100, layer.position.y + deltaY)),
                },
            });
        }

        setDragStart({ x: e.clientX, y: e.clientY });
    };

    const handleMouseUp = () => {
        setIsDragging(false);
        setDragLayerId(null);
    };

    return (
        <div
            className="relative flex items-center justify-center p-8"
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
        >
            {/* Canvas Container */}
            <div
                ref={canvasRef}
                className="relative bg-white rounded-lg shadow-2xl overflow-hidden"
                style={{
                    width: `${800 * zoom}px`,
                    height: `${1000 * zoom}px`,
                    transform: `scale(${zoom})`,
                    transformOrigin: 'center',
                }}
                onClick={() => onSelectLayer(null)}
            >
                {/* Product Preview */}
                <Image
                    src={productImage}
                    alt="Product"
                    fill
                    className="object-contain pointer-events-none"
                    priority
                />

                {/* Layers Rendered on Canvas */}
                {layers.map((layer) => {
                    if (layer.type === 'text') {
                        const textLayer = layer as TextLayer;
                        const isSelected = layer.id === selectedLayerId;

                        return (
                            <div
                                key={layer.id}
                                className={`absolute cursor-move select-none ${isSelected ? 'ring-2 ring-[var(--builder-accent)] ring-offset-2' : ''
                                    }`}
                                style={{
                                    left: `${textLayer.position.x}%`,
                                    top: `${textLayer.position.y}%`,
                                    transform: `translate(-50%, -50%) rotate(${textLayer.rotation}deg)`,
                                    fontSize: `${textLayer.fontSize}px`,
                                    fontFamily: textLayer.fontFamily,
                                    color: textLayer.color,
                                    opacity: textLayer.opacity,
                                    textAlign: textLayer.alignment,
                                    lineHeight: textLayer.lineHeight,
                                    letterSpacing: `${textLayer.letterSpacing}px`,
                                    fontWeight: 'bold',
                                    textTransform: 'uppercase',
                                }}
                                onMouseDown={(e) => handleMouseDown(e, layer.id)}
                            >
                                {textLayer.content}
                            </div>
                        );
                    }

                    // TODO: Render graphic and patch layers
                    return null;
                })}

                {/* Grid Overlay (Subtle) */}
                <div
                    className="absolute inset-0 pointer-events-none opacity-10"
                    style={{
                        backgroundImage: `
              linear-gradient(to right, var(--builder-canvas-grid) 1px, transparent 1px),
              linear-gradient(to bottom, var(--builder-canvas-grid) 1px, transparent 1px)
            `,
                        backgroundSize: '50px 50px',
                    }}
                />
            </div>

            {/* Zoom Controls */}
            <div className="absolute bottom-8 right-8 flex gap-2 bg-[var(--builder-panel-bg)] rounded-lg p-2 border border-[var(--builder-border)]">
                <button
                    className="px-3 py-1 text-sm hover:bg-[var(--builder-hover)] rounded transition-colors"
                    onClick={() => onZoom(-0.1)}
                >
                    −
                </button>
                <span className="px-2 py-1 text-sm text-[var(--builder-text-secondary)]">
                    {Math.round(zoom * 100)}%
                </span>
                <button
                    className="px-3 py-1 text-sm hover:bg-[var(--builder-hover)] rounded transition-colors"
                    onClick={() => onZoom(0.1)}
                >
                    +
                </button>
            </div>
        </div>
    );
}
