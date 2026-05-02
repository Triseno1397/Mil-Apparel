// Customizer Types

export type ProductType = 'tshirt' | 'hoodie' | 'longsleeve' | 'tank';
export type ProductView = 'front' | 'back' | 'left' | 'right';
export type DesignTool = 'select' | 'text' | 'image' | 'template';
export type TextAlignment = 'left' | 'center' | 'right';

export interface DesignLayer {
    id: string;
    type: 'text' | 'image' | 'graphic';
    position: { x: number; y: number };
    size: { width: number; height: number };
    rotation: number;
    zIndex: number;
    locked: boolean;
    visible: boolean;
    opacity: number;

    // Text-specific
    text?: string;
    fontFamily?: string;
    fontSize?: number;
    fontWeight?: string;
    color?: string;
    textAlign?: TextAlignment;

    // Image-specific
    imageUrl?: string;
    imageName?: string;
}

export interface DesignTemplate {
    id: string;
    name: string;
    category: 'military' | 'unit' | 'rank' | 'specialty' | 'custom' | 'memorial';
    previewUrl: string;
    layers: Omit<DesignLayer, 'id' | 'zIndex'>[];
    branch?: string;
}

export interface CustomizerState {
    // Product
    productType: ProductType;
    productColor: string;
    productSize: string;
    currentView: ProductView;

    // Design
    layers: DesignLayer[];
    selectedLayerId: string | null;
    activeTool: DesignTool;

    // Canvas
    canvasZoom: number;
    canvasOffset: { x: number; y: number };

    // History
    history: DesignLayer[][];
    historyIndex: number;

    // Customization Features
    designName: string;
    guidedMode: boolean;
    isGiftMode: boolean;
    quantity: number;
    addOns: {
        backPrint: boolean;
        sleevePrint: boolean;
        embroidery: boolean;
    };
}

export interface MilitaryGraphic {
    id: string;
    name: string;
    category: 'insignia' | 'patch' | 'badge' | 'emblem' | 'icon';
    branch?: 'army' | 'navy' | 'air-force' | 'marines' | 'coast-guard';
    imageUrl: string;
    tags: string[];
}
