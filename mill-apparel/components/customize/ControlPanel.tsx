'use client';

import { useCustomizer } from '@/context/CustomizerContext';
import { ProductType, ProductView } from '@/types/customizer';
import {
    Type,
    Image as ImageIcon,
    Trash2,
    Copy,
    Lock,
    Unlock,
    Eye,
    EyeOff,
    ChevronUp,
    ChevronDown,
    Shirt,
    Palette,
    Ruler
} from 'lucide-react';

const PRODUCT_TYPES: { value: ProductType; label: string; icon: string }[] = [
    { value: 'hoodie', label: 'Hoodie', icon: '🧥' },
    { value: 'tshirt', label: 'T-Shirt', icon: '👕' },
    { value: 'longsleeve', label: 'Long Sleeve', icon: '👔' },
    { value: 'tank', label: 'Tank Top', icon: '🎽' },
];

const PRODUCT_COLORS = [
    { name: 'White', value: '#FFFFFF' },
    { name: 'Black', value: '#000000' },
    { name: 'Gray', value: '#9CA3AF' },
    { name: 'Navy', value: '#1E3A8A' },
    { name: 'OD Green', value: '#4A5240' },
    { name: 'Coyote Brown', value: '#8B7355' },
    { name: 'Scarlet', value: '#DC143C' },
];

const SIZES = ['XS', 'S', 'M', 'L', 'XL', '2XL', '3XL'];


