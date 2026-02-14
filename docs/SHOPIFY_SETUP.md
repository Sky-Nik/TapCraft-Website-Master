# Shopify Integration Setup Guide

This guide walks through connecting TapCraft Studio to a Shopify store via the Storefront API. The site uses GraphQL queries through `graphql-request` to fetch product and collection data at build time and on the client.

---

## Table of Contents

1. [Creating a Shopify Store](#1-creating-a-shopify-store)
2. [Enabling the Headless Sales Channel](#2-enabling-the-headless-sales-channel)
3. [Configuring Storefront API Permissions](#3-configuring-storefront-api-permissions)
4. [Getting API Credentials](#4-getting-api-credentials)
5. [Adding Credentials to .env.local](#5-adding-credentials-to-envlocal)
6. [Adding Products with Correct Structure](#6-adding-products-with-correct-structure)
7. [Creating Collections](#7-creating-collections)
8. [Testing the Integration](#8-testing-the-integration)
9. [Troubleshooting](#9-troubleshooting)

---

## 1. Creating a Shopify Store

1. Go to [shopify.com](https://www.shopify.com/) and sign up for an account.
2. Choose the **Basic** plan or higher (a development store on a Shopify Partner account also works for testing).
3. Complete the initial store setup wizard. The store name does not need to match "TapCraft Studio" -- it is only used internally.
4. Note your store domain. It will look like `your-store-name.myshopify.com`.

> **Tip:** If you are a developer building for a client, create a free [Shopify Partner](https://www.shopify.com/partners) account and use a development store. This gives you unlimited testing time without a paid plan.

---

## 2. Enabling the Headless Sales Channel

TapCraft Studio uses the **Headless** sales channel (also called the Hydrogen sales channel) to access the Storefront API.

1. In Shopify Admin, go to **Settings > Apps and sales channels**.
2. Click **Shopify App Store** (or visit [apps.shopify.com](https://apps.shopify.com/)).
3. Search for **Headless** and install the official Shopify Headless channel.
4. Once installed, it will appear in your sales channels list.

If the Headless channel is not available, you can alternatively create a **Custom App**:

1. Go to **Settings > Apps and sales channels > Develop apps**.
2. Click **Allow custom app development** if prompted.
3. Click **Create an app** and give it a name like "TapCraft Storefront".
4. This provides the same Storefront API access.

---

## 3. Configuring Storefront API Permissions

After installing the Headless channel or creating a custom app:

1. Open the app/channel configuration.
2. Navigate to the **Storefront API** section.
3. Enable the following scopes:

| Permission                  | Scope String                        | Purpose                              |
| --------------------------- | ----------------------------------- | ------------------------------------ |
| **Read products**           | `unauthenticated_read_products`     | Fetch product titles, descriptions, variants, pricing, images |
| **Read product listings**   | `unauthenticated_read_product_listings` | Access products assigned to the sales channel |
| **Read collections**        | `unauthenticated_read_collections`  | Fetch collection data for category pages |

4. Click **Save** to apply the permissions.

> **Important:** Only Storefront API permissions are needed. You do not need Admin API access for the frontend.

---

## 4. Getting API Credentials

After saving permissions, retrieve two values:

### Storefront API Access Token

1. In your Headless channel or custom app, go to **API credentials**.
2. Copy the **Storefront API access token**. This is a public token safe to use in client-side code.

### Store Domain

Your store domain follows the format:

```
your-store-name.myshopify.com
```

If you have a custom domain connected to Shopify, you still need the `.myshopify.com` domain for API calls.

---

## 5. Adding Credentials to .env.local

Create a `.env.local` file in the project root (this file is gitignored by default):

```bash
# Shopify Storefront API
NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN=your-store-name.myshopify.com
NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN=your-storefront-api-access-token
```

Both variables use the `NEXT_PUBLIC_` prefix so they are available in client-side code. The Storefront API access token is designed to be public -- it only grants read access to published data.

After creating or modifying `.env.local`, restart the development server:

```bash
npm run dev
```

---

## 6. Adding Products with Correct Structure

Each product in Shopify should follow this structure for proper display on the TapCraft Studio site.

### Required Fields

| Field             | Where to Set               | Example                                        |
| ----------------- | -------------------------- | ---------------------------------------------- |
| **Title**         | Product title              | "NFC Business Card - Matte Black"              |
| **Description**   | Product description (HTML) | Rich text describing the product               |
| **Product type**  | Product organization       | `NFC Business Card`, `NFC Tag`, `NFC Keychain` |
| **Tags**          | Product organization       | `business`, `premium`, `matte`, `custom`       |
| **Price**         | Variant pricing            | 29.95                                          |
| **Compare at price** | Variant pricing         | 39.95 (optional, shows original price)         |

### Images

Upload images in the following order (the first image becomes the main/featured image):

1. **Main product image** -- Clean product shot on white/neutral background
2. **Hover/alternate image** -- Different angle or in-use shot
3. **Detail shots** -- Close-ups of texture, NFC chip, printing detail
4. **Lifestyle images** -- Product in real-world context

See [ASSET_GUIDE.md](./ASSET_GUIDE.md) for image specifications.

### Metafields

Custom data is stored in metafields. Create these under **Settings > Custom data > Products**:

| Metafield Name     | Namespace & Key              | Type            | Example Value           |
| ------------------ | ---------------------------- | --------------- | ----------------------- |
| **Material**       | `custom.material`            | Single line text | "Premium PVC with Soft-Touch Matte Laminate" |
| **NFC Chip**       | `custom.nfc_chip`            | Single line text | "NTAG215 (540 bytes)"   |
| **Production Time**| `custom.production_time`     | Single line text | "3-5 business days"     |
| **Dimensions**     | `custom.dimensions`          | Single line text | "85.6mm x 54mm x 0.8mm (CR80 standard)" |

To create metafield definitions:

1. Go to **Settings > Custom data > Products**.
2. Click **Add definition** for each metafield above.
3. Set the namespace and key exactly as shown.
4. Once defined, you can fill in values on each product's edit page under the **Metafields** section.

### Variants

If a product comes in multiple options (e.g., different colors or quantities):

1. Add option names like "Color" or "Pack Size".
2. Set individual pricing per variant if needed.
3. Upload variant-specific images and link them to the correct variant.

---

## 7. Creating Collections

Create the following collections to organize products for the catalogue page:

### Required Collections

| Collection Title     | Handle (auto-generated) | Description                              |
| -------------------- | ----------------------- | ---------------------------------------- |
| **Business Cards**   | `business-cards`        | NFC-enabled business cards for professionals |
| **Event Products**   | `event-products`        | NFC wristbands, badges, and event accessories |
| **Retail Tags**      | `retail-tags`           | NFC tags for retail, packaging, and inventory |
| **Prototypes**       | `prototypes`            | Sample and prototype NFC products         |

### Creating a Collection

1. Go to **Products > Collections** in Shopify Admin.
2. Click **Create collection**.
3. Enter the title exactly as shown above (the URL handle is generated automatically).
4. Add a description for SEO.
5. Set the collection type:
   - **Manual** -- Choose specific products to include.
   - **Automated** -- Use conditions (e.g., Product type equals "NFC Business Card").
6. Upload a collection image (recommended: 1200x800px).
7. Assign the collection to the Headless/custom app sales channel.

> **Important:** Collections must be published to the Headless sales channel to be visible via the Storefront API.

---

## 8. Testing the Integration

### Quick Verification

1. Start the dev server: `npm run dev`
2. Open the browser console and check for any Shopify API errors.
3. Navigate to the catalogue page and verify products load.
4. Click into a product to verify detail data (metafields, images, pricing).

### GraphQL Explorer

You can test queries directly using the Shopify Storefront API GraphQL explorer:

```
https://your-store-name.myshopify.com/api/2024-01/graphql.json
```

Send a POST request with your Storefront API token in the `X-Shopify-Storefront-Access-Token` header:

```bash
curl -X POST \
  https://your-store-name.myshopify.com/api/2024-01/graphql.json \
  -H "Content-Type: application/json" \
  -H "X-Shopify-Storefront-Access-Token: your-token-here" \
  -d '{"query": "{ shop { name } }"}'
```

A successful response returns your shop name:

```json
{
  "data": {
    "shop": {
      "name": "Your Store Name"
    }
  }
}
```

---

## 9. Troubleshooting

### Products not appearing

- **Check sales channel assignment.** Products and collections must be published to the Headless/custom app sales channel. Go to each product, scroll to **Sales channels and apps**, and confirm the channel is listed.
- **Check product status.** Products must have a status of **Active** (not Draft).
- **Verify API token.** Ensure `NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN` is correct and has not been regenerated.

### "Access denied" or 401 errors

- The Storefront API token may be invalid or expired. Regenerate it in the app settings.
- Confirm the required scopes (Read products, Read product listings, Read collections) are enabled.

### Metafields not returning data

- Metafield definitions must be created under **Settings > Custom data > Products** before they appear in Storefront API responses.
- Verify the namespace and key match exactly (e.g., `custom.material`, not `Material`).
- Metafields must have the **Storefront API access** checkbox enabled in their definition.

### Empty collections

- Confirm products are assigned to the collection.
- Confirm the collection is published to the Headless sales channel.
- For automated collections, verify the conditions match at least one product.

### CORS errors in the browser

- The Storefront API should not produce CORS errors when called from any origin. If you see CORS issues, you may be accidentally calling the Admin API instead of the Storefront API.
- Ensure your API endpoint uses `/api/2024-01/graphql.json` (Storefront) and not `/admin/api/...` (Admin).

### Environment variables not loading

- Ensure the file is named exactly `.env.local` (not `.env` or `.env.local.txt`).
- Restart the dev server after any changes to `.env.local`.
- Variables must start with `NEXT_PUBLIC_` to be available in client-side code.

### Rate limiting

- The Storefront API has generous rate limits (no cost-based throttling for most queries). If you hit limits during development, you are likely running an unusually high number of requests. Add caching or reduce polling frequency.
