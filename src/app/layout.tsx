import type { Metadata } from "next";
import { ViewTransitions } from "next-view-transitions";
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
        <head>
          <script
            async
            src="https://www.googletagmanager.com/gtag/js?id=G-LKENKZZ9NG"
          />
          <script
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', 'G-LKENKZZ9NG');
              `,
            }}
          />
        </head>
        <body className="font-sans antialiased bg-white text-black min-h-screen flex flex-col">
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
