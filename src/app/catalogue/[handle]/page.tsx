import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getProductByHandle, getAllProducts } from '@/lib/shopify/client';
import { transformShopifyProduct, transformShopifyProducts } from '@/lib/shopify/transformer';
import { PRODUCTS, getProductBySlug, getProductsByCategory } from '@/lib/constants/products';
import type { Product } from '@/types/product';
import { formatPriceRange } from '@/lib/utils/formatting';
import { LightHeader } from '@/components/layout/LightHeader';
import { Badge } from '@/components/shared/Badge';
import { ImageGallery } from '@/components/product/ImageGallery';
import { SpecificationsTable } from '@/components/product/SpecificationsTable';
import { RelatedProducts } from '@/components/product/RelatedProducts';
import { AddToCartButton } from '@/components/cart/AddToCartButton';

interface PageProps {
  params: Promise<{ handle: string }>;
}

async function getProduct(handle: string): Promise<Product | null> {
  // Try Shopify first
  const shopifyResponse = await getProductByHandle(handle);
  if (shopifyResponse?.product) {
    return transformShopifyProduct(shopifyResponse.product);
  }

  // Fall back to mock data
  const mockProduct = getProductBySlug(handle);
  return mockProduct || null;
}

async function getRelatedProducts(product: Product): Promise<Product[]> {
  // Try Shopify first
  const shopifyResponse = await getAllProducts();
  if (shopifyResponse) {
    const allProducts = transformShopifyProducts(shopifyResponse);
    return allProducts
      .filter((p) => p.category === product.category && p.id !== product.id)
      .slice(0, 3);
  }

  // Fall back to mock data
  return getProductsByCategory(product.category)
    .filter((p) => p.id !== product.id)
    .slice(0, 3);
}

