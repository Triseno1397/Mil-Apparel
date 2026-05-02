'use client';

import React from 'react';
import { useCustomizer } from '@/context/CustomizerContext';
import { Type, Image as ImageIcon, Layers as LayersIcon, Trash2, Lock, Unlock, Eye, EyeOff, MoveVertical } from 'lucide-react';
import { DesignLayer } from '@/types/customizer';

export default function LayersPanel() {
    const { layers, selectedLayerId, selectLayer, deleteLayer, updateLayer, reorderLayer, addLayer } = useCustomizer();

    const getLayerIcon = (type: DesignLayer['type']) => {
        switch (type) {
            case 'text':
                return <Type className="w-4 h-4" />;
            case 'graphic':
            case 'image':
                return <ImageIcon className="w-4 h-4" />;
        }
    };

    const getLayerName = (layer: DesignLayer) => {
        if (layer.type === 'text' && layer.text) {
            return layer.text.substring(0, 20) + (layer.text.length > 20 ? '...' : '');
        }
        return `${layer.type.charAt(0).toUpperCase() + layer.type.slice(1)} Layer`;
    };

    const handleAddText = () => {
        addLayer({
            type: 'text',
            text: 'New Text',
            position: { x: 250, y: 300 },
            size: { width: 200, height: 60 },
            rotation: 0,
            locked: false,
            visible: true,
            opacity: 1,
            fontFamily: 'Arial',
            fontSize: 32,
            fontWeight: 'bold',
            color: '#000000',
            textAlign: 'center',
        });
    };

    const toggleLayerVisibility = (layer: DesignLayer, e: React.MouseEvent) => {
        e.stopPropagation();
        updateLayer(layer.id, { visible: !layer.visible });
    };

    const toggleLayerLock = (layer: DesignLayer, e: React.MouseEvent) => {
        e.stopPropagation();
        updateLayer(layer.id, { locked: !layer.locked });
    };

    return (
        <div className="h-full flex flex-col max-h-64">
            {/* Header */}
            <div className="p-3 border-b border-gray-800">
                <div className="flex items-center justify-between mb-3">
                    <h2 className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                        Layers
                    </h2>
                    <LayersIcon className="w-4 h-4 text-gray-600" />
                </div>

                <button
                    onClick={handleAddText}
                    className="w-full px-3 py-2 bg-gray-800 hover:bg-gray-700 text-white text-sm rounded transition-colors flex items-center justify-center gap-2"
                >
                    <Type className="w-4 h-4" />
                    Add Text
                </button>
            </div>

            {/* Layers List */}
            <div className="flex-1 overflow-y-auto p-2 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-900">
                {layers.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-24 text-center px-4">
                        <LayersIcon className="w-6 h-6 text-gray-700 mb-2" />
                        <p className="text-xs text-gray-500">
                            No layers yet
                        </p>
                    </div>
                ) : (
                    <div className="space-y-1">
                        {layers.map((layer, index) => {
                            const isSelected = layer.id === selectedLayerId;

                            return (
                                <div
                                    key={layer.id}
                                    onClick={() => selectLayer(layer.id)}
                                    className={`
                                        group flex items-center gap-2 p-2 rounded cursor-pointer transition-all
                                        ${isSelected
                                            ? 'bg-[#FF6B35]/20 border border-[#FF6B35]'
                                            : 'bg-gray-800/50 hover:bg-gray-700/50 border border-transparent'
                                        }
                                    `}
                                >
                                    {/* Drag Handle */}
                                    <div className="text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity cursor-move">
                                        <MoveVertical className="w-3 h-3" />
                                    </div>

                                    {/* Layer Icon & Name */}
                                    <div className="flex items-center gap-2 flex-1 min-w-0">
                                        <div className={`${isSelected ? 'text-[# FF6B35]' : 'text-gray-400'}`}>
                                            {getLayerIcon(layer.type)}
                                        </div>
                                        <span className="text-xs font-medium truncate text-gray-200">
                                            {getLayerName(layer)}
                                        </span>
                                    </div>

                                    {/* Controls */}
                                    <div className="flex items-center gap-1">
                                        <button
                                            onClick={(e) => toggleLayerVisibility(layer, e)}
                                            className="p-1 hover:bg-gray-600 rounded transition-colors"
                                            title={layer.visible ? 'Hide Layer' : 'Show Layer'}
                                        >
                                            {layer.visible ? (
                                                <Eye className="w-3 h-3 text-gray-400" />
                                            ) : (
                                                <EyeOff className="w-3 h-3 text-gray-600" />
                                            )}
                                        </button>

                                        <button
                                            onClick={(e) => toggleLayerLock(layer, e)}
                                            className="p-1 hover:bg-gray-600 rounded transition-colors"
                                            title={layer.locked ? 'Unlock Layer' : 'Lock Layer'}
                                        >
                                            {layer.locked ? (
                                                <Lock className="w-3 h-3 text-gray-400" />
                                            ) : (
                                                <Unlock className="w-3 h-3 text-gray-600" />
                                            )}
                                        </button>

                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                deleteLayer(layer.id);
                                            }}
                                            className="p-1 hover:bg-red-500/20 rounded transition-colors"
                                            title="Delete Layer"
                                        >
                                            <Trash2 className="w-3 h-3 text-red-400" />
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>

            {/* Footer Info */}
            <div className="p-2 border-t border-gray-800">
                <div className="text-[10px] text-gray-600">
                    {layers.length === 0 ? 'No layers' : `${layers.length} layer${layers.length !== 1 ? 's' : ''}`}
                </div>
            </div>
        </div>
    );
}
