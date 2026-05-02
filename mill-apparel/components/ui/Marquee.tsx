'use client';

import { ReactNode } from 'react';

interface MarqueeProps {
    children: ReactNode;
    speed?: number;
    className?: string;
}

export default function Marquee({ children, speed = 30, className = '' }: MarqueeProps) {
    return (
        <div className={`overflow-hidden ${className}`}>
            <div
                className="flex animate-marquee whitespace-nowrap"
                style={{ animationDuration: `${speed}s` }}
            >
                {/* Duplicate content for seamless loop */}
                <div className="flex items-center shrink-0">
                    {children}
                </div>
                <div className="flex items-center shrink-0" aria-hidden>
                    {children}
                </div>
            </div>
        </div>
    );
}
