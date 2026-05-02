'use client';

import Link from 'next/link';
import { ShoppingCart, Search, Menu, X, ChevronDown } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import siteConfig from '@/config/site.json';
import { useState } from 'react';

export default function Header() {
    const { cart } = useCart();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [announcementVisible, setAnnouncementVisible] = useState(true);

    return (
        <header className="sticky top-0 z-50">
            {/* Announcement Bar */}
            {announcementVisible && (
                <div className="relative bg-[var(--color-dark)] py-2.5 px-4">
                    <div className="container mx-auto flex items-center justify-center">
                        <p className="text-[12px] tracking-[0.06em] uppercase font-medium text-[var(--color-gold)]">
                            Free shipping on orders over $75
                        </p>
                        <button
                            onClick={() => setAnnouncementVisible(false)}
                            className="absolute right-4 text-white/40 hover:text-white transition-colors duration-200"
                            aria-label="Dismiss"
                        >
                            <X className="h-3.5 w-3.5" />
                        </button>
                    </div>
                </div>
            )}

            {/* Main Header */}
            <div className="relative">
                <div className="absolute inset-0 bg-white/80 backdrop-blur-xl backdrop-saturate-150 border-b border-black/5" />
                <div className="container mx-auto relative">
                    <div className="flex items-center justify-between h-20">
                        {/* Logo */}
                        <Link href="/" className="flex items-center group">
                            <span className="font-display text-2xl font-bold tracking-[-0.04em] text-[var(--color-dark)] group-hover:text-[var(--color-military-olive)] transition-colors duration-300">
                                {siteConfig.siteName}
                            </span>
                        </Link>

                        {/* Desktop Navigation */}
                        <nav className="hidden md:flex items-center gap-10 absolute left-1/2 transform -translate-x-1/2">
                            {siteConfig.navigation.primary.map((link) => (
                                <div key={link.name} className="relative group">
                                    {link.comingSoon ? (
                                        <span className="text-sm font-medium tracking-[0.04em] uppercase text-[var(--color-charcoal)]/40 cursor-default flex items-center gap-2">
                                            {link.name}
                                            <span className="text-[9px] tracking-[0.08em] uppercase font-bold bg-[var(--color-gold)]/15 text-[var(--color-gold)] px-1.5 py-0.5 rounded-full">
                                                Soon
                                            </span>
                                        </span>
                                    ) : link.dropdown ? (
                                        <>
                                            <button className="text-sm font-medium tracking-[0.04em] uppercase text-[var(--color-charcoal)] hover:text-[var(--color-military-olive)] transition-colors duration-200 flex items-center gap-1.5 py-1">
                                                {link.name}
                                                <ChevronDown className="w-4 h-4 transition-transform duration-200 group-hover:rotate-180" />
                                            </button>
                                            {/* Dropdown Menu */}
                                            <div className="absolute top-full left-0 mt-3 w-56 bg-white rounded-xl shadow-2xl ring-1 ring-black/5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 ease-[var(--ease-spring)] translate-y-1 group-hover:translate-y-0 z-50 py-2.5">
                                                {link.dropdown.map((item) => (
                                                    <Link
                                                        key={item.name}
                                                        href={item.href}
                                                        className="block px-5 py-3 text-sm font-medium text-[var(--color-charcoal)] hover:bg-[var(--color-gray-bg)] hover:text-[var(--color-military-olive)] transition-colors duration-150"
                                                    >
                                                        {item.name}
                                                    </Link>
                                                ))}
                                            </div>
                                        </>
                                    ) : (
                                        <Link
                                            href={link.href}
                                            className="text-sm font-medium tracking-[0.04em] uppercase text-[var(--color-charcoal)] hover:text-[var(--color-military-olive)] transition-colors duration-200 py-1"
                                        >
                                            {link.name}
                                        </Link>
                                    )}
                                </div>
                            ))}
                        </nav>

                        {/* Right Icons */}
                        <div className="flex items-center gap-3">
                            <button
                                className="hidden md:flex items-center justify-center w-10 h-10 rounded-full border border-black/10 text-[var(--color-charcoal)] hover:text-[var(--color-military-olive)] hover:border-[var(--color-military-olive)]/30 hover:bg-[var(--color-military-olive)]/5 transition-all duration-200"
                                aria-label="Search"
                            >
                                <Search className="h-[18px] w-[18px]" />
                            </button>

                            <Link
                                href="/cart"
                                className="relative flex items-center justify-center w-10 h-10 rounded-full border border-black/10 text-[var(--color-charcoal)] hover:text-[var(--color-military-olive)] hover:border-[var(--color-military-olive)]/30 hover:bg-[var(--color-military-olive)]/5 transition-all duration-200"
                                aria-label="Shopping cart"
                            >
                                <ShoppingCart className="h-[18px] w-[18px]" />
                                {cart.itemCount > 0 && (
                                    <span className="absolute -top-1 -right-1 bg-[var(--color-gold)] text-[var(--color-dark)] text-[10px] font-bold rounded-full flex items-center justify-center min-w-[18px] h-[18px]">
                                        {cart.itemCount}
                                    </span>
                                )}
                            </Link>

                            {/* Mobile Menu Button */}
                            <button
                                className="md:hidden text-[var(--color-charcoal)] hover:text-[var(--color-military-olive)] transition-colors duration-200"
                                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                                aria-label="Menu"
                            >
                                {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                            </button>
                        </div>
                    </div>

                    {/* Mobile Menu — Slide-in Panel */}
                    {mobileMenuOpen && (
                        <>
                            <div
                                className="md:hidden fixed inset-0 top-0 bg-black/20 backdrop-blur-sm z-40"
                                onClick={() => setMobileMenuOpen(false)}
                            />
                            <div className="md:hidden fixed right-0 top-0 bottom-0 w-[85%] max-w-sm bg-white/95 backdrop-blur-xl z-50 overflow-y-auto shadow-2xl">
                                <div className="p-6 pt-8">
                                    <div className="flex justify-between items-center mb-10">
                                        <span className="font-display text-xl font-bold tracking-[-0.04em]">
                                            {siteConfig.siteName}
                                        </span>
                                        <button
                                            onClick={() => setMobileMenuOpen(false)}
                                            className="text-[var(--color-charcoal)] hover:text-[var(--color-military-olive)] transition-colors"
                                        >
                                            <X className="h-5 w-5" />
                                        </button>
                                    </div>

                                    <nav className="flex flex-col space-y-6">
                                        {siteConfig.navigation.primary.map((link) => (
                                            <div key={link.name}>
                                                {link.comingSoon ? (
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-lg font-semibold text-[var(--color-dark)]/30 cursor-default">
                                                            {link.name}
                                                        </span>
                                                        <span className="text-[9px] tracking-[0.08em] uppercase font-bold bg-[var(--color-gold)]/15 text-[var(--color-gold)] px-1.5 py-0.5 rounded-full">
                                                            Soon
                                                        </span>
                                                    </div>
                                                ) : link.dropdown ? (
                                                    <div className="border-b border-[var(--color-light-gray)] pb-6">
                                                        <div className="text-[11px] tracking-[0.1em] uppercase font-semibold text-[var(--color-muted)] mb-4">
                                                            {link.name}
                                                        </div>
                                                        <div className="flex flex-col space-y-3 pl-1">
                                                            {link.dropdown.map((item) => (
                                                                <Link
                                                                    key={item.name}
                                                                    href={item.href}
                                                                    className="text-base font-medium text-[var(--color-dark)] hover:text-[var(--color-military-olive)] transition-colors duration-200"
                                                                    onClick={() => setMobileMenuOpen(false)}
                                                                >
                                                                    {item.name}
                                                                </Link>
                                                            ))}
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <Link
                                                        href={link.href}
                                                        className="text-lg font-semibold text-[var(--color-dark)] hover:text-[var(--color-military-olive)] transition-colors duration-200 block"
                                                        onClick={() => setMobileMenuOpen(false)}
                                                    >
                                                        {link.name}
                                                    </Link>
                                                )}
                                            </div>
                                        ))}
                                    </nav>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </header>
    );
}
