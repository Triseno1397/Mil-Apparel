import Link from 'next/link';
import { ArrowLeft, Ruler } from 'lucide-react';

const tshirtSizes = [
    { size: 'XS', chest: '32–34"', length: '27"', shoulder: '15"' },
    { size: 'S', chest: '35–37"', length: '28"', shoulder: '16"' },
    { size: 'M', chest: '38–40"', length: '29"', shoulder: '17"' },
    { size: 'L', chest: '41–43"', length: '30"', shoulder: '18"' },
    { size: 'XL', chest: '44–46"', length: '31"', shoulder: '19"' },
    { size: '2XL', chest: '47–49"', length: '32"', shoulder: '20"' },
    { size: '3XL', chest: '50–52"', length: '33"', shoulder: '21"' },
];

const hoodieSizes = [
    { size: 'XS', chest: '34–36"', length: '25"', sleeve: '31"' },
    { size: 'S', chest: '37–39"', length: '26"', sleeve: '32"' },
    { size: 'M', chest: '40–42"', length: '27"', sleeve: '33"' },
    { size: 'L', chest: '43–45"', length: '28"', sleeve: '34"' },
    { size: 'XL', chest: '46–48"', length: '29"', sleeve: '35"' },
    { size: '2XL', chest: '49–51"', length: '30"', sleeve: '36"' },
    { size: '3XL', chest: '52–54"', length: '31"', sleeve: '37"' },
];

const capSizes = [
    { size: 'S/M', circumference: '20–22"', fit: 'Adjustable strap' },
    { size: 'L/XL', circumference: '22–24"', fit: 'Adjustable strap' },
    { size: 'One Size', circumference: '20–24"', fit: 'Snapback / Velcro' },
];

const howToMeasure = [
    { label: 'Chest', desc: 'Measure around the fullest part of your chest, keeping the tape horizontal and comfortable.' },
    { label: 'Shirt Length', desc: 'Measure from the highest point of the shoulder down to the hem.' },
    { label: 'Sleeve', desc: 'Measure from the center back neck, along the shoulder, and down to the wrist.' },
    { label: 'Head Circumference', desc: 'Wrap a tape measure around your head about 1" above your ears for cap sizing.' },
];