export async function generateStaticParams() {
  // Try Shopify first
  const shopifyResponse = await getAllProducts();
  if (shopifyResponse) {
    const products = transformShopifyProducts(shopifyResponse);
    return products.map((product) => ({ handle: product.slug }));
  }

  // Fall back to mock data
  return PRODUCTS.map((product) => ({ handle: product.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { handle } = await params;
  const product = await getProduct(handle);

  if (!product) {
    return {
      title: 'Product Not Found',
    };
  }

  const mainImage = product.images[0];

  return {
    title: `${product.name} | TapCraft Studio`,
    description: product.shortDescription,
    keywords: product.tags.join(', '),
    openGraph: {
      title: product.name,
      description: product.shortDescription,
      images: mainImage ? [{ url: mainImage.src }] : [],
      type: 'website',
      locale: 'en_AU',
      siteName: 'TapCraft Studio',
    },
    twitter: {
      card: 'summary_large_image',
      title: product.name,
      description: product.shortDescription,
      images: mainImage ? [mainImage.src] : [],
    },
  };
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { handle } = await params;
  const product = await getProduct(handle);

  if (!product) {
    notFound();
  }

  const relatedProducts = await getRelatedProducts(product);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    image: product.images.map((img) => img.src),
    brand: {
      '@type': 'Brand',
      name: 'TapCraft Studio',
    },
    offers: {
      '@type': 'AggregateOffer',
      lowPrice: product.price.min,
      highPrice: product.price.max,
      priceCurrency: 'AUD',
      availability: product.inStock
        ? 'https://schema.org/InStock'
        : 'https://schema.org/OutOfStock',
    },
  };

  return (
    <>
      <LightHeader />

      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="min-h-screen bg-gray-50/30">
        {/* Breadcrumb */}
        <div className="bg-white border-b border-gray-200">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-3">
            <nav className="flex items-center gap-2 text-sm text-gray-500">
              <Link href="/catalogue" className="hover:text-gray-900 transition-colors no-underline text-gray-500">
                Catalogue
              </Link>
              <svg className="h-4 w-4 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
              <span className="text-gray-900 font-medium">{product.name}</span>
            </nav>
          </div>
        </div>

        {/* Product Hero */}
        <div className="bg-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
              {/* Left: Image Gallery */}
              <ImageGallery images={product.images} media={product.media} productName={product.name} />

              {/* Right: Product Info */}
              <div className="flex flex-col">
                {/* Category */}
                <p className="text-xs font-semibold uppercase tracking-wider text-tapcraft-blue mb-2">
                  {product.category}
                </p>

                {/* Title */}
                <h1 className="text-3xl sm:text-4xl font-normal text-gray-900 tracking-tight leading-tight">
                  {product.name}
                </h1>

                {/* Tags */}
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {product.tags.map((tag) => (
                    <Badge key={tag} variant="muted">
                      {tag}
                    </Badge>
                  ))}
                </div>

                {/* Price */}
                <div className="mt-5">
                  <p className="text-2xl font-semibold text-tapcraft-blue">
                    {formatPriceRange(product.price.min, product.price.max, product.price.currency)}
                  </p>
                  <p className="mt-1 text-sm text-gray-500">
                    Price per unit. Quantity discounts available.
                  </p>
                </div>

                {/* Short Description */}
                <p className="mt-5 text-base text-gray-600 leading-relaxed">
                  {product.shortDescription}
                </p>

                {/* Specifications */}
                <div className="mt-6">
                  <SpecificationsTable specifications={product.specifications} />
                </div>

                {/* Quantity Discount Info */}
                {/* <div className="mt-5 rounded-xl bg-tapcraft-light/60 border border-tapcraft-blue/10 p-4">
                  <div className="flex items-start gap-2.5">
                    <svg className="mt-0.5 h-5 w-5 shrink-0 text-tapcraft-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 6h.008v.008H6V6z" />
                    </svg>
                    <div>
                      <p className="text-sm font-semibold text-tapcraft-blue">Quantity Discounts</p>
                      <p className="mt-0.5 text-sm text-gray-600">
                        25+ units: 10% off &middot; 50+ units: 15% off &middot; 100+ units: 25% off
                      </p>
                    </div>
                  </div>
                </div> */}

                {/* CTA Buttons */}
                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                  {product.variants.length > 0 && (
                    <AddToCartButton
                      variantId={product.variants[0].id}
                      disabled={!product.inStock}
                      className="flex-1"
                    />
                  )}
                  <Link
                    href={`/customize?base=${product.slug}`}
                    className="inline-flex items-center justify-center flex-1 h-12 px-8 text-base font-semibold rounded-lg transition-colors duration-200 no-underline border-2 border-tapcraft-blue text-tapcraft-blue bg-transparent hover:bg-tapcraft-blue hover:text-white"
                  >
                    Customize
                  </Link>
                </div>

                {/* Stock status */}
                <div className="mt-4 flex items-center gap-2">
                  <span className={`h-2 w-2 rounded-full ${product.inStock ? 'bg-emerald-500' : 'bg-red-500'}`} />
                  <span className="text-sm text-gray-600">
                    {product.inStock ? 'In Stock — Made to order' : 'Currently unavailable'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Full Description */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="max-w-3xl">
            <p className="text-tapcraft-blue text-sm font-semibold tracking-widest uppercase mb-3">
              About This Product
            </p>
            <h2 className="text-2xl sm:text-3xl font-normal text-gray-900 tracking-tight mb-6">
              Product Details
            </h2>
            {product.descriptionHtml ? (
              <div
                className="prose prose-gray prose-lg max-w-none prose-headings:font-semibold prose-headings:tracking-tight prose-p:text-gray-600 prose-p:leading-relaxed prose-a:text-tapcraft-blue prose-a:no-underline hover:prose-a:underline prose-strong:text-gray-900 prose-ul:text-gray-600 prose-ol:text-gray-600 prose-li:marker:text-tapcraft-blue"
                dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}
              />
            ) : (
              <div className="prose prose-gray prose-lg max-w-none">
                <p className="text-gray-600 leading-relaxed whitespace-pre-line">
                  {product.description}
                </p>
              </div>
            )}
          </div>

          {/* Related Products */}
          <RelatedProducts products={relatedProducts} />
        </div>
      </div>
    </>
  );
}
