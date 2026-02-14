"use client";

import { useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Copy from "@/components/Copy";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    number: "01",
    title: "Design",
    description:
      "Share your vision with our team. We create a custom 3D model tailored to your brand, product, or event needs.",
    detail: "Consultation + 3D Modelling",
  },
  {
    number: "02",
    title: "Print",
    description:
      "Your design is precision-printed using premium materials in our Melbourne studio with state-of-the-art 3D printers.",
    detail: "PLA, PETG, Resin & more",
  },
  {
    number: "03",
    title: "Integrate",
    description:
      "We embed and program NFC chips into your product, linking them to your chosen digital content or platform.",
    detail: "NFC Programming + Testing",
  },
  {
    number: "04",
    title: "Deliver",
    description:
      "Quality-checked and carefully packaged, your smart products are delivered ready to impress and connect.",
    detail: "AU & International Shipping",
  },
];

export function ProcessOverview() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (lineRef.current) gsap.set(lineRef.current, { scaleY: 0 });
      if (timelineRef.current) {
        gsap.set(timelineRef.current.children, { opacity: 0, x: -30 });
      }
      if (ctaRef.current) gsap.set(ctaRef.current, { opacity: 0, y: 20 });

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 70%",
        once: true,
        onEnter: () => {
          if (lineRef.current) {
            gsap.to(lineRef.current, { scaleY: 1, duration: 1.5, ease: "power2.out" });
          }
          if (timelineRef.current) {
            gsap.to(timelineRef.current.children, {
              opacity: 1, x: 0, duration: 1.2, ease: "power2.out", stagger: 0.2, delay: 0.2,
            });
          }
          if (ctaRef.current) {
            gsap.to(ctaRef.current, { opacity: 1, y: 0, duration: 1, ease: "power2.out", delay: 1 });
          }
        },
      });
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className="py-24 md:py-32 bg-tapcraft-light relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20">
          <div>
            <Copy animateOnScroll>
              <p className="text-tapcraft-blue text-sm font-semibold tracking-widest uppercase mb-4">
                How It Works
              </p>
            </Copy>
            <Copy animateOnScroll delay={0.1}>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-normal text-tapcraft-dark tracking-tight leading-[1.1]">
                From Idea to
                <br />
                Smart Product
              </h2>
            </Copy>
          </div>
          <div className="flex items-end">
            <Copy animateOnScroll delay={0.2}>
              <p className="text-tapcraft-gray text-lg leading-relaxed max-w-md">
                Four simple steps to transform your concept into a beautifully
                crafted, NFC-enabled physical product.
              </p>
            </Copy>
          </div>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div
            ref={lineRef}
            className="absolute left-[23px] md:left-1/2 md:-translate-x-px top-0 bottom-0 w-0.5 bg-tapcraft-blue/20 origin-top hidden sm:block"
          />

          <div ref={timelineRef} className="space-y-8 md:space-y-0">
            {steps.map((step, i) => {
              const isEven = i % 2 === 0;
              return (
                <div
                  key={step.number}
                  className={`relative md:grid md:grid-cols-2 md:gap-12 ${
                    i > 0 ? "md:mt-[-40px]" : ""
                  }`}
                  style={{ paddingTop: i > 0 ? "2rem" : 0 }}
                >
                  {/* Timeline dot */}
                  <div className="absolute left-[15px] md:left-1/2 md:-translate-x-1/2 top-0 md:top-8 w-[18px] h-[18px] rounded-full bg-tapcraft-light border-[3px] border-tapcraft-blue z-10 hidden sm:block" />

                  {/* Content - alternating sides */}
                  <div
                    className={`${isEven ? "md:pr-16 md:text-right" : "md:col-start-2 md:pl-16"} pl-14 sm:pl-0`}
                  >
                    <div
                      className="group bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg border border-gray-100 hover:border-tapcraft-blue/20 transition-[border-color,box-shadow] duration-300"
                    >
                      <div className={`flex items-center gap-3 mb-4 ${isEven ? "md:justify-end" : ""}`}>
                        <span className="text-xs font-bold tracking-widest text-tapcraft-blue bg-tapcraft-blue/10 px-3 py-1.5 rounded-full">
                          STEP {step.number}
                        </span>
                        <span className="text-xs text-tapcraft-gray">{step.detail}</span>
                      </div>

                      <h3 className="text-2xl md:text-3xl font-bold text-tapcraft-dark mb-3 group-hover:text-tapcraft-blue transition-colors duration-300">
                        {step.title}
                      </h3>

                      <p className="text-tapcraft-gray leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>

                  {/* Empty grid cell for alternating layout */}
                  {isEven ? <div className="hidden md:block" /> : null}
                </div>
              );
            })}
          </div>
        </div>

        {/* CTA */}
        <div ref={ctaRef} className="mt-20 text-center">
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 bg-tapcraft-dark rounded-2xl px-8 py-6">
            <p className="text-gray-400 text-sm">
              Ready to create something{" "}
              <span className="text-white font-semibold">extraordinary</span>?
            </p>
            <Link
              href="/customize"
              className="inline-flex items-center gap-2.5 h-11 px-7 rounded-full bg-tapcraft-blue text-white text-sm font-semibold hover:bg-blue-600 transition-colors no-underline shadow-lg shadow-tapcraft-blue/25"
            >
              Start Your Project
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
