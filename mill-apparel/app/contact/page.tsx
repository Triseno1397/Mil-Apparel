'use client';

import { useState } from 'react';
import { Mail, Clock, CheckCircle, Send, MessageSquare, Phone } from 'lucide-react';
import Link from 'next/link';

type FormState = 'idle' | 'submitting' | 'success';

export default function ContactPage() {
    const [formState, setFormState] = useState<FormState>('idle');
    const [form, setForm] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setFormState('submitting');
        await new Promise(r => setTimeout(r, 1200));
        setFormState('success');
    };

    return (
        <div className="min-h-[100dvh] bg-[var(--color-gray-bg)]">
            {/* Header */}
            <div className="bg-white border-b border-[var(--color-light-gray)]">
                <div className="container mx-auto py-14 md:py-20">
                    <span className="text-[11px] tracking-[0.15em] uppercase font-semibold text-[var(--color-muted)] block mb-3">
                        Get in Touch
                    </span>
                    <h1 className="font-display text-4xl md:text-5xl font-bold text-[var(--color-dark)] tracking-[-0.02em] mb-3">Contact Us</h1>
                    <p className="text-lg text-[var(--color-muted)] max-w-xl">
                        We&apos;re here to help. Reach out about orders, customization, bulk requests, or anything else.
                    </p>
                </div>
            </div>

            <div className="container mx-auto py-12 md:py-16 max-w-6xl">
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">

                    {/* Left: Info */}
                    <div className="lg:col-span-2 space-y-4">
                        <div className="bg-white rounded-sm ring-1 ring-black/5 p-6">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 bg-[var(--color-military-olive)]/8 rounded-full flex items-center justify-center">
                                    <Mail className="h-5 w-5 text-[var(--color-military-olive)]" />
                                </div>
                                <div>
                                    <p className="font-semibold text-sm text-[var(--color-dark)]">Email Us</p>
                                    <a href="mailto:support@milapparel.com" className="text-sm text-[var(--color-military-olive)] hover:text-[var(--color-gold)] transition-colors duration-200 font-medium">
                                        support@milapparel.com
                                    </a>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-sm ring-1 ring-black/5 p-6">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 bg-[var(--color-military-olive)]/8 rounded-full flex items-center justify-center">
                                    <Clock className="h-5 w-5 text-[var(--color-military-olive)]" />
                                </div>
                                <div>
                                    <p className="font-semibold text-sm text-[var(--color-dark)]">Support Hours</p>
                                    <p className="text-sm text-[var(--color-muted)]">Mon - Fri: 9am - 5pm EST</p>
                                    <p className="text-xs text-[var(--color-muted)] mt-0.5">Replies within 24 hours</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-sm ring-1 ring-black/5 p-6">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 bg-[var(--color-military-olive)]/8 rounded-full flex items-center justify-center">
                                    <MessageSquare className="h-5 w-5 text-[var(--color-military-olive)]" />
                                </div>
                                <div>
                                    <p className="font-semibold text-sm text-[var(--color-dark)]">Quick Answers</p>
                                    <Link href="/policies/faq" className="text-sm text-[var(--color-military-olive)] hover:text-[var(--color-gold)] transition-colors duration-200 font-medium">
                                        Browse our FAQ
                                    </Link>
                                </div>
                            </div>
                        </div>

                        <div className="bg-[var(--color-dark)] rounded-sm p-6 text-white">
                            <h3 className="font-display text-lg font-bold mb-2">Bulk / Unit Orders?</h3>
                            <p className="text-white/55 text-sm mb-4 leading-relaxed">
                                Special pricing for unit bulk orders. We work with bases, battalions, and veterans groups.
                            </p>
                            <a
                                href="mailto:support@milapparel.com?subject=Bulk Order Inquiry"
                                className="inline-flex items-center gap-2 text-[var(--color-gold)] font-semibold text-sm hover:text-[var(--color-gold-soft)] transition-colors duration-200"
                            >
                                <Phone className="h-4 w-4" />
                                Request a Quote
                            </a>
                        </div>
                    </div>

                    {/* Right: Form */}
                    <div className="lg:col-span-3">
                        <div className="bg-white rounded-sm ring-1 ring-black/5 p-7 md:p-8">
                            {formState === 'success' ? (
                                <div className="text-center py-12">
                                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[var(--color-success)]/10 mb-6">
                                        <CheckCircle className="h-8 w-8 text-[var(--color-success)]" />
                                    </div>
                                    <h2 className="font-display text-2xl font-bold text-[var(--color-dark)] mb-3">
                                        Message Sent!
                                    </h2>
                                    <p className="text-[var(--color-muted)] max-w-sm mx-auto">
                                        Thanks for reaching out. We&apos;ll get back to you within 24 hours.
                                    </p>
                                </div>
                            ) : (
                                <>
                                    <h2 className="font-display text-xl font-bold text-[var(--color-dark)] mb-6">
                                        Send a Message
                                    </h2>
                                    <form onSubmit={handleSubmit} className="space-y-5">
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                            <div>
                                                <label className="block text-xs font-semibold text-[var(--color-muted)] uppercase tracking-[0.05em] mb-1.5">
                                                    Full Name *
                                                </label>
                                                <input
                                                    type="text"
                                                    required
                                                    value={form.name}
                                                    onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
                                                    className="w-full px-4 py-3 border border-[var(--color-light-gray)] rounded-sm text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-military-olive)]/30 focus:border-[var(--color-military-olive)] transition-all duration-200"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-semibold text-[var(--color-muted)] uppercase tracking-[0.05em] mb-1.5">
                                                    Email Address *
                                                </label>
                                                <input
                                                    type="email"
                                                    required
                                                    value={form.email}
                                                    onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
                                                    className="w-full px-4 py-3 border border-[var(--color-light-gray)] rounded-sm text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-military-olive)]/30 focus:border-[var(--color-military-olive)] transition-all duration-200"
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-xs font-semibold text-[var(--color-muted)] uppercase tracking-[0.05em] mb-1.5">
                                                Subject *
                                            </label>
                                            <select
                                                required
                                                value={form.subject}
                                                onChange={e => setForm(p => ({ ...p, subject: e.target.value }))}
                                                className="w-full px-4 py-3 border border-[var(--color-light-gray)] rounded-sm text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-military-olive)]/30 focus:border-[var(--color-military-olive)] transition-all duration-200 bg-white"
                                            >
                                                <option value="">Select a subject...</option>
                                                <option>Order Support</option>
                                                <option>Customization Help</option>
                                                <option>Returns &amp; Exchanges</option>
                                                <option>Bulk / Unit Orders</option>
                                                <option>Shipping Question</option>
                                                <option>Other</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-xs font-semibold text-[var(--color-muted)] uppercase tracking-[0.05em] mb-1.5">
                                                Message *
                                            </label>
                                            <textarea
                                                required
                                                rows={6}
                                                value={form.message}
                                                onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
                                                placeholder="Tell us how we can help..."
                                                className="w-full px-4 py-3 border border-[var(--color-light-gray)] rounded-sm text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-military-olive)]/30 focus:border-[var(--color-military-olive)] transition-all duration-200 resize-none"
                                            />
                                        </div>
                                        <button
                                            type="submit"
                                            disabled={formState === 'submitting'}
                                            className="w-full py-3.5 bg-[var(--color-military-olive)] text-white font-semibold text-sm rounded-full hover:bg-[var(--color-olive-light)] transition-all duration-300 ease-[var(--ease-spring)] disabled:opacity-70 flex items-center justify-center gap-2 hover:scale-[1.01] active:scale-[0.99]"
                                        >
                                            {formState === 'submitting' ? (
                                                <>
                                                    <div className="h-4 w-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                                                    Sending...
                                                </>
                                            ) : (
                                                <>
                                                    <Send className="h-4 w-4" />
                                                    Send Message
                                                </>
                                            )}
                                        </button>
                                    </form>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
