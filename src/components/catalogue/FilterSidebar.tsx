'use client';

import { useState, useEffect, useCallback } from 'react';
import { cn } from '@/lib/utils/formatting';
import { Button } from '@/components/shared/Button';

export interface FilterState {
  industries: string[];
  priceRange: string | null;
  productionTime: string | null;
  materials: string[];
  nfcChipTypes: string[];
}

export const EMPTY_FILTERS: FilterState = {
  industries: [],
  priceRange: null,
  productionTime: null,
  materials: [],
  nfcChipTypes: [],
};

interface FilterSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
}

const INDUSTRIES = [
  'Real Estate',
  'Hospitality',
  'Retail',
  'Events',
  'Corporate',
  'Education',
];

const PRICE_RANGES = [
  { label: 'Under $100', value: '0-100' },
  { label: '$100 - $250', value: '100-250' },
  { label: '$250 - $500', value: '250-500' },
  { label: '$500+', value: '500-up' },
];

const PRODUCTION_TIMES = [
  { label: '1-3 days', value: '1-3' },
  { label: '3-5 days', value: '3-5' },
  { label: '5-7 days', value: '5-7' },
  { label: 'Custom timeline', value: 'custom' },
];

const MATERIALS = [
  'PLA',
  'PETG',
  'Resin',
  'Wood-filled PLA',
  'Carbon Fiber PLA',
];

const NFC_CHIP_TYPES = ['NTAG213', 'NTAG215', 'NTAG216'];

function CheckboxItem({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}) {
  return (
    <label className="flex items-center gap-3 cursor-pointer group py-1">
      <div
        className={cn(
          'flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded border-2 transition-colors duration-150',
          checked
            ? 'border-tapcraft-blue bg-tapcraft-blue'
            : 'border-gray-300 group-hover:border-gray-400',
        )}
      >
        {checked && (
          <svg
            className="h-3 w-3 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={3}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
        )}
      </div>
      <span className="text-sm text-gray-700 group-hover:text-gray-900">
        {label}
      </span>
    </label>
  );
}

function RadioItem({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <label className="flex items-center gap-3 cursor-pointer group py-1">
      <div
        className={cn(
          'flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full border-2 transition-colors duration-150',
          checked
            ? 'border-tapcraft-blue'
            : 'border-gray-300 group-hover:border-gray-400',
        )}
      >
        {checked && (
          <div className="h-2.5 w-2.5 rounded-full bg-tapcraft-blue" />
        )}
      </div>
      <span className="text-sm text-gray-700 group-hover:text-gray-900">
        {label}
      </span>
    </label>
  );
}

function FilterSection({
  title,
  children,
  defaultOpen = true,
}: {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border-b border-gray-200 py-4 last:border-b-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between text-left cursor-pointer"
      >
        <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">
          {title}
        </h3>
        <svg
          className={cn(
            'h-4 w-4 text-gray-500 transition-transform duration-200',
            isOpen && 'rotate-180',
          )}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>
      {isOpen && <div className="mt-3 space-y-1">{children}</div>}
    </div>
  );
}

export function FilterSidebar({
  isOpen,
  onClose,
  filters,
  onFiltersChange,
}: FilterSidebarProps) {
  const [localFilters, setLocalFilters] = useState<FilterState>(filters);

  useEffect(() => {
    setLocalFilters(filters);
  }, [filters]);

  const toggleArrayFilter = useCallback(
    (key: 'industries' | 'materials' | 'nfcChipTypes', value: string) => {
      setLocalFilters((prev) => {
        const arr = prev[key];
        const next = arr.includes(value)
          ? arr.filter((v) => v !== value)
          : [...arr, value];
        return { ...prev, [key]: next };
      });
    },
    [],
  );

  const handleApply = () => {
    onFiltersChange(localFilters);
    onClose();
  };

  const handleClear = () => {
    const cleared = { ...EMPTY_FILTERS };
    setLocalFilters(cleared);
    onFiltersChange(cleared);
  };

  const activeFilterCount =
    localFilters.industries.length +
    localFilters.materials.length +
    localFilters.nfcChipTypes.length +
    (localFilters.priceRange ? 1 : 0) +
    (localFilters.productionTime ? 1 : 0);

  const sidebarContent = (
    <div className="flex h-full flex-col">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-gray-200 px-5 py-4">
        <div className="flex items-center gap-2">
          <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
          {activeFilterCount > 0 && (
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-tapcraft-blue text-[10px] font-semibold text-white">
              {activeFilterCount}
            </span>
          )}
        </div>
        <button
          onClick={onClose}
          className="rounded-lg p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors lg:hidden cursor-pointer"
          aria-label="Close filters"
        >
          <svg
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      {/* Filter sections */}
      <div className="flex-1 overflow-y-auto px-5">
        <FilterSection title="Industry">
          {INDUSTRIES.map((industry) => (
            <CheckboxItem
              key={industry}
              label={industry}
              checked={localFilters.industries.includes(industry)}
              onChange={() => toggleArrayFilter('industries', industry)}
            />
          ))}
        </FilterSection>

        <FilterSection title="Price Range">
          <div className="grid grid-cols-2 gap-2">
            {PRICE_RANGES.map((range) => (
              <button
                key={range.value}
                onClick={() =>
                  setLocalFilters((prev) => ({
                    ...prev,
                    priceRange:
                      prev.priceRange === range.value ? null : range.value,
                  }))
                }
                className={cn(
                  'rounded-lg border px-3 py-2 text-xs font-medium transition-[border-color,background-color,color] duration-150 cursor-pointer',
                  localFilters.priceRange === range.value
                    ? 'border-tapcraft-blue bg-tapcraft-blue/5 text-tapcraft-blue'
                    : 'border-gray-200 text-gray-600 hover:border-gray-300 hover:bg-gray-50',
                )}
              >
                {range.label}
              </button>
            ))}
          </div>
        </FilterSection>

        <FilterSection title="Production Time">
          {PRODUCTION_TIMES.map((time) => (
            <RadioItem
              key={time.value}
              label={time.label}
              checked={localFilters.productionTime === time.value}
              onChange={() =>
                setLocalFilters((prev) => ({
                  ...prev,
                  productionTime:
                    prev.productionTime === time.value ? null : time.value,
                }))
              }
            />
          ))}
        </FilterSection>

        <FilterSection title="Material">
          {MATERIALS.map((material) => (
            <CheckboxItem
              key={material}
              label={material}
              checked={localFilters.materials.includes(material)}
              onChange={() => toggleArrayFilter('materials', material)}
            />
          ))}
        </FilterSection>

        <FilterSection title="NFC Chip Type">
          {NFC_CHIP_TYPES.map((chip) => (
            <CheckboxItem
              key={chip}
              label={chip}
              checked={localFilters.nfcChipTypes.includes(chip)}
              onChange={() => toggleArrayFilter('nfcChipTypes', chip)}
            />
          ))}
        </FilterSection>
      </div>

      {/* Footer actions */}
      <div className="border-t border-gray-200 px-5 py-4 space-y-2">
        <Button onClick={handleApply} className="w-full" size="md">
          Apply Filters
        </Button>
        <Button
          onClick={handleClear}
          variant="ghost"
          className="w-full"
          size="md"
        >
          Clear All
        </Button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden lg:block w-[280px] shrink-0">
        <div className="sticky top-28 rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden">
          {sidebarContent}
        </div>
      </aside>

      {/* Mobile overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={onClose}
          />
          <div className="absolute right-0 top-0 bottom-0 w-full max-w-sm bg-white shadow-2xl">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
}
