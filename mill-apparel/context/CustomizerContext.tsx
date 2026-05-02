'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';
import { CustomizerState, DesignLayer, ProductType, ProductView, DesignTool } from '@/types/customizer';

interface CustomizerContextType extends CustomizerState {
    // Product actions
    setProductType: (type: ProductType) => void;
    setProductColor: (color: string) => void;
    setProductSize: (size: string) => void;
    setCurrentView: (view: ProductView) => void;

    // Layer actions
    addLayer: (layer: Omit<DesignLayer, 'id' | 'zIndex'>) => void;
    updateLayer: (id: string, updates: Partial<DesignLayer>) => void;
    deleteLayer: (id: string) => void;
    selectLayer: (id: string | null) => void;
    duplicateLayer: (id: string) => void;
    reorderLayer: (id: string, direction: 'up' | 'down') => void;

    // Tool actions
    setActiveTool: (tool: DesignTool) => void;

    // Canvas actions
    setCanvasZoom: (zoom: number) => void;
    setCanvasOffset: (offset: { x: number; y: number }) => void;

    // Design customization
    setDesignName: (name: string) => void;
    setGuidedMode: (enabled: boolean) => void;
    setGiftMode: (enabled: boolean) => void;
    setQuantity: (qty: number) => void;
    toggleAddOn: (addon: 'backPrint' | 'sleevePrint' | 'embroidery') => void;

    // History actions
    undo: () => void;
    redo: () => void;
    canUndo: boolean;
    canRedo: boolean;

    // Utility
    clearDesign: () => void;
    exportDesign: () => string;
}

const CustomizerContext = createContext<CustomizerContextType | undefined>(undefined);

