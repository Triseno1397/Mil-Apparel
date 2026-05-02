'use client';

import Link from 'next/link';
import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const sections = [
    { id: 'terms', title: 'Terms of Service' },
    { id: 'privacy', title: 'Privacy Policy' },
    { id: 'returns', title: 'Returns & Refunds' },
    { id: 'shipping', title: 'Shipping' },
    { id: 'ip', title: 'Intellectual Property & DMCA' },
    { id: 'disclaimers', title: 'Disclaimers' },
    { id: 'contact', title: 'Contact' },
];

function AccordionSection({ id, title, children, defaultOpen = false }: { id: string; title: string; children: React.ReactNode; defaultOpen?: boolean }) {
    const [isOpen, setIsOpen] = useState(defaultOpen);

    return (
        <section id={id} className="mb-8 scroll-mt-24">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between py-6 border-b-2 border-[var(--color-light-gray)] hover:border-[var(--color-military-olive)] transition-colors group"
            >
                <h2 className="font-display text-3xl md:text-4xl font-bold text-[var(--color-dark)] group-hover:text-[var(--color-military-olive)] transition-colors">
                    {title}
                </h2>
                {isOpen ? (
                    <ChevronUp className="h-8 w-8 text-[var(--color-military-olive)]" />
                ) : (
                    <ChevronDown className="h-8 w-8 text-gray-400 group-hover:text-[var(--color-military-olive)] transition-colors" />
                )}
            </button>
            {isOpen && (
                <div className="py-8 prose prose-lg max-w-none">
                    {children}
                </div>
            )}
        </section>
    );
}

