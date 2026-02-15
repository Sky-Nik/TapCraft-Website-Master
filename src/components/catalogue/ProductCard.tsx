import Link from 'next/link';
import Image from 'next/image';
import type { Product } from '@/types/product';
import {
  formatPrice,
  formatProductionTime,
} from '@/lib/utils/formatting';
import { ImagePlaceholder } from '@/components/shared/ImagePlaceholder';
import { Badge } from '@/components/shared/Badge';
import { Button } from '@/components/shared/Button';

interface ProductCardProps {
  product: Product;
}

function getProductBadge(
  tags: string[],
): { label: string; variant: 'new' | 'best-seller' } | null {
  if (tags.some((t) => t.toLowerCase() === 'new'))
    return { label: 'New', variant: 'new' };
  if (tags.some((t) => t.toLowerCase().includes('best')))
    return { label: 'Best Seller', variant: 'best-seller' };
  return null;
}

function isPlaceholderImage(src: string): boolean {
  return src.startsWith('/images/');
}

export function ProductCard({ product }: ProductCardProps) {
  const badge = getProductBadge(product.tags);
  const prodTime = formatProductionTime(product.specifications.productionTime);
  const mainImage = product.images[0];
  const isPlaceholder = !mainImage || isPlaceholderImage(mainImage.src);

  return (
    <Link
      href={`/catalogue/${product.slug}`}
      className="group relative flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-white transition-[box-shadow,border-color] duration-300 hover:shadow-lg hover:shadow-gray-200/50 hover:border-gray-300 no-underline"
    >
      {/* Image area */}
      <div className="relative aspect-square overflow-hidden bg-gray-50">
        <div className="h-full w-full transition-transform duration-500 group-hover:scale-105">
          {isPlaceholder ? (
            <ImagePlaceholder
              width={800}
              height={800}
              name={product.name}
              type="3d"
              className="h-full w-full rounded-none border-0"
            />
          ) : (
            <Image
              src={mainImage.src}
              alt={mainImage.alt}
              width={mainImage.width}
              height={mainImage.height}
              className="h-full w-full object-cover"
            />
          )}
        </div>

        {/* Badge */}
        {badge && (
          <div className="absolute top-3 left-3 z-10">
            <Badge variant={badge.variant}>{badge.label}</Badge>
          </div>
        )}

        {/* View Details overlay on hover */}
        <div className="absolute inset-0 flex items-center justify-center bg-black/0 opacity-0 transition-[background-color,opacity] duration-300 group-hover:bg-black/10 group-hover:opacity-100">
          <span className="inline-flex items-center gap-2 rounded-lg bg-tapcraft-blue px-4 py-2 text-sm font-semibold text-white shadow-sm translate-y-2 opacity-0 transition-[transform,opacity] duration-300 group-hover:translate-y-0 group-hover:opacity-100">
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
                d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
              />
            </svg>
            View Details
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-4">
        {/* Title */}
        <h3 className="text-base font-semibold text-gray-900 leading-snug">
          {product.name}
        </h3>

        {/* Description */}
        <p className="mt-1.5 text-sm text-gray-500 leading-relaxed line-clamp-2">
          {product.shortDescription}
        </p>

        {/* Spec badges */}
        <div className="mt-3 flex flex-wrap gap-1.5">
          <span className="inline-flex items-center gap-1 rounded-md bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-600">
            <svg
              className="h-3 w-3"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9.348 14.651a3.75 3.75 0 010-5.303m5.304 0a3.75 3.75 0 010 5.303m-7.425 2.122a6.75 6.75 0 010-9.546m9.546 0a6.75 6.75 0 010 9.546M5.106 18.894c-3.808-3.808-3.808-9.98 0-13.789m13.788 0c3.808 3.808 3.808 9.981 0 13.79"
              />
            </svg>
            {product.specifications.nfcChip}
          </span>
          <span className="inline-flex items-center gap-1 rounded-md bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-600">
            <svg
              className="h-3 w-3"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            {prodTime}
          </span>
        </div>

        {/* Price */}
        <div className="mt-3 pt-3 border-t border-gray-100">
          <p className="text-lg font-semibold text-tapcraft-blue">
            {formatPrice(product.price.min, product.price.currency)}
            {product.price.min !== product.price.max && (
              <span className="text-gray-400 font-normal text-sm">
                {' '}
                &ndash;{' '}
                {formatPrice(product.price.max, product.price.currency)}
              </span>
            )}
          </p>
        </div>

        {/* Actions */}
        <div className="mt-3 flex gap-2">
          <span className="inline-flex items-center justify-center flex-1 h-8 px-3 text-sm rounded-md font-semibold text-tapcraft-blue bg-transparent hover:bg-tapcraft-blue/10 transition-colors duration-200">
            View Details
          </span>
          <Button variant="primary" size="sm" className="flex-1" asChild>
            <span>Customize</span>
          </Button>
        </div>
      </div>
    </Link>
  );
}
