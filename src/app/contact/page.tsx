"use client";

import { useState, useRef, useEffect, type FormEvent } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Header } from "@/components/layout/Header";
import Copy from "@/components/Copy";
import { Mail, MapPin, Clock, Phone } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const contactInfo = [
  {
    icon: <Mail className="w-5 h-5" />,
    label: "Email",
    value: "hello@tapcraftstudio.com",
    href: "mailto:hello@tapcraftstudio.com",
  },
  {
    icon: <MapPin className="w-5 h-5" />,
    label: "Location",
    value: "Melbourne, Australia",
    href: null,
  },
  {
    icon: <Clock className="w-5 h-5" />,
    label: "Response Time",
    value: "Within 24 hours",
    href: null,
  },
  {
    icon: <Phone className="w-5 h-5" />,
    label: "Phone",
    value: "+61 3 XXXX XXXX",
    href: "tel:+613XXXXXXXX",
  },
];

const inquiryTypes = [
  "General Enquiry",
  "Custom Quote",
  "Bulk Order",
  "Partnership",
  "Support",
  "Other",
] as const;

export default function ContactPage() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    inquiryType: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const heroRef = useRef<HTMLDivElement>(null);
  const formSectionRef = useRef<HTMLDivElement>(null);
  const formCardRef = useRef<HTMLDivElement>(null);
  const infoCardsRef = useRef<HTMLDivElement>(null);
  const successRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (formCardRef.current) {
        gsap.set(formCardRef.current, { opacity: 0, y: 40 });
      }
      if (infoCardsRef.current) {
        gsap.set(infoCardsRef.current.children, { opacity: 0, y: 30 });
      }

      ScrollTrigger.create({
        trigger: formSectionRef.current,
        start: "top 80%",
        once: true,
        onEnter: () => {
          if (formCardRef.current) {
            gsap.to(formCardRef.current, {
              opacity: 1, y: 0, duration: 1.2, ease: "power2.out",
            });
          }
          if (infoCardsRef.current) {
            gsap.to(infoCardsRef.current.children, {
              opacity: 1, y: 0, duration: 1, ease: "power2.out", stagger: 0.1, delay: 0.3,
            });
          }
        },
      });
    },
    { scope: formSectionRef }
  );

  useEffect(() => {
    if (submitted && successRef.current) {
      gsap.set(successRef.current, { opacity: 0, scale: 0.95 });
      gsap.to(successRef.current, {
        opacity: 1, scale: 1, duration: 0.5, ease: "power2.out",
      });
    }
  }, [submitted]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formState.name.trim() || !formState.email.trim() || !formState.message.trim()) return;

    setLoading(true);
    setTimeout(() => {
      console.log("Contact form submitted:", formState);
      setSubmitted(true);
      setLoading(false);
    }, 800);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormState((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <>
      <Header />

      {/* Hero */}
      <section
        ref={heroRef}
        className="relative pt-32 pb-20 md:pt-40 md:pb-28 bg-black overflow-hidden"
      >
        {/* Background decoration */}
        <div
          className="absolute top-0 right-0 w-[600px] h-[600px] pointer-events-none"
          style={{
            background: "radial-gradient(circle at 100% 0%, rgba(30,115,255,0.08) 0%, transparent 60%)",
          }}
        />
        <div
          className="absolute bottom-0 left-0 w-[400px] h-[400px] pointer-events-none"
          style={{
            background: "radial-gradient(circle at 0% 100%, rgba(30,115,255,0.05) 0%, transparent 60%)",
          }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-3xl">
            <Copy animateOnScroll>
              <p className="text-tapcraft-blue text-sm font-semibold tracking-widest uppercase mb-4">
                Get in Touch
              </p>
            </Copy>
            <Copy animateOnScroll delay={0.1}>
              <h1 className="text-4xl md:text-5xl lg:text-6xl text-white font-normal tracking-tight leading-[1.1] mb-6">
                Let&apos;s Build Something
                <br />
                Extraordinary Together
              </h1>
            </Copy>
            <Copy animateOnScroll delay={0.2}>
              <p className="text-gray-400 text-lg leading-relaxed max-w-xl">
                Whether you have a project in mind or just want to explore what&apos;s possible
                with 3D + NFC technology, we&apos;d love to hear from you.
              </p>
            </Copy>
          </div>
        </div>
      </section>

      {/* Form + Info Section */}
      <section
        ref={formSectionRef}
        className="py-24 md:py-32 bg-tapcraft-dark relative overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">
            {/* Contact Form */}
            <div ref={formCardRef} className="lg:col-span-3">
              {!submitted ? (
                <div className="rounded-2xl bg-white/[0.03] border border-white/10 p-8 md:p-10">
                  <h2 className="text-2xl md:text-3xl text-white font-normal tracking-tight mb-2">
                    Send Us a Message
                  </h2>
                  <p className="text-gray-500 text-sm mb-8">
                    Fill out the form below and our team will get back to you within 24 hours.
                  </p>

                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs font-semibold text-gray-400 mb-1.5">
                          Name <span className="text-tapcraft-blue">*</span>
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={formState.name}
                          onChange={handleChange}
                          required
                          placeholder="Your name"
                          className="w-full h-12 px-4 rounded-xl bg-white/[0.05] border border-white/10 text-white placeholder-gray-600 text-sm focus:outline-none focus:ring-2 focus:ring-tapcraft-blue/50 focus:border-transparent transition-[border-color,box-shadow] duration-200"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-gray-400 mb-1.5">
                          Email <span className="text-tapcraft-blue">*</span>
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formState.email}
                          onChange={handleChange}
                          required
                          placeholder="you@company.com"
                          className="w-full h-12 px-4 rounded-xl bg-white/[0.05] border border-white/10 text-white placeholder-gray-600 text-sm focus:outline-none focus:ring-2 focus:ring-tapcraft-blue/50 focus:border-transparent transition-[border-color,box-shadow] duration-200"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs font-semibold text-gray-400 mb-1.5">
                          Phone
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={formState.phone}
                          onChange={handleChange}
                          placeholder="+61 4xx xxx xxx"
                          className="w-full h-12 px-4 rounded-xl bg-white/[0.05] border border-white/10 text-white placeholder-gray-600 text-sm focus:outline-none focus:ring-2 focus:ring-tapcraft-blue/50 focus:border-transparent transition-[border-color,box-shadow] duration-200"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-gray-400 mb-1.5">
                          Company
                        </label>
                        <input
                          type="text"
                          name="company"
                          value={formState.company}
                          onChange={handleChange}
                          placeholder="Company name"
                          className="w-full h-12 px-4 rounded-xl bg-white/[0.05] border border-white/10 text-white placeholder-gray-600 text-sm focus:outline-none focus:ring-2 focus:ring-tapcraft-blue/50 focus:border-transparent transition-[border-color,box-shadow] duration-200"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-400 mb-1.5">
                        Inquiry Type
                      </label>
                      <select
                        name="inquiryType"
                        value={formState.inquiryType}
                        onChange={handleChange}
                        className="w-full h-12 px-4 rounded-xl bg-white/[0.05] border border-white/10 text-white text-sm focus:outline-none focus:ring-2 focus:ring-tapcraft-blue/50 focus:border-transparent transition-[border-color,box-shadow] duration-200 cursor-pointer appearance-none"
                        style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%236b7280' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E\")", backgroundRepeat: "no-repeat", backgroundPosition: "right 16px center" }}
                      >
                        <option value="" className="bg-gray-900 text-gray-400">Select type...</option>
                        {inquiryTypes.map((type) => (
                          <option key={type} value={type} className="bg-gray-900 text-white">
                            {type}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-400 mb-1.5">
                        Message <span className="text-tapcraft-blue">*</span>
                      </label>
                      <textarea
                        name="message"
                        value={formState.message}
                        onChange={handleChange}
                        required
                        rows={5}
                        placeholder="Tell us about your project, goals, and any specific requirements..."
                        className="w-full px-4 py-3 rounded-xl bg-white/[0.05] border border-white/10 text-white placeholder-gray-600 text-sm focus:outline-none focus:ring-2 focus:ring-tapcraft-blue/50 focus:border-transparent transition-[border-color,box-shadow] duration-200 resize-y"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full sm:w-auto h-12 px-8 rounded-xl bg-tapcraft-blue text-white text-sm font-semibold hover:bg-blue-600 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer flex items-center justify-center gap-2"
                    >
                      {loading ? (
                        <>
                          <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" className="opacity-25" />
                            <path d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" fill="currentColor" className="opacity-75" />
                          </svg>
                          Sending...
                        </>
                      ) : (
                        <>
                          Send Message
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                          </svg>
                        </>
                      )}
                    </button>
                  </form>
                </div>
              ) : (
                <div
                  ref={successRef}
                  className="rounded-2xl bg-white/[0.03] border border-white/10 p-10 md:p-14 text-center"
                >
                  <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-tapcraft-blue/15 flex items-center justify-center">
                    <svg className="w-8 h-8 text-tapcraft-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                  </div>
                  <h2 className="text-3xl font-normal text-white mb-3">
                    Message Sent!
                  </h2>
                  <p className="text-gray-400 text-lg max-w-md mx-auto mb-8">
                    Thanks for reaching out. Our Melbourne team will review your
                    message and get back to you within 24 hours.
                  </p>
                  <Link
                    href="/"
                    className="inline-flex items-center gap-2 text-tapcraft-blue text-sm font-semibold hover:underline no-underline"
                  >
                    Back to Home
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                  </Link>
                </div>
              )}
            </div>

            {/* Contact Info Cards */}
            <div ref={infoCardsRef} className="lg:col-span-2 space-y-4">
              {contactInfo.map((info) => (
                <div
                  key={info.label}
                  className="rounded-2xl bg-white/[0.03] border border-white/10 p-6 hover:border-tapcraft-blue/30 transition-[border-color] duration-500"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-tapcraft-blue/10 text-tapcraft-blue flex items-center justify-center shrink-0">
                      {info.icon}
                    </div>
                    <div>
                      <p className="text-gray-500 text-xs font-semibold uppercase tracking-wider mb-1">
                        {info.label}
                      </p>
                      {info.href ? (
                        <a
                          href={info.href}
                          className="text-white text-sm font-medium hover:text-tapcraft-blue transition-colors no-underline"
                        >
                          {info.value}
                        </a>
                      ) : (
                        <p className="text-white text-sm font-medium">{info.value}</p>
                      )}
                    </div>
                  </div>
                </div>
              ))}

              {/* Quick links card */}
              <div className="rounded-2xl bg-tapcraft-blue/[0.08] border border-tapcraft-blue/20 p-6">
                <h3 className="text-white text-base font-semibold mb-3">
                  Looking for something specific?
                </h3>
                <ul className="space-y-2">
                  <li>
                    <Link
                      href="/catalogue"
                      className="text-gray-400 text-sm hover:text-tapcraft-blue transition-colors no-underline flex items-center gap-2"
                    >
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                      </svg>
                      Browse our catalogue
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/customize"
                      className="text-gray-400 text-sm hover:text-tapcraft-blue transition-colors no-underline flex items-center gap-2"
                    >
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                      </svg>
                      Customize a product
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
