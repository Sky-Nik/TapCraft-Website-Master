'use client';

import { useRef } from 'react';
import { cn } from '@/lib/utils/formatting';
import { MOCK_CATEGORIES } from '@/lib/constants/products';

interface CategoryNavProps {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

const allCategory = { slug: 'all', name: 'All Products' };

export function CategoryNav({
  activeCategory,
  onCategoryChange,
}: CategoryNavProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const categories = [
    allCategory,
    ...MOCK_CATEGORIES.map((c) => ({ slug: c.slug, name: c.name })),
  ];

  return (
    <div className="relative">
      {/* Fade edges for scroll indication */}
      <div className="pointer-events-none absolute left-0 top-0 bottom-0 z-10 w-6 bg-gradient-to-r from-white to-transparent md:hidden" />
      <div className="pointer-events-none absolute right-0 top-0 bottom-0 z-10 w-6 bg-gradient-to-l from-white to-transparent md:hidden" />

      <div
        ref={scrollRef}
        className="flex gap-2 overflow-x-auto scrollbar-hide pb-1 px-1 -mx-1 snap-x snap-mandatory md:snap-none md:flex-wrap"
      >
        {categories.map((category) => {
          const isActive = activeCategory === category.slug;
          return (
            <button
              key={category.slug}
              onClick={() => onCategoryChange(category.slug)}
              className={cn(
                'shrink-0 snap-start rounded-full px-5 py-2.5 text-sm font-medium transition-[background-color,color,box-shadow] duration-200 whitespace-nowrap cursor-pointer',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-tapcraft-blue focus-visible:ring-offset-2',
                isActive
                  ? 'bg-tapcraft-blue text-white shadow-md shadow-tapcraft-blue/25'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-900',
              )}
            >
              {category.name}
            </button>
          );
        })}
      </div>
    </div>
  );
}
