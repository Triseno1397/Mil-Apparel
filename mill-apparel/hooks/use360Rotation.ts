import { useState, useRef, useCallback, useEffect } from 'react';

interface Use360RotationProps {
    frameCount: number;
    currentFrame: number;
    setCurrentFrame: (frame: number | ((prev: number) => number)) => void;
    onInteract?: () => void;
}

export function use360Rotation({
    frameCount,
    currentFrame,
    setCurrentFrame,
    onInteract
}: Use360RotationProps) {
    const [isDragging, setIsDragging] = useState(false);
    const [velocity, setVelocity] = useState(0);
    const startXRef = useRef(0);
    const lastXRef = useRef(0);
    const lastTimeRef = useRef(0);

    // Sensitivity: pixels per frame (lowered for better responsiveness)
    const SENSITIVITY = 5;
    const MOMENTUM_DECAY = 0.92;
    const MIN_VELOCITY = 0.1;

    // Apply momentum (runs on RAF)
    useEffect(() => {
        if (Math.abs(velocity) < MIN_VELOCITY) {
            setVelocity(0);
            return;
        }

        let rafId: number;
        const animate = () => {
            setVelocity(v => v * MOMENTUM_DECAY);
            setCurrentFrame(frame => {
                const newFrame = frame + Math.round(velocity);
                return ((newFrame % frameCount) + frameCount) % frameCount;
            });
            rafId = requestAnimationFrame(animate);
        };

        rafId = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(rafId);
    }, [velocity, frameCount, setCurrentFrame]);

    const handleMove = useCallback((clientX: number) => {
        const deltaX = clientX - lastXRef.current;
        const deltaTime = Date.now() - lastTimeRef.current || 1;

        // Calculate frame change (removed threshold for immediate response)
        const frameChange = Math.round(deltaX / SENSITIVITY);

        if (frameChange !== 0) {
            setCurrentFrame(frame => {
                const newFrame = frame + frameChange;
                return ((newFrame % frameCount) + frameCount) % frameCount;
            });

            // Calculate velocity for momentum
            if (deltaTime > 0) {
                setVelocity(deltaX / deltaTime * 16);
            }

            lastXRef.current = clientX;
            lastTimeRef.current = Date.now();
        }
    }, [frameCount, setCurrentFrame]);

    const onMouseDown = useCallback((e: React.MouseEvent) => {
        e.preventDefault();
        setIsDragging(true);
        setVelocity(0);
        startXRef.current = e.clientX;
        lastXRef.current = e.clientX;
        lastTimeRef.current = Date.now();
        setVelocity(0);
        onInteract?.();

        const handleMouseMove = (e: MouseEvent) => handleMove(e.clientX);
        const handleMouseUp = () => {
            setIsDragging(false);
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };

        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
    }, [handleMove, onInteract]);

    const onTouchStart = useCallback((e: React.TouchEvent) => {
        const touch = e.touches[0];
        setIsDragging(true);
        startXRef.current = touch.clientX;
        lastXRef.current = touch.clientX;
        lastTimeRef.current = Date.now();
        setVelocity(0);
        onInteract?.();

        const handleTouchMove = (e: TouchEvent) => {
            const touch = e.touches[0];
            handleMove(touch.clientX);
        };
        const handleTouchEnd = () => {
            setIsDragging(false);
            document.removeEventListener('touchmove', handleTouchMove);
            document.removeEventListener('touchend', handleTouchEnd);
        };

        document.addEventListener('touchmove', handleTouchMove, { passive: true });
        document.addEventListener('touchend', handleTouchEnd);
    }, [handleMove, onInteract]);

    const resetView = useCallback(() => {
        setCurrentFrame(0);
        setVelocity(0);
    }, [setCurrentFrame]);

    return { onMouseDown, onTouchStart, resetView, isDragging };
}
