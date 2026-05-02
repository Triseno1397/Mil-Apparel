'use client';

import React from 'react';
import { useCustomizer } from '@/context/CustomizerContext';
import { Type, Move, RotateCw, Palette, AlignCenter, AlignLeft, AlignRight } from 'lucide-react';
import { DesignLayer } from '@/types/customizer';

export default function PropertiesPanel() {
    const { layers, selectedLayerId, updateLayer } = useCustomizer();

    const selectedLayer = layers.find(l => l.id === selectedLayerId);

    if (!selectedLayer) {
        return (
            <div className="p-6 text-center">
                <div className="flex flex-col items-center justify-center h-48">
                    <Move className="w-12 h-12 text-gray-700 mb-3" />
                    <p className="text-sm text-gray-400">No layer selected</p>
                    <p className="text-xs text-gray-600 mt-1">Select a layer to edit its properties</p>
                </div>
            </div>
        );
    }

    const handleUpdate = (updates: Partial<DesignLayer>) => {
        updateLayer(selectedLayer.id, updates);
    };

    return (
        <div className="p-4 space-y-4 overflow-y-auto max-h-[calc(100vh-400px)]">
            {/* Header */}
            <div className="flex items-center gap-2 pb-3 border-b border-gray-800">
                <Type className="h-5 w-5 text-[#FF6B35]" />
                <h3 className="text-white font-bold text-lg">Properties</h3>
            </div>

            {/* Text Properties */}
            {selectedLayer.type === 'text' && (
                <div className="space-y-4">
                    {/* Text Content */}
                    <div>
                        <label className="text-gray-400 text-xs mb-1 block font-semibold">Text</label>
                        <textarea
                            value={selectedLayer.text || ''}
                            onChange={(e) => handleUpdate({ text: e.target.value })}
                            className="w-full bg-[#0a0a0a] text-white text-sm px-3 py-2 rounded border border-gray-700 focus:border-[#FF6B35] focus:outline-none resize-none"
                            rows={2}
                        />
                    </div>

                    {/* Font Family */}
                    <div>
                        <label className="text-gray-400 text-xs mb-1 block font-semibold">Font</label>
                        <select
                            value={selectedLayer.fontFamily || 'Arial'}
                            onChange={(e) => handleUpdate({ fontFamily: e.target.value })}
                            className="w-full bg-[#0a0a0a] text-white text-sm px-3 py-2 rounded border border-gray-700 focus:border-[#FF6B35] focus:outline-none"
                        >
                            <option value="Arial">Arial</option>
                            <option value="Helvetica">Helvetica</option>
                            <option value="Times New Roman">Times New Roman</option>
                            <option value="Courier New">Courier New</option>
                            <option value="Georgia">Georgia</option>
                            <option value="Verdana">Verdana</option>
                            <option value="Impact">Impact</option>
                        </select>
                    </div>

                    {/* Font Size */}
                    <div>
                        <label className="text-gray-400 text-xs mb-1 block font-semibold">
                            Size: {selectedLayer.fontSize || 32}px
                        </label>
                        <input
                            type="range"
                            min="12"
                            max="120"
                            value={selectedLayer.fontSize || 32}
                            onChange={(e) => handleUpdate({ fontSize: parseInt(e.target.value) })}
                            className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-[#FF6B35]"
                        />
                    </div>

                    {/* Font Weight */}
                    <div>
                        <label className="text-gray-400 text-xs mb-1 block font-semibold">Weight</label>
                        <select
                            value={selectedLayer.fontWeight || 'bold'}
                            onChange={(e) => handleUpdate({ fontWeight: e.target.value })}
                            className="w-full bg-[#0a0a0a] text-white text-sm px-3 py-2 rounded border border-gray-700 focus:border-[#FF6B35] focus:outline-none"
                        >
                            <option value="normal">Normal</option>
                            <option value="bold">Bold</option>
                            <option value="bolder">Bolder</option>
                            <option value="lighter">Lighter</option>
                        </select>
                    </div>

                    {/* Color */}
                    <div>
                        <label className="text-gray-400 text-xs mb-1 block font-semibold">Color</label>
                        <div className="flex gap-2">
                            <input
                                type="color"
                                value={selectedLayer.color || '#000000'}
                                onChange={(e) => handleUpdate({ color: e.target.value })}
                                className="w-12 h-10 bg-[#0a0a0a] rounded border border-gray-700 cursor-pointer"
                            />
                            <input
                                type="text"
                                value={selectedLayer.color || '#000000'}
                                onChange={(e) => handleUpdate({ color: e.target.value })}
                                className="flex-1 bg-[#0a0a0a] text-white text-sm px-3 py-2 rounded border border-gray-700 focus:border-[#FF6B35] focus:outline-none"
                            />
                        </div>
                    </div>

                    {/* Text Alignment */}
                    <div>
                        <label className="text-gray-400 text-xs mb-1 block font-semibold">Alignment</label>
                        <div className="flex gap-2">
                            <button
                                onClick={() => handleUpdate({ textAlign: 'left' })}
                                className={`flex-1 px-3 py-2 rounded border ${selectedLayer.textAlign === 'left'
                                        ? 'bg-[#FF6B35] border-[#FF6B35] text-white'
                                        : 'bg-[#0a0a0a] border-gray-700 text-gray-400 hover:border-[#FF6B35]'
                                    }`}
                            >
                                <AlignLeft className="w-4 h-4 mx-auto" />
                            </button>
                            <button
                                onClick={() => handleUpdate({ textAlign: 'center' })}
                                className={`flex-1 px-3 py-2 rounded border ${selectedLayer.textAlign === 'center'
                                        ? 'bg-[#FF6B35] border-[#FF6B35] text-white'
                                        : 'bg-[#0a0a0a] border-gray-700 text-gray-400 hover:border-[#FF6B35]'
                                    }`}
                            >
                                <AlignCenter className="w-4 h-4 mx-auto" />
                            </button>
                            <button
                                onClick={() => handleUpdate({ textAlign: 'right' })}
                                className={`flex-1 px-3 py-2 rounded border ${selectedLayer.textAlign === 'right'
                                        ? 'bg-[#FF6B35] border-[#FF6B35] text-white'
                                        : 'bg-[#0a0a0a] border-gray-700 text-gray-400 hover:border-[#FF6B35]'
                                    }`}
                            >
                                <AlignRight className="w-4 h-4 mx-auto" />
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Image Properties */}
            {(selectedLayer.type === 'image' || selectedLayer.type === 'graphic') && (
                <div className="space-y-4">
                    <div className="text-sm text-gray-400">
                        <p className="mb-2">Image layer selected</p>
                        {selectedLayer.imageName && (
                            <p className="text-xs text-gray-500">File: {selectedLayer.imageName}</p>
                        )}
                    </div>
                </div>
            )}

            {/* Common Properties */}
            <div className="pt-4 border-t border-gray-800 space-y-4">
                <h4 className="text-gray-400 text-xs font-semibold">Transform</h4>

                {/* Rotation */}
                <div>
                    <label className="text-gray-400 text-xs mb-1 block">
                        Rotation: {selectedLayer.rotation || 0}°
                    </label>
                    <input
                        type="range"
                        min="-180"
                        max="180"
                        value={selectedLayer.rotation || 0}
                        onChange={(e) => handleUpdate({ rotation: parseInt(e.target.value) })}
                        className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-[#FF6B35]"
                    />
                </div>

                {/* Opacity */}
                <div>
                    <label className="text-gray-400 text-xs mb-1 block">
                        Opacity: {Math.round((selectedLayer.opacity || 1) * 100)}%
                    </label>
                    <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.01"
                        value={selectedLayer.opacity || 1}
                        onChange={(e) => handleUpdate({ opacity: parseFloat(e.target.value) })}
                        className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-[#FF6B35]"
                    />
                </div>
            </div>

            {/* Placement Presets */}
            <div className="pt-4 border-t border-gray-800">
                <h4 className="text-gray-400 text-xs mb-2 font-semibold">Quick Placement</h4>
                <div className="grid grid-cols-2 gap-2">
                    <button
                        onClick={() => handleUpdate({ position: { x: 100, y: 150 } })}
                        className="px-3 py-2 bg-gray-800 hover:bg-gray-700 text-white text-xs rounded transition-colors"
                    >
                        Left Chest
                    </button>
                    <button
                        onClick={() => handleUpdate({ position: { x: 250, y: 150 } })}
                        className="px-3 py-2 bg-gray-800 hover:bg-gray-700 text-white text-xs rounded transition-colors"
                    >
                        Center Chest
                    </button>
                    <button
                        onClick={() => handleUpdate({ position: { x: 250, y: 300 } })}
                        className="px-3 py-2 bg-gray-800 hover:bg-gray-700 text-white text-xs rounded transition-colors"
                    >
                        Back Center
                    </button>
                    <button
                        onClick={() => handleUpdate({ position: { x: 450, y: 200 } })}
                        className="px-3 py-2 bg-gray-800 hover:bg-gray-700 text-white text-xs rounded transition-colors"
                    >
                        Sleeve
                    </button>
                </div>
            </div>
        </div>
    );
}
