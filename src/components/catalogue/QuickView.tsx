'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import type { Product } from '@/types/product';
import {
  formatPrice,
  formatDimensions,
  formatProductionTime,
} from '@/lib/utils/formatting';
import { ImagePlaceholder } from '@/components/shared/ImagePlaceholder';
import { Button } from '@/components/shared/Button';
import { Badge } from '@/components/shared/Badge';

interface QuickViewProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

export function QuickView({ product, isOpen, onClose }: QuickViewProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Close on escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Animate in
  useEffect(() => {
    if (isOpen && product) {
      if (overlayRef.current) {
        gsap.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.2 });
      }
      if (contentRef.current) {
        gsap.fromTo(
          contentRef.current,
          { opacity: 0, y: 40, scale: 0.97 },
          { opacity: 1, y: 0, scale: 1, duration: 0.4, ease: 'power3.out' }
        );
      }
    }
  }, [isOpen, product]);

  if (!isOpen || !product) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      {/* Overlay */}
      <div
        ref={overlayRef}
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
        style={{ opacity: 0 }}
      />

      {/* Content */}
      <div
        ref={contentRef}
        className="relative z-10 w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl bg-white shadow-2xl"
        style={{ opacity: 0 }}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-gray-500 shadow-sm backdrop-blur-sm transition-colors hover:bg-gray-100 hover:text-gray-700 cursor-pointer"
          aria-label="Close quick view"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Image */}
          <div className="relative aspect-square bg-gray-50 md:rounded-l-2xl overflow-hidden">
            <ImagePlaceholder
              width={800}
              height={800}
              name={product.name}
              type="3d"
              className="h-full w-full rounded-none border-0"
            />
            <div className="absolute top-4 left-4 flex flex-wrap gap-2">
              {product.tags.some((t) => t.toLowerCase() === 'new') && (
                <Badge variant="new">New</Badge>
              )}
              {product.tags.some((t) => t.toLowerCase().includes('best')) && (
                <Badge variant="best-seller">Best Seller</Badge>
              )}
            </div>
          </div>

          {/* Details */}
          <div className="flex flex-col p-6 md:p-8">
            <p className="text-xs font-semibold uppercase tracking-wider text-tapcraft-blue">
              {product.category}
            </p>
            <h2 className="mt-2 text-2xl font-normal text-gray-900 leading-tight">
              {product.name}
            </h2>
            <div className="mt-3">
              <p className="text-xl font-semibold text-tapcraft-blue">
                {formatPrice(product.price.min, product.price.currency)}
                {product.price.min !== product.price.max && (
                  <span className="text-gray-400 font-normal text-base">
                    {' '}&ndash;{' '}
                    {formatPrice(product.price.max, product.price.currency)}
                  </span>
                )}
              </p>
            </div>
            <p className="mt-4 text-sm text-gray-600 leading-relaxed">
              {product.description}
            </p>

            <div className="mt-5">
              <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide mb-3">
                Specifications
              </h3>
              <div className="rounded-lg border border-gray-200 divide-y divide-gray-100 overflow-hidden">
                {[
                  { label: 'Dimensions', value: formatDimensions(product.specifications.dimensions) },
                  { label: 'Material', value: product.specifications.material },
                  { label: 'NFC Chip', value: product.specifications.nfcChip },
                  { label: 'Production Time', value: formatProductionTime(product.specifications.productionTime) },
                ].map((spec) => (
                  <div key={spec.label} className="flex items-center justify-between px-3.5 py-2.5">
                    <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">{spec.label}</span>
                    <span className="text-sm font-medium text-gray-900">{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-4 rounded-lg bg-tapcraft-light/60 border border-tapcraft-blue/10 p-3.5">
              <div className="flex items-start gap-2">
                <svg className="mt-0.5 h-4 w-4 shrink-0 text-tapcraft-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 6h.008v.008H6V6z" />
                </svg>
                <div>
                  <p className="text-xs font-semibold text-tapcraft-blue">Quantity Discounts Available</p>
                  <p className="mt-0.5 text-xs text-gray-600">
                    Order 25+ units for 10% off. Order 100+ for 20% off. Contact us for custom bulk pricing.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 flex flex-col gap-2 sm:flex-row">
              <Button variant="primary" size="lg" className="flex-1" asChild>
                <Link href={`/customize?base=${product.slug}`}>Customize This Design</Link>
              </Button>
              <Button variant="secondary" size="lg" className="flex-1" asChild>
                <Link href="/customize">Contact Us</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
