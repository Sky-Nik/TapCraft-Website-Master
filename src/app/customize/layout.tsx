import type { Metadata } from "next";
import { siteMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = {
  title: "3D Product Customizer | Design Your Smart NFC Product | TapCraft Studio",
  description:
    "Design your custom 3D printed NFC product with our interactive customizer. Choose shape, color, material, and NFC configuration. Get an instant quote.",

  keywords: [
    "custom 3D product design",
    "NFC product customizer",
    "3D design tool",
    "custom business card design",
    "NFC tag designer",
    "Melbourne custom 3D printing",
    "personalized smart products",
    "interactive product customizer",
  ],

  alternates: {
    canonical: `${siteMetadata.siteUrl}/customize`,
  },

  openGraph: {
    type: "website",
    locale: "en_AU",
    url: `${siteMetadata.siteUrl}/customize`,
    siteName: "TapCraft Studio",
    title: "Design Your Custom 3D + NFC Product | TapCraft Studio",
    description:
      "Interactive 3D customizer for smart NFC products. Design, customize, and get a quote instantly.",
    images: [
      {
        url: "/images/og/customize.jpg",
        width: 1200,
        height: 630,
        alt: "TapCraft Studio 3D product customizer",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Design Your Custom Product | TapCraft Studio",
    description: "Interactive 3D customizer for NFC products. Instant quotes.",
    images: ["/images/og/customize.jpg"],
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function CustomizeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
