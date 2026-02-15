import { NextResponse } from 'next/server';
import { GraphQLClient } from 'graphql-request';
import { gql } from 'graphql-request';

const TEST_QUERY = gql`
	query GetFirstFiveProducts {
		products(first: 5) {
			edges {
				node {
					id
					title
					handle
					description
					productType
					tags
					vendor
					availableForSale					
          priceRange {
						minVariantPrice {
							amount
							currencyCode
						}
						maxVariantPrice {
							amount
							currencyCode
						}
					}
					images(first: 1) {
						edges {
							node {
								url
								altText
							}
						}
					}
					metafields(
						identifiers: [
							{ namespace: "custom", key: "material" }
							{ namespace: "custom", key: "nfc_chip" }
							{ namespace: "custom", key: "production_time" }
							{ namespace: "custom", key: "dimensions" }
						]
					) {
						namespace
						key
						value
					}
				}
			}
		}
	}
`;

export async function GET() {
  const timestamp = new Date().toISOString();

  try {
    // Get environment variables
    const domain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN;
    const storefrontAccessToken =
      process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN;

    // Validate credentials
    if (!domain || !storefrontAccessToken) {
      return NextResponse.json(
        {
          success: false,
          timestamp,
          productCount: 0,
          sampleProduct: null,
          error:
            'Missing Shopify credentials. Ensure NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN and NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN are set.',
        },
        { status: 500 }
      );
    }

    // Create GraphQL client
    const endpoint = `https://${domain}/api/2024-01/graphql.json`;
    const client = new GraphQLClient(endpoint, {
      headers: {
        'X-Shopify-Storefront-Access-Token': storefrontAccessToken,
        'Content-Type': 'application/json',
      },
    });

    // Fetch products
    const data = await client.request<{
      products: {
        edges: Array<{
          node: any;
        }>;
      };
    }>(TEST_QUERY);

    const products = data.products.edges.map((edge) => edge.node);
    const productCount = products.length;
    const sampleProduct = products || null;

    return NextResponse.json({
      success: true,
      timestamp,
      productCount,
      sampleProduct,
      error: null,
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        timestamp,
        productCount: 0,
        sampleProduct: null,
        error: error?.message || 'Unknown error occurred',
      },
      { status: 500 }
    );
  }
}
