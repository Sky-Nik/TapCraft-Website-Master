import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { HeroSection } from "@/components/home/HeroSection";
import { ValueProposition } from "@/components/home/ValueProposition";

import { ProcessOverview } from "@/components/home/ProcessOverview";
import { SocialProof } from "@/components/home/SocialProof";

import { FAQ } from "@/components/home/FAQ";
import { EmailCapture } from "@/components/home/EmailCapture";

export const metadata: Metadata = {
  title: "TapCraft Studio | Custom 3D NFC Printing in Melbourne",
  description:
    "Melbourne's premier custom 3D printing studio. Create NFC-enabled business cards, product tags, event badges, and more. Beautifully crafted, intelligently connected.",
  keywords: [
    "3D printing Melbourne",
    "NFC business cards",
    "custom NFC products",
    "smart product tags",
    "3D printed NFC",
    "TapCraft Studio",
    "Melbourne 3D printing",
  ],
  openGraph: {
    title: "TapCraft Studio | Custom 3D NFC Printing in Melbourne",
    description:
      "Create NFC-enabled products that bridge the physical and digital worlds. Designed and manufactured in Melbourne.",
    type: "website",
    locale: "en_AU",
    siteName: "TapCraft Studio",
  },
  twitter: {
    card: "summary_large_image",
    title: "TapCraft Studio | Custom 3D NFC Printing",
    description:
      "Melbourne-made smart products that connect your brand to the digital world.",
  },
};

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <ValueProposition />
        <ProcessOverview />

        <SocialProof />

        <FAQ />
        <EmailCapture />
      </main>
    </>
  );
}
