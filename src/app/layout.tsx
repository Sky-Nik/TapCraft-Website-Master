import type { Metadata } from "next";
import { ViewTransitions } from "next-view-transitions";
import { Footer } from "@/components/layout/Footer";
import "./globals.css";

export const metadata: Metadata = {
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
  openGraph: {
    type: "website",
    locale: "en_AU",
    siteName: "TapCraft Studio",
    title: "TapCraft Studio | Custom 3D + NFC Products | Melbourne",
    description:
      "Melbourne-based 3D printing studio creating smart, NFC-enabled products. From business cards to event tags, we bridge the physical and digital worlds.",
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
          <main className="flex-1">{children}</main>
          <Footer />
        </body>
      </html>
    </ViewTransitions>
  );
}
