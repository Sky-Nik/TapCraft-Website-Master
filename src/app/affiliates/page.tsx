import type { Metadata } from "next";
import Link from "next/link";
import { LightHeader } from "@/components/layout/LightHeader";
import { Button } from "@/components/shared/Button";
import { Card, CardHeader, CardTitle } from "@/components/shared/Card";
import { Badge } from "@/components/shared/Badge";

export const metadata: Metadata = {
  title: "Affiliate Program",
  description:
    "Earn 10% commission promoting TapCraft Studio's custom NFC products. Join our affiliate program and start earning today.",
  openGraph: {
    title: "Affiliate Program | TapCraft Studio",
    description:
      "Earn 10% commission promoting TapCraft Studio's custom NFC products.",
    type: "website",
    locale: "en_AU",
    siteName: "TapCraft Studio",
  },
};

const perks = [
  {
    title: "10% Commission",
    description:
      "Earn a generous 10% on every sale you refer — no caps, no limits.",
    icon: (
      <svg
        className="h-8 w-8 text-tapcraft-blue"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
  },
  {
    title: "30-Day Cookie",
    description:
      "Your referrals are tracked for a full 30 days, so you get credit even if they come back later.",
    icon: (
      <svg
        className="h-8 w-8 text-tapcraft-blue"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
  },
  {
    title: "Real-Time Dashboard",
    description:
      "Track clicks, conversions and payouts from a personalised UpPromote dashboard.",
    icon: (
      <svg
        className="h-8 w-8 text-tapcraft-blue"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5m.75-9l3-3 2.148 2.148A12.061 12.061 0 0116.5 7.605"
        />
      </svg>
    ),
  },
  {
    title: "Unique Products",
    description:
      "Our custom 3D-printed NFC products are genuinely different — easy to recommend, easy to sell.",
    icon: (
      <svg
        className="h-8 w-8 text-tapcraft-blue"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456z"
        />
      </svg>
    ),
  },
] as const;

const steps = [
  { step: 1, label: "Sign up via the link below — it takes under 2 minutes." },
  { step: 2, label: "Share your unique referral link with your audience." },
  { step: 3, label: "Earn 10% every time someone purchases through your link." },
] as const;

export default function AffiliatesPage() {
  return (
    <>
      <LightHeader />

      {/* Hero */}
      <section className="bg-white border-b border-gray-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24 text-center">
          <Badge variant="default" className="mb-4">
            Now Open
          </Badge>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-gray-900">
            Earn With TapCraft
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-500 leading-relaxed">
            Join our affiliate program and earn{" "}
            <strong className="text-tapcraft-blue">10% commission</strong> on
            every sale you refer. Promote innovative NFC products your audience
            will love.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="https://ejkqpi-th.myshopify.com/apps/affiliate"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button size="lg" style={{ color: "white" }}>
                Join the Program
              </Button>
            </a>
            <Link href="/catalogue">
              <Button variant="secondary" size="lg">
                Browse Products
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Perks */}
      <section className="bg-gray-50/60 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Why Partner With Us
          </h2>
          <p className="mt-3 text-center text-gray-500 max-w-xl mx-auto">
            Everything you need to start earning — simple, transparent, and
            rewarding.
          </p>

          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {perks.map((perk) => (
              <Card key={perk.title} hover padding="lg">
                <div className="mb-4">{perk.icon}</div>
                <CardHeader>
                  <CardTitle>{perk.title}</CardTitle>
                </CardHeader>
                <p className="mt-2 text-sm text-gray-500 leading-relaxed">
                  {perk.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            How It Works
          </h2>

          <ol className="mt-10 space-y-6 text-left">
            {steps.map(({ step, label }) => (
              <li key={step} className="flex items-start gap-4">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-tapcraft-blue text-white text-sm font-bold">
                  {step}
                </span>
                <p className="text-base text-gray-700 pt-1">{label}</p>
              </li>
            ))}
          </ol>

          <div className="mt-12">
            <a
              href="https://ejkqpi-th.myshopify.com/apps/affiliate"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button size="lg" style={{ color: "white" }}>
                Get Started Now
              </Button>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
