"use client";

import { useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ArrowRight, Paintbrush } from "lucide-react";
import LightRays from "@/components/LightRays";
import Copy from "@/components/Copy";
import GradientText from "@/components/GradientText";

gsap.registerPlugin(ScrollTrigger);

const products = [
  { id: 1, name: "Book Series", desc: "Your favorite book covers, reimagined as keychains", image: "/dummy.jpg" },
  { id: 2, name: "Social Media Series", desc: "Showcase your digital presence physically", image: "/dummy.jpg" },
  { id: 3, name: "Custom Icon Series", desc: "Unique icons crafted just for you", image: "/dummy.jpg" },
];

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const videoContainerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Badge fade in
      if (badgeRef.current) {
        gsap.set(badgeRef.current, { opacity: 0, y: -20 });
        gsap.to(badgeRef.current, {
          opacity: 1, y: 0, duration: 1, ease: "power2.out", delay: 0.1,
        });
      }

      // Buttons fade in
      if (buttonsRef.current) {
        gsap.set(buttonsRef.current, { opacity: 0, y: 30 });
        gsap.to(buttonsRef.current, {
          opacity: 1, y: 0, duration: 1, ease: "power2.out", delay: 0.9,
        });
      }

      // Video container fade in (no scale)
      if (videoContainerRef.current) {
        gsap.set(videoContainerRef.current, { opacity: 0, y: 40 });
        gsap.to(videoContainerRef.current, {
          opacity: 1, y: 0, duration: 1.2, ease: "power2.out", delay: 1.2,
        });
      }

      // Product cards fade in on scroll (no scale)
      if (cardsRef.current) {
        const cards = cardsRef.current.children;
        gsap.set(cards, { opacity: 0, y: 40 });

        ScrollTrigger.create({
          trigger: cardsRef.current,
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

  // Video playback control: only play when 80% visible
  useEffect(() => {
    const video = videoRef.current;
    const container = videoContainerRef.current;
    if (!video || !container) return;

    video.pause();

    const trigger = ScrollTrigger.create({
      trigger: container,
      start: "top 20%",
      end: "bottom 20%",
      onEnter: () => video.play(),
      onLeave: () => video.pause(),
      onEnterBack: () => video.play(),
      onLeaveBack: () => video.pause(),
    });

    return () => trigger.kill();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-black"
    >
      {/* Dot pattern background */}
      <div
        className="absolute inset-0 z-0 opacity-15"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      {/* LightRays background */}
      <div className="absolute inset-0 z-1">
        <LightRays
          raysOrigin="top-left"
          raysColor="#1E73FF"
          raysSpeed={0.6}
          lightSpread={1.5}
          rayLength={3}
          fadeDistance={1.5}
          saturation={1.2}
          className="h-full w-full"
        />
      </div>

      {/* Radial vignette */}
      <div
        className="absolute inset-0 z-2 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 30% 40%, transparent 10%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.9) 100%)",
        }}
      />

      {/* Hero content - centered layout */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-40 pb-20">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div ref={badgeRef} className="mb-8 flex justify-center">
            <GradientText
              colors={["#1E73FF", "#60A5FA", "#ffffff", "#60A5FA", "#1E73FF"]}
              animationSpeed={6}
              showBorder
              className="text-sm font-semibold tracking-wider uppercase"
            >
              Melbourne&apos;s Creative Tech Studio
            </GradientText>
          </div>

          {/* Heading */}
          <Copy animateOnScroll={false} delay={0.2}>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-normal text-white leading-[0.95] tracking-tight mb-6">
              <GradientText
                colors={["#1E73FF", "#60A5FA", "#ffffff", "#93C5FD", "#1E73FF"]}
                animationSpeed={8}
                className="text-5xl md:text-7xl lg:text-8xl font-normal leading-[0.95] tracking-tight"
              >
                Tap Into the Future
              </GradientText>
            </h1>
          </Copy>

          <Copy animateOnScroll={false} delay={0.5}>
            <p className="text-lg md:text-xl text-gray-400 leading-relaxed max-w-2xl mx-auto mb-10">
              We craft smart NFC keychains and products that bridge your
              physical and digital worlds. Designed and 3D-printed in
              Melbourne.
            </p>
          </Copy>

          {/* Buttons */}
          <div
            ref={buttonsRef}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              href="/catalogue"
              className="group inline-flex items-center justify-center gap-3 h-14 px-8 text-base font-semibold rounded-full bg-tapcraft-blue text-white hover:bg-blue-600 transition-colors no-underline shadow-lg shadow-blue-500/30"
            >
              Explore Catalogue
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/customize"
              className="inline-flex items-center justify-center gap-3 h-14 px-8 text-base font-semibold rounded-full border border-white/20 text-white hover:bg-white/10 transition-colors no-underline backdrop-blur-sm"
            >
              <Paintbrush className="w-4 h-4" />
              Design Your Own
            </Link>
          </div>
        </div>

        {/* Video section - below hero text */}
        <div
          ref={videoContainerRef}
          className="mt-20 rounded-3xl overflow-hidden border border-white/10"
        >
          <video
            ref={videoRef}
            className="w-full h-auto object-cover aspect-video"
            muted
            loop
            playsInline
            preload="metadata"
          >
            <source src="/demo.mp4" type="video/mp4" />
          </video>
        </div>

        {/* Featured product cards */}
        <div className="mt-20 text-center mb-10">
          <Copy animateOnScroll>
            <p className="text-tapcraft-blue text-sm font-semibold tracking-widest uppercase mb-3">
              Trending Now
            </p>
          </Copy>
          <Copy animateOnScroll delay={0.1}>
            <h2 className="text-3xl md:text-4xl font-normal text-white tracking-tight">
              Fan Favourites
            </h2>
          </Copy>
        </div>
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {products.map((product) => (
            <div
              key={product.id}
              className="group relative rounded-2xl overflow-hidden bg-white/[0.07] backdrop-blur-xl border border-white/10 transition-[border-color] duration-500 hover:border-tapcraft-blue/50 p-4"
            >
              <div className="aspect-square rounded-xl overflow-hidden mb-4">
                <Image
                  src={product.image}
                  alt={product.name}
                  width={400}
                  height={400}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-white font-semibold text-base">
                    {product.name}
                  </h3>
                  <p className="text-gray-500 text-sm mt-0.5">{product.desc}</p>
                </div>
                <ArrowRight className="w-4 h-4 text-gray-600 shrink-0 group-hover:text-tapcraft-blue group-hover:translate-x-1 transition-[color] duration-300" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
