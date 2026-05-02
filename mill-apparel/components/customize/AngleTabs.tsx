'use client';

import { ProductAngle } from '@/types/angle-preview';
import { User, ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';

interface AngleTabsProps {
    currentAngle: ProductAngle;
    onAngleChange: (angle: ProductAngle) => void;
    className?: string;
}

const ANGLE_CONFIG: Record<ProductAngle, { label: string; icon: typeof User }> = {
    front: { label: 'Front', icon: User },
    back: { label: 'Back', icon: ArrowLeft },
    left: { label: 'Left Sleeve', icon: ChevronLeft },
    right: { label: 'Right Sleeve', icon: ChevronRight },
};

export default function AngleTabs({ currentAngle, onAngleChange, className = '' }: AngleTabsProps) {
    const angles: ProductAngle[] = ['front', 'back', 'left', 'right'];

    return (
        <div className={`flex items-center justify-center gap-2 ${className}`}>
            {angles.map((angle) => {
                const config = ANGLE_CONFIG[angle];
                const Icon = config.icon;
                const isActive = currentAngle === angle;

                return (
                    <button
                        key={angle}
                        onClick={() => onAngleChange(angle)}
                        className={`
              group relative flex items-center justify-center
              w-14 h-14 rounded-lg
              transition-all duration-200
              ${isActive
                                ? 'bg-[#6B7C3C] text-white shadow-lg scale-105'
                                : 'bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white'
                            }
            `}
                        aria-label={`View ${config.label}`}
                        title={config.label}
                    >
                        <Icon className="w-6 h-6" />

                        {/* Active indicator */}
                        {isActive && (
                            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-8 h-1 bg-[#6B7C3C] rounded-full" />
                        )}

                        {/* Tooltip */}
                        <span className="absolute top-full mt-2 px-3 py-1.5 bg-gray-900 text-white text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50">
                            {config.label}
                        </span>
                    </button>
                );
            })}
        </div>
    );
}
