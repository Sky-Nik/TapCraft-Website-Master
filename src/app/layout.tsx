import type { Metadata } from "next";
import Script from "next/script";
import { ViewTransitions } from "next-view-transitions";

const UPPROMOTE_SHOP =
  process.env.NEXT_PUBLIC_UPPROMOTE_SHOP ?? "ejkqpi-th.myshopify.com";
import { Footer } from "@/components/layout/Footer";
import { CartProvider } from "@/context/CartContext";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { siteMetadata } from "@/lib/seo/metadata";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteMetadata.siteUrl),
  title: {
    default: "TapCraft Studio | Custom 3D + NFC Products | Melbourne",
    template: "%s | TapCraft Studio",
  },
  description:
    "Melbourne-based 3D printing studio creating smart, NFC-enabled products. From business cards to event tags, we bridge the physical and digital worlds. Made in Australia, shipped nationwide.",
  keywords: [
    "custom 3D printing Melbourne",
    "NFC business cards",
    "smart product tags",
    "3D printed NFC",
    "Melbourne maker studio",
    "custom NFC products Australia",
  ],
  authors: [{ name: "TapCraft Studio" }],
  creator: "TapCraft Studio",
  publisher: "TapCraft Studio",
  openGraph: {
    type: "website",
    locale: "en_AU",
    url: siteMetadata.siteUrl,
    siteName: "TapCraft Studio",
    title: "TapCraft Studio | Custom 3D + NFC Products | Melbourne",
    description:
      "Melbourne-based 3D printing studio creating smart, NFC-enabled products. From business cards to event tags, we bridge the physical and digital worlds.",
  },
  twitter: {
    card: "summary_large_image",
    title: "TapCraft Studio | Custom 3D + NFC Products",
    description: "Melbourne-made smart products. Custom 3D + NFC.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ViewTransitions>
      <html lang="en">
        <body className="font-sans antialiased bg-white text-black min-h-screen flex flex-col">
          {/* UpPromote affiliate tracking – data-layer + config (must run before collect.js) */}
          <Script
            id="uppromote-config"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: [
                `window.upDataLayer = window.upDataLayer || [];`,
                `function upTag() { return upDataLayer.push(arguments); }`,
                `upTag('config', 'myshopify_domain', '${UPPROMOTE_SHOP}');`,
                `upTag('config', 'linker', ['${UPPROMOTE_SHOP}']);`,
              ].join("\n"),
            }}
          />
          {/* UpPromote pixel (single copy – handles both cart & linker tracking) */}
          <Script
            id="uppromote-collect"
            strategy="afterInteractive"
            src="https://static-pixel.uppromote.com/collect/v1/collect.js"
          />

          <CartProvider>
            <main className="flex-1">{children}</main>
            <Footer />
            <CartDrawer />
          </CartProvider>
        </body>
      </html>
    </ViewTransitions>
  );
}