export default function SizeGuidePage() {
    return (
        <div className="min-h-[100dvh] bg-[var(--color-gray-bg)]">
            {/* Header */}
            <div className="bg-white border-b border-[var(--color-light-gray)]">
                <div className="container mx-auto py-14 md:py-20">
                    <Link href="/shop" className="inline-flex items-center gap-2 text-[var(--color-muted)] hover:text-[var(--color-dark)] mb-5 transition-colors duration-200 text-sm">
                        <ArrowLeft className="h-3.5 w-3.5" /> Shop
                    </Link>
                    <h1 className="font-display text-4xl md:text-5xl font-bold text-[var(--color-dark)] tracking-[-0.02em] mb-3">Size Guide</h1>
                    <p className="text-lg text-[var(--color-muted)]">Find your perfect fit across all Mil Apparel products.</p>
                </div>
            </div>

            <div className="container mx-auto py-12 md:py-16 max-w-5xl space-y-8">

                {/* Tip banner */}
                <div className="bg-[var(--color-military-olive)]/8 ring-1 ring-[var(--color-military-olive)]/15 rounded-sm p-5 flex items-start gap-4">
                    <Ruler className="h-6 w-6 text-[var(--color-military-olive)] flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-gray-700 leading-relaxed">
                        <strong>All measurements are in inches.</strong> Our apparel is designed with an <strong>athletic fit</strong> and runs true to size. If you&apos;re between sizes or prefer a relaxed fit, <strong>size up</strong>.
                    </p>
                </div>

                {/* T-Shirts */}
                <div className="bg-white rounded-sm ring-1 ring-black/5 p-7">
                    <h2 className="font-display text-2xl font-bold text-[var(--color-dark)] mb-6">
                        T-Shirts
                    </h2>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="bg-[var(--color-dark)] text-white text-left">
                                    <th className="px-4 py-3 font-semibold rounded-tl-sm">Size</th>
                                    <th className="px-4 py-3 font-semibold">Chest</th>
                                    <th className="px-4 py-3 font-semibold">Length</th>
                                    <th className="px-4 py-3 font-semibold rounded-tr-sm">Shoulder</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {tshirtSizes.map((row, i) => (
                                    <tr key={row.size} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                        <td className="px-4 py-3 font-bold text-[var(--color-military-olive)]">{row.size}</td>
                                        <td className="px-4 py-3 text-gray-700">{row.chest}</td>
                                        <td className="px-4 py-3 text-gray-700">{row.length}</td>
                                        <td className="px-4 py-3 text-gray-700">{row.shoulder}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Hoodies */}
                <div className="bg-white rounded-sm ring-1 ring-black/5 p-7">
                    <h2 className="font-display text-2xl font-bold text-[var(--color-dark)] mb-6">
                        Hoodies &amp; Sweatshirts
                    </h2>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="bg-[var(--color-dark)] text-white text-left">
                                    <th className="px-4 py-3 font-semibold rounded-tl-sm">Size</th>
                                    <th className="px-4 py-3 font-semibold">Chest</th>
                                    <th className="px-4 py-3 font-semibold">Length</th>
                                    <th className="px-4 py-3 font-semibold rounded-tr-sm">Sleeve</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {hoodieSizes.map((row, i) => (
                                    <tr key={row.size} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                        <td className="px-4 py-3 font-bold text-[var(--color-military-olive)]">{row.size}</td>
                                        <td className="px-4 py-3 text-gray-700">{row.chest}</td>
                                        <td className="px-4 py-3 text-gray-700">{row.length}</td>
                                        <td className="px-4 py-3 text-gray-700">{row.sleeve}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Caps */}
                <div className="bg-white rounded-sm ring-1 ring-black/5 p-7">
                    <h2 className="font-display text-2xl font-bold text-[var(--color-dark)] mb-6">
                        Caps &amp; Hats
                    </h2>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="bg-[var(--color-dark)] text-white text-left">
                                    <th className="px-4 py-3 font-semibold rounded-tl-sm">Size</th>
                                    <th className="px-4 py-3 font-semibold">Head Circumference</th>
                                    <th className="px-4 py-3 font-semibold rounded-tr-sm">Closure</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {capSizes.map((row, i) => (
                                    <tr key={row.size} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                        <td className="px-4 py-3 font-bold text-[var(--color-military-olive)]">{row.size}</td>
                                        <td className="px-4 py-3 text-gray-700">{row.circumference}</td>
                                        <td className="px-4 py-3 text-gray-700">{row.fit}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* How to Measure */}
                <div className="bg-white rounded-sm ring-1 ring-black/5 p-7">
                    <h2 className="font-display text-2xl font-bold text-[var(--color-dark)] mb-6">
                        How to Measure
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        {howToMeasure.map(({ label, desc }) => (
                            <div key={label} className="p-5 bg-[var(--color-gray-bg)] rounded-sm">
                                <p className="font-bold text-[var(--color-military-olive)] mb-2">{label}</p>
                                <p className="text-sm text-gray-600 leading-relaxed">{desc}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Still not sure */}
                <div className="bg-[var(--color-dark)] rounded-sm p-8 text-center text-white">
                    <h3 className="font-display text-2xl font-bold mb-2">Not sure about your size?</h3>
                    <p className="text-gray-300 mb-6">We offer free exchanges within 30 days — no stress.</p>
                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                        <Link href="/contact" className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--color-military-olive)] text-white font-semibold rounded-full hover:bg-[var(--color-gold)] hover:text-[var(--color-dark)] transition-all">
                            Ask Us
                        </Link>
                        <Link href="/policies/shipping" className="inline-flex items-center gap-2 px-6 py-3 border border-white/30 text-white font-semibold rounded-full hover:border-[var(--color-gold)] hover:text-[var(--color-gold)] transition-all">
                            Return Policy
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