export default function LegalPage() {
    return (
        <div className="bg-white min-h-screen">
            {/* Hero Section */}
            <section className="bg-[var(--color-gray-bg)] py-16 md:py-24">
                <div className="container mx-auto max-w-4xl">
                    <h1 className="font-display text-5xl md:text-6xl font-bold text-[var(--color-dark)] mb-6">
                        Legal
                    </h1>
                    <p className="text-xl text-gray-600 mb-4">
                        Last updated: January 4, 2026
                    </p>
                    <p className="text-lg text-gray-600 max-w-3xl">
                        Welcome to Mil Apparel. This Legal page contains our key policies and terms that apply when you browse, shop, or interact with our website and services.
                    </p>
                </div>
            </section>

            {/* Table of Contents */}
            <section className="py-12 border-b border-[var(--color-light-gray)]">
                <div className="container mx-auto max-w-4xl">
                    <h2 className="font-display text-2xl font-bold text-[var(--color-dark)] mb-6">
                        Quick Links
                    </h2>
                    <nav className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {sections.map((section) => (
                            <a
                                key={section.id}
                                href={`#${section.id}`}
                                className="flex items-center gap-2 text-[var(--color-charcoal)] hover:text-[var(--color-military-olive)] transition-colors font-medium"
                            >
                                <span className="text-[var(--color-gold)]">→</span>
                                {section.title}
                            </a>
                        ))}
                    </nav>
                </div>
            </section>

            {/* Content Sections */}
            <div className="container mx-auto max-w-4xl py-16">
                {/* Terms of Service */}
                <AccordionSection id="terms" title="Terms of Service" defaultOpen>
                    <p className="text-gray-700 mb-6">
                        By accessing our site or placing an order, you agree to these Terms.
                    </p>

                    <h3 className="font-display text-xl font-bold text-[var(--color-dark)] mt-8 mb-4">1) Eligibility</h3>
                    <p className="text-gray-700">
                        You must be at least the age of majority in your jurisdiction to make purchases.
                    </p>

                    <h3 className="font-display text-xl font-bold text-[var(--color-dark)] mt-8 mb-4">2) Orders & Acceptance</h3>
                    <p className="text-gray-700">
                        All orders are subject to acceptance and availability. We may refuse or cancel orders at our discretion (including suspected fraud, pricing errors, inventory issues, or policy violations). If we cancel after you've been charged, we'll refund the amount paid to the original payment method.
                    </p>

                    <h3 className="font-display text-xl font-bold text-[var(--color-dark)] mt-8 mb-4">3) Pricing, Taxes, and Payment</h3>
                    <p className="text-gray-700">
                        Prices are shown in the currency displayed at checkout and may change at any time. Taxes and shipping fees (if applicable) are calculated at checkout. Payments are processed through secure third-party providers; we do not store full payment card numbers.
                    </p>

                    <h3 className="font-display text-xl font-bold text-[var(--color-dark)] mt-8 mb-4">4) Product Information</h3>
                    <p className="text-gray-700">
                        We strive for accurate descriptions and imagery, but colors may vary by screen/device. We do not guarantee that product photos perfectly match delivered items.
                    </p>

                    <h3 className="font-display text-xl font-bold text-[var(--color-dark)] mt-8 mb-4">5) Custom / Personalized Items</h3>
                    <p className="text-gray-700">
                        Personalized or custom items are made specifically for you. Unless required by law, custom/personalized items are final sale once production begins (see Returns Policy).
                    </p>

                    <h3 className="font-display text-xl font-bold text-[var(--color-dark)] mt-8 mb-4">6) Promotions</h3>
                    <p className="text-gray-700">
                        Discount codes and promotions may have limits, expiration dates, exclusions, and may be modified or ended without notice.
                    </p>

                    <h3 className="font-display text-xl font-bold text-[var(--color-dark)] mt-8 mb-4">7) User Content (Reviews, Photos, Submissions)</h3>
                    <p className="text-gray-700">
                        If you submit reviews, photos, or other content, you grant Mil Apparel a non-exclusive, worldwide, royalty-free license to use, display, reproduce, and distribute that content for marketing and site operations (unless prohibited by law). You represent you have the rights to submit it.
                    </p>

                    <h3 className="font-display text-xl font-bold text-[var(--color-dark)] mt-8 mb-4">8) Prohibited Uses</h3>
                    <p className="text-gray-700">
                        You agree not to misuse the site (including attempts to hack, scrape, disrupt service, submit unlawful content, or infringe rights).
                    </p>

                    <h3 className="font-display text-xl font-bold text-[var(--color-dark)] mt-8 mb-4">9) Disclaimer of Warranties</h3>
                    <p className="text-gray-700">
                        The site and products are provided "as is" and "as available," to the fullest extent permitted by law.
                    </p>

                    <h3 className="font-display text-xl font-bold text-[var(--color-dark)] mt-8 mb-4">10) Limitation of Liability</h3>
                    <p className="text-gray-700">
                        To the fullest extent permitted by law, Mil Apparel will not be liable for indirect, incidental, special, consequential, or punitive damages. Our total liability for any claim will not exceed the amount you paid for the product(s) at issue.
                    </p>

                    <h3 className="font-display text-xl font-bold text-[var(--color-dark)] mt-8 mb-4">11) Governing Law</h3>
                    <p className="text-gray-700">
                        These Terms are governed by the laws of the state/jurisdiction where Mil Apparel is legally established, without regard to conflict of law principles.
                    </p>

                    <h3 className="font-display text-xl font-bold text-[var(--color-dark)] mt-8 mb-4">12) Changes to These Terms</h3>
                    <p className="text-gray-700">
                        We may update these Terms from time to time. Continued use of the site after updates constitutes acceptance of the revised Terms.
                    </p>
                </AccordionSection>

                {/* Privacy Policy */}
                <AccordionSection id="privacy" title="Privacy Policy">
                    <p className="text-gray-700 mb-6">
                        This section explains how we collect, use, and share information.
                    </p>

                    <h3 className="font-display text-xl font-bold text-[var(--color-dark)] mt-8 mb-4">1) Information We Collect</h3>
                    <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                        <li><strong>Information you provide:</strong> name, email, shipping address, billing address, phone number (if provided), order details, messages to support, and any customization text you submit.</li>
                        <li><strong>Automatic data:</strong> device and browser info, IP address, pages visited, referral source, and basic analytics data.</li>
                        <li><strong>Cookies/Tracking:</strong> we may use cookies or similar technologies for site functionality, analytics, and performance.</li>
                    </ul>

                    <h3 className="font-display text-xl font-bold text-[var(--color-dark)] mt-8 mb-4">2) How We Use Information</h3>
                    <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                        <li>To process and fulfill orders</li>
                        <li>To provide customer support</li>
                        <li>To send order updates and service messages</li>
                        <li>To improve site performance and user experience</li>
                        <li>To prevent fraud and secure our services</li>
                        <li>To send marketing emails if you opt in (you can unsubscribe anytime)</li>
                    </ul>

                    <h3 className="font-display text-xl font-bold text-[var(--color-dark)] mt-8 mb-4">3) How We Share Information</h3>
                    <p className="text-gray-700 mb-4">
                        We may share data with trusted third parties necessary to run the business, such as:
                    </p>
                    <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                        <li>Payment processors</li>
                        <li>Shipping carriers and fulfillment partners</li>
                        <li>Website hosting and analytics providers</li>
                        <li>Customer support tools</li>
                    </ul>
                    <p className="text-gray-700 mt-4">
                        We do not sell personal information in the ordinary sense. (If your jurisdiction provides specific rights/definitions, we comply as required.)
                    </p>

                    <h3 className="font-display text-xl font-bold text-[var(--color-dark)] mt-8 mb-4">4) Data Retention</h3>
                    <p className="text-gray-700">
                        We retain information as long as needed for business, legal, tax, and operational purposes.
                    </p>

                    <h3 className="font-display text-xl font-bold text-[var(--color-dark)] mt-8 mb-4">5) Your Choices</h3>
                    <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                        <li>Opt out of marketing emails via unsubscribe link</li>
                        <li>Disable cookies via your browser settings (may reduce site functionality)</li>
                    </ul>

                    <h3 className="font-display text-xl font-bold text-[var(--color-dark)] mt-8 mb-4">6) Security</h3>
                    <p className="text-gray-700">
                        We use reasonable administrative, technical, and physical safeguards, but no system is 100% secure.
                    </p>

                    <h3 className="font-display text-xl font-bold text-[var(--color-dark)] mt-8 mb-4">7) Children</h3>
                    <p className="text-gray-700">
                        Our services are not directed to children under 13 (or higher age where required).
                    </p>

                    <h3 className="font-display text-xl font-bold text-[var(--color-dark)] mt-8 mb-4">8) Policy Updates</h3>
                    <p className="text-gray-700">
                        We may update this Privacy Policy periodically. The "Last updated" date reflects the latest revision.
                    </p>
                </AccordionSection>

                {/* Returns & Refunds */}
                <AccordionSection id="returns" title="Returns & Refunds Policy">
                    <h3 className="font-display text-xl font-bold text-[var(--color-dark)] mb-4">Return Window</h3>
                    <p className="text-gray-700 mb-6">
                        We accept eligible returns within 30 days of delivery for unused items in original condition (unworn, unwashed, with tags/packaging if applicable).
                    </p>

                    <h3 className="font-display text-xl font-bold text-[var(--color-dark)] mt-8 mb-4">Non-Returnable Items</h3>
                    <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                        <li>Custom/personalized products (unless defective or incorrect due to our error)</li>
                        <li>Gift cards (if offered)</li>
                        <li>Final sale items (if labeled as such)</li>
                    </ul>

                    <h3 className="font-display text-xl font-bold text-[var(--color-dark)] mt-8 mb-4">Damaged / Incorrect Items</h3>
                    <p className="text-gray-700">
                        If your item arrives damaged, defective, or incorrect, contact us within 7 days of delivery with order number and photos. We will work with you on a replacement or refund as appropriate.
                    </p>

                    <h3 className="font-display text-xl font-bold text-[var(--color-dark)] mt-8 mb-4">Refunds</h3>
                    <p className="text-gray-700">
                        Approved refunds are issued back to the original payment method. Processing times vary by bank/payment provider.
                    </p>

                    <h3 className="font-display text-xl font-bold text-[var(--color-dark)] mt-8 mb-4">Return Shipping</h3>
                    <p className="text-gray-700">
                        Unless required by law or due to our error, return shipping costs are the customer's responsibility.
                    </p>

                    <h3 className="font-display text-xl font-bold text-[var(--color-dark)] mt-8 mb-4">How to Start a Return</h3>
                    <p className="text-gray-700 mb-4">Email us with:</p>
                    <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                        <li>Order number</li>
                        <li>Item(s) you want to return</li>
                        <li>Reason for return</li>
                    </ul>
                    <p className="text-gray-700 mt-4">
                        We will provide next steps and return instructions.
                    </p>
                </AccordionSection>

                {/* Shipping */}
                <AccordionSection id="shipping" title="Shipping Policy">
                    <h3 className="font-display text-xl font-bold text-[var(--color-dark)] mb-4">Processing Time</h3>
                    <p className="text-gray-700 mb-6">
                        Orders typically process within 1–5 business days, excluding weekends/holidays. Custom/personalized items may take longer.
                    </p>

                    <h3 className="font-display text-xl font-bold text-[var(--color-dark)] mt-8 mb-4">Shipping Time</h3>
                    <p className="text-gray-700">
                        Transit time varies by carrier and destination. Estimated delivery windows shown at checkout are estimates, not guarantees.
                    </p>

                    <h3 className="font-display text-xl font-bold text-[var(--color-dark)] mt-8 mb-4">Address Accuracy</h3>
                    <p className="text-gray-700">
                        Customers are responsible for providing accurate shipping addresses. If a package is returned due to an incorrect address provided by the customer, additional shipping fees may apply to reship.
                    </p>

                    <h3 className="font-display text-xl font-bold text-[var(--color-dark)] mt-8 mb-4">Lost or Delayed Packages</h3>
                    <p className="text-gray-700">
                        If tracking shows delivered but you can't locate the package, contact the carrier first, then contact us and we'll assist where possible.
                    </p>

                    <h3 className="font-display text-xl font-bold text-[var(--color-dark)] mt-8 mb-4">International Orders (if applicable)</h3>
                    <p className="text-gray-700">
                        International shipments may be subject to customs duties, taxes, and import fees. These are the customer's responsibility.
                    </p>
                </AccordionSection>

                {/* IP & DMCA */}
                <AccordionSection id="ip" title="Intellectual Property & DMCA">
                    <h3 className="font-display text-xl font-bold text-[var(--color-dark)] mb-4">Ownership</h3>
                    <p className="text-gray-700 mb-6">
                        All site content (logos, designs, graphics, product photos, text, and layouts) is owned by Mil Apparel or licensed to us and protected by intellectual property laws.
                    </p>

                    <h3 className="font-display text-xl font-bold text-[var(--color-dark)] mt-8 mb-4">Limited License</h3>
                    <p className="text-gray-700">
                        You may view and use the site for personal, non-commercial shopping use only. You may not copy, reproduce, distribute, or exploit site content without written permission.
                    </p>

                    <h3 className="font-display text-xl font-bold text-[var(--color-dark)] mt-8 mb-4">DMCA / Copyright Claims</h3>
                    <p className="text-gray-700 mb-4">
                        If you believe content on our site infringes your copyright, contact us with:
                    </p>
                    <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                        <li>Your contact info</li>
                        <li>Identification of the work claimed infringed</li>
                        <li>The URL/content in question</li>
                        <li>A statement of good-faith belief</li>
                        <li>A statement under penalty of perjury that the info is accurate and you are authorized</li>
                    </ul>
                    <p className="text-gray-700 mt-4">
                        We will respond consistent with applicable law.
                    </p>
                </AccordionSection>

                {/* Disclaimers */}
                <AccordionSection id="disclaimers" title="Disclaimers">
                    <h3 className="font-display text-xl font-bold text-[var(--color-dark)] mb-4">Non-Affiliation / No Endorsement</h3>
                    <div className="bg-[var(--color-gray-bg)] border-l-4 border-[var(--color-military-olive)] p-6 mb-6">
                        <p className="text-gray-800 font-semibold text-lg">
                            "Mil Apparel is not affiliated with the Department of War."
                        </p>
                    </div>
                    <p className="text-gray-700 mb-4">
                        Mil Apparel is an independent brand and is not affiliated with, endorsed by, or sponsored by the U.S. government, the U.S. Department of Defense, or any military branch or unit.
                    </p>
                    <p className="text-gray-700">
                        Any references to military themes, culture, or terminology are for expressive/identity purposes only.
                    </p>

                    <h3 className="font-display text-xl font-bold text-[var(--color-dark)] mt-8 mb-4">Trademarks</h3>
                    <p className="text-gray-700">
                        All trademarks, service marks, and logos not owned by Mil Apparel are the property of their respective owners. Their use (if any) does not imply endorsement.
                    </p>

                    <h3 className="font-display text-xl font-bold text-[var(--color-dark)] mt-8 mb-4">Informational Only</h3>
                    <p className="text-gray-700">
                        Site content is provided for general informational purposes and does not constitute legal, medical, or professional advice.
                    </p>
                </AccordionSection>

                {/* Contact */}
                <AccordionSection id="contact" title="Contact Information">
                    <p className="text-gray-700 mb-6">
                        For questions, concerns, or requests regarding these policies, please contact us:
                    </p>
                    <div className="bg-[var(--color-gray-bg)] p-8 rounded-lg">
                        <p className="text-gray-800 mb-2">
                            <strong>Email:</strong> <a href="mailto:support@milapparel.com" className="text-[var(--color-military-olive)] hover:underline">support@milapparel.com</a>
                        </p>
                        <p className="text-gray-800">
                            <strong>Website:</strong> <a href="https://mil-apparel.vercel.app" className="text-[var(--color-military-olive)] hover:underline">mil-apparel.vercel.app</a>
                        </p>
                    </div>
                </AccordionSection>
            </div>

            {/* Back to Top */}
            <div className="bg-[var(--color-gray-bg)] py-8">
                <div className="container mx-auto max-w-4xl text-center">
                    <a
                        href="#"
                        className="inline-flex items-center gap-2 text-[var(--color-military-olive)] hover:text-[var(--color-dark)] font-semibold transition-colors"
                    >
                        <span>↑</span> Back to Top
                    </a>
                </div>
            </div>
        </div>
    );
}
