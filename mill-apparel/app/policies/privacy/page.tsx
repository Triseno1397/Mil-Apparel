import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

const sections = [
    {
        title: '1. Information We Collect',
        content: null,
        list: [
            'Name, email address, shipping and billing address, and phone number (when provided)',
            'Payment information processed securely via third-party processors (we do not store full card numbers)',
            'Order history, product preferences, and customization details',
            'Device information, browser type, IP address, and pages visited via cookies and analytics',
            'Messages and inquiries you send to our support team',
        ],
    },
    {
        title: '2. How We Use Your Information',
        content: null,
        list: [
            'To process, fulfill, and ship your orders',
            'To send order confirmations, shipping updates, and customer support responses',
            'To improve our website, products, and user experience',
            'To detect and prevent fraud and unauthorized access',
            'To send marketing communications if you opt in (unsubscribe anytime)',
        ],
    },
    {
        title: '3. How We Share Your Information',
        content: 'We do not sell your personal information. We may share data only with trusted service providers who help us operate our business, including:',
        list: [
            'Payment processors (e.g., Stripe, PayPal)',
            'Shipping carriers and fulfillment partners',
            'Analytics and website hosting providers',
            'Customer support tools',
        ],
    },
    {
        title: '4. Cookies',
        content: 'We use cookies and similar technologies to maintain session state, enable cart functionality, and understand how visitors use our site. You can disable cookies in your browser settings, but some features may not function correctly.',
        list: null,
    },
    {
        title: '5. Data Retention',
        content: 'We retain your personal information for as long as necessary to fulfill orders, maintain business records, and comply with legal obligations. You may request deletion of your account data at any time by contacting us.',
        list: null,
    },
    {
        title: '6. Your Rights',
        content: 'Depending on your jurisdiction, you may have the right to:',
        list: [
            'Access the personal information we hold about you',
            'Request correction of inaccurate data',
            'Request deletion of your data',
            'Opt out of marketing communications',
            'Withdraw consent where processing is based on consent',
        ],
    },
    {
        title: '7. Security',
        content: 'We implement industry-standard security measures including SSL encryption, secure payment processing, and access controls. However, no data transmission or storage system is completely secure.',
        list: null,
    },
    {
        title: '8. Children\'s Privacy',
        content: 'Our services are not directed to children under 13. We do not knowingly collect personal information from minors. If you believe a child has provided us with their information, please contact us immediately.',
        list: null,
    },
    {
        title: '9. Changes to This Policy',
        content: 'We may update this Privacy Policy from time to time. Significant changes will be communicated via email or a notice on our website. Continued use of the site after updates constitutes acceptance.',
        list: null,
    },
    {
        title: '10. Contact Us',
        content: 'For any questions, data requests, or privacy concerns, contact us at support@milapparel.com. We will respond within 5 business days.',
        list: null,
    },
];

export default function PrivacyPage() {
    return (
        <div className="min-h-screen bg-[var(--color-gray-bg)]">
            {/* Header */}
            <div className="bg-[var(--color-dark)] text-white py-20">
                <div className="container mx-auto px-4">
                    <Link href="/legal" className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-6 transition-colors text-sm">
                        <ArrowLeft className="h-4 w-4" /> Legal
                    </Link>
                    <h1 className="font-display text-5xl md:text-6xl font-bold mb-4">Privacy Policy</h1>
                    <p className="text-gray-300">Last updated: February 2026</p>
                </div>
            </div>

            <div className="container mx-auto px-4 py-16 max-w-4xl">
                <div className="bg-white rounded-2xl shadow-sm p-8 md:p-12 space-y-8">
                    <p className="text-gray-600 leading-relaxed border-l-4 border-[var(--color-military-olive)] pl-5 py-2 bg-[var(--color-gray-bg)] rounded-r-xl">
                        This Privacy Policy explains how Mil Apparel collects, uses, and protects your personal information when you visit or make purchases from our website.
                    </p>

                    {sections.map(({ title, content, list }) => (
                        <div key={title} className="border-b border-gray-100 pb-8 last:border-0 last:pb-0">
                            <h2 className="font-display text-xl font-bold text-[var(--color-dark)] mb-3">
                                {title}
                            </h2>
                            {content && (
                                <p className="text-gray-600 leading-relaxed mb-3">{content}</p>
                            )}
                            {list && (
                                <ul className="space-y-2">
                                    {list.map((item, i) => (
                                        <li key={i} className="flex items-start gap-3 text-gray-600">
                                            <span className="text-[var(--color-military-olive)] font-bold mt-0.5">•</span>
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    ))}
                </div>

                <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
                    <Link href="/legal" className="text-center px-6 py-3 border border-gray-200 rounded-xl text-[var(--color-military-olive)] font-semibold hover:bg-[var(--color-gray-bg)] transition-all">
                        Terms of Service
                    </Link>
                    <Link href="/contact" className="text-center px-6 py-3 bg-[var(--color-military-olive)] text-white font-semibold rounded-xl hover:bg-[var(--color-gold)] hover:text-[var(--color-dark)] transition-all">
                        Contact Us
                    </Link>
                </div>
            </div>
        </div>
    );
}
