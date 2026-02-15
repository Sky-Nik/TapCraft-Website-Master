import Link from 'next/link';
import type { Product } from '@/types/product';
import { formatPrice } from '@/lib/utils/formatting';
import { ImagePlaceholder } from '@/components/shared/ImagePlaceholder';
import { Badge } from '@/components/shared/Badge';
import Image from 'next/image';

interface RelatedProductsProps {
  products: Product[];
}

function isPlaceholderImage(src: string): boolean {
  return src.startsWith('/images/');
}

export function RelatedProducts({ products }: RelatedProductsProps) {
  if (products.length === 0) return null;

  return (
    <section className="mt-16 sm:mt-20">
      <div className="mb-8">
        <p className="text-tapcraft-blue text-sm font-semibold tracking-widest uppercase mb-2">
          You May Also Like
        </p>
        <h2 className="text-2xl sm:text-3xl font-normal text-gray-900 tracking-tight">
          Related Products
        </h2>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => {
          const mainImage = product.images[0];
          const isPlaceholder = !mainImage || isPlaceholderImage(mainImage.src);

          return (
            <Link
              key={product.id}
              href={`/catalogue/${product.slug}`}
              className="group flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-white transition-all duration-300 hover:shadow-lg hover:shadow-gray-200/50 hover:border-gray-300 no-underline"
            >
              {/* Image */}
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
                {product.featured && (
                  <div className="absolute top-3 left-3 z-10">
                    <Badge variant="best-seller">Featured</Badge>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="flex flex-1 flex-col p-4">
                <h3 className="text-base font-semibold text-gray-900 leading-snug">
                  {product.name}
                </h3>
                <p className="mt-1.5 text-sm text-gray-500 leading-relaxed line-clamp-2">
                  {product.shortDescription}
                </p>
                <div className="mt-3 pt-3 border-t border-gray-100">
                  <p className="text-lg font-semibold text-tapcraft-blue">
                    {formatPrice(product.price.min, product.price.currency)}
                    {product.price.min !== product.price.max && (
                      <span className="text-gray-400 font-normal text-sm">
                        {' '}&ndash;{' '}
                        {formatPrice(product.price.max, product.price.currency)}
                      </span>
                    )}
                  </p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
