import type { Metadata } from "next";
import { LightHeader } from "@/components/layout/LightHeader";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "TapCraft Studio's privacy policy. Learn how we collect, use, and protect your personal information.",
  openGraph: {
    title: "Privacy Policy | TapCraft Studio",
    description:
      "Learn how TapCraft Studio collects, uses, and protects your personal information.",
    type: "website",
    locale: "en_AU",
    siteName: "TapCraft Studio",
  },
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <LightHeader />

      <div className="bg-white py-16 sm:py-24">
        <article className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <header className="mb-12">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              Privacy Policy
            </h1>
            <p className="mt-3 text-sm text-gray-500">
              Effective date: 1 March 2026
            </p>
          </header>

          <div className="space-y-10 text-base leading-relaxed text-gray-700">
            {/* Introduction */}
            <section>
              <p>
                This Privacy Policy describes how TapCraft Studio (the
                &ldquo;Site&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;, or
                &ldquo;our&rdquo;) collects, uses, and discloses your personal
                information when you visit, use our services, or make a purchase
                from{" "}
                <a
                  href="https://www.tapcraft.shop"
                  className="text-tapcraft-blue hover:underline"
                >
                  tapcraft.shop
                </a>{" "}
                (the &ldquo;Site&rdquo;) or otherwise communicate with us.
              </p>
              <p className="mt-3">
                Please read this policy carefully. By using our Site you agree to
                the collection and use of information in accordance with this
                policy.
              </p>
            </section>

            {/* What We Collect */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                What We Collect
              </h2>
              <p className="mb-3">
                We collect different types of information depending on how you
                interact with us:
              </p>

              <h3 className="text-lg font-medium text-gray-900 mt-5 mb-2">
                Information You Provide Directly
              </h3>
              <ul className="list-disc pl-6 space-y-1.5 text-gray-600">
                <li>
                  <strong>Contact details:</strong> name, email address, phone
                  number, mailing address
                </li>
                <li>
                  <strong>Order information:</strong> billing and shipping
                  address, payment details, products purchased
                </li>
                <li>
                  <strong>Account information:</strong> username, password,
                  security questions (if you create an account)
                </li>
                <li>
                  <strong>Customer support:</strong> any information you include
                  in communications with us
                </li>
              </ul>

              <h3 className="text-lg font-medium text-gray-900 mt-5 mb-2">
                Information Collected Automatically
              </h3>
              <p className="mb-2">
                When you visit our Site, we automatically collect certain
                information about your device and your visit, including:
              </p>
              <ul className="list-disc pl-6 space-y-1.5 text-gray-600">
                <li>
                  <strong>Device data:</strong> browser type, operating system,
                  IP address, device identifiers, and language preferences
                </li>
                <li>
                  <strong>Usage data:</strong> pages viewed, links clicked,
                  browsing times, referring URLs, and site interaction data
                </li>
                <li>
                  <strong>Location data:</strong> general geographic location
                  based on your IP address
                </li>
              </ul>
              <p className="mt-3 text-sm text-gray-500">
                We collect this data using cookies, pixels, and similar
                technologies. See the &ldquo;Cookies&rdquo; section below for
                more detail.
              </p>

              <h3 className="text-lg font-medium text-gray-900 mt-5 mb-2">
                Information From Third Parties
              </h3>
              <p>
                We may receive information about you from third parties,
                including business partners, marketing partners, social media
                platforms, data aggregators, and payment service providers. This
                may include your name, email address, mailing address, phone
                number, purchase history, or other information relevant to your
                engagement with our services.
              </p>
            </section>

            {/* How We Use Your Information */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                How We Use Your Information
              </h2>
              <ul className="list-disc pl-6 space-y-1.5 text-gray-600">
                <li>
                  <strong>Providing products &amp; services:</strong> processing
                  orders, managing your account, arranging shipping, facilitating
                  returns and exchanges
                </li>
                <li>
                  <strong>Marketing &amp; advertising:</strong> sending
                  promotional emails you&rsquo;ve opted in to, displaying
                  relevant ads, and identifying you across sessions for
                  marketing purposes (you can opt out at any time)
                </li>
                <li>
                  <strong>Security &amp; fraud prevention:</strong> detecting and
                  preventing fraudulent transactions and other illegal
                  activities, protecting rights of users and third parties
                </li>
                <li>
                  <strong>Communication:</strong> responding to enquiries,
                  sending order confirmations, shipping updates, and policy
                  changes
                </li>
                <li>
                  <strong>Improving our Site:</strong> analysing usage patterns
                  and performance, troubleshooting bugs, and conducting internal
                  research
                </li>
              </ul>
            </section>

            {/* Cookies */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                Cookies
              </h2>
              <p className="mb-3">
                A cookie is a small file placed on your device. We use the
                following types of cookies:
              </p>
              <ul className="list-disc pl-6 space-y-1.5 text-gray-600">
                <li>
                  <strong>Essential cookies:</strong> required for the Site to
                  function (e.g. cart, login sessions)
                </li>
                <li>
                  <strong>Analytics cookies:</strong> help us understand how
                  visitors use the Site (e.g. Google Analytics)
                </li>
                <li>
                  <strong>Advertising cookies:</strong> used to deliver
                  personalised advertising and measure campaign performance
                </li>
              </ul>
              <p className="mt-3">
                Most browsers let you block or remove cookies through their
                settings. Note that blocking essential cookies may affect Site
                functionality.
              </p>
            </section>

            {/* Disclosure */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                How We Share Your Information
              </h2>
              <p className="mb-3">
                We may share your personal information with:
              </p>
              <ul className="list-disc pl-6 space-y-1.5 text-gray-600">
                <li>
                  <strong>Service providers:</strong> companies that help us
                  operate our business &mdash; hosting, payment processing,
                  shipping, analytics, email marketing, etc.
                </li>
                <li>
                  <strong>Business partners:</strong> where necessary for
                  promotions, affiliate programs, or co-branded offerings
                </li>
                <li>
                  <strong>Legal &amp; compliance:</strong> when required by law,
                  regulation, legal process, or governmental request
                </li>
                <li>
                  <strong>Business transfers:</strong> in connection with a
                  merger, acquisition, or sale of assets
                </li>
              </ul>
              <p className="mt-3">
                We do not sell your personal information to third parties.
              </p>
            </section>

            {/* Shopify relationship — legally required, unmodified */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                Third-Party Services &amp; Shopify
              </h2>
              <p className="mb-3">
                Our online store is hosted on Shopify. Shopify provides us with
                the e-commerce platform that allows us to sell our products and
                services to you.
              </p>
              <p className="mb-3">
                Your data is stored through Shopify&rsquo;s data storage,
                databases, and the general Shopify application. They store your
                data on a secure server behind a firewall.
              </p>
              <p className="mb-3">
                <strong>Payment:</strong> If you choose a direct payment gateway
                to complete your purchase, Shopify stores your credit card data.
                It is encrypted through the Payment Card Industry Data Security
                Standard (PCI-DSS). Your purchase transaction data is stored
                only as long as is necessary to complete your purchase
                transaction. After that is complete, your purchase transaction
                information is deleted.
              </p>
              <p className="mb-3">
                All direct payment gateways adhere to the standards set by
                PCI-DSS as managed by the PCI Security Standards Council, which
                is a joint effort of brands like Visa, MasterCard, American
                Express, and Discover.
              </p>
              <p>
                PCI-DSS requirements help ensure the secure handling of credit
                card information by our store and its service providers. For more
                insight, you may want to read Shopify&rsquo;s Terms of Service
                or Privacy Statement.
              </p>
            </section>

            {/* Your Rights */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                Your Rights
              </h2>
              <p className="mb-3">
                Depending on where you live, you may have the following rights
                regarding your personal information:
              </p>
              <ul className="list-disc pl-6 space-y-1.5 text-gray-600">
                <li>
                  <strong>Right of access:</strong> request a copy of the
                  personal information we hold about you
                </li>
                <li>
                  <strong>Right to correction:</strong> request we update
                  inaccurate or incomplete data
                </li>
                <li>
                  <strong>Right to deletion:</strong> request we erase your
                  personal information (subject to legal obligations)
                </li>
                <li>
                  <strong>Right to portability:</strong> receive your data in a
                  structured, machine-readable format
                </li>
                <li>
                  <strong>Right to withdraw consent:</strong> where processing is
                  based on consent, withdraw it at any time
                </li>
                <li>
                  <strong>Right to object:</strong> object to processing for
                  direct marketing or legitimate interest grounds
                </li>
              </ul>
              <p className="mt-3">
                To exercise any of these rights, email us at{" "}
                <a
                  href="mailto:nikhilgupta@tapcraft.shop"
                  className="text-tapcraft-blue hover:underline"
                >
                  nikhilgupta@tapcraft.shop
                </a>
                . We will respond within 30 days.
              </p>
            </section>

            {/* GDPR / EU */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                European Users (GDPR)
              </h2>
              <p className="mb-3">
                If you are a resident of the European Economic Area (EEA), you
                have additional rights under the General Data Protection
                Regulation (GDPR). We process personal data lawfully under the
                following bases:
              </p>
              <ul className="list-disc pl-6 space-y-1.5 text-gray-600">
                <li>Performance of a contract (e.g. fulfilling your order)</li>
                <li>
                  Legitimate interests (e.g. improving our services, fraud
                  prevention)
                </li>
                <li>
                  Consent (e.g. marketing emails &mdash; withdrawable at any
                  time)
                </li>
                <li>Legal obligations</li>
              </ul>
              <p className="mt-3">
                If you wish to lodge a complaint, you have the right to do so
                with your local data protection authority.
              </p>
            </section>

            {/* Data Retention */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                Data Retention
              </h2>
              <p>
                We retain your personal information for as long as necessary to
                provide services, comply with legal obligations, resolve
                disputes, and enforce our policies. When your data is no longer
                needed, we securely delete or anonymise it.
              </p>
            </section>

            {/* Security */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                Security
              </h2>
              <p>
                We implement reasonable technical and organisational measures to
                protect your personal information against unauthorised access,
                alteration, disclosure, or destruction. However, no method of
                transmission over the Internet is 100% secure, and we cannot
                guarantee absolute security.
              </p>
            </section>

            {/* Minors */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                Minors
              </h2>
              <p>
                Our Site is not intended for individuals under the age of 18. We
                do not knowingly collect personal information from minors. If you
                are a parent or guardian and believe your child has provided us
                with personal information, please contact us so we can delete
                it.
              </p>
            </section>

            {/* Changes */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                Changes to This Policy
              </h2>
              <p>
                We may update this Privacy Policy from time to time. Changes
                will be posted on this page with a revised effective date. We
                encourage you to review this page periodically. Your continued
                use of the Site constitutes acceptance of the updated policy.
              </p>
            </section>

            {/* Contact CTA */}
            <section className="rounded-xl border border-gray-200 bg-gray-50 p-6 text-center">
              <h2 className="text-lg font-semibold text-gray-900 mb-2">
                Questions?
              </h2>
              <p className="text-sm text-gray-600 mb-4">
                If you have any questions about this Privacy Policy or your
                personal data, get in touch.
              </p>
              <a
                href="mailto:nikhilgupta@tapcraft.shop"
                className="inline-flex items-center justify-center rounded-lg bg-tapcraft-blue px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-tapcraft-blue/90"
              >
                Contact Us
              </a>
              <p className="mt-3 text-xs text-gray-500">
                nikhilgupta@tapcraft.shop &middot; 8 Uganda Street, Boronia 2,
                Burwood VIC 3125, AU
              </p>
            </section>
          </div>
        </article>
      </div>
    </>
  );
}
