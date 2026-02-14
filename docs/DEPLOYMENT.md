# Deployment Guide

This guide covers deploying TapCraft Studio to production. Vercel is the recommended platform for Next.js applications.

---

## Table of Contents

1. [Vercel Deployment (Recommended)](#vercel-deployment-recommended)
2. [Netlify Alternative](#netlify-alternative)
3. [Pre-Deployment Checklist](#pre-deployment-checklist)
4. [Domain Configuration](#domain-configuration)
5. [Post-Deployment Verification](#post-deployment-verification)

---

## Vercel Deployment (Recommended)

### Step 1: Push to Git

Ensure your code is in a Git repository hosted on GitHub, GitLab, or Bitbucket:

```bash
git add .
git commit -m "Prepare for deployment"
git push origin main
```

### Step 2: Connect to Vercel

1. Go to [vercel.com](https://vercel.com/) and sign in (or create an account).
2. Click **Add New > Project**.
3. Import your Git repository.
4. Vercel auto-detects the Next.js framework. Confirm the following settings:
   - **Framework Preset:** Next.js
   - **Root Directory:** `./` (default)
   - **Build Command:** `next build` (default)
   - **Output Directory:** `.next` (default)

### Step 3: Configure Environment Variables

Before deploying, add all required environment variables in the Vercel project settings:

1. Go to **Settings > Environment Variables**.
2. Add the following variables for **Production**, **Preview**, and **Development** environments:

| Variable                                        | Value                              | Required |
| ----------------------------------------------- | ---------------------------------- | -------- |
| `NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN`              | `your-store.myshopify.com`         | Yes      |
| `NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN`   | Your Storefront API access token   | Yes      |

> **Note:** If you are running without Shopify (using mock data), you can skip these variables. The site will fall back to placeholder/mock data.

### Step 4: Deploy

1. Click **Deploy**.
2. Vercel builds the project and provides a deployment URL (e.g., `tapcraft-studio.vercel.app`).
3. Every push to the `main` branch triggers an automatic production deployment.
4. Pull requests get automatic preview deployments.

### Step 5: Verify

Open the deployment URL and walk through the [Post-Deployment Verification](#post-deployment-verification) checklist.

---

## Netlify Alternative

Netlify can also host Next.js applications using the `@netlify/plugin-nextjs` plugin.

### Step 1: Install the Netlify Plugin

```bash
npm install -D @netlify/plugin-nextjs
```

### Step 2: Create `netlify.toml`

Create a `netlify.toml` file in the project root:

```toml
[build]
  command = "npm run build"
  publish = ".next"

[[plugins]]
  package = "@netlify/plugin-nextjs"
```

### Step 3: Deploy via Netlify Dashboard

1. Go to [app.netlify.com](https://app.netlify.com/) and sign in.
2. Click **Add new site > Import an existing project**.
3. Connect your Git repository.
4. Add environment variables under **Site settings > Environment variables** (same variables as the Vercel setup).
5. Click **Deploy site**.

### Limitations

- Some Next.js features (e.g., Middleware, ISR) may behave slightly differently on Netlify compared to Vercel.
- Image optimization uses Netlify's image CDN rather than the built-in Next.js optimizer.
- Always test thoroughly after deploying to Netlify.

---

## Pre-Deployment Checklist

Run through this checklist before every production deployment.

### Environment Variables

- [ ] `NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN` is set correctly.
- [ ] `NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN` is set correctly.
- [ ] No `.env.local` secrets are hardcoded in the source code.

### Shopify Connection

- [ ] Products are published to the Headless sales channel.
- [ ] Collections are published to the Headless sales channel.
- [ ] Product metafields (material, nfc_chip, production_time, dimensions) are populated.
- [ ] At least one product exists in each collection.

### Images and Assets

- [ ] All placeholder components are replaced with real images (or intentionally left as placeholders).
- [ ] Product images are uploaded to Shopify at 1200x1200 resolution.
- [ ] OG image (`public/og-image.jpg`) exists and is 1200x630.
- [ ] Favicon set is complete in `public/`.
- [ ] Hero video is optimized and under 8 MB.

### SEO

- [ ] Page titles and descriptions are set in `layout.tsx` metadata.
- [ ] Open Graph metadata is configured (title, description, image, locale).
- [ ] `robots.txt` exists in `public/` (or is generated via Next.js config).
- [ ] `sitemap.xml` is generated (use `next-sitemap` or a custom solution).

### Performance

- [ ] Run `npm run build` locally -- no build errors.
- [ ] Run `npm run lint` -- no linting errors.
- [ ] Test on mobile viewport (375px width).
- [ ] Check Lighthouse score (aim for 90+ on Performance, Accessibility, SEO).
- [ ] Verify 3D models load without errors and are under 2 MB each.

---

## Domain Configuration

### Using a Custom Domain on Vercel

1. Go to your Vercel project **Settings > Domains**.
2. Add your domain (e.g., `tapcraftstudio.com`).
3. Vercel provides DNS records to configure:
   - **Option A (recommended):** Point your domain's nameservers to Vercel.
   - **Option B:** Add an A record (`76.76.21.21`) and a CNAME for `www`.
4. Vercel automatically provisions and renews SSL certificates.

### DNS Records

| Type  | Name  | Value                  |
| ----- | ----- | ---------------------- |
| A     | @     | `76.76.21.21`          |
| CNAME | www   | `cname.vercel-dns.com` |

### Using a Custom Domain on Netlify

1. Go to **Site settings > Domain management > Add custom domain**.
2. Follow the prompts to configure DNS:
   - Point your domain's nameservers to Netlify, or
   - Add a CNAME record pointing to your Netlify site URL.
3. Netlify handles SSL via Let's Encrypt automatically.

### Shopify Domain Note

The Shopify store domain used for API calls (`your-store.myshopify.com`) is separate from your website domain. The Storefront API always uses the `.myshopify.com` domain regardless of any custom domains on either Shopify or your hosting platform.

---

## Post-Deployment Verification

After deploying, verify each of the following:

### Functional Checks

- [ ] Homepage loads without errors.
- [ ] Navigation links work (Home, Catalogue, Customize, Contact).
- [ ] Mobile menu opens and closes correctly.
- [ ] Footer links and newsletter form render properly.
- [ ] Products load from Shopify (or mock data renders correctly).
- [ ] Product detail pages display all information (images, pricing, metafields).
- [ ] 3D model viewer loads and responds to interaction.
- [ ] Contact form submits without errors.

### Performance Checks

- [ ] Open browser DevTools > Network tab. Confirm no failed requests (4xx/5xx).
- [ ] Check the Console tab for JavaScript errors.
- [ ] Run a Lighthouse audit on the live URL.
- [ ] Test on a real mobile device (not just browser DevTools emulation).

### SEO Checks

- [ ] Visit `https://yourdomain.com/og-image.jpg` -- confirms OG image is accessible.
- [ ] Use the [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/) to verify OG tags.
- [ ] Use the [Twitter Card Validator](https://cards-dev.twitter.com/validator) to verify Twitter card tags.
- [ ] Check `https://yourdomain.com/robots.txt` is accessible.
- [ ] Check `https://yourdomain.com/sitemap.xml` is accessible.

### SSL and Security

- [ ] Site loads over HTTPS with no mixed content warnings.
- [ ] HTTP requests redirect to HTTPS.
- [ ] `www` subdomain redirects to the apex domain (or vice versa, pick one).
