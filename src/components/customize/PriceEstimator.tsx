"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import gsap from "gsap";
import { cn } from "@/lib/utils/formatting";
import { calculatePrice, calculatePriceRange } from "@/lib/utils/pricing";
import type { CustomizationConfig } from "@/types/customization";

interface PriceEstimatorProps {
  config: CustomizationConfig;
  onQuantityChange: (quantity: number) => void;
}

export default function PriceEstimator({ config, onQuantityChange }: PriceEstimatorProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const breakdownRef = useRef<HTMLDivElement>(null);
  const iconRef = useRef<SVGSVGElement>(null);

  const breakdown = useMemo(() => calculatePrice(config), [config]);
  const priceRange = useMemo(() => calculatePriceRange(config), [config]);
  const total = breakdown.total;

  const discount = config.quantity >= 100
    ? 25
    : config.quantity >= 50
    ? 15
    : config.quantity >= 25
    ? 10
    : 0;

  useEffect(() => {
    if (!breakdownRef.current) return;

    if (isExpanded) {
      gsap.set(breakdownRef.current, { display: "block" });
      gsap.fromTo(
        breakdownRef.current,
        { height: 0, opacity: 0 },
        { height: "auto", opacity: 1, duration: 0.2, ease: "power2.out" }
      );
    } else {
      gsap.to(breakdownRef.current, {
        height: 0,
        opacity: 0,
        duration: 0.2,
        ease: "power2.in",
        onComplete: () => {
          if (breakdownRef.current) gsap.set(breakdownRef.current, { display: "none" });
        },
      });
    }
  }, [isExpanded]);

  useEffect(() => {
    if (iconRef.current) {
      gsap.to(iconRef.current, {
        rotation: isExpanded ? 180 : 0,
        duration: 0.2,
        ease: "power2.out",
      });
    }
  }, [isExpanded]);

  return (
    <div className="border-t border-gray-200 bg-white shadow-[0_-4px_20px_-4px_rgba(0,0,0,0.08)]">
      {/* Expandable breakdown */}
      <div ref={breakdownRef} className="overflow-hidden" style={{ height: 0, display: "none" }}>
        <div className="border-b border-gray-100 px-4 py-4 sm:px-6">
          <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-gray-400">
            Price Breakdown (per unit)
          </h4>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-500">Base price</span>
              <span className="text-xs font-semibold text-gray-700">
                ${breakdown.basePrice.toFixed(2)}
              </span>
            </div>
            {breakdown.sizeModifier !== 1.0 && (
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500">Size modifier</span>
                <span className="text-xs font-semibold text-gray-700">
                  {breakdown.sizeModifier}x
                </span>
              </div>
            )}
            {breakdown.materialModifier !== 1.0 && (
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500">Material modifier</span>
                <span className="text-xs font-semibold text-gray-700">
                  {breakdown.materialModifier}x
                </span>
              </div>
            )}
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-500">NFC chip</span>
              <span className="text-xs font-semibold text-gray-700">
                ${breakdown.nfcChipPrice.toFixed(2)}
              </span>
            </div>
            {breakdown.textPrice > 0 && (
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500">Text customization</span>
                <span className="text-xs font-semibold text-gray-700">
                  ${breakdown.textPrice.toFixed(2)}
                </span>
              </div>
            )}
            {breakdown.designUploadPrice > 0 && (
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500">Design upload</span>
                <span className="text-xs font-semibold text-gray-700">
                  ${breakdown.designUploadPrice.toFixed(2)}
                </span>
              </div>
            )}
            <div className="border-t border-gray-100 pt-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-gray-700">Subtotal per unit</span>
                <span className="text-xs font-semibold text-gray-800">
                  ${breakdown.subtotalPerUnit.toFixed(2)}
                </span>
              </div>
            </div>
            {breakdown.quantityDiscount > 0 && (
              <div className="flex items-center justify-between">
                <span className="text-xs text-green-600">
                  Bulk discount ({discount}%)
                </span>
                <span className="text-xs font-semibold text-green-600">
                  -${breakdown.quantityDiscount.toFixed(2)}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main bar */}
      <div className="flex items-center justify-between gap-4 px-4 py-3 sm:px-6">
        {/* Left side: expand toggle + price */}
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center gap-1.5 text-xs font-medium text-gray-500 hover:text-tapcraft-blue transition-colors cursor-pointer"
          >
            <svg
              ref={iconRef}
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="18 15 12 9 6 15" />
            </svg>
            {isExpanded ? "Hide" : "Details"}
          </button>

          <div>
            <p className="text-xs text-gray-500">Estimated price</p>
            <div className="flex items-baseline gap-1.5">
              <span className="text-xl font-semibold text-tapcraft-blue">
                ${priceRange.perUnit.toFixed(2)}
              </span>
              <span className="text-xs text-gray-400">/unit</span>
              {discount > 0 && (
                <span className="rounded-full bg-green-100 px-1.5 py-0.5 text-[10px] font-semibold text-green-700">
                  -{discount}%
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Right side: quantity + total */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <label className="text-xs text-gray-500 hidden sm:block">Qty</label>
            <input
              type="number"
              min={1}
              max={10000}
              value={config.quantity}
              onChange={(e) => {
                const val = Math.max(1, Math.min(10000, Number(e.target.value) || 1));
                onQuantityChange(val);
              }}
              className={cn(
                "w-16 rounded-lg border border-gray-200 bg-white px-2 py-1.5 text-center text-sm font-semibold text-gray-800",
                "focus:border-tapcraft-blue focus:outline-none focus:ring-2 focus:ring-tapcraft-blue/20"
              )}
            />
          </div>

          <div className="text-right hidden sm:block">
            <p className="text-[10px] text-gray-400">Total estimate</p>
            <p className="text-sm font-semibold text-gray-800">
              ${total.toFixed(2)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
