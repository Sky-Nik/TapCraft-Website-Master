import { GraphQLClient } from 'graphql-request';
import type {
  ShopifyCart,
  ShopifyCartCreateResponse,
  ShopifyCartLinesAddResponse,
  ShopifyCartLinesUpdateResponse,
  ShopifyCartLinesRemoveResponse,
  ShopifyCartResponse,
} from '@/lib/shopify/types';
import {
  CART_CREATE,
  CART_LINES_ADD,
  CART_LINES_UPDATE,
  CART_LINES_REMOVE,
  GET_CART,
} from '@/lib/shopify/queries';

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
 * Create a new Shopify cart, optionally with initial line items.
 */
export async function createCart(
  lines?: { merchandiseId: string; quantity: number }[]
): Promise<ShopifyCart | null> {
  if (!client) {
    console.info('[TapCraft] Shopify not configured, cart API unavailable.');
    return null;
  }

  try {
    const response = await client.request<ShopifyCartCreateResponse>(
      CART_CREATE,
      { lines: lines || [] }
    );
    return response.cartCreate.cart;
  } catch (error) {
    console.error('[TapCraft] Failed to create cart:', error);
    return null;
  }
}

/**
 * Add line items to an existing cart.
 */
export async function addToCart(
  cartId: string,
  variantId: string,
  quantity: number = 1
): Promise<ShopifyCart | null> {
  if (!client) {
    console.info('[TapCraft] Shopify not configured, cart API unavailable.');
    return null;
  }

  try {
    const response = await client.request<ShopifyCartLinesAddResponse>(
      CART_LINES_ADD,
      {
        cartId,
        lines: [{ merchandiseId: variantId, quantity }],
      }
    );
    return response.cartLinesAdd.cart;
  } catch (error) {
    console.error('[TapCraft] Failed to add to cart:', error);
    return null;
  }
}

/**
 * Update a line item's quantity in the cart.
 */
export async function updateCartItem(
  cartId: string,
  lineId: string,
  quantity: number
): Promise<ShopifyCart | null> {
  if (!client) {
    console.info('[TapCraft] Shopify not configured, cart API unavailable.');
    return null;
  }

  try {
    const response = await client.request<ShopifyCartLinesUpdateResponse>(
      CART_LINES_UPDATE,
      {
        cartId,
        lines: [{ id: lineId, quantity }],
      }
    );
    return response.cartLinesUpdate.cart;
  } catch (error) {
    console.error('[TapCraft] Failed to update cart item:', error);
    return null;
  }
}

/**
 * Remove line items from the cart.
 */
export async function removeFromCart(
  cartId: string,
  lineId: string
): Promise<ShopifyCart | null> {
  if (!client) {
    console.info('[TapCraft] Shopify not configured, cart API unavailable.');
    return null;
  }

  try {
    const response = await client.request<ShopifyCartLinesRemoveResponse>(
      CART_LINES_REMOVE,
      {
        cartId,
        lineIds: [lineId],
      }
    );
    return response.cartLinesRemove.cart;
  } catch (error) {
    console.error('[TapCraft] Failed to remove from cart:', error);
    return null;
  }
}

/**
 * Fetch an existing cart by ID.
 */
export async function getCart(cartId: string): Promise<ShopifyCart | null> {
  if (!client) {
    console.info('[TapCraft] Shopify not configured, cart API unavailable.');
    return null;
  }

  try {
    const response = await client.request<ShopifyCartResponse>(GET_CART, {
      cartId,
    });
    return response.cart;
  } catch (error) {
    console.error('[TapCraft] Failed to fetch cart:', error);
    return null;
  }
}
