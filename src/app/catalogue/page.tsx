'use client';

import { useState, useMemo, useCallback } from 'react';
import type { Product } from '@/types/product';
import { MOCK_PRODUCTS, MOCK_CATEGORIES } from '@/lib/constants/products';
import { LightHeader } from '@/components/layout/LightHeader';
import { CategoryNav } from '@/components/catalogue/CategoryNav';
import {
  FilterSidebar,
  EMPTY_FILTERS,
  type FilterState,
} from '@/components/catalogue/FilterSidebar';
import { ProductGrid, type SortOption } from '@/components/catalogue/ProductGrid';
import { QuickView } from '@/components/catalogue/QuickView';
import { Button } from '@/components/shared/Button';

// Map category slugs to the category IDs used in product data
const CATEGORY_SLUG_TO_ID: Record<string, string> = {};
for (const cat of MOCK_CATEGORIES) {
  CATEGORY_SLUG_TO_ID[cat.slug] = cat.id;
}

// Map industry filter labels to tag keywords for matching
const INDUSTRY_TAG_MAP: Record<string, string[]> = {
  'Real Estate': ['real estate', 'agent'],
  Hospitality: ['hospitality'],
  Retail: ['retail', 'product tag', 'in-store'],
  Events: ['event', 'check-in'],
  Corporate: ['corporate', 'enterprise', 'prototype'],
  Education: ['education'],
};

function matchesPriceRange(
  price: { min: number; max: number },
  range: string,
): boolean {
  switch (range) {
    case '0-100':
      return price.min < 100;
    case '100-250':
      return price.min >= 100 && price.min <= 250;
    case '250-500':
      return price.min >= 250 && price.min <= 500;
    case '500-up':
      return price.max >= 500;
    default:
      return true;
  }
}

function matchesProductionTime(
  prodTime: { min: number; max: number },
  filter: string,
): boolean {
  switch (filter) {
    case '1-3':
      return prodTime.min <= 3;
    case '3-5':
      return prodTime.min >= 3 && prodTime.max <= 5;
    case '5-7':
      return prodTime.min >= 5 && prodTime.max <= 7;
    case 'custom':
      return prodTime.max > 7;
    default:
      return true;
  }
}

function sortProducts(products: Product[], sortBy: SortOption): Product[] {
  const sorted = [...products];
  switch (sortBy) {
    case 'featured':
      return sorted.sort((a, b) =>
        a.featured === b.featured ? 0 : a.featured ? -1 : 1,
      );
    case 'price-low-high':
      return sorted.sort((a, b) => a.price.min - b.price.min);
    case 'price-high-low':
      return sorted.sort((a, b) => b.price.min - a.price.min);
    case 'newest':
      return sorted.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      );
    case 'most-popular':
      return sorted.sort((a, b) =>
        a.featured === b.featured ? 0 : a.featured ? -1 : 1,
      );
    default:
      return sorted;
  }
}

export default function CataloguePage() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [filters, setFilters] = useState<FilterState>(EMPTY_FILTERS);
  const [sortBy, setSortBy] = useState<SortOption>('featured');
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(
    null,
  );
  const [quickViewOpen, setQuickViewOpen] = useState(false);

  const handleQuickView = useCallback((product: Product) => {
    setQuickViewProduct(product);
    setQuickViewOpen(true);
  }, []);

  const handleCloseQuickView = useCallback(() => {
    setQuickViewOpen(false);
  }, []);

  const filteredProducts = useMemo(() => {
    let results = [...MOCK_PRODUCTS];

    // Filter by category
    if (activeCategory !== 'all') {
      const categoryId = CATEGORY_SLUG_TO_ID[activeCategory];
      if (categoryId) {
        results = results.filter((p) => p.category === categoryId);
      }
    }

    // Filter by industry (match against product tags)
    if (filters.industries.length > 0) {
      results = results.filter((product) => {
        const productTagsLower = product.tags.map((t) => t.toLowerCase());
        return filters.industries.some((industry) => {
          const keywords = INDUSTRY_TAG_MAP[industry] || [];
          return keywords.some((keyword) =>
            productTagsLower.some((tag) => tag.includes(keyword)),
          );
        });
      });
    }

    // Filter by price range
    if (filters.priceRange) {
      results = results.filter((p) =>
        matchesPriceRange(p.price, filters.priceRange!),
      );
    }

    // Filter by production time
    if (filters.productionTime) {
      results = results.filter((p) =>
        matchesProductionTime(
          p.specifications.productionTime,
          filters.productionTime!,
        ),
      );
    }

    // Filter by material
    if (filters.materials.length > 0) {
      results = results.filter((p) =>
        filters.materials.includes(p.specifications.material),
      );
    }

    // Filter by NFC chip type
    if (filters.nfcChipTypes.length > 0) {
      results = results.filter((p) =>
        filters.nfcChipTypes.includes(p.specifications.nfcChip),
      );
    }

    // Sort
    return sortProducts(results, sortBy);
  }, [activeCategory, filters, sortBy]);

  const activeFilterCount =
    filters.industries.length +
    filters.materials.length +
    filters.nfcChipTypes.length +
    (filters.priceRange ? 1 : 0) +
    (filters.productionTime ? 1 : 0);

  return (
    <>
      <LightHeader />
      <div className="min-h-screen bg-gray-50/30">
        {/* Page header */}
        <div className="bg-white border-b border-gray-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
          <p className="text-tapcraft-blue text-sm font-semibold tracking-widest uppercase mb-3">
            Our Products
          </p>
          <h1 className="text-3xl sm:text-4xl font-normal text-gray-900 tracking-tight">
            Product Catalogue
          </h1>
          <p className="mt-2 text-base sm:text-lg text-gray-500 max-w-2xl">
            Browse our range of custom 3D-printed NFC products. Every item is
            made to order in our Melbourne studio and fully customisable to your
            brand.
          </p>
        </div>
      </div>

      {/* Category navigation */}
      <div className="bg-white border-b border-gray-100 sticky top-20 z-30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4">
          <CategoryNav
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
          />
        </div>
      </div>

      {/* Main content */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        {/* Mobile filter button */}
        <div className="mb-6 lg:hidden">
          <Button
            variant="secondary"
            size="md"
            onClick={() => setMobileFiltersOpen(true)}
            className="w-full sm:w-auto"
          >
            <svg
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75"
              />
            </svg>
            Filters
            {activeFilterCount > 0 && (
              <span className="ml-1 flex h-5 w-5 items-center justify-center rounded-full bg-tapcraft-blue text-[10px] font-semibold text-white">
                {activeFilterCount}
              </span>
            )}
          </Button>
        </div>

        {/* Layout: sidebar + grid */}
        <div className="flex gap-8">
          <FilterSidebar
            isOpen={mobileFiltersOpen}
            onClose={() => setMobileFiltersOpen(false)}
            filters={filters}
            onFiltersChange={setFilters}
          />

          <ProductGrid
            products={filteredProducts}
            sortBy={sortBy}
            onSortChange={setSortBy}
            onQuickView={handleQuickView}
          />
        </div>
      </div>

        {/* Quick view modal */}
        <QuickView
          product={quickViewProduct}
          isOpen={quickViewOpen}
          onClose={handleCloseQuickView}
        />
      </div>
    </>
  );
}
