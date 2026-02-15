import { randomBytes } from 'crypto';
import { GraphQLClient } from 'graphql-request';
import { CUSTOMER_CREATE } from '@/lib/shopify/queries';
import type { ShopifyCustomerCreateResponse } from '@/types/newsletter';

const domain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN;
const storefrontAccessToken =
  process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN;

function getClient(): GraphQLClient | null {
  if (!domain || !storefrontAccessToken) return null;
  return new GraphQLClient(`https://${domain}/api/2024-01/graphql.json`, {
    headers: {
      'X-Shopify-Storefront-Access-Token': storefrontAccessToken,
      'Content-Type': 'application/json',
    },
  });
}

export async function createNewsletterCustomer(
  email: string,
): Promise<{ success: boolean; message: string }> {
  const client = getClient();

  if (!client) {
    console.info('[TapCraft] Shopify not configured, mock newsletter signup for:', email);
    return { success: true, message: 'Thanks! Check your email to confirm.' };
  }

  try {
    const data = await client.request<ShopifyCustomerCreateResponse>(
      CUSTOMER_CREATE,
      {
        input: {
          email,
          password: randomBytes(32).toString('hex'),
          acceptsMarketing: true,
        },
      },
    );

    const { customer, customerUserErrors } = data.customerCreate;

    if (customerUserErrors.length > 0) {
      const isDuplicate = customerUserErrors.some(
        (err) => err.message.toLowerCase().includes('has already been taken'),
      );

      if (isDuplicate) {
        return { success: true, message: 'Thanks! Check your email to confirm.' };
      }

      console.error('[TapCraft] Customer creation errors:', customerUserErrors);
      return {
        success: false,
        message: customerUserErrors[0].message,
      };
    }

    if (customer) {
      return { success: true, message: 'Thanks! Check your email to confirm.' };
    }

    return { success: false, message: 'Something went wrong. Please try again.' };
  } catch (error) {
    console.error('[TapCraft] Newsletter signup error:', error);
    return { success: false, message: 'Something went wrong. Please try again.' };
  }
}