export default function ControlPanel() {
    const {
        productType,
        productColor,
        productSize,
        layers,
        selectedLayerId,
        setProductType,
        setProductColor,
        setProductSize,
        addLayer,
        updateLayer,
        deleteLayer,
        duplicateLayer,
        reorderLayer,
    } = useCustomizer();

    const selectedLayer = layers.find(l => l.id === selectedLayerId);

    const handleAddText = () => {
        addLayer({
            type: 'text',
            text: 'YOUR TEXT',
            fontFamily: 'Arial Black',
            fontSize: 48,
            fontWeight: 'bold',
            color: '#000000',
            textAlign: 'center',
            position: { x: 250, y: 300 },
            size: { width: 200, height: 60 },
            rotation: 0,
            locked: false,
            visible: true,
            opacity: 1,
        });
    };

    const handleAddImage = () => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        input.onchange = (e: Event) => {
            const file = (e.target as HTMLInputElement).files?.[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (event) => {
                    const imageUrl = event.target?.result as string;
                    addLayer({
                        type: 'image',
                        imageUrl,
                        imageName: file.name,
                        position: { x: 225, y: 275 },
                        size: { width: 150, height: 150 },
                        rotation: 0,
                        locked: false,
                        visible: true,
                        opacity: 1,
                    });
                };
                reader.readAsDataURL(file);
            }
        };
        input.click();
    };

    return (
        <div className="w-full md:w-80 bg-[#1a1a1a] md:border-l border-gray-800 flex flex-col h-full overflow-y-auto">
            {/* Product Type */}
            <div className="p-4 border-b border-gray-800">
                <div className="flex items-center gap-2 mb-3">
                    <Shirt className="h-4 w-4 text-orange-500" />
                    <h3 className="text-sm font-bold text-white uppercase tracking-wide">Product</h3>
                </div>
                <div className="grid grid-cols-2 gap-2">
                    {PRODUCT_TYPES.map(type => (
                        <button
                            key={type.value}
                            onClick={() => setProductType(type.value)}
                            className={`p-3 rounded-lg border-2 transition-all ${productType === type.value
                                ? 'border-orange-500 bg-orange-500/10'
                                : 'border-gray-800 bg-gray-900 hover:border-gray-700'
                                }`}
                        >
                            <div className="text-2xl mb-1">{type.icon}</div>
                            <div className={`text-xs font-semibold ${productType === type.value ? 'text-orange-500' : 'text-gray-400'
                                }`}>
                                {type.label}
                            </div>
                        </button>
                    ))}
                </div>
            </div>

            {/* Color */}
            <div className="p-4 border-b border-gray-800">
                <div className="flex items-center gap-2 mb-3">
                    <Palette className="h-4 w-4 text-orange-500" />
                    <h3 className="text-sm font-bold text-white uppercase tracking-wide">Color</h3>
                </div>
                <div className="grid grid-cols-7 gap-2">
                    {PRODUCT_COLORS.map(color => (
                        <button
                            key={color.value}
                            onClick={() => setProductColor(color.value)}
                            className={`aspect-square rounded-full border-2 transition-all ${productColor === color.value
                                ? 'border-orange-500 scale-110'
                                : 'border-gray-700 hover:border-gray-600'
                                }`}
                            style={{ backgroundColor: color.value }}
                            title={color.name}
                        />
                    ))}
                </div>
            </div>

            {/* Size */}
            <div className="p-4 border-b border-gray-800">
                <div className="flex items-center gap-2 mb-3">
                    <Ruler className="h-4 w-4 text-orange-500" />
                    <h3 className="text-sm font-bold text-white uppercase tracking-wide">Size</h3>
                </div>
                <div className="grid grid-cols-7 gap-2">
                    {SIZES.map(size => (
                        <button
                            key={size}
                            onClick={() => setProductSize(size)}
                            className={`aspect-square rounded-lg border-2 text-xs font-bold transition-all ${productSize === size
                                ? 'border-orange-500 bg-orange-500/10 text-orange-500'
                                : 'border-gray-800 bg-gray-900 text-gray-400 hover:border-gray-700'
                                }`}
                        >
                            {size}
                        </button>
                    ))}
                </div>
            </div>


            {/* Add Elements */}
            <div className="p-4 border-b border-gray-800">
                <h3 className="text-sm font-bold text-white uppercase tracking-wide mb-3">Add</h3>
                <div className="grid grid-cols-2 gap-2">
                    <button
                        onClick={handleAddText}
                        className="flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-orange-600 to-orange-500 text-white rounded-lg font-semibold text-sm hover:from-orange-700 hover:to-orange-600 transition-all"
                    >
                        <Type className="h-4 w-4" />
                        Text
                    </button>
                    <button
                        onClick={handleAddImage}
                        className="flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-lg font-semibold text-sm hover:from-blue-700 hover:to-blue-600 transition-all"
                    >
                        <ImageIcon className="h-4 w-4" />
                        Image
                    </button>
                </div>
            </div>

            {/* Selected Layer Controls */}
            {selectedLayer && (
                <div className="p-4 border-b border-gray-800">
                    <h3 className="text-sm font-bold text-white uppercase tracking-wide mb-3">
                        {selectedLayer.type === 'text' ? 'Text' : 'Image'} Settings
                    </h3>

                    {selectedLayer.type === 'text' && (
                        <div className="space-y-3">
                            <div>
                                <label className="text-xs text-gray-400 mb-1 block">Text</label>
                                <input
                                    type="text"
                                    value={selectedLayer.text || ''}
                                    onChange={(e) => updateLayer(selectedLayer.id, { text: e.target.value })}
                                    className="w-full bg-gray-900 text-white px-3 py-2 rounded-lg border border-gray-700 focus:border-orange-500 focus:outline-none text-sm"
                                />
                            </div>

                            <div>
                                <label className="text-xs text-gray-400 mb-1 block">Font Size</label>
                                <input
                                    type="range"
                                    min="12"
                                    max="96"
                                    value={selectedLayer.fontSize || 48}
                                    onChange={(e) => updateLayer(selectedLayer.id, { fontSize: parseInt(e.target.value) })}
                                    className="w-full"
                                />
                                <div className="text-xs text-gray-400 mt-1">{selectedLayer.fontSize}px</div>
                            </div>

                            <div>
                                <label className="text-xs text-gray-400 mb-1 block">Color</label>
                                <input
                                    type="color"
                                    value={selectedLayer.color || '#000000'}
                                    onChange={(e) => updateLayer(selectedLayer.id, { color: e.target.value })}
                                    className="w-full h-10 rounded-lg cursor-pointer"
                                />
                            </div>
                        </div>
                    )}

                    <div className="space-y-3 mt-3">
                        <div>
                            <label className="text-xs text-gray-400 mb-1 block">Rotation</label>
                            <input
                                type="range"
                                min="-180"
                                max="180"
                                value={selectedLayer.rotation}
                                onChange={(e) => updateLayer(selectedLayer.id, { rotation: parseInt(e.target.value) })}
                                className="w-full"
                            />
                            <div className="text-xs text-gray-400 mt-1">{selectedLayer.rotation}°</div>
                        </div>

                        <div>
                            <label className="text-xs text-gray-400 mb-1 block">Opacity</label>
                            <input
                                type="range"
                                min="0"
                                max="1"
                                step="0.01"
                                value={selectedLayer.opacity}
                                onChange={(e) => updateLayer(selectedLayer.id, { opacity: parseFloat(e.target.value) })}
                                className="w-full"
                            />
                            <div className="text-xs text-gray-400 mt-1">{Math.round(selectedLayer.opacity * 100)}%</div>
                        </div>
                    </div>

                    <div className="flex gap-2 mt-4">
                        <button
                            onClick={() => updateLayer(selectedLayer.id, { locked: !selectedLayer.locked })}
                            className="flex-1 px-3 py-2 bg-gray-900 text-gray-400 rounded-lg text-xs font-semibold hover:bg-gray-800 transition-all"
                        >
                            {selectedLayer.locked ? <Lock className="h-3 w-3 inline mr-1" /> : <Unlock className="h-3 w-3 inline mr-1" />}
                            {selectedLayer.locked ? 'Locked' : 'Unlocked'}
                        </button>
                        <button
                            onClick={() => updateLayer(selectedLayer.id, { visible: !selectedLayer.visible })}
                            className="flex-1 px-3 py-2 bg-gray-900 text-gray-400 rounded-lg text-xs font-semibold hover:bg-gray-800 transition-all"
                        >
                            {selectedLayer.visible ? <Eye className="h-3 w-3 inline mr-1" /> : <EyeOff className="h-3 w-3 inline mr-1" />}
                            {selectedLayer.visible ? 'Visible' : 'Hidden'}
                        </button>
                    </div>

                    <div className="flex gap-2 mt-2">
                        <button
                            onClick={() => duplicateLayer(selectedLayer.id)}
                            className="flex-1 px-3 py-2 bg-blue-600 text-white rounded-lg text-xs font-semibold hover:bg-blue-700 transition-all"
                        >
                            <Copy className="h-3 w-3 inline mr-1" />
                            Duplicate
                        </button>
                        <button
                            onClick={() => deleteLayer(selectedLayer.id)}
                            className="flex-1 px-3 py-2 bg-red-600 text-white rounded-lg text-xs font-semibold hover:bg-red-700 transition-all"
                        >
                            <Trash2 className="h-3 w-3 inline mr-1" />
                            Delete
                        </button>
                    </div>
                </div>
            )}

            {/* Layers List */}
            <div className="p-4 flex-1">
                <h3 className="text-sm font-bold text-white uppercase tracking-wide mb-3">Layers ({layers.length})</h3>
                <div className="space-y-2">
                    {[...layers].sort((a, b) => b.zIndex - a.zIndex).map(layer => (
                        <div
                            key={layer.id}
                            className={`p-3 rounded-lg border-2 cursor-pointer transition-all ${selectedLayerId === layer.id
                                ? 'border-orange-500 bg-orange-500/10'
                                : 'border-gray-800 bg-gray-900 hover:border-gray-700'
                                }`}
                            onClick={() => updateLayer(layer.id, {})}
                        >
                            <div className="flex items-center gap-2">
                                <div className="flex-1">
                                    <div className="text-sm font-semibold text-white">
                                        {layer.type === 'text' ? (layer.text || 'Text') : layer.imageName || 'Image'}
                                    </div>
                                    <div className="text-xs text-gray-500 capitalize">{layer.type}</div>
                                </div>
                                <div className="flex gap-1">
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            reorderLayer(layer.id, 'up');
                                        }}
                                        className="p-1 hover:bg-gray-800 rounded"
                                    >
                                        <ChevronUp className="h-3 w-3 text-gray-500" />
                                    </button>
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            reorderLayer(layer.id, 'down');
                                        }}
                                        className="p-1 hover:bg-gray-800 rounded"
                                    >
                                        <ChevronDown className="h-3 w-3 text-gray-500" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {layers.length === 0 && (
                    <div className="text-center py-8">
                        <p className="text-gray-500 text-sm">No layers yet</p>
                        <p className="text-gray-600 text-xs mt-1">Add text or images to start</p>
                    </div>
                )}
            </div>
        </div>
    );
}
