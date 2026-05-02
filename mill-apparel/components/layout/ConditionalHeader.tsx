'use client';

import { usePathname } from 'next/navigation';
import Header from '@/components/layout/Header';
import { ReactNode } from 'react';

interface ConditionalHeaderProps {
    children?: ReactNode;
}

export default function ConditionalHeader({ children }: ConditionalHeaderProps) {
    const pathname = usePathname();

    // Hide header on customize routes
    const isCustomizeRoute = pathname?.startsWith('/customize');

    if (isCustomizeRoute) {
        return null;
    }

    return <Header />;
}
