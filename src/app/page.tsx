import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { HeroSection } from "@/components/home/HeroSection";
import { ValueProposition } from "@/components/home/ValueProposition";
import { ProcessOverview } from "@/components/home/ProcessOverview";
import { SocialProof } from "@/components/home/SocialProof";
import { FAQ } from "@/components/home/FAQ";
import { StructuredData } from "@/components/seo/StructuredData";
import { siteMetadata, homepageSchema } from "@/lib/seo/metadata";
import { EmailCapture } from "@/components/home/EmailCapture";

export const metadata: Metadata = {
  title: "TapCraft Studio | Custom 3D Printed NFC Products | Melbourne",
  description:
    "Melbourne-based 3D printing studio creating smart, NFC-enabled products. Custom business cards, event tags, retail products & prototypes. Australian-made quality, fast turnaround.",

  keywords: [
    "custom 3D printing Melbourne",
    "NFC business cards Australia",
    "smart product manufacturing",
    "3D printed NFC products",
    "Melbourne maker studio",
    "custom NFC tags",
    "Australian 3D printing",
    "smart business cards",
    "event NFC products",
    "retail product tags",
  ],

  authors: [{ name: "TapCraft Studio" }],
  creator: "TapCraft Studio",
  publisher: "TapCraft Studio",

  alternates: {
    canonical: siteMetadata.siteUrl,
  },

  openGraph: {
    type: "website",
    locale: "en_AU",
    url: siteMetadata.siteUrl,
    siteName: "TapCraft Studio",
    title: "TapCraft Studio | Smart 3D + NFC Products | Melbourne",
    description:
      "Custom 3D printed products with integrated NFC technology. Made in Melbourne for businesses that innovate. Fast turnaround, premium quality.",
    images: [
      {
        url: "/images/og/homepage.jpg",
        width: 1200,
        height: 630,
        alt: "TapCraft Studio - 3D printed NFC products",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "TapCraft Studio | Smart 3D + NFC Products",
    description: "Custom 3D printed NFC products. Melbourne-made quality.",
    images: ["/images/og/homepage.jpg"],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function HomePage() {
  return (
    <>
      <StructuredData data={homepageSchema} />
      <Header />
      <main>
        <HeroSection />
        <ValueProposition />
        <ProcessOverview />

        {/* <SocialProof /> */}

        <FAQ />
        <EmailCapture />
      </main>
    </>
  );
}
