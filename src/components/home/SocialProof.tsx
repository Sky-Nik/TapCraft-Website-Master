"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Copy from "../Copy";

gsap.registerPlugin(ScrollTrigger);

interface Testimonial {
  name: string;
  company: string;
  role: string;
  quote: string;
  initials: string;
  highlight: string;
}

const testimonials: Testimonial[] = [
  {
    name: "Sarah Mitchell",
    company: "Prestige Property Group",
    role: "Senior Real Estate Agent",
    quote:
      "The NFC-enabled property tags from TapCraft completely changed how we run open homes. Prospective buyers just tap their phone to see the full listing, floor plans, and inspection times.",
    initials: "SM",
    highlight: "40% increase in follow-up enquiries",
  },
  {
    name: "James Hartley",
    company: "Melbourne Fest Co.",
    role: "Event Director",
    quote:
      "We ordered 500 custom 3D-printed NFC badges for our annual festival. The quality was outstanding, and having attendees tap for schedules eliminated the need for printed programs entirely.",
    initials: "JH",
    highlight: "500 NFC badges for one event",
  },
  {
    name: "Olivia Chen",
    company: "Aura Collective",
    role: "Brand Director",
    quote:
      "TapCraft helped us create smart product tags that link directly to our sustainability story and care instructions. Our customers love the interactive experience.",
    initials: "OC",
    highlight: "Elevated packaging experience",
  },
];

const stats = [
  { value: "4.9", label: "Average rating", suffix: "/5" },
  { value: "100", label: "Businesses served", suffix: "+" },
  { value: "10k", label: "Products delivered", suffix: "+" },
];

function StarRating() {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          className="w-4 h-4 text-yellow-400"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export function SocialProof() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (cardsRef.current) {
        gsap.set(cardsRef.current.children, { opacity: 0, y: 40 });
      }
      if (statsRef.current) {
        gsap.set(statsRef.current.children, { opacity: 0, y: 20 });
      }

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 75%",
        once: true,
        onEnter: () => {
          if (cardsRef.current) {
            gsap.to(cardsRef.current.children, {
              opacity: 1, y: 0, duration: 1.2, ease: "power2.out", stagger: 0.15,
            });
          }
          if (statsRef.current) {
            gsap.to(statsRef.current.children, {
              opacity: 1, y: 0, duration: 1, ease: "power2.out", stagger: 0.1, delay: 0.5,
            });
          }
        },
      });
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className="py-24 md:py-32 bg-tapcraft-dark relative overflow-hidden">
      {/* Background accents */}
      <div
        className="absolute top-0 right-0 w-[600px] h-[600px] pointer-events-none"
        style={{
          background: "radial-gradient(circle at 100% 0%, rgba(30,115,255,0.08) 0%, transparent 60%)",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header with stats inline */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-16">
          <div className="max-w-2xl">
            <Copy animateOnScroll>
              <p className="text-tapcraft-blue text-sm font-semibold tracking-widest uppercase mb-4">
                Social Proof
              </p>
            </Copy>
            <Copy animateOnScroll delay={0.1}>
              <h2 className="text-4xl md:text-5xl lg:text-6xl text-white font-normal tracking-tight leading-[1.1]">
                Trusted by Melbourne&apos;s
                <br />
                Best Businesses
              </h2>
            </Copy>
          </div>

          {/* Stats row */}
          <div ref={statsRef} className="flex gap-8 lg:gap-12">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center lg:text-right">
                <p className="text-3xl md:text-4xl font-bold text-white">
                  {stat.value}
                  <span className="text-tapcraft-blue">{stat.suffix}</span>
                </p>
                <p className="text-gray-500 text-sm mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonial cards - masonry-like with varying heights */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-5 items-start"
        >
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.name}
              className="group relative rounded-2xl border border-white/10 bg-white/[0.04] p-7 hover:border-tapcraft-blue/30 transition-[border-color] duration-500"
            >
              {/* Highlight badge */}
              <div className="inline-flex items-center gap-2 bg-tapcraft-blue/10 rounded-full px-3 py-1.5 mb-5">
                <div className="w-1.5 h-1.5 rounded-full bg-tapcraft-blue" />
                <span className="text-tapcraft-blue text-xs font-semibold">
                  {testimonial.highlight}
                </span>
              </div>

              <StarRating />

              <blockquote className="mt-5 text-gray-300 leading-relaxed text-[15px]">
                &ldquo;{testimonial.quote}&rdquo;
              </blockquote>

              {/* Author */}
              <div className="mt-7 flex items-center gap-3 pt-5 border-t border-white/10">
                <div className="w-10 h-10 rounded-full bg-tapcraft-blue/20 text-tapcraft-blue flex items-center justify-center text-sm font-bold">
                  {testimonial.initials}
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">
                    {testimonial.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    {testimonial.role}, {testimonial.company}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
