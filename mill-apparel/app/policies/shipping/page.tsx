import Link from 'next/link';
import { Truck, Package, ArrowLeft, RotateCcw, Clock, MapPin, CheckCircle, AlertCircle } from 'lucide-react';

export default function ShippingPage() {
    return (
        <div className="min-h-screen bg-[var(--color-gray-bg)]">
            {/* Header */}
            <div className="bg-[var(--color-dark)] text-white py-20">
                <div className="container mx-auto px-4">
                    <Link href="/policies/faq" className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-6 transition-colors text-sm">
                        <ArrowLeft className="h-4 w-4" /> Policies
                    </Link>
                    <h1 className="font-display text-5xl md:text-6xl font-bold mb-4">
                        Shipping &amp; Returns
                    </h1>
                    <p className="text-xl text-gray-300">
                        Everything you need to know about getting your gear.
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4 py-16 max-w-4xl space-y-10">

                {/* Shipping Times */}
                <div className="bg-white rounded-2xl p-8 shadow-sm">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-12 h-12 bg-[var(--color-military-olive)]/10 rounded-xl flex items-center justify-center">
                            <Truck className="h-6 w-6 text-[var(--color-military-olive)]" />
                        </div>
                        <h2 className="font-display text-2xl font-bold text-[var(--color-dark)]">
                            Shipping Times
                        </h2>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="bg-[var(--color-gray-bg)] text-left">
                                    <th className="px-4 py-3 font-semibold text-gray-700 rounded-tl-xl">Shipping Method</th>
                                    <th className="px-4 py-3 font-semibold text-gray-700">Delivery Time</th>
                                    <th className="px-4 py-3 font-semibold text-gray-700 rounded-tr-xl">Cost</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                <tr>
                                    <td className="px-4 py-4 font-medium text-[var(--color-dark)]">Standard Shipping</td>
                                    <td className="px-4 py-4 text-gray-600">5–7 business days</td>
                                    <td className="px-4 py-4">
                                        <span className="text-green-600 font-semibold">FREE over $75</span>
                                        <span className="text-gray-500"> / $5.99 otherwise</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="px-4 py-4 font-medium text-[var(--color-dark)]">Express Shipping</td>
                                    <td className="px-4 py-4 text-gray-600">2–3 business days</td>
                                    <td className="px-4 py-4 text-gray-600">$14.99</td>
                                </tr>
                                <tr>
                                    <td className="px-4 py-4 font-medium text-[var(--color-dark)]">Overnight Shipping</td>
                                    <td className="px-4 py-4 text-gray-600">Next business day</td>
                                    <td className="px-4 py-4 text-gray-600">$29.99</td>
                                </tr>
                                <tr>
                                    <td className="px-4 py-4 font-medium text-[var(--color-dark)]">APO/FPO Addresses</td>
                                    <td className="px-4 py-4 text-gray-600">10–21 business days</td>
                                    <td className="px-4 py-4 text-gray-600">Standard rates apply</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="flex items-start gap-3 mt-5 p-4 bg-blue-50 rounded-xl">
                        <Clock className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                        <p className="text-sm text-blue-800">
                            Custom orders may require an additional <strong>2–3 business days</strong> for production before shipping. You&apos;ll receive tracking info via email once your order ships.
                        </p>
                    </div>
                </div>

                {/* Processing */}
                <div className="bg-white rounded-2xl p-8 shadow-sm">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-12 h-12 bg-[var(--color-military-olive)]/10 rounded-xl flex items-center justify-center">
                            <Package className="h-6 w-6 text-[var(--color-military-olive)]" />
                        </div>
                        <h2 className="font-display text-2xl font-bold text-[var(--color-dark)]">
                            Order Processing
                        </h2>
                    </div>
                    <div className="space-y-4">
                        {[
                            { icon: CheckCircle, color: 'text-green-500', label: 'Order Confirmed', desc: 'You\'ll receive an order confirmation email immediately.' },
                            { icon: CheckCircle, color: 'text-green-500', label: 'Production', desc: 'Standard items process in 1–2 business days. Custom orders take 2–3 days.' },
                            { icon: CheckCircle, color: 'text-green-500', label: 'Shipped', desc: 'You\'ll receive an email with tracking number once your package is picked up.' },
                            { icon: CheckCircle, color: 'text-green-500', label: 'Delivered', desc: 'Package arrives at your door. Enjoy!' },
                        ].map((step, i) => (
                            <div key={i} className="flex items-start gap-4 p-4 rounded-xl bg-[var(--color-gray-bg)]">
                                <step.icon className={`h-5 w-5 ${step.color} flex-shrink-0 mt-0.5`} />
                                <div>
                                    <p className="font-semibold text-[var(--color-dark)]">{step.label}</p>
                                    <p className="text-sm text-gray-600 mt-0.5">{step.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Returns */}
                <div className="bg-white rounded-2xl p-8 shadow-sm">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-12 h-12 bg-[var(--color-military-olive)]/10 rounded-xl flex items-center justify-center">
                            <RotateCcw className="h-6 w-6 text-[var(--color-military-olive)]" />
                        </div>
                        <h2 className="font-display text-2xl font-bold text-[var(--color-dark)]">
                            Returns &amp; Exchanges
                        </h2>
                    </div>
                    <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="p-5 border border-green-200 bg-green-50 rounded-xl">
                                <p className="font-semibold text-green-800 mb-2">✓ Eligible for Return</p>
                                <ul className="text-sm text-green-700 space-y-1">
                                    <li>Unworn and unwashed items</li>
                                    <li>Original tags attached</li>
                                    <li>Returned within 30 days</li>
                                    <li>Original packaging preferred</li>
                                </ul>
                            </div>
                            <div className="p-5 border border-red-200 bg-red-50 rounded-xl">
                                <p className="font-semibold text-red-800 mb-2">✗ Not Eligible</p>
                                <ul className="text-sm text-red-700 space-y-1">
                                    <li>Customized items (unless defective)</li>
                                    <li>Items worn, washed, or altered</li>
                                    <li>Items past 30-day window</li>
                                    <li>Sale / clearance items</li>
                                </ul>
                            </div>
                        </div>
                        <div className="flex items-start gap-3 p-4 bg-amber-50 border border-amber-200 rounded-xl">
                            <AlertCircle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
                            <p className="text-sm text-amber-800">
                                To start a return or exchange, email us at <a href="mailto:support@milapparel.com" className="font-semibold underline">support@milapparel.com</a> with your order number. Free exchanges within 30 days — we&apos;ll cover the shipping label.
                            </p>
                        </div>
                    </div>
                </div>

                {/* International */}
                <div className="bg-white rounded-2xl p-8 shadow-sm">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 bg-[var(--color-military-olive)]/10 rounded-xl flex items-center justify-center">
                            <MapPin className="h-6 w-6 text-[var(--color-military-olive)]" />
                        </div>
                        <h2 className="font-display text-2xl font-bold text-[var(--color-dark)]">
                            APO / FPO Shipping
                        </h2>
                    </div>
                    <p className="text-gray-600 leading-relaxed">
                        We proudly ship to APO and FPO addresses at standard domestic rates. Delivery times to military addresses typically take 10–21 business days depending on location. We honor those who serve and will do everything we can to get your gear to you, wherever you are.
                    </p>
                </div>

                {/* Still have questions */}
                <div className="bg-[var(--color-dark)] rounded-2xl p-8 text-center text-white">
                    <h3 className="font-display text-2xl font-bold mb-2">Still have questions?</h3>
                    <p className="text-gray-300 mb-6">Our support team is here to help.</p>
                    <Link
                        href="/contact"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--color-military-olive)] text-white font-semibold rounded-xl hover:bg-[var(--color-gold)] hover:text-[var(--color-dark)] transition-all"
                    >
                        Contact Us
                    </Link>
                </div>
            </div>
        </div>
    );
}
