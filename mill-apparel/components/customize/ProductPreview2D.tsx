'use client';

import { useCustomizer } from '@/context/CustomizerContext';
import { ProductType } from '@/types/customizer';
import { useEffect, useRef, useState } from 'react';

const PRODUCT_MOCKUPS: Record<ProductType, { front: string; back: string; left: string; right: string }> = {
    'hoodie': {
        front: '/images/mockups/hoodie-front.png',
        back: '/images/mockups/hoodie-back.png',
        left: '/images/mockups/hoodie-left.png',
        right: '/images/mockups/hoodie-right.png',
    },
    'tshirt': {
        front: '/images/mockups/tshirt-front.png',
        back: '/images/mockups/tshirt-back.png',
        left: '/images/mockups/tshirt-left.png',
        right: '/images/mockups/tshirt-right.png',
    },
    'longsleeve': {
        front: '/images/mockups/longsleeve-front.png',
        back: '/images/mockups/longsleeve-back.png',
        left: '/images/mockups/longsleeve-left.png',
        right: '/images/mockups/longsleeve-right.png',
    },
    'tank': {
        front: '/images/mockups/tank-front.png',
        back: '/images/mockups/tank-back.png',
        left: '/images/mockups/tank-left.png',
        right: '/images/mockups/tank-right.png',
    },
};

export default function ProductPreview2D() {
    const {
        productType,
        productColor,
        currentView,
        layers,
        selectedLayerId,
        selectLayer,
        updateLayer,
        canvasZoom,
    } = useCustomizer();

    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [dragLayerId, setDragLayerId] = useState<string | null>(null);
    const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

    // Render the product mockup and design layers
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw product mockup
        const mockupImg = new Image();
        mockupImg.src = PRODUCT_MOCKUPS[productType][currentView];

        mockupImg.onload = () => {
            // Apply product color tint
            ctx.save();
            ctx.globalCompositeOperation = 'source-over';
            ctx.drawImage(mockupImg, 0, 0, canvas.width, canvas.height);

            // Color tint overlay
            ctx.globalCompositeOperation = 'multiply';
            ctx.fillStyle = productColor;
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Restore normal blending for designs
            ctx.globalCompositeOperation = 'source-over';
            ctx.restore();

            // Draw design layers (sorted by zIndex)
            const sortedLayers = [...layers].sort((a, b) => a.zIndex - b.zIndex);

            sortedLayers.forEach(layer => {
                if (!layer.visible) return;

                ctx.save();
                ctx.globalAlpha = layer.opacity;
                ctx.translate(layer.position.x + layer.size.width / 2, layer.position.y + layer.size.height / 2);
                ctx.rotate((layer.rotation * Math.PI) / 180);
                ctx.translate(-(layer.position.x + layer.size.width / 2), -(layer.position.y + layer.size.height / 2));

                if (layer.type === 'text' && layer.text) {
                    // Draw text
                    ctx.font = `${layer.fontWeight || 'bold'} ${layer.fontSize || 48}px ${layer.fontFamily || 'Arial'}`;
                    ctx.fillStyle = layer.color || '#000000';
                    ctx.textAlign = layer.textAlign || 'center';
                    ctx.textBaseline = 'middle';
                    ctx.fillText(
                        layer.text,
                        layer.position.x + layer.size.width / 2,
                        layer.position.y + layer.size.height / 2
                    );
                } else if ((layer.type === 'image' || layer.type === 'graphic') && layer.imageUrl) {
                    // Draw image/graphic
                    const img = new Image();
                    img.crossOrigin = 'anonymous';
                    img.src = layer.imageUrl;
                    img.onload = () => {
                        ctx.drawImage(
                            img,
                            layer.position.x,
                            layer.position.y,
                            layer.size.width,
                            layer.size.height
                        );
                    };
                }

                // Draw selection outline
                if (layer.id === selectedLayerId) {
                    ctx.strokeStyle = '#FF6B35';
                    ctx.lineWidth = 2;
                    ctx.setLineDash([5, 5]);
                    ctx.strokeRect(
                        layer.position.x - 5,
                        layer.position.y - 5,
                        layer.size.width + 10,
                        layer.size.height + 10
                    );
                    ctx.setLineDash([]);
                }

                ctx.restore();
            });
        };
    }, [productType, productColor, currentView, layers, selectedLayerId]);

    // Handle mouse interactions
    const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        // Find clicked layer (reverse order to check top layers first)
        const reversedLayers = [...layers].sort((a, b) => b.zIndex - a.zIndex);
        const clickedLayer = reversedLayers.find(layer =>
            layer.visible &&
            x >= layer.position.x &&
            x <= layer.position.x + layer.size.width &&
            y >= layer.position.y &&
            y <= layer.position.y + layer.size.height
        );

        if (clickedLayer) {
            selectLayer(clickedLayer.id);
            setIsDragging(true);
            setDragLayerId(clickedLayer.id);
            setDragOffset({
                x: x - clickedLayer.position.x,
                y: y - clickedLayer.position.y,
            });
        } else {
            selectLayer(null);
        }
    };

    const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
        if (!isDragging || !dragLayerId) return;

        const canvas = canvasRef.current;
        if (!canvas) return;

        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        updateLayer(dragLayerId, {
            position: {
                x: x - dragOffset.x,
                y: y - dragOffset.y,
            },
        });
    };

    const handleMouseUp = () => {
        setIsDragging(false);
        setDragLayerId(null);
    };

    return (
        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#1a1a1a] via-[#0a0a0a] to-[#1a1a1a] p-4 md:p-8">
            <div className="relative w-full max-w-[600px]" style={{ transform: `scale(${canvasZoom})`, transformOrigin: 'center' }}>
                <canvas
                    ref={canvasRef}
                    width={600}
                    height={700}
                    className="w-full h-auto rounded-2xl shadow-2xl cursor-crosshair"
                    onMouseDown={handleMouseDown}
                    onMouseMove={handleMouseMove}
                    onMouseUp={handleMouseUp}
                    onMouseLeave={handleMouseUp}
                />
            </div>
        </div>
    );
}
