import type { Metadata } from "next";
import { Playfair_Display } from "next/font/google";
import { GeistSans } from "geist/font/sans";
import "./globals.css";
import ConditionalHeader from "@/components/layout/ConditionalHeader";
import Footer from "@/components/layout/Footer";
import { CartProvider } from "@/context/CartContext";
import siteConfig from "@/config/site.json";

const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });

export const metadata: Metadata = {
  title: `${siteConfig.siteName} | ${siteConfig.tagline}`,
  description: siteConfig.description,
  keywords: ["military apparel", "veteran clothing", "military gifts", "customizable military gear"],
  authors: [{ name: siteConfig.siteName }],
  openGraph: {
    title: siteConfig.siteName,
    description: siteConfig.tagline,
    url: siteConfig.url,
    siteName: siteConfig.siteName,
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${GeistSans.variable} ${playfair.variable} antialiased`}>
        <CartProvider>
          <div className="flex flex-col min-h-[100dvh]">
            <ConditionalHeader />
            <main className="flex-grow">
              {children}
            </main>
            <Footer />
          </div>
        </CartProvider>
      </body>
    </html>
  );
}

