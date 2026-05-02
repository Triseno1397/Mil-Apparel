// Layer Types for Interactive Builder

export type LayerType = 'text' | 'graphic' | 'patch';

export interface Position {
    x: number; // Percentage from left (0-100)
    y: number; // Percentage from top (0-100)
}

export interface TextLayer {
    id: string;
    type: 'text';
    content: string;
    position: Position;
    rotation: number; // Degrees
    fontSize: number; // px
    fontFamily: string;
    color: string;
    opacity: number; // 0-1
    locked: boolean;
    alignment: 'left' | 'center' | 'right';
    lineHeight: number;
    letterSpacing: number;
}

export interface GraphicLayer {
    id: string;
    type: 'graphic';
    imageUrl: string;
    position: Position;
    rotation: number;
    width: number; // px
    height: number; // px
    opacity: number;
    locked: boolean;
}

export interface PatchLayer {
    id: string;
    type: 'patch';
    patchId: string; // Reference to unit patch
    position: Position;
    rotation: number;
    size: number; // px
    opacity: number;
    locked: boolean;
}

export type Layer = TextLayer | GraphicLayer | PatchLayer;

export interface BuilderState {
    productId: string;
    productView: 'front' | 'back' | 'left-sleeve' | 'right-sleeve';
    layers: Layer[];
    selectedLayerId: string | null;
    zoom: number; // 0.5 - 2.0
    canvasSize: {
        width: number;
        height: number;
    };
}

export interface BuilderHistory {
    past: BuilderState[];
    present: BuilderState;
    future: BuilderState[];
}

// Template for quick-start designs
export interface Template {
    id: string;
    name: string;
    description: string;
    thumbnail: string;
    layers: Omit<Layer, 'id'>[]; // Layers without IDs (generated on apply)
    category: 'military' | 'veteran' | 'unit' | 'custom';
}

// Export format for cart integration
export interface BuiltDesign {
    productId: string;
    layers: Layer[];
    thumbnail: string; // Base64 or URL to generated preview
    totalPrice: number;
    createdAt: string;
}
