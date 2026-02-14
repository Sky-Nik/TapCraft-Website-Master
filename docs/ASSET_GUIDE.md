# Asset Import Guide

This document specifies the image, video, and 3D model assets needed for TapCraft Studio, including dimensions, formats, and optimization guidelines.

---

## Table of Contents

1. [Homepage Assets](#homepage-assets)
2. [Product Assets](#product-assets)
3. [3D Model Assets](#3d-model-assets)
4. [Favicon and Logo](#favicon-and-logo)
5. [Open Graph and Social Images](#open-graph-and-social-images)
6. [File Naming Conventions](#file-naming-conventions)
7. [Optimization Tips](#optimization-tips)

---

## Homepage Assets

### Hero Video

| Property    | Specification                |
| ----------- | ---------------------------- |
| Resolution  | 1920 x 1080 px (16:9)       |
| Format      | MP4 (H.264 codec)           |
| Duration    | 10-20 seconds, loopable      |
| File size   | Under 8 MB                   |
| Location    | `public/videos/hero.mp4`    |

Provide a WebM version as a fallback for better compression:

```
public/videos/hero.mp4
public/videos/hero.webm
```

Content: Hands tapping an NFC card, product showcase, or brand montage. Keep the focal area centered -- text overlay will appear on top.

### Value Proposition Icons

| Property    | Specification                |
| ----------- | ---------------------------- |
| Size        | 80 x 80 px                  |
| Format      | SVG (preferred) or PNG       |
| Style       | Monochrome or two-tone, consistent stroke width |
| Location    | `public/icons/`              |

Required icons:

```
public/icons/icon-custom-design.svg
public/icons/icon-nfc-chip.svg
public/icons/icon-fast-delivery.svg
public/icons/icon-premium-quality.svg
```

### Process Illustrations

| Property    | Specification                |
| ----------- | ---------------------------- |
| Size        | 120 x 120 px                |
| Format      | SVG (preferred) or PNG       |
| Style       | Consistent with value prop icons |
| Location    | `public/illustrations/`      |

Required illustrations for the "How It Works" section:

```
public/illustrations/step-design.svg
public/illustrations/step-review.svg
public/illustrations/step-production.svg
public/illustrations/step-delivery.svg
```

### Studio Photo

| Property    | Specification                |
| ----------- | ---------------------------- |
| Size        | 1200 x 800 px               |
| Format      | WebP (with JPG fallback)     |
| Content     | Workshop/studio environment  |
| Location    | `public/images/studio.webp`  |

### Testimonial Photos

| Property    | Specification                |
| ----------- | ---------------------------- |
| Size        | 300 x 300 px                |
| Format      | WebP (with JPG fallback)     |
| Style       | Circular crop, centered face |
| Location    | `public/images/testimonials/` |

```
public/images/testimonials/testimonial-01.webp
public/images/testimonials/testimonial-02.webp
public/images/testimonials/testimonial-03.webp
```

---

## Product Assets

Product images are managed in Shopify and delivered via the Storefront API CDN. Follow these specifications when uploading to Shopify.

### Main Product Image

| Property    | Specification                |
| ----------- | ---------------------------- |
| Size        | 1200 x 1200 px (1:1 square) |
| Format      | WebP or PNG                  |
| Background  | White or transparent         |
| Usage       | Catalogue grid, product hero |

Shopify automatically generates multiple sizes. Upload at the full 1200x1200 resolution.

### Hover Image

| Property    | Specification                |
| ----------- | ---------------------------- |
| Size        | 1200 x 1200 px (1:1 square) |
| Format      | WebP or PNG                  |
| Content     | Alternate angle, back of card, or in-use shot |
| Position    | Upload as the second image in the product gallery |

### Detail Shots

| Property    | Specification                |
| ----------- | ---------------------------- |
| Size        | 1200 x 1200 px (1:1 square) |
| Format      | WebP or PNG                  |
| Content     | Close-up of texture, NFC chip, print quality, edge detail |
| Count       | 2-4 per product              |

### Lifestyle Images

| Property    | Specification                |
| ----------- | ---------------------------- |
| Size        | 1200 x 800 px or 1200 x 1200 px |
| Format      | WebP or JPG                  |
| Content     | Product in real-world use (networking event, retail counter, etc.) |
| Count       | 1-2 per product              |

---

## 3D Model Assets

TapCraft Studio uses Three.js via `@react-three/fiber` and `@react-three/drei` for interactive 3D product previews.

### Model Format

| Property        | Specification                     |
| --------------- | --------------------------------- |
| Format          | GLB (binary glTF)                 |
| Triangle count  | 5,000 - 20,000 triangles          |
| Materials       | PBR (Physically Based Rendering)  |
| Texture size    | 1024 x 1024 px or 2048 x 2048 px |
| File size       | Under 2 MB per model              |
| Location        | `public/models/`                  |

### Required Models

```
public/models/business-card.glb
public/models/nfc-tag.glb
public/models/keychain.glb
```

### PBR Material Setup

Each model should use standard PBR material channels:

- **Base Color (Albedo)** -- Product color and print design
- **Normal Map** -- Surface texture detail (matte vs. glossy grain)
- **Roughness** -- 0.3-0.5 for glossy finishes, 0.7-0.9 for matte
- **Metalness** -- 0.0 for plastic/PVC, 0.8-1.0 for metal cards

### Model Guidelines

- Orient the model so the front face points toward positive Z.
- Center the model at the origin (0, 0, 0).
- Scale to real-world dimensions in meters (a standard card is ~0.086m x 0.054m).
- Bake any complex lighting into textures. The scene uses simple environment lighting.
- Embed textures inside the GLB file rather than referencing external files.

---

## Favicon and Logo

### Favicon Set

Generate a complete favicon set and place files in `public/`:

```
public/favicon.ico          (32x32, ICO format)
public/favicon-16x16.png    (16x16)
public/favicon-32x32.png    (32x32)
public/apple-touch-icon.png (180x180)
public/android-chrome-192x192.png (192x192)
public/android-chrome-512x512.png (512x512)
public/site.webmanifest
```

Use [realfavicongenerator.net](https://realfavicongenerator.net/) or a similar tool to generate all sizes from a single source image.

### Logo Variations

| Variation        | Size / Format         | Location                      |
| ---------------- | --------------------- | ----------------------------- |
| Full logo (dark) | SVG, any width        | `public/logo/tapcraft-full-dark.svg`  |
| Full logo (light)| SVG, any width        | `public/logo/tapcraft-full-light.svg` |
| Icon only        | SVG, square           | `public/logo/tapcraft-icon.svg`       |
| Logo for email   | PNG, 300px wide       | `public/logo/tapcraft-email.png`      |

---

## Open Graph and Social Images

### Default OG Image

| Property    | Specification                |
| ----------- | ---------------------------- |
| Size        | 1200 x 630 px               |
| Format      | JPG or PNG                   |
| Content     | Brand name, tagline, product image, brand colors |
| Location    | `public/og-image.jpg`        |

### Per-Page OG Images (Optional)

Create page-specific OG images for key pages:

```
public/og/og-home.jpg        (1200x630)
public/og/og-catalogue.jpg   (1200x630)
public/og/og-customize.jpg   (1200x630)
public/og/og-contact.jpg     (1200x630)
```

---

## File Naming Conventions

Follow these rules for all asset file names:

- **Lowercase only** -- `hero-video.mp4`, not `Hero-Video.mp4`
- **Hyphens for word separation** -- `business-card.glb`, not `business_card.glb` or `businessCard.glb`
- **Descriptive names** -- `nfc-card-matte-black-front.webp`, not `IMG_4521.webp`
- **Include variant if applicable** -- `business-card-gold.glb`, `business-card-black.glb`
- **Number sequences with zero-padding** -- `testimonial-01.webp`, `testimonial-02.webp`
- **No spaces or special characters** -- Only use `a-z`, `0-9`, and `-`

### Directory Structure

```
public/
  favicon.ico
  og-image.jpg
  icons/
    icon-custom-design.svg
    icon-nfc-chip.svg
    ...
  illustrations/
    step-design.svg
    step-review.svg
    ...
  images/
    studio.webp
    testimonials/
      testimonial-01.webp
      ...
  logo/
    tapcraft-full-dark.svg
    tapcraft-full-light.svg
    tapcraft-icon.svg
    tapcraft-email.png
  models/
    business-card.glb
    nfc-tag.glb
    keychain.glb
  og/
    og-home.jpg
    og-catalogue.jpg
    ...
  videos/
    hero.mp4
    hero.webm
```

---

## Optimization Tips

### Images

- **Use WebP as the primary format.** It provides 25-35% smaller files than JPG at equivalent quality. Keep JPG fallbacks only where needed for email or legacy support.
- **Compress aggressively.** Use quality 80-85 for photos. Tools: [Squoosh](https://squoosh.app/), [sharp](https://sharp.pixelplumbing.com/), or ImageOptim.
- **Resize before uploading.** Never upload a 4000px image when 1200px is the maximum display size.
- **Use responsive images.** Next.js `<Image>` handles srcset generation automatically for local images. Shopify CDN provides URL-based resizing (append `_800x` to the filename portion of the URL).
- **Strip metadata.** Remove EXIF data from photos to reduce file size and avoid leaking location data.

### Videos

- **Encode with H.264 (MP4) as primary and VP9 (WebM) as fallback.** H.264 has universal support; VP9/WebM offers better compression.
- **Target bitrate:** 2-4 Mbps for 1080p hero video.
- **Use two-pass encoding** for the best quality-to-size ratio.
- **Remove audio track** if the video plays silently (saves 10-20% file size).
- **Tool:** ffmpeg command for optimized silent hero video:

```bash
ffmpeg -i source.mp4 -an -c:v libx264 -crf 23 -preset slow -movflags +faststart public/videos/hero.mp4
ffmpeg -i source.mp4 -an -c:v libvpx-vp9 -crf 30 -b:v 0 public/videos/hero.webm
```

### 3D Models

- **Use Draco compression** for GLB files. This reduces geometry data by 80-90%.
- **Apply compression via gltf-transform:**

```bash
npx @gltf-transform/cli optimize input.glb output.glb --compress draco
```

- **Reduce triangle count** where detail is not visible. A business card model should be under 5,000 triangles.
- **Use texture atlasing** if a model has multiple materials -- combine textures into a single map where possible.
- **Limit texture resolution** to 1024x1024 for small objects. Use 2048x2048 only when close-up detail is needed.
- **Test load times.** Aim for under 1 second on a fast 3G connection for each model.
