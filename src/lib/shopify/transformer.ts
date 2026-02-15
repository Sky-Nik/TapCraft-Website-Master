import type { Product } from '@/types/product';
import type { ShopifyProduct } from '@/lib/shopify/types';

/**
 * Parse dimensions string like "45mm x 45mm x 5mm" to structured object
 */
function parseDimensions(dimensionsString: string | undefined): {
  width: number;
  height: number;
  depth: number;
  unit: 'mm';
} {
  if (!dimensionsString) {
    return { width: 0, height: 0, depth: 0, unit: 'mm' };
  }

  // Match pattern like "45mm x 45mm x 5mm" or "45 x 45 x 5"
  const match = dimensionsString.match(
    /(\d+(?:\.\d+)?)\s*(?:mm)?\s*x\s*(\d+(?:\.\d+)?)\s*(?:mm)?\s*x\s*(\d+(?:\.\d+)?)/i,
  );

  if (match) {
    return {
      width: parseFloat(match[1]),
      height: parseFloat(match[2]),
      depth: parseFloat(match[3]),
      unit: 'mm',
    };
  }

  return { width: 0, height: 0, depth: 0, unit: 'mm' };
}

/**
 * Parse production time string like "3-5 business days" to structured object
 */
function parseProductionTime(timeString: string | undefined): {
  min: number;
  max: number;
  unit: 'business days';
} {
  if (!timeString) {
    return { min: 3, max: 5, unit: 'business days' };
  }

  // Match patterns like "3-5 business days" or "3-5 days" or "5 days"
  const rangeMatch = timeString.match(/(\d+)\s*-\s*(\d+)/);
  if (rangeMatch) {
    return {
      min: parseInt(rangeMatch[1]),
      max: parseInt(rangeMatch[2]),
      unit: 'business days',
    };
  }

  const singleMatch = timeString.match(/(\d+)/);
  if (singleMatch) {
    const days = parseInt(singleMatch[1]);
    return { min: days, max: days, unit: 'business days' };
  }

  return { min: 3, max: 5, unit: 'business days' };
}

/**
 * Get metafield value by key from Shopify metafields array
 */
function getMetafieldValue(
  metafields: Array<{ namespace: string; key: string; value: string } | null>,
  key: string,
): string | undefined {
  const field = metafields.find(
    (m) => m && m.namespace === 'custom' && m.key === key,
  );
  return field?.value;
}

/**
 * Generate a short description from full description
 */
function generateShortDescription(description: string): string {
  if (!description) return '';
  
  // Take first sentence or first 150 characters
  const firstSentence = description.split(/[.!?]/)[0];
  if (firstSentence && firstSentence.length <= 150) {
    return firstSentence.trim() + '.';
  }
  
  return description.slice(0, 150).trim() + '...';
}

/**
 * Transform Shopify product to app Product type
 */
export function transformShopifyProduct(shopifyProduct: ShopifyProduct): Product {
  const metafields = shopifyProduct.metafields || [];
  
  // Extract metafield values
  const material = getMetafieldValue(metafields, 'material') || 'PLA';
  const nfcChip = getMetafieldValue(metafields, 'nfc_chip') || 'NTAG215';
  const dimensionsStr = getMetafieldValue(metafields, 'dimensions');
  const productionTimeStr = getMetafieldValue(metafields, 'production_time');

  // Parse complex fields
  const dimensions = parseDimensions(dimensionsStr);
  const productionTime = parseProductionTime(productionTimeStr);

  // Convert prices from string to number
  const minPrice = parseFloat(shopifyProduct.priceRange.minVariantPrice.amount);
  const maxPrice = parseFloat(shopifyProduct.priceRange.maxVariantPrice.amount);

  // Transform images
  const images = shopifyProduct.images.edges.map((edge) => ({
    src: edge.node.url,
    alt: edge.node.altText || shopifyProduct.title,
    width: edge.node.width,
    height: edge.node.height,
  }));

  // Use productType as category, or default to the slug
  const category = shopifyProduct.productType || shopifyProduct.handle;

  // Check if product has "featured" tag
  const featured = shopifyProduct.tags.some(
    (tag) => tag.toLowerCase() === 'featured',
  );

  return {
    id: shopifyProduct.id,
    name: shopifyProduct.title,
    slug: shopifyProduct.handle,
    description: shopifyProduct.description || '',
    shortDescription: generateShortDescription(shopifyProduct.description || ''),
    price: {
      min: minPrice,
      max: maxPrice,
      currency: 'AUD',
    },
    specifications: {
      material,
      nfcChip,
      dimensions,
      productionTime,
    },
    images,
    category,
    tags: shopifyProduct.tags,
    featured,
    inStock: shopifyProduct.availableForSale,
    createdAt: new Date().toISOString(), // Shopify doesn't expose createdAt in Storefront API
    updatedAt: new Date().toISOString(), // Shopify doesn't expose updatedAt in Storefront API
  };
}

/**
 * Transform array of Shopify products to app Product type
 */
export function transformShopifyProducts(
  shopifyResponse: { products: { edges: Array<{ node: ShopifyProduct }> } } | null,
): Product[] {
  if (!shopifyResponse) return [];

  return shopifyResponse.products.edges.map((edge) =>
    transformShopifyProduct(edge.node),
  );
}
