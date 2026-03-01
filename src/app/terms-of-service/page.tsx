import type { Metadata } from "next";
import { LightHeader } from "@/components/layout/LightHeader";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "Terms of Service for TapCraft Studio. Read the terms governing your use of our website and purchase of our products.",
  openGraph: {
    title: "Terms of Service | TapCraft Studio",
    description:
      "Terms of Service for TapCraft Studio — governing your use of our website and purchase of our products.",
    type: "website",
    locale: "en_AU",
    siteName: "TapCraft Studio",
  },
};

/* ------------------------------------------------------------------ */
/*  Plain-English summary box                                         */
/* ------------------------------------------------------------------ */
function Summary({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-lg border border-tapcraft-blue/20 bg-tapcraft-blue/5 px-4 py-3 mb-4">
      <p className="text-sm font-medium text-tapcraft-blue">{children}</p>
    </div>
  );
}

export default function TermsOfServicePage() {
  return (
    <>
      <LightHeader />

      <div className="bg-white py-16 sm:py-24">
        <article className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <header className="mb-12">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              Terms of Service
            </h1>
            <p className="mt-3 text-sm text-gray-500">
              Last updated: 1 March 2026
            </p>
          </header>

          <div className="space-y-10 text-base leading-relaxed text-gray-700">
            {/* Overview */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                Overview
              </h2>
              <Summary>
                In plain English: By using this website you agree to these terms.
                Please read them carefully.
              </Summary>
              <p className="mb-3">
                This website is operated by TapCraft Studio. Throughout the site,
                the terms &ldquo;we&rdquo;, &ldquo;us&rdquo; and
                &ldquo;our&rdquo; refer to TapCraft Studio. TapCraft Studio
                offers this website, including all information, tools, and
                services available from this site to you, the user, conditioned
                upon your acceptance of all terms, conditions, policies, and
                notices stated here.
              </p>
              <p className="mb-3">
                By visiting our site and/or purchasing something from us, you
                engage in our &ldquo;Service&rdquo; and agree to be bound by the
                following terms and conditions (&ldquo;Terms of Service&rdquo;,
                &ldquo;Terms&rdquo;), including those additional terms and
                conditions and policies referenced herein and/or available by
                hyperlink. These Terms apply to all users of the site, including
                without limitation users who are browsers, vendors, customers,
                merchants, and/or contributors of content.
              </p>
              <p className="mb-3">
                Please read these Terms of Service carefully before accessing or
                using our website. By accessing or using any part of the site,
                you agree to be bound by these Terms of Service. If you do not
                agree to all the terms and conditions of this agreement, then you
                may not access the website or use any services.
              </p>
              <p>
                Any new features or tools which are added to the current store
                shall also be subject to the Terms of Service. You can review
                the most current version of the Terms of Service at any time on
                this page. We reserve the right to update, change, or replace
                any part of these Terms of Service by posting updates and/or
                changes to our website. It is your responsibility to check this
                page periodically for changes.
              </p>
            </section>

            {/* Section 1 */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                1. Online Store Terms
              </h2>
              <Summary>
                In plain English: You must be 18 or older (or have parental
                consent) to use this site, and you can&rsquo;t use our products
                for anything illegal.
              </Summary>
              <p className="mb-3">
                By agreeing to these Terms of Service, you represent that you are
                at least the age of majority in your state or province of
                residence, or that you are the age of majority in your state or
                province of residence and you have given us your consent to allow
                any of your minor dependents to use this site.
              </p>
              <p className="mb-3">
                You may not use our products for any illegal or unauthorised
                purpose nor may you, in the use of the Service, violate any laws
                in your jurisdiction (including but not limited to copyright
                laws).
              </p>
              <p>
                You must not transmit any worms or viruses or any code of a
                destructive nature. A breach or violation of any of the Terms
                will result in an immediate termination of your Services.
              </p>
            </section>

            {/* Section 2 */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                2. General Conditions
              </h2>
              <Summary>
                In plain English: We can refuse service to anyone and you
                shouldn&rsquo;t rely on unencrypted transmissions being
                totally secure.
              </Summary>
              <p className="mb-3">
                We reserve the right to refuse service to anyone for any reason
                at any time. You understand that your content (not including
                credit card information) may be transferred unencrypted and
                involve (a) transmissions over various networks; and (b) changes
                to conform and adapt to technical requirements of connecting
                networks or devices. Credit card information is always encrypted
                during transfer over networks.
              </p>
              <p>
                You agree not to reproduce, duplicate, copy, sell, resell, or
                exploit any portion of the Service, use of the Service, or
                access to the Service or any contact on the website through
                which the service is provided, without express written
                permission by us.
              </p>
            </section>

            {/* Section 3 */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                3. Accuracy, Completeness &amp; Timeliness of Information
              </h2>
              <Summary>
                In plain English: We do our best to keep information accurate
                but can&rsquo;t guarantee it&rsquo;s always perfect or current.
              </Summary>
              <p className="mb-3">
                We are not responsible if information made available on this site
                is not accurate, complete, or current. The material on this site
                is provided for general information only and should not be relied
                upon or used as the sole basis for making decisions without
                consulting primary, more accurate, more complete, or more timely
                sources of information. Any reliance on the material on this
                site is at your own risk.
              </p>
              <p>
                This site may contain certain historical information. Historical
                information, necessarily, is not current and is provided for your
                reference only. We reserve the right to modify the contents of
                this site at any time, but we have no obligation to update any
                information on our site. You agree that it is your responsibility
                to monitor changes to our site.
              </p>
            </section>

            {/* Section 4 */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                4. Modifications to the Service &amp; Prices
              </h2>
              <Summary>
                In plain English: Prices and products can change at any time
                without notice.
              </Summary>
              <p className="mb-3">
                Prices for our products are subject to change without notice. We
                reserve the right at any time to modify or discontinue the
                Service (or any part or content thereof) without notice at any
                time.
              </p>
              <p>
                We shall not be liable to you or to any third-party for any
                modification, price change, suspension, or discontinuance of the
                Service.
              </p>
            </section>

            {/* Section 5 */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                5. Products or Services
              </h2>
              <Summary>
                In plain English: Some products are only available online and we
                try to show colours accurately but can&rsquo;t guarantee your
                screen will match exactly.
              </Summary>
              <p className="mb-3">
                Certain products or services may be available exclusively online
                through the website. These products or services may have limited
                quantities and are subject to return or exchange only according
                to our Refund Policy.
              </p>
              <p className="mb-3">
                We have made every effort to display as accurately as possible
                the colours and images of our products that appear at the store.
                We cannot guarantee that your computer monitor&rsquo;s display
                of any colour will be accurate.
              </p>
              <p className="mb-3">
                We reserve the right, but are not obligated, to limit the sales
                of our products or services to any person, geographic region, or
                jurisdiction. We may exercise this right on a case-by-case
                basis.
              </p>
              <p className="mb-3">
                We reserve the right to limit the quantities of any products or
                services that we offer. All descriptions of products or product
                pricing are subject to change at any time without notice, at our
                sole discretion.
              </p>
              <p>
                We reserve the right to discontinue any product at any time. Any
                offer for any product or service made on this site is void where
                prohibited.
              </p>
            </section>

            {/* Section 6 */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                6. Accuracy of Billing &amp; Account Information
              </h2>
              <Summary>
                In plain English: Please give us accurate billing info, and we
                may cancel orders that look suspicious.
              </Summary>
              <p className="mb-3">
                We reserve the right to refuse any order you place with us. We
                may, in our sole discretion, limit or cancel quantities purchased
                per person, per household, or per order. These restrictions may
                include orders placed by or under the same customer account, the
                same credit card, and/or orders that use the same billing and/or
                shipping address.
              </p>
              <p className="mb-3">
                In the event that we make a change to or cancel an order, we may
                attempt to notify you by contacting the email and/or billing
                address/phone number provided at the time the order was made.
              </p>
              <p>
                You agree to provide current, complete, and accurate purchase
                and account information for all purchases made at our store. You
                agree to promptly update your account and other information,
                including your email address, credit card numbers, and expiration
                dates, so that we can complete your transactions and contact you
                as needed.
              </p>
            </section>

            {/* Section 7 */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                7. Optional Tools
              </h2>
              <Summary>
                In plain English: If we provide third-party tools, they&rsquo;re
                &ldquo;as-is&rdquo; and at your own risk.
              </Summary>
              <p className="mb-3">
                We may provide you with access to third-party tools over which
                we neither monitor nor have any control nor input. You
                acknowledge and agree that we provide access to such tools
                &ldquo;as is&rdquo; and &ldquo;as available&rdquo; without any
                warranties, representations, or conditions of any kind and
                without any endorsement.
              </p>
              <p>
                We shall have no liability whatsoever arising from or relating to
                your use of optional third-party tools. Any use by you of
                optional tools offered through the site is entirely at your own
                risk and discretion and you should ensure that you are familiar
                with and approve of the terms on which tools are provided by the
                relevant third-party provider(s).
              </p>
            </section>

            {/* Section 8 */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                8. Third-Party Links
              </h2>
              <Summary>
                In plain English: We&rsquo;re not responsible for third-party
                websites we link to.
              </Summary>
              <p className="mb-3">
                Certain content, products, and services available via our
                Service may include materials from third parties. Third-party
                links on this site may direct you to third-party websites that
                are not affiliated with us.
              </p>
              <p>
                We are not responsible for examining or evaluating the content or
                accuracy and we do not warrant and will not have any liability or
                responsibility for any third-party materials or websites, or for
                any other materials, products, or services of third parties. We
                are not liable for any harm or damages related to the purchase or
                use of goods, services, resources, content, or any other
                transactions made in connection with any third-party websites.
                Please review carefully the third-party&rsquo;s policies and
                practices and make sure you understand them before you engage in
                any transaction.
              </p>
            </section>

            {/* Section 9 — Shopify relationship — UNMODIFIED */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                9. User Comments, Feedback &amp; Other Submissions
              </h2>
              <Summary>
                In plain English: If you send us ideas or feedback, we may use
                them without restriction.
              </Summary>
              <p className="mb-3">
                If, at our request, you send certain specific submissions (for
                example contest entries) or without a request from us you send
                creative ideas, suggestions, proposals, plans, or other
                materials, whether online, by email, by postal mail, or
                otherwise (collectively, &ldquo;comments&rdquo;), you agree that
                we may, at any time, without restriction, edit, copy, publish,
                distribute, translate, and otherwise use in any medium any
                comments that you forward to us. We are and shall be under no
                obligation (1) to maintain any comments in confidence; (2) to
                pay compensation for any comments; or (3) to respond to any
                comments.
              </p>
              <p className="mb-3">
                We may, but have no obligation to, monitor, edit, or remove
                content that we determine in our sole discretion are unlawful,
                offensive, threatening, libellous, defamatory, pornographic,
                obscene, or otherwise objectionable or violates any party&rsquo;s
                intellectual property or these Terms of Service.
              </p>
              <p>
                You agree that your comments will not violate any right of any
                third party, including copyright, trademark, privacy,
                personality, or other personal or proprietary right. You further
                agree that your comments will not contain libellous or otherwise
                unlawful, abusive, or obscene material, or contain any computer
                virus or other malware that could in any way affect the
                operation of the Service or any related website. You may not use
                a false email address, pretend to be someone you are not, or
                otherwise mislead us or third parties as to the origin of any
                comments. You are solely responsible for any comments you make
                and their accuracy. We take no responsibility and assume no
                liability for any comments posted by you or any third party.
              </p>
            </section>

            {/* Section 10 */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                10. Personal Information
              </h2>
              <Summary>
                In plain English: Your personal data is handled according to our
                Privacy Policy.
              </Summary>
              <p>
                Your submission of personal information through the store is
                governed by our Privacy Policy. Please view our{" "}
                <a
                  href="/privacy-policy"
                  className="text-tapcraft-blue hover:underline"
                >
                  Privacy Policy
                </a>
                .
              </p>
            </section>

            {/* Section 11 */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                11. Errors, Inaccuracies &amp; Omissions
              </h2>
              <Summary>
                In plain English: If we make a mistake with product info or
                pricing, we can correct it &mdash; even after your order.
              </Summary>
              <p className="mb-3">
                Occasionally there may be information on our site or in the
                Service that contains typographical errors, inaccuracies, or
                omissions that may relate to product descriptions, pricing,
                promotions, offers, product shipping charges, transit times, and
                availability.
              </p>
              <p>
                We reserve the right to correct any errors, inaccuracies, or
                omissions, and to change or update information or cancel orders
                if any information in the Service or on any related website is
                inaccurate at any time without prior notice (including after you
                have submitted your order).
              </p>
            </section>

            {/* Section 12 */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                12. Prohibited Uses
              </h2>
              <Summary>
                In plain English: Don&rsquo;t use our site for anything illegal,
                harmful, or abusive.
              </Summary>
              <p className="mb-3">
                In addition to other prohibitions as set forth in the Terms of
                Service, you are prohibited from using the site or its content:
              </p>
              <ul className="list-disc pl-6 space-y-1.5 text-gray-600 mb-3">
                <li>For any unlawful purpose</li>
                <li>
                  To solicit others to perform or participate in any unlawful
                  acts
                </li>
                <li>
                  To violate any international, federal, provincial, or state
                  regulations, rules, laws, or local ordinances
                </li>
                <li>
                  To infringe upon or violate our intellectual property rights or
                  the intellectual property rights of others
                </li>
                <li>
                  To harass, abuse, insult, harm, defame, slander, disparage,
                  intimidate, or discriminate
                </li>
                <li>To submit false or misleading information</li>
                <li>
                  To upload or transmit viruses or any other type of malicious
                  code
                </li>
                <li>To collect or track the personal information of others</li>
                <li>To spam, phish, pharm, pretext, spider, crawl, or scrape</li>
                <li>For any obscene or immoral purpose</li>
                <li>
                  To interfere with or circumvent the security features of the
                  Service
                </li>
              </ul>
              <p>
                We reserve the right to terminate your use of the Service or any
                related website for violating any of the prohibited uses.
              </p>
            </section>

            {/* Section 13 */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                13. Disclaimer of Warranties / Limitation of Liability
              </h2>
              <Summary>
                In plain English: We provide the service &ldquo;as is&rdquo;
                without guarantees, and our liability is limited.
              </Summary>
              <p className="mb-3">
                We do not guarantee, represent, or warrant that your use of our
                service will be uninterrupted, timely, secure, or error-free. We
                do not warrant that the results that may be obtained from the use
                of the service will be accurate or reliable.
              </p>
              <p className="mb-3">
                You agree that from time to time we may remove the service for
                indefinite periods of time or cancel the service at any time,
                without notice to you. You expressly agree that your use of, or
                inability to use, the service is at your sole risk.
              </p>
              <p className="mb-3">
                The service and all products and services delivered to you
                through the service are (except as expressly stated by us)
                provided &ldquo;as is&rdquo; and &ldquo;as available&rdquo; for
                your use, without any representation, warranties, or conditions
                of any kind, either express or implied.
              </p>
              <p>
                In no case shall TapCraft Studio, our directors, officers,
                employees, affiliates, agents, contractors, interns, suppliers,
                service providers, or licensors be liable for any injury, loss,
                claim, or any direct, indirect, incidental, punitive, special, or
                consequential damages of any kind, including, without limitation,
                lost profits, lost revenue, lost savings, loss of data,
                replacement costs, or any similar damages, whether based in
                contract, tort (including negligence), strict liability, or
                otherwise, arising from your use of any of the service or any
                products procured using the service, or for any other claim
                related in any way to your use of the service or any product.
              </p>
            </section>

            {/* Section 14 */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                14. Indemnification
              </h2>
              <Summary>
                In plain English: If your actions cause us legal trouble, you
                agree to cover our costs.
              </Summary>
              <p>
                You agree to indemnify, defend, and hold harmless TapCraft
                Studio and our parent, subsidiaries, affiliates, partners,
                officers, directors, agents, contractors, licensors, service
                providers, subcontractors, suppliers, interns, and employees,
                harmless from any claim or demand, including reasonable
                attorneys&rsquo; fees, made by any third-party due to or arising
                out of your breach of these Terms of Service or the documents
                they incorporate by reference, or your violation of any law or
                the rights of a third-party.
              </p>
            </section>

            {/* Section 15 */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                15. Severability
              </h2>
              <Summary>
                In plain English: If one part of these terms is invalid, the
                rest still applies.
              </Summary>
              <p>
                In the event that any provision of these Terms of Service is
                determined to be unlawful, void, or unenforceable, such
                provision shall nonetheless be enforceable to the fullest extent
                permitted by applicable law, and the unenforceable portion shall
                be deemed to be severed from these Terms of Service. Such
                determination shall not affect the validity and enforceability of
                any other remaining provisions.
              </p>
            </section>

            {/* Section 16 */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                16. Termination
              </h2>
              <Summary>
                In plain English: Either party can end this agreement at any
                time. Your obligations survive termination.
              </Summary>
              <p className="mb-3">
                The obligations and liabilities of the parties incurred prior to
                the termination date shall survive the termination of this
                agreement for all purposes.
              </p>
              <p>
                These Terms of Service are effective unless and until terminated
                by either you or us. You may terminate these Terms of Service at
                any time by notifying us that you no longer wish to use our
                Services, or when you cease using our site. If in our sole
                judgement you fail, or we suspect that you have failed, to comply
                with any term or provision of these Terms of Service, we also
                may terminate this agreement at any time without notice and you
                will remain liable for all amounts due up to and including the
                date of termination.
              </p>
            </section>

            {/* Section 17 */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                17. Entire Agreement
              </h2>
              <Summary>
                In plain English: These terms (plus our policies) are the whole
                agreement between us.
              </Summary>
              <p>
                The failure of us to exercise or enforce any right or provision
                of these Terms of Service shall not constitute a waiver of such
                right or provision. These Terms of Service and any policies or
                operating rules posted by us on this site or in respect to the
                Service constitutes the entire agreement and understanding
                between you and us and govern your use of the Service,
                superseding any prior or contemporaneous agreements,
                communications, and proposals, whether oral or written, between
                you and us.
              </p>
            </section>

            {/* Section 18 */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                18. Governing Law
              </h2>
              <Summary>
                In plain English: These terms are governed by Australian law.
              </Summary>
              <p>
                These Terms of Service and any separate agreements whereby we
                provide you Services shall be governed by and construed in
                accordance with the laws of Australia.
              </p>
            </section>

            {/* Section 19 */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                19. Changes to Terms of Service
              </h2>
              <Summary>
                In plain English: We can update these terms at any time; the
                latest version is always on this page.
              </Summary>
              <p>
                You can review the most current version of the Terms of Service
                at any time at this page. We reserve the right, at our sole
                discretion, to update, change, or replace any part of these
                Terms of Service by posting updates and changes to our website.
                It is your responsibility to check our website periodically for
                changes. Your continued use of or access to our website or the
                Service following the posting of any changes to these Terms of
                Service constitutes acceptance of those changes.
              </p>
            </section>

            {/* Section 20 */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                20. Contact Information
              </h2>
              <Summary>
                In plain English: Here&rsquo;s how to reach us with questions.
              </Summary>
              <p>
                Questions about the Terms of Service should be sent to us at{" "}
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
                If anything in these terms is unclear, don&rsquo;t hesitate to
                reach out.
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
