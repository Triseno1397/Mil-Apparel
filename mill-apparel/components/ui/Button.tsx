import { ButtonHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'accent' | 'ghost';
    size?: 'sm' | 'md' | 'lg';
    loading?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = 'primary', size = 'md', loading, children, disabled, ...props }, ref) => {
        const baseStyles = 'inline-flex items-center justify-center font-semibold rounded-full disabled:opacity-50 disabled:cursor-not-allowed transition-[transform,background-color,color] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]';

        const variants = {
            primary: 'bg-[var(--color-military-olive)] text-white hover:bg-[var(--color-olive-light)] hover:scale-[1.02] hover:-translate-y-[1px] active:scale-[0.98]',
            secondary: 'border-2 border-[var(--color-dark)] bg-white text-[var(--color-dark)] hover:bg-[var(--color-gray-bg)] hover:scale-[1.02] hover:-translate-y-[1px] active:scale-[0.98]',
            accent: 'bg-[var(--color-gold)] text-[var(--color-dark)] hover:bg-[var(--color-gold-soft)] hover:scale-[1.02] hover:-translate-y-[1px] active:scale-[0.98]',
            ghost: 'text-[var(--color-dark)] hover:text-[var(--color-military-olive)]'
        };

        const sizes = {
            sm: 'px-5 py-2 text-sm',
            md: 'px-7 py-3 text-base',
            lg: 'px-10 py-4 text-lg'
        };

        return (
            <button
                ref={ref}
                className={cn(
                    baseStyles,
                    variants[variant],
                    variant !== 'ghost' && sizes[size],
                    className
                )}
                disabled={disabled || loading}
                {...props}
            >
                {loading ? (
                    <span className="flex items-center gap-2">
                        <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Loading...
                    </span>
                ) : children}
            </button>
        );
    }
);

Button.displayName = 'Button';

export default Button;
