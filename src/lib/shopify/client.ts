import { GraphQLClient } from 'graphql-request';

import type {
  ShopifyProductsResponse,
  ShopifyProductByHandleResponse,
  ShopifyCollectionsResponse,
} from '@/lib/shopify/types';
import {
  GET_ALL_PRODUCTS,
  GET_PRODUCT_BY_HANDLE,
  GET_COLLECTIONS,
} from '@/lib/shopify/queries';
import { PRODUCTS } from '@/lib/constants/products';

const domain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN;
const storefrontAccessToken =
  process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN;

const hasShopifyConfig = Boolean(domain && storefrontAccessToken);

const endpoint = domain
  ? `https://${domain}/api/2024-01/graphql.json`
  : '';

const client = hasShopifyConfig
  ? new GraphQLClient(endpoint, {
      headers: {
        'X-Shopify-Storefront-Access-Token': storefrontAccessToken!,
        'Content-Type': 'application/json',
      },
    })
  : null;

/**
 * Execute a Shopify Storefront API query.
 * Falls back to mock data when Shopify credentials are not configured.
 */
async function shopifyFetch<T>(
  query: string,
  variables?: Record<string, unknown>,
): Promise<T> {
  if (!client) {
    throw new Error(
      'Shopify client is not configured. Ensure NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN and NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN are set.',
    );
  }

  return client.request<T>(query, variables);
}

/**
 * Fetch all products from Shopify, falling back to mock data.
 */
export async function getAllProducts(): Promise<ShopifyProductsResponse | null> {
  if (!hasShopifyConfig) {
    console.info('[TapCraft] Shopify not configured, using mock product data.');
    return null;
  }

  try {
    return await shopifyFetch<ShopifyProductsResponse>(GET_ALL_PRODUCTS, {
      first: 20,
    });
  } catch (error) {
    console.error('[TapCraft] Failed to fetch products from Shopify:', error);
    return null;
  }
}

/**
 * Fetch a single product by handle from Shopify, falling back to mock data.
 */
export async function getProductByHandle(
  handle: string,
): Promise<ShopifyProductByHandleResponse | null> {
  if (!hasShopifyConfig) {
    console.info(
      `[TapCraft] Shopify not configured, looking up mock data for handle: ${handle}`,
    );
    return null;
  }

  try {
    return await shopifyFetch<ShopifyProductByHandleResponse>(
      GET_PRODUCT_BY_HANDLE,
      { handle },
    );
  } catch (error) {
    console.error(
      `[TapCraft] Failed to fetch product "${handle}" from Shopify:`,
      error,
    );
    return null;
  }
}

/**
 * Fetch all collections from Shopify.
 */
export async function getCollections(): Promise<ShopifyCollectionsResponse | null> {
  if (!hasShopifyConfig) {
    console.info(
      '[TapCraft] Shopify not configured, collections unavailable.',
    );
    return null;
  }

  try {
    return await shopifyFetch<ShopifyCollectionsResponse>(GET_COLLECTIONS, {
      first: 10,
    });
  } catch (error) {
    console.error(
      '[TapCraft] Failed to fetch collections from Shopify:',
      error,
    );
    return null;
  }
}

/**
 * Get mock products as a fallback when Shopify is not available.
 */
export function getMockProducts() {
  return PRODUCTS;
}
