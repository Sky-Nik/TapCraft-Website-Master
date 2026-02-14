# TapCraft Studio

A premium e-commerce storefront for custom NFC cards, tags, and accessories. Built with Next.js 16, React 19, and the Shopify Storefront API. Based in Melbourne, Australia.

---

## Quick Start

### Prerequisites

- **Node.js** 18.17 or later
- **npm** 9 or later (included with Node.js)
- A Shopify store with Storefront API access (optional -- the site works with mock data)

### Installation

```bash
# Clone the repository
git clone <your-repo-url> tapcraft
cd tapcraft

# Install dependencies
npm install
```

### Environment Setup

Create a `.env.local` file in the project root:

```bash
# Shopify Storefront API (optional)
NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN=your-store.myshopify.com
NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN=your-storefront-api-access-token
```

If you omit these variables, the site runs with mock/placeholder data.

### Running the Dev Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Other Commands

```bash
npm run build    # Production build
npm run start    # Start production server
npm run lint     # Run ESLint
```

---

## Project Structure

```
tapcraft/
  public/               # Static assets (images, icons, models, videos)
  src/
    app/                 # Next.js App Router pages and layouts
      globals.css        # Global styles and Tailwind theme tokens
      layout.tsx         # Root layout with Header, Footer, metadata
      page.tsx           # Homepage
    components/
      layout/            # Header, Footer, MobileNav
      shared/            # Reusable UI components (Button, Card, Badge, etc.)
    lib/
      utils/             # Utility functions (cn helper, formatting)
  docs/                  # Project documentation
  next.config.ts         # Next.js configuration
  tailwind / postcss     # Tailwind CSS v4 via PostCSS
  tsconfig.json          # TypeScript configuration
```

---

## Shopify Integration

TapCraft Studio connects to Shopify via the **Storefront API** using GraphQL (`graphql-request`). This provides:

- Product listings with images, pricing, and variants
- Product metafields (material, NFC chip type, production time, dimensions)
- Collections for organizing products by category
- Real-time inventory and pricing from Shopify

### Works Without Shopify

The site is designed to run without a Shopify connection. When environment variables are not set, components display mock/placeholder data. This allows frontend development to proceed independently of Shopify setup.

For full Shopify setup instructions, see [docs/SHOPIFY_SETUP.md](docs/SHOPIFY_SETUP.md).

---

## Key Technologies

| Technology                     | Purpose                              |
| ------------------------------ | ------------------------------------ |
| **Next.js 16**                 | React framework with App Router      |
| **React 19**                   | UI library                           |
| **TypeScript**                 | Type safety                          |
| **Tailwind CSS v4**            | Utility-first styling                |
| **Framer Motion**              | Page transitions and animations      |
| **Three.js / React Three Fiber** | 3D product previews                |
| **graphql-request**            | Shopify Storefront API client        |
| **React Hook Form + Zod**      | Form handling and validation         |
| **Montserrat**                 | Primary typeface (via next/font)     |

---

## Current Status

### Completed

- Project scaffolding and configuration (Next.js 16, TypeScript, Tailwind CSS v4)
- Root layout with metadata, Montserrat font, and responsive structure
- Header component with desktop navigation, mobile menu trigger, and scroll-aware styling
- Mobile navigation drawer (MobileNav)
- Footer with quick links, social links, newsletter signup, and company info
- Reusable shared components: Button, Card, Badge, LoadingSpinner, ImagePlaceholder
- Utility library (`cn` helper using clsx + tailwind-merge)
- Custom color theme (tapcraft-blue, tapcraft-dark, tapcraft-light, tapcraft-accent)
- ESLint configuration

### Placeholder / In Progress

- Homepage content (currently shows the default Next.js starter page)
- Catalogue page with product grid
- Product detail pages
- Customize/configurator page
- Contact page with form
- Shopify API integration layer (GraphQL queries and data fetching)
- 3D product viewer component
- Real product images and assets (ImagePlaceholder component is ready for swap-in)

---

## TODO (Production Readiness)

- [ ] Build homepage sections (hero, value props, process, testimonials, CTA)
- [ ] Create catalogue page with collection filtering and product grid
- [ ] Create product detail page with image gallery, pricing, metafields, and add-to-cart
- [ ] Build customize/configurator page
- [ ] Build contact page with React Hook Form + Zod validation
- [ ] Implement Shopify Storefront API client (`lib/shopify/`)
- [ ] Write GraphQL queries for products, collections, and product details
- [ ] Integrate 3D product viewer with React Three Fiber
- [ ] Replace all ImagePlaceholder instances with real assets
- [ ] Add OG images and complete favicon set
- [ ] Create `robots.txt` and generate `sitemap.xml`
- [ ] Add loading states and error boundaries
- [ ] Performance audit and Lighthouse optimization
- [ ] Cross-browser testing (Chrome, Firefox, Safari, Edge)
- [ ] Mobile device testing
- [ ] Deploy to Vercel

---

## Documentation

- [Shopify Setup Guide](docs/SHOPIFY_SETUP.md) -- Connecting to Shopify and configuring products
- [Asset Import Guide](docs/ASSET_GUIDE.md) -- Image, video, and 3D model specifications
- [Deployment Guide](docs/DEPLOYMENT.md) -- Deploying to Vercel or Netlify

---

## Troubleshooting

### `npm run dev` fails to start

- Ensure Node.js 18.17+ is installed: `node --version`
- Delete `node_modules` and `package-lock.json`, then run `npm install` again.
- Check for port conflicts on 3000: `lsof -i :3000`

### Styles not applying

- This project uses Tailwind CSS v4 with the PostCSS plugin. Ensure `@tailwindcss/postcss` is installed.
- Verify `postcss.config.mjs` exists and references the Tailwind plugin.
- Custom theme tokens (e.g., `tapcraft-blue`) are defined in `src/app/globals.css` under the `@theme inline` block.

### TypeScript errors

- Run `npm run lint` to identify issues.
- Ensure `@types/react`, `@types/react-dom`, and `@types/three` are installed.
- The project uses strict mode (`"strict": true` in `tsconfig.json`).

### Shopify data not loading

- Verify `.env.local` contains both `NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN` and `NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN`.
- Restart the dev server after changing environment variables.
- Check the browser console for API errors.
- See [docs/SHOPIFY_SETUP.md](docs/SHOPIFY_SETUP.md) for detailed troubleshooting.

### 3D models not rendering

- Ensure `.glb` files are placed in `public/models/`.
- Check the browser console for Three.js errors.
- Verify the model is under 2 MB and uses embedded textures.
- Test the model in [gltf-viewer.donmccurdy.com](https://gltf-viewer.donmccurdy.com/) to rule out model issues.

### Build fails on deployment

- Run `npm run build` locally first to reproduce the error.
- Common causes: missing environment variables, TypeScript errors, or import path issues.
- Ensure all dependencies are in `dependencies` (not just `devDependencies`) if they are used at runtime.
