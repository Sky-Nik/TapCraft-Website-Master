import { GraphQLClient } from 'graphql-request';
import type {
  ShopifyCart,
  ShopifyCartResponse,
  ShopifyCartCreateResponse,
  ShopifyCartLinesAddResponse,
  ShopifyCartLinesUpdateResponse,
  ShopifyCartLinesRemoveResponse,
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

const endpoint = domain
  ? `https://${domain}/api/2024-01/graphql.json`
  : '';

function getClient(): GraphQLClient | null {
  if (!domain || !storefrontAccessToken) return null;
  return new GraphQLClient(endpoint, {
    headers: {
      'X-Shopify-Storefront-Access-Token': storefrontAccessToken,
      'Content-Type': 'application/json',
    },
  });
}

export async function createCart(
  variantId: string,
  quantity: number = 1,
): Promise<ShopifyCart | null> {
  const client = getClient();
  if (!client) return null;

  try {
    const data = await client.request<ShopifyCartCreateResponse>(CART_CREATE, {
      lines: [{ merchandiseId: variantId, quantity }],
    });
    return data.cartCreate.cart;
  } catch (error) {
    console.error('[TapCraft] Failed to create cart:', error);
    return null;
  }
}

export async function addToCart(
  cartId: string,
  variantId: string,
  quantity: number = 1,
): Promise<ShopifyCart | null> {
  const client = getClient();
  if (!client) return null;

  try {
    const data = await client.request<ShopifyCartLinesAddResponse>(
      CART_LINES_ADD,
      {
        cartId,
        lines: [{ merchandiseId: variantId, quantity }],
      },
    );
    return data.cartLinesAdd.cart;
  } catch (error) {
    console.error('[TapCraft] Failed to add to cart:', error);
    return null;
  }
}

export async function updateCartLine(
  cartId: string,
  lineId: string,
  quantity: number,
): Promise<ShopifyCart | null> {
  const client = getClient();
  if (!client) return null;

  try {
    const data = await client.request<ShopifyCartLinesUpdateResponse>(
      CART_LINES_UPDATE,
      {
        cartId,
        lines: [{ id: lineId, quantity }],
      },
    );
    return data.cartLinesUpdate.cart;
  } catch (error) {
    console.error('[TapCraft] Failed to update cart line:', error);
    return null;
  }
}

export async function removeCartLine(
  cartId: string,
  lineId: string,
): Promise<ShopifyCart | null> {
  const client = getClient();
  if (!client) return null;

  try {
    const data = await client.request<ShopifyCartLinesRemoveResponse>(
      CART_LINES_REMOVE,
      {
        cartId,
        lineIds: [lineId],
      },
    );
    return data.cartLinesRemove.cart;
  } catch (error) {
    console.error('[TapCraft] Failed to remove cart line:', error);
    return null;
  }
}

export async function getCart(
  cartId: string,
): Promise<ShopifyCart | null> {
  const client = getClient();
  if (!client) return null;

  try {
    const data = await client.request<ShopifyCartResponse>(GET_CART, {
      cartId,
    });
    return data.cart;
  } catch (error) {
    console.error('[TapCraft] Failed to fetch cart:', error);
    return null;
  }
}

export interface MappedCartLine {
  lineId: string;
  variantId: string;
  title: string;
  variantTitle: string;
  handle: string;
  quantity: number;
  price: number;
  totalPrice: number;
  image: string | null;
}

export function mapCartLines(cart: ShopifyCart): MappedCartLine[] {
  return cart.lines.edges.map((edge) => {
    const line = edge.node;
    return {
      lineId: line.id,
      variantId: line.merchandise.id,
      title: line.merchandise.product.title,
      variantTitle: line.merchandise.title,
      handle: line.merchandise.product.handle,
      quantity: line.quantity,
      price: parseFloat(line.merchandise.price.amount),
      totalPrice: parseFloat(line.cost.totalAmount.amount),
      image: line.merchandise.image?.url ?? null,
    };
  });
}
