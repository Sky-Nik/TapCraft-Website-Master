"use client";

import { useState } from "react";
import Link from "next/link";
import type { ProductVariant } from "@/types/product";
import { cn, formatPrice } from "@/lib/utils/formatting";
import { AddToCartButton } from "@/components/cart/AddToCartButton";

interface ProductPurchaseSectionProps {
  variants: ProductVariant[];
  inStock: boolean;
}

function extractOptionGroups(
  variants: ProductVariant[]
): Record<string, string[]> {
  const groups: Record<string, Set<string>> = {};
  for (const variant of variants) {
    for (const opt of variant.options) {
      if (!groups[opt.name]) groups[opt.name] = new Set();
      groups[opt.name].add(opt.value);
    }
  }
  return Object.fromEntries(
    Object.entries(groups).map(([k, v]) => [k, Array.from(v)])
  );
}

function findVariantByOptions(
  variants: ProductVariant[],
  selectedOptions: Record<string, string>
): ProductVariant | undefined {
  return variants.find((v) =>
    Object.entries(selectedOptions).every(([name, value]) =>
      v.options.some((opt) => opt.name === name && opt.value === value)
    )
  );
}

export function ProductPurchaseSection({
  variants,
  inStock,
}: ProductPurchaseSectionProps) {
  const shouldShowSelector =
    variants.length > 1 &&
    variants.some((v) => v.title !== "Default Title");

  // Initialize selected options from the first variant
  const initialOptions: Record<string, string> = {};
  if (variants[0]) {
    for (const opt of variants[0].options) {
      initialOptions[opt.name] = opt.value;
    }
  }

  const [selectedOptions, setSelectedOptions] =
    useState<Record<string, string>>(initialOptions);

  const selectedVariant = findVariantByOptions(variants, selectedOptions) ?? variants[0];
  const optionGroups = shouldShowSelector ? extractOptionGroups(variants) : {};

  const handleOptionSelect = (optionName: string, value: string) => {
    const next = { ...selectedOptions, [optionName]: value };
    setSelectedOptions(next);
  };

  return (
    <>
      {/* Variant Selector */}
      {shouldShowSelector &&
        Object.entries(optionGroups).map(([name, values]) => (
          <div key={name} className="mt-5">
            <h3 className="text-sm font-semibold text-gray-700 mb-2.5">
              {name}
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {values.map((value) => {
                const variant = findVariantByOptions(variants, {
                  ...selectedOptions,
                  [name]: value,
                });
                const isSelected = selectedOptions[name] === value;
                const isAvailable = variant?.availableForSale !== false;

                return (
                  <button
                    key={value}
                    type="button"
                    onClick={() => handleOptionSelect(name, value)}
                    disabled={!isAvailable}
                    className={cn(
                      "rounded-xl border-2 px-4 py-3 text-left transition-all duration-200 cursor-pointer",
                      isSelected
                        ? "border-tapcraft-blue bg-tapcraft-blue/10"
                        : "border-gray-200 bg-white hover:border-tapcraft-blue/40",
                      !isAvailable && "opacity-50 cursor-not-allowed"
                    )}
                  >
                    <p
                      className={cn(
                        "text-sm font-semibold",
                        isSelected ? "text-tapcraft-blue" : "text-gray-900"
                      )}
                    >
                      {value}
                    </p>
                    {variant && (
                      <p
                        className={cn(
                          "text-xs mt-0.5",
                          isSelected
                            ? "text-tapcraft-blue/70"
                            : "text-gray-500"
                        )}
                      >
                        {formatPrice(variant.price)}
                      </p>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        ))}

      {/* Price */}
      <div className="mt-5">
        <p className="text-2xl font-semibold text-tapcraft-blue">
          {selectedVariant && formatPrice(selectedVariant.price)}
          {selectedVariant?.compareAtPrice && (
            <span className="text-lg text-gray-400 line-through ml-2">
              {formatPrice(selectedVariant.compareAtPrice)}
            </span>
          )}
        </p>
        <p className="mt-1 text-sm text-gray-500">
          Price per unit. Quantity discounts available.
        </p>
      </div>

      {/* CTA Buttons */}
      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        {selectedVariant && (
          <AddToCartButton
            variantId={selectedVariant.id}
            disabled={!inStock || !selectedVariant.availableForSale}
            className="flex-1"
          />
        )}
        <Link
          href="/contact"
          className="inline-flex items-center justify-center flex-1 h-12 px-8 text-base font-semibold rounded-lg transition-colors duration-200 no-underline border-2 border-tapcraft-blue text-tapcraft-blue bg-transparent hover:bg-tapcraft-blue hover:text-white"
        >
          Request Custom Design
        </Link>
      </div>

      {/* Stock status */}
      <div className="mt-4 flex items-center gap-2">
        <span
          className={`h-2 w-2 rounded-full ${inStock ? "bg-emerald-500" : "bg-red-500"}`}
        />
        <span className="text-sm text-gray-600">
          {inStock ? "In Stock — Made to order" : "Currently unavailable"}
        </span>
      </div>
    </>
  );
}
