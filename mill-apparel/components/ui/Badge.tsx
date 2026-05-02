import { HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
    variant?: 'new' | 'bestseller' | 'customizable' | 'sale' | 'lowstock';
}

export default function Badge({ variant = 'new', className, children, ...props }: BadgeProps) {
    const variants = {
        new: 'bg-[var(--color-military-olive)]/10 text-[var(--color-military-olive)] border-l-2 border-[var(--color-military-olive)]',
        bestseller: 'bg-[var(--color-gold)]/15 text-[var(--color-gold)] border-l-2 border-[var(--color-gold)]',
        customizable: 'bg-[var(--color-charcoal)]/10 text-[var(--color-charcoal)] border-l-2 border-[var(--color-charcoal)]',
        sale: 'bg-[var(--color-error)]/10 text-[var(--color-error)] border-l-2 border-[var(--color-error)]',
        lowstock: 'bg-[var(--color-warning)]/10 text-[var(--color-warning)] border-l-2 border-[var(--color-warning)]'
    };

    return (
        <span
            className={cn(
                'inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-semibold uppercase tracking-[0.08em]',
                variants[variant],
                className
            )}
            {...props}
        >
            {children || variant}
        </span>
    );
}
