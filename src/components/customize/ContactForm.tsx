"use client";

import { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import gsap from "gsap";
import { cn } from "@/lib/utils/formatting";
import { SHAPES, MATERIALS, NFC_CHIPS } from "@/lib/constants/customization";
import { calculatePriceRange } from "@/lib/utils/pricing";
import type { CustomizationConfig } from "@/types/customization";

const quoteSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().min(1, "Email is required").email("Please enter a valid email"),
  phone: z.string().optional(),
  company: z.string().optional(),
  industry: z.string().optional(),
  details: z.string().min(1, "Project details are required"),
  quantity: z.number().min(1, "Minimum quantity is 1"),
  timeline: z.string().min(1, "Please select a timeline"),
});

type QuoteFormData = z.infer<typeof quoteSchema>;

interface ContactFormProps {
  isOpen: boolean;
  onClose: () => void;
  config: CustomizationConfig;
}

const INDUSTRIES = [
  "Technology",
  "Marketing & Advertising",
  "Real Estate",
  "Hospitality",
  "Healthcare",
  "Retail",
  "Events & Entertainment",
  "Education",
  "Finance",
  "Other",
] as const;

const TIMELINES = [
  { id: "asap", label: "ASAP" },
  { id: "1-2-weeks", label: "1-2 weeks" },
  { id: "2-4-weeks", label: "2-4 weeks" },
  { id: "flexible", label: "Flexible" },
] as const;

function generateConfigSummary(config: CustomizationConfig): string {
  const shape = SHAPES.find((s) => s.id === config.shape)?.name ?? config.shape;
  const material = MATERIALS.find((m) => m.id === config.material)?.name ?? config.material;
  const nfc = NFC_CHIPS.find((n) => n.id === config.nfcChip)?.name ?? config.nfcChip;
  const price = calculatePriceRange(config);

  const lines = [
    `Shape: ${shape}`,
    `Color: ${config.color}`,
    `Material: ${material} (${config.finish} finish)`,
    `NFC: ${nfc}`,
  ];

  if (config.text.content.trim()) {
    lines.push(`Text: "${config.text.content.trim()}"`);
  }

  lines.push(`Quantity: ${config.quantity}`);
  lines.push(`Estimated price: $${price.perUnit.toFixed(2)}/unit`);

  return lines.join("\n");
}

