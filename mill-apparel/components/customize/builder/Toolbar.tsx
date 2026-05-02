'use client';

import { useCustomizer } from '@/context/CustomizerContext';
import Link from 'next/link';
import {
    Undo2,
    Redo2,
    Download,
    Save,
    Trash2,
    ZoomIn,
    ZoomOut,
    Home
} from 'lucide-react';

export default function Toolbar() {
    const {
        undo,
        redo,
        canUndo,
        canRedo,
        clearDesign,
        exportDesign,
        canvasZoom,
        setCanvasZoom,
    } = useCustomizer();

    const handleExportDesign = () => {
        const designJson = exportDesign();
        const blob = new Blob([designJson], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `mil-apparel-design-${Date.now()}.json`;
        a.click();
        URL.revokeObjectURL(url);
    };

    const handleSaveDesign = () => {
        // TODO: Implement save to backend/localStorage
        const designJson = exportDesign();
        localStorage.setItem('customizer-design', designJson);
        alert('Design saved to browser!');
    };

    const handleClearDesign = () => {
        if (confirm('Are you sure you want to clear your design? This cannot be undone.')) {
            clearDesign();
        }
    };

    return (
        <div className="h-16 bg-[#0a0a0a] border-b border-gray-800 flex items-center justify-between px-6">
            {/* Left: Branding */}
            <div className="flex items-center gap-4">
                <Link href="/" className="flex items-center gap-2 group">
                    <Home className="h-5 w-5 text-gray-400 group-hover:text-orange-500 transition-colors" />
                    <span className="font-display text-xl font-bold text-white">Mil Apparel</span>
                </Link>
                <div className="h-6 w-px bg-gray-800" />
                <span className="text-gray-400 text-sm font-semibold">Design Studio</span>
            </div>

            {/* Center: History & Zoom */}
            <div className="flex items-center gap-2">
                <button
                    onClick={undo}
                    disabled={!canUndo}
                    className={`p-2 rounded-lg transition-all ${canUndo
                            ? 'bg-gray-900 text-white hover:bg-gray-800'
                            : 'bg-gray-900/50 text-gray-600 cursor-not-allowed'
                        }`}
                    title="Undo"
                >
                    <Undo2 className="h-5 w-5" />
                </button>
                <button
                    onClick={redo}
                    disabled={!canRedo}
                    className={`p-2 rounded-lg transition-all ${canRedo
                            ? 'bg-gray-900 text-white hover:bg-gray-800'
                            : 'bg-gray-900/50 text-gray-600 cursor-not-allowed'
                        }`}
                    title="Redo"
                >
                    <Redo2 className="h-5 w-5" />
                </button>

                <div className="h-6 w-px bg-gray-800 mx-2" />

                <button
                    onClick={() => setCanvasZoom(canvasZoom - 0.1)}
                    className="p-2 rounded-lg bg-gray-900 text-white hover:bg-gray-800 transition-all"
                    title="Zoom Out"
                >
                    <ZoomOut className="h-5 w-5" />
                </button>
                <div className="px-3 py-1 bg-gray-900 rounded-lg text-white text-sm font-semibold min-w-[60px] text-center">
                    {Math.round(canvasZoom * 100)}%
                </div>
                <button
                    onClick={() => setCanvasZoom(canvasZoom + 0.1)}
                    className="p-2 rounded-lg bg-gray-900 text-white hover:bg-gray-800 transition-all"
                    title="Zoom In"
                >
                    <ZoomIn className="h-5 w-5" />
                </button>
            </div>

            {/* Right: Actions */}
            <div className="flex items-center gap-2">
                <button
                    onClick={handleClearDesign}
                    className="px-4 py-2 rounded-lg bg-gray-900 text-gray-400 hover:bg-red-600 hover:text-white transition-all flex items-center gap-2 text-sm font-semibold"
                >
                    <Trash2 className="h-4 w-4" />
                    Clear
                </button>
                <button
                    onClick={handleSaveDesign}
                    className="px-4 py-2 rounded-lg bg-gray-900 text-white hover:bg-gray-800 transition-all flex items-center gap-2 text-sm font-semibold"
                >
                    <Save className="h-4 w-4" />
                    Save
                </button>
                <button
                    onClick={handleExportDesign}
                    className="px-4 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-blue-500 text-white hover:from-blue-700 hover:to-blue-600 transition-all flex items-center gap-2 text-sm font-semibold"
                >
                    <Download className="h-4 w-4" />
                    Export
                </button>
                <Link
                    href="/cart"
                    className="px-6 py-2 rounded-lg bg-gradient-to-r from-orange-600 to-orange-500 text-white hover:from-orange-700 hover:to-orange-600 transition-all text-sm font-bold"
                >
                    Add to Cart
                </Link>
            </div>
        </div>
    );
}