export function CustomizerProvider({ children }: { children: React.ReactNode }) {
    const [state, setState] = useState<CustomizerState>({
        productType: 'hoodie',
        productColor: '#FFFFFF',
        productSize: 'M',
        currentView: 'front',
        layers: [],
        selectedLayerId: null,
        activeTool: 'select',
        canvasZoom: 1,
        canvasOffset: { x: 0, y: 0 },
        history: [[]],
        historyIndex: 0,
        designName: 'My Custom Design',
        guidedMode: false,
        isGiftMode: false,
        quantity: 1,
        addOns: {
            backPrint: false,
            sleevePrint: false,
            embroidery: false,
        },
    });

    // Helper to save history
    const saveHistory = useCallback((newLayers: DesignLayer[]) => {
        setState(prev => ({
            ...prev,
            layers: newLayers,
            history: [...prev.history.slice(0, prev.historyIndex + 1), newLayers],
            historyIndex: prev.historyIndex + 1,
        }));
    }, []);

    // Product actions
    const setProductType = useCallback((type: ProductType) => {
        setState(prev => ({ ...prev, productType: type }));
    }, []);

    const setProductColor = useCallback((color: string) => {
        setState(prev => ({ ...prev, productColor: color }));
    }, []);

    const setProductSize = useCallback((size: string) => {
        setState(prev => ({ ...prev, productSize: size }));
    }, []);

    const setCurrentView = useCallback((view: ProductView) => {
        setState(prev => ({ ...prev, currentView: view }));
    }, []);

    // Layer actions
    const addLayer = useCallback((layer: Omit<DesignLayer, 'id' | 'zIndex'>) => {
        const newLayer: DesignLayer = {
            ...layer,
            id: `layer-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
            zIndex: state.layers.length,
        };
        const newLayers = [...state.layers, newLayer];
        saveHistory(newLayers);
        setState(prev => ({ ...prev, selectedLayerId: newLayer.id }));
    }, [state.layers.length, saveHistory]);

    const updateLayer = useCallback((id: string, updates: Partial<DesignLayer>) => {
        const newLayers = state.layers.map(layer =>
            layer.id === id ? { ...layer, ...updates } : layer
        );
        saveHistory(newLayers);
    }, [state.layers, saveHistory]);

    const deleteLayer = useCallback((id: string) => {
        const newLayers = state.layers.filter(layer => layer.id !== id);
        saveHistory(newLayers);
        setState(prev => ({ ...prev, selectedLayerId: null }));
    }, [state.layers, saveHistory]);

    const selectLayer = useCallback((id: string | null) => {
        setState(prev => ({ ...prev, selectedLayerId: id }));
    }, []);

    const duplicateLayer = useCallback((id: string) => {
        const layer = state.layers.find(l => l.id === id);
        if (layer) {
            const newLayer: DesignLayer = {
                ...layer,
                id: `layer-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
                position: { x: layer.position.x + 20, y: layer.position.y + 20 },
                zIndex: state.layers.length,
            };
            const newLayers = [...state.layers, newLayer];
            saveHistory(newLayers);
            setState(prev => ({ ...prev, selectedLayerId: newLayer.id }));
        }
    }, [state.layers, saveHistory]);

    const reorderLayer = useCallback((id: string, direction: 'up' | 'down') => {
        const index = state.layers.findIndex(l => l.id === id);
        if (index === -1) return;

        const newLayers = [...state.layers];
        const targetIndex = direction === 'up' ? index + 1 : index - 1;

        if (targetIndex >= 0 && targetIndex < newLayers.length) {
            [newLayers[index], newLayers[targetIndex]] = [newLayers[targetIndex], newLayers[index]];
            // Update zIndex
            newLayers.forEach((layer, i) => {
                layer.zIndex = i;
            });
            saveHistory(newLayers);
        }
    }, [state.layers, saveHistory]);

    // Tool actions
    const setActiveTool = useCallback((tool: DesignTool) => {
        setState(prev => ({ ...prev, activeTool: tool }));
    }, []);

    // Canvas actions
    const setCanvasZoom = useCallback((zoom: number) => {
        setState(prev => ({ ...prev, canvasZoom: Math.max(0.5, Math.min(3, zoom)) }));
    }, []);

    const setCanvasOffset = useCallback((offset: { x: number; y: number }) => {
        setState(prev => ({ ...prev, canvasOffset: offset }));
    }, []);

    // Design customization actions
    const setDesignName = useCallback((name: string) => {
        setState(prev => ({ ...prev, designName: name }));
    }, []);

    const setGuidedMode = useCallback((enabled: boolean) => {
        setState(prev => ({ ...prev, guidedMode: enabled }));
    }, []);

    const setGiftMode = useCallback((enabled: boolean) => {
        setState(prev => ({ ...prev, isGiftMode: enabled }));
    }, []);

    const setQuantity = useCallback((qty: number) => {
        setState(prev => ({ ...prev, quantity: Math.max(1, qty) }));
    }, []);

    const toggleAddOn = useCallback((addon: 'backPrint' | 'sleevePrint' | 'embroidery') => {
        setState(prev => ({
            ...prev,
            addOns: { ...prev.addOns, [addon]: !prev.addOns[addon] },
        }));
    }, []);

    // History actions
    const undo = useCallback(() => {
        if (state.historyIndex > 0) {
            setState(prev => ({
                ...prev,
                layers: prev.history[prev.historyIndex - 1],
                historyIndex: prev.historyIndex - 1,
                selectedLayerId: null,
            }));
        }
    }, [state.historyIndex]);

    const redo = useCallback(() => {
        if (state.historyIndex < state.history.length - 1) {
            setState(prev => ({
                ...prev,
                layers: prev.history[prev.historyIndex + 1],
                historyIndex: prev.historyIndex + 1,
                selectedLayerId: null,
            }));
        }
    }, [state.historyIndex, state.history.length]);

    const canUndo = state.historyIndex > 0;
    const canRedo = state.historyIndex < state.history.length - 1;

    // Utility
    const clearDesign = useCallback(() => {
        saveHistory([]);
        setState(prev => ({ ...prev, selectedLayerId: null }));
    }, [saveHistory]);

    const exportDesign = useCallback(() => {
        return JSON.stringify({
            product: {
                type: state.productType,
                color: state.productColor,
                size: state.productSize,
            },
            layers: state.layers,
        }, null, 2);
    }, [state]);

    return (
        <CustomizerContext.Provider value={{
            ...state,
            setProductType,
            setProductColor,
            setProductSize,
            setCurrentView,
            addLayer,
            updateLayer,
            deleteLayer,
            selectLayer,
            duplicateLayer,
            reorderLayer,
            setActiveTool,
            setCanvasZoom,
            setCanvasOffset,
            setDesignName,
            setGuidedMode,
            setGiftMode,
            setQuantity,
            toggleAddOn,
            undo,
            redo,
            canUndo,
            canRedo,
            clearDesign,
            exportDesign,
        }}>
            {children}
        </CustomizerContext.Provider>
    );
}

export function useCustomizer() {
    const context = useContext(CustomizerContext);
    if (!context) {
        throw new Error('useCustomizer must be used within CustomizerProvider');
    }
    return context;
}