export default function ContactForm({ isOpen, onClose, config }: ContactFormProps) {
  const [isSuccess, setIsSuccess] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<QuoteFormData>({
    resolver: zodResolver(quoteSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      company: "",
      industry: "",
      details: generateConfigSummary(config),
      quantity: config.quantity,
      timeline: "",
    },
  });

  const onSubmit = async (data: QuoteFormData) => {
    await new Promise((resolve) => setTimeout(resolve, 1500));
    console.log("Quote request submitted:", { ...data, config });
    setIsSuccess(true);
  };

  const handleClose = () => {
    const tl = gsap.timeline({
      onComplete: () => {
        setIsSuccess(false);
        reset();
        onClose();
      },
    });
    if (overlayRef.current) tl.to(overlayRef.current, { opacity: 0, duration: 0.2 }, 0);
    if (modalRef.current) tl.to(modalRef.current, { opacity: 0, scale: 0.95, y: 20, duration: 0.2 }, 0);
  };

  useEffect(() => {
    if (isOpen) {
      if (overlayRef.current) {
        gsap.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.2 });
      }
      if (modalRef.current) {
        gsap.fromTo(
          modalRef.current,
          { opacity: 0, scale: 0.95, y: 20 },
          { opacity: 1, scale: 1, y: 0, duration: 0.35, ease: "power3.out" }
        );
      }
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      onClick={(e) => {
        if (e.target === e.currentTarget) handleClose();
      }}
      style={{ opacity: 0 }}
    >
      <div
        ref={modalRef}
        className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl bg-white shadow-2xl"
        style={{ opacity: 0 }}
      >
        {/* Close button */}
        <button
          type="button"
          onClick={handleClose}
          className="absolute top-4 right-4 z-10 rounded-full p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors cursor-pointer"
          aria-label="Close"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        {isSuccess ? (
          <div className="flex flex-col items-center justify-center p-10 text-center">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2.5">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <h2 className="text-xl font-normal text-gray-900">Quote Request Sent!</h2>
            <p className="mt-2 text-sm text-gray-500 max-w-xs">
              Thanks for your interest! Our Melbourne team will review your configuration and get back to you within 24 hours.
            </p>
            <button
              type="button"
              onClick={handleClose}
              className="mt-6 rounded-xl bg-tapcraft-blue px-6 py-2.5 text-sm font-semibold text-white hover:bg-tapcraft-blue/90 transition-colors cursor-pointer"
            >
              Close
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="p-6">
            <div className="mb-6">
              <h2 className="text-xl font-normal text-gray-900">Request a Quote</h2>
              <p className="mt-1 text-sm text-gray-500">
                Fill in your details and we will send you a custom quote for your TapCraft order.
              </p>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block text-xs font-semibold text-gray-700">
                    Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    {...register("name")}
                    className={cn(
                      "w-full rounded-lg border bg-white px-3 py-2.5 text-sm text-gray-800",
                      "focus:border-tapcraft-blue focus:outline-none focus:ring-2 focus:ring-tapcraft-blue/20",
                      errors.name ? "border-red-300" : "border-gray-200"
                    )}
                    placeholder="Your name"
                  />
                  {errors.name && <p className="mt-1 text-[11px] text-red-500">{errors.name.message}</p>}
                </div>
                <div>
                  <label className="mb-1 block text-xs font-semibold text-gray-700">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    {...register("email")}
                    type="email"
                    className={cn(
                      "w-full rounded-lg border bg-white px-3 py-2.5 text-sm text-gray-800",
                      "focus:border-tapcraft-blue focus:outline-none focus:ring-2 focus:ring-tapcraft-blue/20",
                      errors.email ? "border-red-300" : "border-gray-200"
                    )}
                    placeholder="you@company.com"
                  />
                  {errors.email && <p className="mt-1 text-[11px] text-red-500">{errors.email.message}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block text-xs font-semibold text-gray-700">Phone</label>
                  <input
                    {...register("phone")}
                    type="tel"
                    className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-800 focus:border-tapcraft-blue focus:outline-none focus:ring-2 focus:ring-tapcraft-blue/20"
                    placeholder="+61 4xx xxx xxx"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-semibold text-gray-700">Company</label>
                  <input
                    {...register("company")}
                    className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-800 focus:border-tapcraft-blue focus:outline-none focus:ring-2 focus:ring-tapcraft-blue/20"
                    placeholder="Company name"
                  />
                </div>
              </div>

              <div>
                <label className="mb-1 block text-xs font-semibold text-gray-700">Industry</label>
                <select
                  {...register("industry")}
                  className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-800 focus:border-tapcraft-blue focus:outline-none focus:ring-2 focus:ring-tapcraft-blue/20 cursor-pointer"
                >
                  <option value="">Select industry...</option>
                  {INDUSTRIES.map((ind) => (
                    <option key={ind} value={ind}>{ind}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-1 block text-xs font-semibold text-gray-700">
                  Project Details <span className="text-red-500">*</span>
                </label>
                <textarea
                  {...register("details")}
                  rows={5}
                  className={cn(
                    "w-full rounded-lg border bg-white px-3 py-2.5 text-sm text-gray-800 font-mono",
                    "focus:border-tapcraft-blue focus:outline-none focus:ring-2 focus:ring-tapcraft-blue/20",
                    "resize-y",
                    errors.details ? "border-red-300" : "border-gray-200"
                  )}
                />
                {errors.details && <p className="mt-1 text-[11px] text-red-500">{errors.details.message}</p>}
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block text-xs font-semibold text-gray-700">
                    Quantity <span className="text-red-500">*</span>
                  </label>
                  <input
                    {...register("quantity")}
                    type="number"
                    min={1}
                    className={cn(
                      "w-full rounded-lg border bg-white px-3 py-2.5 text-sm text-gray-800",
                      "focus:border-tapcraft-blue focus:outline-none focus:ring-2 focus:ring-tapcraft-blue/20",
                      errors.quantity ? "border-red-300" : "border-gray-200"
                    )}
                  />
                  {errors.quantity && <p className="mt-1 text-[11px] text-red-500">{errors.quantity.message}</p>}
                </div>
                <div>
                  <label className="mb-1 block text-xs font-semibold text-gray-700">
                    Timeline <span className="text-red-500">*</span>
                  </label>
                  <select
                    {...register("timeline")}
                    className={cn(
                      "w-full rounded-lg border bg-white px-3 py-2.5 text-sm text-gray-800 cursor-pointer",
                      "focus:border-tapcraft-blue focus:outline-none focus:ring-2 focus:ring-tapcraft-blue/20",
                      errors.timeline ? "border-red-300" : "border-gray-200"
                    )}
                  >
                    <option value="">Select timeline...</option>
                    {TIMELINES.map((t) => (
                      <option key={t.id} value={t.id}>{t.label}</option>
                    ))}
                  </select>
                  {errors.timeline && <p className="mt-1 text-[11px] text-red-500">{errors.timeline.message}</p>}
                </div>
              </div>
            </div>

            <div className="mt-6 flex gap-3">
              <button
                type="button"
                onClick={handleClose}
                className="flex-1 rounded-xl border border-gray-200 bg-white py-2.5 text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className={cn(
                  "flex-1 rounded-xl bg-tapcraft-blue py-2.5 text-sm font-semibold text-white transition-[background-color,opacity] cursor-pointer",
                  "hover:bg-tapcraft-blue/90 disabled:cursor-not-allowed disabled:opacity-60"
                )}
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" className="opacity-25" />
                      <path d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" fill="currentColor" className="opacity-75" />
                    </svg>
                    Sending...
                  </span>
                ) : (
                  "Send Quote Request"
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
