"use client";

import Link from "next/link";
import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ImagePlaceholder } from "@/components/shared/ImagePlaceholder";
import { Button } from "@/components/shared/Button";

gsap.registerPlugin(ScrollTrigger);

const highlights = [
  {
    title: "Australian-Made Quality",
    description:
      "Every product is designed and manufactured right here in Melbourne, ensuring premium quality and fast turnaround.",
  },
  {
    title: "On-Demand Production",
    description:
      "No mass production, no warehouse waste. Each order is printed fresh, exactly when you need it.",
  },
  {
    title: "Zero-Waste Approach",
    description:
      "Our 3D printing process uses only the material needed, with recyclable supports and minimal environmental footprint.",
  },
  {
    title: "Local Expert Team",
    description:
      "Work directly with our Melbourne-based designers and engineers who understand your market and your customers.",
  },
];

export function MelbourneMade() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!contentRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 0.7, ease: "power2.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 80%", once: true },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-20 md:py-28 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div
          ref={contentRef}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center"
          style={{ opacity: 0 }}
        >
          {/* Left: Image */}
          <div className="order-2 lg:order-1">
            <ImagePlaceholder
              width={1200}
              height={800}
              name="TapCraft Melbourne Studio"
              type="image"
              className="w-full rounded-2xl shadow-lg"
            />
          </div>

          {/* Right: Content */}
          <div className="order-1 lg:order-2">
            <span className="inline-block text-sm font-semibold text-tapcraft-accent uppercase tracking-wider mb-3">
              Proudly Local
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-tapcraft-dark leading-tight">
              Crafted in Melbourne
            </h2>
            <p className="mt-4 text-tapcraft-gray leading-relaxed text-lg">
              TapCraft Studio is proudly based in Melbourne, Australia. We
              believe in the power of local manufacturing -- supporting our
              community while delivering world-class products that connect the
              physical and digital worlds.
            </p>

            <div className="mt-8 space-y-5">
              {highlights.map((item) => (
                <div key={item.title} className="flex gap-4">
                  <div className="flex-shrink-0 w-6 h-6 mt-0.5 rounded-full bg-tapcraft-blue/10 flex items-center justify-center">
                    <svg
                      className="w-3.5 h-3.5 text-tapcraft-blue"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={3}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-tapcraft-dark">{item.title}</h3>
                    <p className="text-sm text-tapcraft-gray mt-0.5">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10">
              <Button variant="primary" size="lg" style={{ color: 'white' }} asChild>
                <Link href="/about">About Our Process</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
