export type ProductAngle = 'front' | 'back' | 'left' | 'right';

export interface AngleRender {
    angle: ProductAngle;
    url: string;
    loaded: boolean;
}

export interface SafePrintArea {
    angle: ProductAngle;
    bounds: {
        x: number;
        y: number;
        width: number;
        height: number;
    };
}

export interface AngleSpecificLayers {
    front: any[]; // Will use DesignLayer from customizer types
    back: any[];
    left: any[];
    right: any[];
}

export interface ColorTintConfig {
    baseColor: string; // Hex color to apply
    blendMode: 'multiply' | 'overlay' | 'normal';
    opacity?: number;
}
