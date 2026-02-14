"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Copy from "../Copy";

gsap.registerPlugin(ScrollTrigger);

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: "What is 3D + NFC printing?",
    answer:
      "3D + NFC printing combines custom 3D-printed physical products with embedded NFC (Near Field Communication) chips. This means your business card, product tag, or event badge is not only a beautifully crafted physical object, but also a smart device that can share digital content -- websites, contact info, portfolios, and more -- with a single tap from any smartphone.",
  },
  {
    question: "Why should I choose TapCraft over traditional printing?",
    answer:
      "Traditional printing gives you flat, static products. TapCraft creates three-dimensional, NFC-enabled pieces that are interactive, updatable, and unforgettable. Our products stand out physically and digitally, giving your brand a competitive edge. Plus, you can update the linked digital content anytime without reprinting.",
  },
  {
    question: "How long does production take?",
    answer:
      "Standard orders are produced and shipped within 5-7 business days. Rush orders can be completed in as fast as 2-3 business days. Larger bulk orders may require additional time, and we will provide an accurate timeline during the quoting process. We always keep you updated on progress.",
  },
  {
    question: "What industries do you serve?",
    answer:
      "We work across a wide range of industries including real estate, events and conferences, retail and e-commerce, hospitality, education, arts and design, and professional services. If your business can benefit from a smart, connected physical product, we can help.",
  },
  {
    question: "Can I update the NFC content after delivery?",
    answer:
      "Absolutely. One of the biggest advantages of NFC technology is that the linked content is fully updatable. Whether you want to change a URL, update your portfolio, or swap out event details, you can do it anytime through our management dashboard -- no need to reorder or reprint your products.",
  },
  {
    question: "How does pricing work?",
    answer:
      "Pricing depends on the product type, complexity of the 3D design, materials chosen, and order quantity. We offer competitive per-unit pricing that decreases with larger orders. Custom designs start from $35, and we provide transparent quotes upfront so there are never any surprises.",
  },
  {
    question: "Do you ship internationally?",
    answer:
      "Yes, we ship throughout Australia and internationally. Domestic orders typically arrive within 3-5 business days after production. International shipping timelines vary by destination but usually take 7-14 business days. All orders are carefully packaged to ensure your products arrive in perfect condition.",
  },
  {
    question: "What materials do you use?",
    answer:
      "We use a range of premium 3D printing materials including PLA (plant-based biodegradable plastic), PETG (durable and chemical-resistant), resin (for ultra-fine detail work), and specialty materials like wood-fill and metal-infused filaments. We select the best material for each project based on durability requirements, aesthetics, and intended use.",
  },
];

