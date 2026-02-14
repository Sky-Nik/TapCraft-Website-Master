"use client";

import { useState, useRef, useEffect, type FormEvent } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Button } from "@/components/shared/Button";
import Copy from "@/components/Copy";
import Grainient from "@/components/Grainient";

gsap.registerPlugin(ScrollTrigger);

export function EmailCapture() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const successRef = useRef<HTMLDivElement>(null);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email.trim()) return;

    setLoading(true);

    setTimeout(() => {
      console.log("Newsletter signup:", email);
      setSubmitted(true);
      setLoading(false);
    }, 600);
  };

  useGSAP(
    () => {
      if (formRef.current && !submitted) {
        gsap.set(formRef.current, { opacity: 0, y: 40 });
      }

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 80%",
        once: true,
        onEnter: () => {
          if (formRef.current) {
            gsap.to(formRef.current, { opacity: 1, y: 0, duration: 1.2, ease: "power2.out" });
          }
        },
      });
    },
    { scope: sectionRef, dependencies: [submitted] }
  );

  useEffect(() => {
    if (submitted && successRef.current) {
      gsap.set(successRef.current, { opacity: 0, y: 20 });
      gsap.to(successRef.current, {
        opacity: 1, y: 0, duration: 0.6, ease: "power2.out",
      });
    }
  }, [submitted]);

  return (
    <section ref={sectionRef} className="relative py-24 md:py-32 overflow-hidden">
      {/* Grainient animated background */}
      <div className="absolute inset-0">
        <Grainient
          color1="#1E73FF"
          color2="#0a0a0a"
          color3="#1a3a6e"
          timeSpeed={0.15}
          grainAmount={0.08}
          contrast={1.3}
          saturation={1.2}
          warpSpeed={1.5}
          warpAmplitude={40}
          zoom={1.1}
        />
      </div>

      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-black/40 pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {!submitted ? (
          <div ref={formRef} className="text-center">
            <Copy animateOnScroll>
              <p className="text-tapcraft-blue text-sm font-semibold tracking-widest uppercase mb-4">
                Stay Connected
              </p>
            </Copy>
            <Copy animateOnScroll delay={0.1}>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-normal text-white tracking-tight leading-[1.1] mb-5">
                Get Design Updates &
                <br />
                Innovation Tips
              </h2>
            </Copy>
            <Copy animateOnScroll delay={0.2}>
              <p className="text-gray-300 text-lg max-w-xl mx-auto mb-10">
                Join our newsletter for the latest in 3D printing innovation, NFC
                technology trends, and exclusive offers.
              </p>
            </Copy>

            <form
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row items-center gap-3 max-w-lg mx-auto"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                required
                className="w-full flex-1 h-14 px-5 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-tapcraft-blue/50 focus:border-transparent transition-[border-color,box-shadow] duration-200 backdrop-blur-sm"
              />
              <Button
                type="submit"
                loading={loading}
                className="w-full sm:w-auto h-14 px-8 bg-white text-tapcraft-dark hover:bg-gray-100 font-semibold rounded-xl"
                size="lg"
              >
                Subscribe
              </Button>
            </form>

            <p className="mt-5 text-gray-500 text-xs">
              No spam, ever. Unsubscribe anytime. We respect your privacy.
            </p>
          </div>
        ) : (
          <div ref={successRef} className="text-center">
            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-white/15 backdrop-blur-sm flex items-center justify-center">
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
            </div>
            <h2 className="text-3xl font-normal text-white mb-3">
              You&apos;re In!
            </h2>
            <p className="text-gray-300 text-lg max-w-md mx-auto">
              Thanks for subscribing. Keep an eye on your inbox for design
              inspiration and the latest from TapCraft Studio.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
