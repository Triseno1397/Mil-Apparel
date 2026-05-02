import Link from 'next/link';
import { Facebook, Instagram, Twitter } from 'lucide-react';
import siteConfig from '@/config/site.json';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-[var(--color-dark)] text-white">
            {/* Newsletter Row */}
            <div className="border-b border-white/10">
                <div className="container mx-auto py-12 md:py-16">
                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                        <div>
                            <h3 className="font-display text-xl md:text-2xl font-bold tracking-[-0.02em] mb-2">Stay in the ranks</h3>
                            <p className="text-sm text-white/50">New drops, exclusive offers, and stories from the community.</p>
                        </div>
                        <div className="flex w-full md:w-auto">
                            <input
                                type="email"
                                placeholder="Your email"
                                className="bg-white/5 border border-white/10 rounded-l-sm px-4 py-3 text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-[var(--color-gold)]/50 transition-colors duration-200 w-full md:w-72"
                            />
                            <button className="bg-[var(--color-gold)] text-[var(--color-dark)] px-6 py-3 rounded-r-sm text-sm font-semibold hover:bg-[var(--color-gold-soft)] transition-colors duration-200 whitespace-nowrap">
                                Subscribe
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Links Grid */}
            <div className="container mx-auto py-12 md:py-16">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
                    {/* Brand */}
                    <div className="col-span-2 md:col-span-1">
                        <h3 className="font-display text-lg font-bold tracking-[-0.02em] mb-4">{siteConfig.siteName}</h3>
                        <p className="text-sm text-white/50 mb-6 leading-relaxed max-w-xs">{siteConfig.tagline}</p>
                        <div className="flex space-x-4">
                            <a
                                href={siteConfig.social.facebook}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-white/40 hover:text-[var(--color-gold)] transition-colors duration-200"
                                aria-label="Facebook"
                            >
                                <Facebook className="h-4 w-4" />
                            </a>
                            <a
                                href={siteConfig.social.instagram}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-white/40 hover:text-[var(--color-gold)] transition-colors duration-200"
                                aria-label="Instagram"
                            >
                                <Instagram className="h-4 w-4" />
                            </a>
                            <a
                                href={siteConfig.social.twitter}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-white/40 hover:text-[var(--color-gold)] transition-colors duration-200"
                                aria-label="Twitter"
                            >
                                <Twitter className="h-4 w-4" />
                            </a>
                        </div>
                    </div>

                    {/* Shop */}
                    <div>
                        <h4 className="text-[11px] tracking-[0.1em] uppercase font-semibold text-white/60 mb-4">Shop</h4>
                        <ul className="space-y-2.5">
                            {siteConfig.navigation.footer.shop.map((link) => (
                                <li key={link.name}>
                                    <Link href={link.href} className="text-sm text-white/50 hover:text-white transition-colors duration-200">
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Support */}
                    <div>
                        <h4 className="text-[11px] tracking-[0.1em] uppercase font-semibold text-white/60 mb-4">Support</h4>
                        <ul className="space-y-2.5">
                            {siteConfig.navigation.footer.support.map((link) => (
                                <li key={link.name}>
                                    <Link href={link.href} className="text-sm text-white/50 hover:text-white transition-colors duration-200">
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Company */}
                    <div>
                        <h4 className="text-[11px] tracking-[0.1em] uppercase font-semibold text-white/60 mb-4">Company</h4>
                        <ul className="space-y-2.5">
                            <li><Link href="/about" className="text-sm text-white/50 hover:text-white transition-colors duration-200">About Us</Link></li>
                            <li><Link href="/contact" className="text-sm text-white/50 hover:text-white transition-colors duration-200">Contact</Link></li>
                            <li><Link href="/policies/privacy" className="text-sm text-white/50 hover:text-white transition-colors duration-200">Privacy</Link></li>
                            <li><Link href="/legal" className="text-sm text-white/50 hover:text-white transition-colors duration-200">Legal</Link></li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-white/5">
                <div className="container mx-auto py-6 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-xs text-white/40">
                        &copy; {currentYear} {siteConfig.siteName}. All rights reserved.
                    </p>
                    <div className="flex items-center gap-3">
                        {/* Payment Icons */}
                        {['Visa', 'Mastercard', 'Amex', 'PayPal'].map((method) => (
                            <div key={method} className="px-2 py-1 rounded-sm bg-white/5 text-[10px] text-white/40 font-medium">
                                {method}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
}