function FAQItemComponent({
  item,
  isOpen,
  onToggle,
}: {
  item: FAQItem;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const contentRef = useRef<HTMLDivElement>(null);
  const iconRef = useRef<SVGSVGElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!contentRef.current) return;

    if (isOpen) {
      gsap.set(contentRef.current, { display: "block", height: 0, opacity: 0 });
      gsap.to(contentRef.current, {
        height: "auto", opacity: 1, duration: 0.3, ease: "power2.inOut",
        onComplete: () => ScrollTrigger.refresh(),
      });
    } else {
      gsap.to(contentRef.current, {
        height: 0,
        opacity: 0,
        duration: 0.3,
        ease: "power2.inOut",
        onComplete: () => {
          if (contentRef.current) gsap.set(contentRef.current, { display: "none" });
          ScrollTrigger.refresh();
        },
      });
    }
  }, [isOpen]);

  useEffect(() => {
    if (iconRef.current) {
      gsap.to(iconRef.current, {
        rotation: isOpen ? 180 : 0,
        duration: 0.25,
        ease: "power2.out",
      });
    }
  }, [isOpen]);

  return (
    <div>
      <button
        ref={buttonRef}
        onClick={() => {
          // Capture button position before toggle so we can pin scroll
          const rect = buttonRef.current?.getBoundingClientRect();
          const offsetBefore = rect ? rect.top : 0;

          onToggle();

          // After React re-renders and GSAP animates, restore the button's
          // viewport position so the page pushes down, not up
          requestAnimationFrame(() => {
            if (buttonRef.current) {
              const rectAfter = buttonRef.current.getBoundingClientRect();
              const diff = rectAfter.top - offsetBefore;
              if (Math.abs(diff) > 1) {
                window.scrollBy({ top: diff, behavior: "instant" });
              }
            }
          });
        }}
        className="w-full flex items-center justify-between py-5 text-left cursor-pointer group"
        aria-expanded={isOpen}
      >
        <span className="text-base md:text-lg font-medium text-white pr-4 group-hover:text-tapcraft-blue transition-colors">
          {item.question}
        </span>
        <span className="flex-shrink-0 text-gray-500 w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-tapcraft-blue/10 transition-colors">
          <svg
            ref={iconRef}
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
          </svg>
        </span>
      </button>

      <div ref={contentRef} className="overflow-hidden" style={{ height: 0, display: "none" }}>
        <p className="pb-5 text-gray-400 leading-relaxed pr-12">
          {item.answer}
        </p>
      </div>
    </div>
  );
}

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (contentRef.current) {
        gsap.set(contentRef.current, { opacity: 0, y: 40 });
      }

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 80%",
        once: true,
        onEnter: () => {
          if (contentRef.current) {
            gsap.to(contentRef.current, { opacity: 1, y: 0, duration: 1.2, ease: "power2.out" });
          }
        },
      });
    },
    { scope: sectionRef }
  );

  const handleToggle = useCallback((index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  }, []);

  // Split FAQs into two columns
  const midpoint = Math.ceil(faqs.length / 2);
  const leftFaqs = faqs.slice(0, midpoint);
  const rightFaqs = faqs.slice(midpoint);

  return (
    <section ref={sectionRef} className="py-24 md:py-32 bg-black relative overflow-hidden">
      {/* Background decoration */}
      <div
        className="absolute bottom-0 left-0 w-150 h-150 pointer-events-none"
        style={{
          background: "radial-gradient(circle at 0% 100%, rgba(30,115,255,0.05) 0%, transparent 60%)",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div ref={contentRef}>
          {/* Two-column header */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            <div>
              <Copy animateOnScroll>
                <p className="text-tapcraft-blue text-sm font-semibold tracking-widest uppercase mb-4">
                  FAQ
                </p>
              </Copy>
              <Copy animateOnScroll delay={0.1}>
                <h2 className="text-4xl md:text-5xl lg:text-6xl text-white font-normal tracking-tight leading-[1.1]">
                  Got Questions?
                  <br />
                  We&apos;ve Got Answers.
                </h2>
              </Copy>
            </div>
            <div className="flex items-end">
              <Copy animateOnScroll delay={0.2}>
                <p className="text-gray-400 text-lg leading-relaxed max-w-md">
                  Everything you need to know about our 3D + NFC products, process,
                  and how to get started.
                </p>
              </Copy>
            </div>
          </div>

          {/* Two-column FAQ grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
            <div className="space-y-3">
              {leftFaqs.map((faq, index) => (
                <div key={index} className="rounded-2xl bg-white/[0.03] border border-white/10 px-6 md:px-8">
                  <FAQItemComponent
                    item={faq}
                    isOpen={openIndex === index}
                    onToggle={() => handleToggle(index)}
                  />
                </div>
              ))}
            </div>
            <div className="space-y-3">
              {rightFaqs.map((faq, index) => {
                const actualIndex = index + midpoint;
                return (
                  <div key={actualIndex} className="rounded-2xl bg-white/[0.03] border border-white/10 px-6 md:px-8">
                    <FAQItemComponent
                      item={faq}
                      isOpen={openIndex === actualIndex}
                      onToggle={() => handleToggle(actualIndex)}
                    />
                  </div>
                );
              })}
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="mt-12 text-center">
            <p className="text-gray-500 text-sm mb-4">
              Still have questions?
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 text-tapcraft-blue text-sm font-semibold hover:underline no-underline"
            >
              Get in touch with our team
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
