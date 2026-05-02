'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Collection } from '@/types/collection';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface CategoryFilterProps {
    collections: Collection[];
    selectedCategories: string[];
    onSelectCategory: (id: string | null) => void;
    // Keep old prop name as alias for backwards compat
    onToggleCategory?: (id: string) => void;
}

export default function CategoryFilter({
    collections,
    selectedCategories,
    onSelectCategory,
}: CategoryFilterProps) {
    const [expandedBranch, setExpandedBranch] = useState<string | null>(null);

    const branches = collections.filter(c => c.type === 'branch').slice(0, 5);
    const units = collections.filter(c => c.type === 'unit');

    const getUnitsForBranch = (branchId: string) => {
        return units.filter(u => u.parentBranch === branchId);
    };

    const activeBranch = selectedCategories[0] || null;

    return (
        <div className="space-y-4">
            <div className="flex items-center gap-3 overflow-x-auto pb-2">
                {/* All button */}
                <button
                    onClick={() => {
                        onSelectCategory(null);
                        setExpandedBranch(null);
                    }}
                    className={`flex flex-col items-center gap-2 flex-shrink-0 group`}
                >
                    <div
                        className={`w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center transition-all duration-200 ${
                            !activeBranch
                                ? 'bg-[var(--color-military-olive)] ring-2 ring-[var(--color-military-olive)]/20'
                                : 'bg-[var(--color-gray-bg)] ring-1 ring-black/5 hover:ring-[var(--color-military-olive)]/30'
                        }`}
                    >
                        <span className={`text-xs font-bold ${!activeBranch ? 'text-white' : 'text-[var(--color-muted)]'}`}>ALL</span>
                    </div>
                    <span className={`text-[10px] font-semibold uppercase tracking-[0.05em] ${
                        !activeBranch ? 'text-[var(--color-military-olive)]' : 'text-[var(--color-muted)]'
                    }`}>
                        All
                    </span>
                </button>

                {branches.map((branch) => {
                    const branchUnits = getUnitsForBranch(branch.id);
                    const isExpanded = expandedBranch === branch.id;
                    const isSelected = activeBranch === branch.id;

                    return (
                        <div key={branch.id} className="flex flex-col gap-2 flex-shrink-0 relative">
                            <button
                                onClick={() => {
                                    // Select this branch exclusively (or deselect if already active)
                                    if (isSelected) {
                                        onSelectCategory(null);
                                        setExpandedBranch(null);
                                    } else {
                                        onSelectCategory(branch.id);
                                        setExpandedBranch(branchUnits.length > 0 ? branch.id : null);
                                    }
                                }}
                                className="flex flex-col items-center gap-2 group"
                            >
                                <div
                                    className={`relative w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden transition-all duration-200 ${
                                        isSelected
                                            ? 'ring-2 ring-[var(--color-military-olive)] ring-offset-2'
                                            : 'ring-1 ring-black/10 hover:ring-[var(--color-military-olive)]/30'
                                    }`}
                                >
                                    {branch.image && (
                                        <Image
                                            src={branch.image}
                                            alt={branch.name}
                                            fill
                                            className="object-cover"
                                        />
                                    )}
                                    <div
                                        className={`absolute inset-0 transition-colors duration-200 ${
                                            isSelected
                                                ? 'bg-[var(--color-military-olive)]/25'
                                                : 'bg-black/5 group-hover:bg-black/10'
                                        }`}
                                    />
                                </div>

                                <div className="flex items-center gap-1">
                                    <span
                                        className={`text-[10px] font-semibold uppercase tracking-[0.05em] transition-colors duration-200 ${
                                            isSelected
                                                ? 'text-[var(--color-military-olive)]'
                                                : 'text-[var(--color-muted)] group-hover:text-[var(--color-dark)]'
                                        }`}
                                    >
                                        {branch.name}
                                    </span>
                                    {branchUnits.length > 0 && (
                                        isExpanded ?
                                            <ChevronUp className="h-3 w-3 text-[var(--color-muted)]" /> :
                                            <ChevronDown className="h-3 w-3 text-[var(--color-muted)]" />
                                    )}
                                </div>
                            </button>

                            {/* Unit Dropdown */}
                            {isExpanded && branchUnits.length > 0 && (
                                <div className="absolute top-24 z-50 bg-white rounded-sm shadow-2xl ring-1 ring-black/5 p-3 w-56 max-h-80 overflow-y-auto">
                                    <h3 className="text-[10px] font-semibold text-[var(--color-muted)] uppercase tracking-[0.08em] mb-2 px-2">
                                        {branch.name} Units
                                    </h3>
                                    <div className="space-y-0.5">
                                        {branchUnits.map((unit) => {
                                            const isUnitSelected = selectedCategories.includes(unit.id);
                                            return (
                                                <button
                                                    key={unit.id}
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        onSelectCategory(unit.id);
                                                    }}
                                                    className={`w-full text-left px-3 py-2 rounded-sm transition-all duration-150 text-sm ${
                                                        isUnitSelected
                                                            ? 'bg-[var(--color-military-olive)] text-white font-medium'
                                                            : 'hover:bg-[var(--color-gray-bg)] text-[var(--color-body-text)]'
                                                    }`}
                                                >
                                                    {unit.name}
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
