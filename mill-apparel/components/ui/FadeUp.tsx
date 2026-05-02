'use client';

import { useEffect, useRef, useState, ReactNode } from 'react';

interface FadeUpProps {
    children: ReactNode;
    delay?: number;
    duration?: number;
    threshold?: number;
    className?: string;
}

export default function FadeUp({ children, delay = 0, duration = 600, threshold = 0.15, className = '' }: FadeUpProps) {
    const ref = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.unobserve(element);
                }
            },
            { threshold }
        );

        observer.observe(element);
        return () => observer.disconnect();
    }, [threshold]);

    return (
        <div
            ref={ref}
            className={className}
            style={{
                transform: isVisible ? 'translateY(0)' : 'translateY(24px)',
                opacity: isVisible ? 1 : 0,
                transition: `transform ${duration}ms cubic-bezier(0.22, 1, 0.36, 1) ${delay}ms, opacity ${duration}ms cubic-bezier(0.22, 1, 0.36, 1) ${delay}ms`,
                willChange: 'transform, opacity',
            }}
        >
            {children}
        </div>
    );
}
