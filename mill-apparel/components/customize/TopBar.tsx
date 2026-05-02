'use client';

import { Save, LogOut, HelpCircle, ShoppingCart } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useCustomizer } from '@/context/CustomizerContext';
import Link from 'next/link';

interface TopBarProps {
    onSave?: () => void;
    onSaveAndExit?: () => void;
    onCheckout?: () => void;
    showStepIndicator?: boolean;
}

const STEPS = ['Product', 'Design', 'Personalize', 'Review'];

export default function TopBar({
    onSave,
    onSaveAndExit,
    onCheckout,
    showStepIndicator = false,
}: TopBarProps) {
    const router = useRouter();
    const { designName, setDesignName } = useCustomizer();
    const [isEditingName, setIsEditingName] = useState(false);
    const [tempName, setTempName] = useState(designName);

    const handleNameEdit = () => {
        setIsEditingName(true);
        setTempName(designName);
    };

    const handleNameSave = () => {
        setDesignName(tempName);
        setIsEditingName(false);
    };

    const handleNameCancel = () => {
        setTempName(designName);
        setIsEditingName(false);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleNameSave();
        } else if (e.key === 'Escape') {
            handleNameCancel();
        }
    };

    return (
        <div className="sticky top-0 z-50 bg-[#1a1a1a] border-b border-gray-800 shadow-lg">
            <div className="flex items-center justify-between h-14 px-4 md:px-6">
                {/* Left Section: Logo + Customization Studio Label */}
                <div className="flex items-center gap-3 md:gap-4 flex-1">
                    <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                        {/* Mil Apparel Logo */}
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-[#FF6B35] rounded flex items-center justify-center font-bold text-white text-sm">
                                MA
                            </div>
                            <span className="hidden sm:inline text-white font-bold text-sm">Mil Apparel</span>
                        </div>
                    </Link>

                    <div className="h-6 w-px bg-gray-700 hidden sm:block" />

                    <div className="flex items-center gap-2">
                        <span className="text-gray-400 text-xs md:text-sm font-medium">Customization Studio</span>
                    </div>
                </div>

                {/* Middle Section: Step Indicator (Optional) */}
                {showStepIndicator && (
                    <div className="hidden xl:flex items-center gap-2 flex-1 justify-center">
                        {STEPS.map((step, index) => (
                            <div key={step} className="flex items-center gap-2">
                                <div className="flex items-center gap-2">
                                    <div className={`h-6 w-6 rounded-full flex items-center justify-center text-xs font-bold ${index === 1
                                            ? 'bg-[#FF6B35] text-white'
                                            : 'bg-gray-700 text-gray-400'
                                        }`}>
                                        {index + 1}
                                    </div>
                                    <span className={`text-xs font-medium ${index === 1 ? 'text-white' : 'text-gray-500'
                                        }`}>
                                        {step}
                                    </span>
                                </div>
                                {index < STEPS.length - 1 && (
                                    <div className="h-px w-6 bg-gray-700" />
                                )}
                            </div>
                        ))}
                    </div>
                )}

                {/* Right Section: Help + Action Buttons */}
                <div className="flex items-center gap-2 md:gap-3 flex-1 justify-end">
                    {/* Help Icon */}
                    <button
                        className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors"
                        title="Help"
                    >
                        <HelpCircle className="h-5 w-5" />
                    </button>

                    {/* Save Button (Secondary) */}
                    <button
                        onClick={onSave}
                        className="hidden md:flex items-center gap-2 px-3 py-1.5 text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg transition-colors text-sm font-medium border border-gray-700"
                    >
                        <Save className="h-4 w-4" />
                        <span className="hidden lg:inline">Save</span>
                    </button>

                    {/* Save & Exit Button (Secondary) */}
                    <button
                        onClick={onSaveAndExit}
                        className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-gray-800 text-white hover:bg-gray-700 rounded-lg transition-colors text-sm font-medium border border-gray-700"
                    >
                        <LogOut className="h-4 w-4" />
                        <span className="hidden md:inline">Save & Exit</span>
                    </button>

                    {/* Add to Cart / Checkout Button (Primary CTA) */}
                    <button
                        onClick={onCheckout}
                        className="flex items-center gap-2 px-4 md:px-5 py-1.5 bg-[#FF6B35] text-white hover:bg-[#ff5722] rounded-lg transition-colors text-sm md:text-base font-bold shadow-lg"
                    >
                        <ShoppingCart className="h-4 w-4" />
                        <span className="hidden sm:inline">Add to Cart</span>
                        <span className="sm:hidden">Cart</span>
                    </button>
                </div>
            </div>
        </div>
    );
}
