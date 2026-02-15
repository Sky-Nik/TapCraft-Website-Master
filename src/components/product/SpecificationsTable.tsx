import type { ProductSpecifications } from '@/types/product';
import {
  formatDimensions,
  formatProductionTime,
} from '@/lib/utils/formatting';

interface SpecificationsTableProps {
  specifications: ProductSpecifications;
}

const SPEC_ICONS: Record<string, React.ReactNode> = {
  Material: (
    <svg className="h-4 w-4 text-tapcraft-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
    </svg>
  ),
  'NFC Chip': (
    <svg className="h-4 w-4 text-tapcraft-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.348 14.651a3.75 3.75 0 010-5.303m5.304 0a3.75 3.75 0 010 5.303m-7.425 2.122a6.75 6.75 0 010-9.546m9.546 0a6.75 6.75 0 010 9.546M5.106 18.894c-3.808-3.808-3.808-9.98 0-13.789m13.788 0c3.808 3.808 3.808 9.981 0 13.79" />
    </svg>
  ),
  Dimensions: (
    <svg className="h-4 w-4 text-tapcraft-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
    </svg>
  ),
  'Production Time': (
    <svg className="h-4 w-4 text-tapcraft-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
};

export function SpecificationsTable({ specifications }: SpecificationsTableProps) {
  const specs = [
    { label: 'Material', value: specifications.material },
    { label: 'NFC Chip', value: specifications.nfcChip },
    { label: 'Dimensions', value: formatDimensions(specifications.dimensions) },
    { label: 'Production Time', value: formatProductionTime(specifications.productionTime) },
  ];

  return (
    <div className="rounded-xl border border-gray-200 overflow-hidden">
      <div className="bg-gray-50/80 px-4 py-3 border-b border-gray-200">
        <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">
          Specifications
        </h3>
      </div>
      <div className="divide-y divide-gray-100">
        {specs.map((spec) => (
          <div
            key={spec.label}
            className="flex items-center justify-between px-4 py-3 hover:bg-gray-50/50 transition-colors"
          >
            <div className="flex items-center gap-2.5">
              {SPEC_ICONS[spec.label]}
              <span className="text-sm text-gray-600">{spec.label}</span>
            </div>
            <span className="text-sm font-semibold text-gray-900">{spec.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
