'use client';

import type { Product } from '@/types/product';
import { ProductCard } from './ProductCard';

export type SortOption =
  | 'featured'
  | 'price-low-high'
  | 'price-high-low'
  | 'newest'
  | 'most-popular';

interface ProductGridProps {
  products: Product[];
  isLoading?: boolean;
  sortBy: SortOption;
  onSortChange: (sort: SortOption) => void;
  onQuickView: (product: Product) => void;
}

const SORT_OPTIONS: { label: string; value: SortOption }[] = [
  { label: 'Featured', value: 'featured' },
  { label: 'Price: Low to High', value: 'price-low-high' },
  { label: 'Price: High to Low', value: 'price-high-low' },
  { label: 'Newest', value: 'newest' },
  { label: 'Most Popular', value: 'most-popular' },
];

function SkeletonCard() {
  return (
    <div className="animate-pulse rounded-xl border border-gray-200 bg-white overflow-hidden">
      <div className="aspect-square bg-gray-200" />
      <div className="p-4 space-y-3">
        <div className="h-5 w-3/4 rounded bg-gray-200" />
        <div className="space-y-2">
          <div className="h-3 w-full rounded bg-gray-100" />
          <div className="h-3 w-2/3 rounded bg-gray-100" />
        </div>
        <div className="flex gap-2">
          <div className="h-5 w-16 rounded bg-gray-100" />
          <div className="h-5 w-16 rounded bg-gray-100" />
        </div>
        <div className="h-6 w-24 rounded bg-gray-200" />
        <div className="flex gap-2 pt-2">
          <div className="h-8 flex-1 rounded bg-gray-100" />
          <div className="h-8 flex-1 rounded bg-gray-200" />
        </div>
      </div>
    </div>
  );
}

export function ProductGrid({
  products,
  isLoading = false,
  sortBy,
  onSortChange,
  onQuickView,
}: ProductGridProps) {
  if (isLoading) {
    return (
      <div className="w-full">
        <div className="mb-6 flex items-center justify-between">
          <div className="h-5 w-32 animate-pulse rounded bg-gray-200" />
          <div className="h-9 w-44 animate-pulse rounded-lg bg-gray-200" />
        </div>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Toolbar */}
      <div className="mb-6 flex items-center justify-between gap-4">
        <p className="text-sm text-gray-500">
          <span className="font-semibold text-gray-900">
            {products.length}
          </span>{' '}
          {products.length === 1 ? 'product' : 'products'} found
        </p>

        <div className="relative">
          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value as SortOption)}
            className="appearance-none rounded-lg border border-gray-200 bg-white pl-3 pr-9 py-2 text-sm text-gray-700 font-medium shadow-sm transition-colors hover:border-gray-300 focus:border-tapcraft-blue focus:outline-none focus:ring-2 focus:ring-tapcraft-blue/20 cursor-pointer"
          >
            {SORT_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <svg
            className="pointer-events-none absolute right-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8 9l4-4 4 4m0 6l-4 4-4-4"
            />
          </svg>
        </div>
      </div>

      {/* Empty state */}
      {products.length === 0 && (
        <div className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-200 bg-gray-50/50 py-20 px-6 text-center">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
            <svg
              className="h-8 w-8 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-900">
            No products found
          </h3>
          <p className="mt-1.5 max-w-sm text-sm text-gray-500">
            Try adjusting your filters or search criteria to find what you are
            looking for.
          </p>
        </div>
      )}

      {/* Product grid */}
      {products.length > 0 && (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onQuickView={onQuickView}
            />
          ))}
        </div>
      )}
    </div>
  );
}
