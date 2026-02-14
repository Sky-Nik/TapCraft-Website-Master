"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Copy from "../Copy";
import { Cpu, Wifi, Box, Sparkles } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    icon: <Box className="w-7 h-7" />,
    title: "3D Printed",
    description: "Premium materials, precision crafted in our Melbourne studio with state-of-the-art printers.",
    accent: "#1E73FF",
    span: "md:col-span-1 md:row-span-2",
  },
  {
    icon: <Wifi className="w-7 h-7" />,
    title: "NFC Enabled",
    description: "Embedded smart chips that share your digital content with a single tap from any smartphone.",
    accent: "#06B6D4",
    span: "md:col-span-1 md:row-span-1",
  },
  {
    icon: <Sparkles className="w-7 h-7" />,
    title: "Fully Custom",
    description: "Every product is designed to your specifications. Your brand, your style, your vision.",
    accent: "#8B5CF6",
    span: "md:col-span-1 md:row-span-1",
  },
  {
    icon: <Cpu className="w-7 h-7" />,
    title: "Updatable",
    description: "Change linked content anytime through our dashboard. No reprinting needed, ever.",
    accent: "#10B981",
    span: "md:col-span-1 md:row-span-1",
  },
];

export function ValueProposition() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (gridRef.current) {
        const cards = gridRef.current.children;
        gsap.set(cards, { opacity: 0, y: 40 });

        ScrollTrigger.create({
          trigger: gridRef.current,
          start: "top 80%",
          once: true,
          onEnter: () => {
            gsap.to(cards, {
              opacity: 1, y: 0, duration: 1.2, ease: "power2.out", stagger: 0.15,
            });
          },
        });
      }
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className="py-24 md:py-32 bg-black relative overflow-hidden">
      {/* Subtle gradient orb */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(30,115,255,0.06) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section header */}
        <div className="max-w-3xl mb-16">
          <Copy animateOnScroll>
            <p className="text-tapcraft-blue text-sm font-semibold tracking-widest uppercase mb-4">
              Why TapCraft
            </p>
          </Copy>
          <Copy animateOnScroll delay={0.1}>
            <h2 className="text-4xl md:text-5xl lg:text-6xl text-white font-normal tracking-tight leading-[1.1]">
              Where Craft Meets
              <br />
              Smart Technology
            </h2>
          </Copy>
          <Copy animateOnScroll delay={0.2}>
            <p className="text-gray-400 text-lg leading-relaxed max-w-xl mt-6">
              Every product we create combines premium 3D printing with intelligent NFC technology, delivering experiences that are both beautiful and functional.
            </p>
          </Copy>
        </div>

        {/* Bento grid - asymmetric layout like reference */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-4 md:auto-rows-[240px]"
        >
          {/* Card 1 - Tall left card spanning 2 rows */}
          <div
            className="group relative md:row-span-2 rounded-3xl border border-white/10 p-8 overflow-hidden transition-[border-color] duration-500 hover:border-white/20 cursor-pointer"
            style={{ backgroundColor: "rgba(30,115,255,0.08)" }}
          >
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
              style={{ background: `radial-gradient(circle at 50% 100%, ${features[0].accent}22, transparent 70%)` }}
            />
            <div className="relative h-full flex flex-col">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-[transform,box-shadow] duration-300 group-hover:scale-110 group-hover:shadow-lg"
                style={{ backgroundColor: `${features[0].accent}20`, color: features[0].accent }}
              >
                {features[0].icon}
              </div>
              <h3 className="text-white text-2xl font-semibold mb-3 group-hover:text-tapcraft-blue transition-colors duration-300">
                {features[0].title}
              </h3>
              <p className="text-gray-400 leading-relaxed text-base">
                {features[0].description}
              </p>
              <div className="mt-auto pt-6">
                <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:border-tapcraft-blue/50 group-hover:bg-tapcraft-blue/10 transition-[border-color,background-color] duration-300">
                  <svg className="w-4 h-4 text-gray-500 group-hover:text-tapcraft-blue group-hover:translate-x-0.5 transition-[color,transform] duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2 - Top middle */}
          <div
            className="group relative rounded-3xl border border-white/10 p-8 overflow-hidden transition-[border-color] duration-500 hover:border-white/20 cursor-pointer"
            style={{ backgroundColor: "rgba(6,182,212,0.08)" }}
          >
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
              style={{ background: `radial-gradient(circle at 50% 100%, ${features[1].accent}22, transparent 70%)` }}
            />
            <div className="relative">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5 transition-[transform,box-shadow] duration-300 group-hover:scale-110 group-hover:shadow-lg"
                style={{ backgroundColor: `${features[1].accent}20`, color: features[1].accent }}
              >
                {features[1].icon}
              </div>
              <h3 className="text-white text-xl font-semibold mb-2 group-hover:text-cyan-400 transition-colors duration-300">
                {features[1].title}
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                {features[1].description}
              </p>
            </div>
          </div>

          {/* Card 3 - Top right */}
          <div
            className="group relative rounded-3xl border border-white/10 p-8 overflow-hidden transition-[border-color] duration-500 hover:border-white/20 cursor-pointer"
            style={{ backgroundColor: "rgba(139,92,246,0.08)" }}
          >
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
              style={{ background: `radial-gradient(circle at 50% 100%, ${features[2].accent}22, transparent 70%)` }}
            />
            <div className="relative">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5 transition-[transform,box-shadow] duration-300 group-hover:scale-110 group-hover:shadow-lg"
                style={{ backgroundColor: `${features[2].accent}20`, color: features[2].accent }}
              >
                {features[2].icon}
              </div>
              <h3 className="text-white text-xl font-semibold mb-2 group-hover:text-violet-400 transition-colors duration-300">
                {features[2].title}
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                {features[2].description}
              </p>
            </div>
          </div>

          {/* Card 4 - Bottom right, spans 2 columns */}
          <div
            className="group relative md:col-span-2 rounded-3xl border border-white/10 p-8 overflow-hidden transition-[border-color] duration-500 hover:border-white/20 cursor-pointer"
            style={{ backgroundColor: "rgba(16,185,129,0.08)" }}
          >
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
              style={{ background: `radial-gradient(circle at 80% 50%, ${features[3].accent}22, transparent 70%)` }}
            />
            <div className="relative flex flex-col md:flex-row md:items-center gap-6">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 transition-[transform,box-shadow] duration-300 group-hover:scale-110 group-hover:shadow-lg"
                style={{ backgroundColor: `${features[3].accent}20`, color: features[3].accent }}
              >
                {features[3].icon}
              </div>
              <div>
                <h3 className="text-white text-xl font-semibold mb-2 group-hover:text-emerald-400 transition-colors duration-300">
                  {features[3].title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed max-w-md">
                  {features[3].description}
                </p>
              </div>
              <div className="md:ml-auto">
                <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:border-emerald-500/50 group-hover:bg-emerald-500/10 transition-[border-color,background-color] duration-300">
                  <svg className="w-4 h-4 text-gray-500 group-hover:text-emerald-400 group-hover:translate-x-0.5 transition-[color,transform] duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
