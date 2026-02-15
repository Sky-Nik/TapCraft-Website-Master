import type { Metadata } from "next";
import { siteMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = {
  title: "Product Catalogue | 3D Printed NFC Products | TapCraft Studio",
  description:
    "Browse our catalogue of smart, 3D printed NFC products. Business cards, event tags, retail products & custom prototypes. Made in Melbourne, shipped Australia-wide.",

  keywords: [
    "NFC business cards Melbourne",
    "3D printed smart cards",
    "custom NFC tags Australia",
    "event check-in products",
    "retail product tags",
    "smart business card designs",
    "NFC product catalogue",
    "Melbourne 3D printing",
  ],

  alternates: {
    canonical: `${siteMetadata.siteUrl}/catalogue`,
  },

  openGraph: {
    type: "website",
    locale: "en_AU",
    url: `${siteMetadata.siteUrl}/catalogue`,
    siteName: "TapCraft Studio",
    title: "Product Catalogue | Smart NFC Products | TapCraft Studio",
    description:
      "Browse ready-made 3D printed NFC designs. Business cards, event products, retail tags. Custom options available.",
    images: [
      {
        url: "/images/og/catalogue.jpg",
        width: 1200,
        height: 630,
        alt: "TapCraft Studio product catalogue - NFC enabled products",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Product Catalogue | TapCraft Studio",
    description: "Browse smart 3D printed NFC products. Made in Melbourne.",
    images: ["/images/og/catalogue.jpg"],
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function CatalogueLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
