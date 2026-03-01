import type { Metadata } from "next";
import Link from "next/link";
import { LightHeader } from "@/components/layout/LightHeader";

export const metadata: Metadata = {
  title: "Refund & Returns Policy",
  description:
    "TapCraft Studio's refund and returns policy. 30-day return window, easy process, and clear guidelines for all purchases.",
  openGraph: {
    title: "Refund & Returns Policy | TapCraft Studio",
    description:
      "TapCraft Studio's refund and returns policy. 30-day return window, easy process, and clear guidelines.",
    type: "website",
    locale: "en_AU",
    siteName: "TapCraft Studio",
  },
};

export default function RefundPolicyPage() {
  return (
    <>
      <LightHeader />

      <div className="bg-white py-16 sm:py-24">
        <article className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <header className="mb-12">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              Refund &amp; Returns Policy
            </h1>
            <p className="mt-3 text-sm text-gray-500">
              Last updated: 1 March 2026
            </p>
          </header>

          <div className="space-y-10 text-base leading-relaxed text-gray-700">
            {/* Return Window */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                Return Window
              </h2>
              <p>
                You have <strong>30 days from the date you received your
                order</strong> to request a return. After 30 days we
                unfortunately can&rsquo;t offer a refund or exchange.
              </p>
            </section>

            {/* Eligibility */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                Eligibility
              </h2>
              <p className="mb-3">
                To be eligible for a return, your item must be:
              </p>
              <ul className="list-disc pl-6 space-y-1.5 text-gray-600">
                <li>Unused and in the same condition you received it</li>
                <li>In the original packaging with all tags attached</li>
                <li>Accompanied by proof of purchase (order confirmation or receipt)</li>
              </ul>
            </section>

            {/* How to Start */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                How to Start a Return
              </h2>
              <p className="mb-3">
                To initiate a return, email us at{" "}
                <a
                  href="mailto:nikhilgupta@tapcraft.shop"
                  className="text-tapcraft-blue hover:underline"
                >
                  nikhilgupta@tapcraft.shop
                </a>{" "}
                with your order number and reason for return. We&rsquo;ll reply
                with instructions and a return address.
              </p>
              <p className="text-sm text-gray-500">
                Return address: 8 Uganda Street, Burwood, VIC 3125, AU
              </p>
              <p className="mt-3 text-sm font-medium text-gray-800">
                Returns sent without prior approval will not be accepted.
              </p>
            </section>

            {/* Damages & Issues */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                Damages &amp; Issues
              </h2>
              <p>
                Please inspect your order as soon as it arrives. If you receive
                a defective, damaged, or incorrect item, contact us immediately
                at{" "}
                <a
                  href="mailto:nikhilgupta@tapcraft.shop"
                  className="text-tapcraft-blue hover:underline"
                >
                  nikhilgupta@tapcraft.shop
                </a>{" "}
                so we can make it right.
              </p>
            </section>

            {/* Non-Returnable Items */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                Non-Returnable Items
              </h2>
              <p className="mb-3">
                The following items cannot be returned:
              </p>
              <ul className="list-disc pl-6 space-y-1.5 text-gray-600">
                <li>Custom or personalised products</li>
                <li>Sale items</li>
                <li>Gift cards</li>
                <li>Hazardous materials</li>
              </ul>
            </section>

            {/* Exchanges */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                Exchanges
              </h2>
              <p>
                We don&rsquo;t do direct exchanges. The quickest way to get the
                item you want is to return the original item, and once your
                return is accepted, place a new order.
              </p>
            </section>

            {/* EU Customers */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                European Union Customers
              </h2>
              <p>
                If you&rsquo;re in the EU, you have a 14-day cooling-off period
                from the date of receipt. The item must be in the same condition
                as when you received it &mdash; unused, with tags, and in its
                original packaging.
              </p>
            </section>

            {/* Refunds */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                Refunds
              </h2>
              <p className="mb-3">
                Once your return is received and inspected, we&rsquo;ll notify
                you of the approval or rejection of your refund. Approved
                refunds are processed to your original payment method within{" "}
                <strong>10 business days</strong>.
              </p>
              <p>
                If more than 15 business days have passed since your refund was
                approved and you haven&rsquo;t received it, please contact us at{" "}
                <a
                  href="mailto:nikhilgupta@tapcraft.shop"
                  className="text-tapcraft-blue hover:underline"
                >
                  nikhilgupta@tapcraft.shop
                </a>
                .
              </p>
            </section>

            {/* Contact CTA */}
            <section className="rounded-xl border border-gray-200 bg-gray-50 p-6 text-center">
              <h2 className="text-lg font-semibold text-gray-900 mb-2">
                Questions?
              </h2>
              <p className="text-sm text-gray-600 mb-4">
                We&rsquo;re here to help. Reach out and we&rsquo;ll get back to
                you as soon as possible.
              </p>
              <a
                href="mailto:nikhilgupta@tapcraft.shop"
                className="inline-flex items-center justify-center rounded-lg bg-tapcraft-blue px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-tapcraft-blue/90"
              >
                Contact Us
              </a>
              <p className="mt-3 text-xs text-gray-500">
                8 Uganda Street, Boronia 2, Burwood VIC 3125, AU
              </p>
            </section>
          </div>
        </article>
      </div>
    </>
  );
}
