import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Merge Tailwind CSS classes with clsx and tailwind-merge.
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

/**
 * Format a price amount for display.
 */
export function formatPrice(
  amount: number,
  currency: string = 'AUD',
): string {
  return new Intl.NumberFormat('en-AU', {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

/**
 * Format a price range for display.
 */
export function formatPriceRange(
  min: number,
  max: number,
  currency: string = 'AUD',
): string {
  if (min === max) {
    return formatPrice(min, currency);
  }
  return `${formatPrice(min, currency)} \u2013 ${formatPrice(max, currency)}`;
}

/**
 * Format product dimensions for display.
 */
export function formatDimensions(dimensions: {
  width: number;
  height: number;
  depth: number;
  unit: string;
}): string {
  return `${dimensions.width} \u00d7 ${dimensions.height} \u00d7 ${dimensions.depth} ${dimensions.unit}`;
}

/**
 * Format production time for display.
 */
export function formatProductionTime(productionTime: {
  min: number;
  max: number;
  unit: string;
}): string {
  if (productionTime.min === productionTime.max) {
    return `${productionTime.min} ${productionTime.unit}`;
  }
  return `${productionTime.min}\u2013${productionTime.max} ${productionTime.unit}`;
}

/**
 * Truncate a string to a maximum length with ellipsis.
 */
export function truncate(str: string, maxLength: number): string {
  if (str.length <= maxLength) return str;
  return `${str.slice(0, maxLength - 1)}\u2026`;
}

/**
 * Convert a string to a URL-friendly slug.
 */
export function slugify(str: string): string {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}
