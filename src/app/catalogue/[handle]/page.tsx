import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getProductByHandle, getAllProducts } from '@/lib/shopify/client';
import { transformShopifyProduct, transformShopifyProducts } from '@/lib/shopify/transformer';
import { PRODUCTS, getProductBySlug, getProductsByCategory } from '@/lib/constants/products';
import type { Product } from '@/types/product';
import { LightHeader } from '@/components/layout/LightHeader';
import { Badge } from '@/components/shared/Badge';
import { ImageGallery } from '@/components/product/ImageGallery';
import { SpecificationsTable } from '@/components/product/SpecificationsTable';
import { RelatedProducts } from '@/components/product/RelatedProducts';
import { ProductPurchaseSection } from '@/components/product/ProductPurchaseSection';

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

                {/* Short Description */}
                <p className="mt-5 text-base text-gray-600 leading-relaxed">
                  {product.shortDescription}
                </p>

                {/* Specifications */}
                <div className="mt-6">
                  <SpecificationsTable specifications={product.specifications} />
                </div>

                {/* Variant Selector, Price, CTA, Stock */}
                <ProductPurchaseSection
                  variants={product.variants}
                  inStock={product.inStock}
                />
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
