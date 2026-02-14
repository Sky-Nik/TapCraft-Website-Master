import type { Product, ProductCategory } from '@/types/product';

export const PRODUCT_CATEGORIES: ProductCategory[] = [
  {
    id: 'business',
    name: 'Business Cards',
    slug: 'business-cards',
    description:
      'Smart NFC business cards for professionals who want to make a lasting impression.',
  },
  {
    id: 'events',
    name: 'Event Tags',
    slug: 'event-tags',
    description:
      'NFC-enabled tags for seamless event check-ins and attendee engagement.',
  },
  {
    id: 'retail',
    name: 'Retail Tags',
    slug: 'retail-tags',
    description:
      'Smart product tags for retail environments with embedded NFC technology.',
  },
  {
    id: 'corporate',
    name: 'Corporate Solutions',
    slug: 'corporate-solutions',
    description:
      'Custom NFC solutions for enterprise clients with branding and bulk options.',
  },
];

export const PRODUCTS: Product[] = [
  {
    id: 'prod_smart_business_card_black',
    name: 'Smart Business Card Black',
    slug: 'smart-business-card-black',
    description:
      'Elevate your networking with our premium 3D-printed NFC business card in sleek matte black. Tap to instantly share your contact details, portfolio, or LinkedIn profile. Crafted from durable PLA with an embedded NTAG215 chip for reliable, long-lasting performance.',
    shortDescription:
      'Premium matte black NFC business card with tap-to-share functionality.',
    price: {
      min: 15,
      max: 25,
      currency: 'AUD',
    },
    specifications: {
      material: 'PLA',
      nfcChip: 'NTAG215',
      dimensions: {
        width: 85,
        height: 55,
        depth: 2,
        unit: 'mm',
      },
      productionTime: {
        min: 3,
        max: 5,
        unit: 'business days',
      },
    },
    images: [
      {
        src: '/images/products/smart-business-card-black-01.jpg',
        alt: 'Smart Business Card Black - Front View',
        width: 1200,
        height: 800,
      },
      {
        src: '/images/products/smart-business-card-black-02.jpg',
        alt: 'Smart Business Card Black - Back View',
        width: 1200,
        height: 800,
      },
      {
        src: '/images/products/smart-business-card-black-03.jpg',
        alt: 'Smart Business Card Black - In Use',
        width: 1200,
        height: 800,
      },
    ],
    category: 'business',
    tags: ['business card', 'nfc', 'matte black', 'professional', 'networking'],
    featured: true,
    inStock: true,
    createdAt: '2025-01-15T00:00:00Z',
    updatedAt: '2025-06-01T00:00:00Z',
  },
  {
    id: 'prod_event_checkin_tag',
    name: 'Event Check-in Tag',
    slug: 'event-checkin-tag',
    description:
      'Streamline your event management with our NFC check-in tags. Attendees simply tap their phone to check in, access schedules, or connect with other guests. Available in round tag format with customizable branding and NTAG213 chip.',
    shortDescription:
      'NFC-enabled round tag for instant event check-ins and engagement.',
    price: {
      min: 8,
      max: 15,
      currency: 'AUD',
    },
    specifications: {
      material: 'PETG',
      nfcChip: 'NTAG213',
      dimensions: {
        width: 40,
        height: 40,
        depth: 3,
        unit: 'mm',
      },
      productionTime: {
        min: 2,
        max: 4,
        unit: 'business days',
      },
    },
    images: [
      {
        src: '/images/products/event-checkin-tag-01.jpg',
        alt: 'Event Check-in Tag - Front View',
        width: 1200,
        height: 800,
      },
      {
        src: '/images/products/event-checkin-tag-02.jpg',
        alt: 'Event Check-in Tag - Lanyard Attached',
        width: 1200,
        height: 800,
      },
    ],
    category: 'events',
    tags: ['event', 'check-in', 'nfc', 'round tag', 'branding'],
    featured: true,
    inStock: true,
    createdAt: '2025-02-10T00:00:00Z',
    updatedAt: '2025-06-01T00:00:00Z',
  },
  {
    id: 'prod_retail_product_tag',
    name: 'Retail Product Tag',
    slug: 'retail-product-tag',
    description:
      'Enhance the in-store experience with NFC-enabled product tags. Customers tap to access detailed product information, reviews, and purchase options. Square tag design with durable resin finish and NTAG216 for maximum data capacity.',
    shortDescription:
      'Smart square NFC tag for retail product information and engagement.',
    price: {
      min: 10,
      max: 20,
      currency: 'AUD',
    },
    specifications: {
      material: 'Resin',
      nfcChip: 'NTAG216',
      dimensions: {
        width: 50,
        height: 50,
        depth: 2.5,
        unit: 'mm',
      },
      productionTime: {
        min: 3,
        max: 6,
        unit: 'business days',
      },
    },
    images: [
      {
        src: '/images/products/retail-product-tag-01.jpg',
        alt: 'Retail Product Tag - Front View',
        width: 1200,
        height: 800,
      },
      {
        src: '/images/products/retail-product-tag-02.jpg',
        alt: 'Retail Product Tag - Attached to Product',
        width: 1200,
        height: 800,
      },
    ],
    category: 'retail',
    tags: ['retail', 'product tag', 'nfc', 'square tag', 'in-store'],
    featured: false,
    inStock: true,
    createdAt: '2025-03-05T00:00:00Z',
    updatedAt: '2025-06-01T00:00:00Z',
  },
  {
    id: 'prod_corporate_prototype',
    name: 'Corporate Prototype',
    slug: 'corporate-prototype',
    description:
      'Perfect for enterprise pilots and proof-of-concept projects. This customizable NFC card is built with premium carbon fiber PLA for a distinctive look and superior durability. Includes NTAG215 chip and full branding customization with your corporate identity.',
    shortDescription:
      'Premium carbon fiber NFC card for corporate branding and prototyping.',
    price: {
      min: 25,
      max: 45,
      currency: 'AUD',
    },
    specifications: {
      material: 'Carbon Fiber PLA',
      nfcChip: 'NTAG215',
      dimensions: {
        width: 85,
        height: 55,
        depth: 2.5,
        unit: 'mm',
      },
      productionTime: {
        min: 5,
        max: 8,
        unit: 'business days',
      },
    },
    images: [
      {
        src: '/images/products/corporate-prototype-01.jpg',
        alt: 'Corporate Prototype - Front View',
        width: 1200,
        height: 800,
      },
      {
        src: '/images/products/corporate-prototype-02.jpg',
        alt: 'Corporate Prototype - Detail View',
        width: 1200,
        height: 800,
      },
      {
        src: '/images/products/corporate-prototype-03.jpg',
        alt: 'Corporate Prototype - In Hand',
        width: 1200,
        height: 800,
      },
    ],
    category: 'corporate',
    tags: ['corporate', 'prototype', 'carbon fiber', 'premium', 'enterprise'],
    featured: true,
    inStock: true,
    createdAt: '2025-04-01T00:00:00Z',
    updatedAt: '2025-06-01T00:00:00Z',
  },
  {
    id: 'prod_real_estate_smart_card',
    name: 'Real Estate Smart Card',
    slug: 'real-estate-smart-card',
    description:
      'Stand out at open houses and client meetings with a wood-filled PLA NFC card that exudes warmth and professionalism. Tap to share property listings, virtual tours, or your agent profile. NTAG215 chip ensures broad compatibility with all NFC-enabled phones.',
    shortDescription:
      'Distinctive wood-finish NFC card for real estate professionals.',
    price: {
      min: 18,
      max: 30,
      currency: 'AUD',
    },
    specifications: {
      material: 'Wood-filled PLA',
      nfcChip: 'NTAG215',
      dimensions: {
        width: 85,
        height: 55,
        depth: 2,
        unit: 'mm',
      },
      productionTime: {
        min: 4,
        max: 7,
        unit: 'business days',
      },
    },
    images: [
      {
        src: '/images/products/real-estate-smart-card-01.jpg',
        alt: 'Real Estate Smart Card - Front View',
        width: 1200,
        height: 800,
      },
      {
        src: '/images/products/real-estate-smart-card-02.jpg',
        alt: 'Real Estate Smart Card - Texture Detail',
        width: 1200,
        height: 800,
      },
    ],
    category: 'business',
    tags: ['real estate', 'wood finish', 'nfc', 'smart card', 'agent'],
    featured: false,
    inStock: true,
    createdAt: '2025-04-20T00:00:00Z',
    updatedAt: '2025-06-01T00:00:00Z',
  },
];

export const FEATURED_PRODUCTS = PRODUCTS.filter((p) => p.featured);

/** Aliases for catalogue components */
export const MOCK_PRODUCTS = PRODUCTS;
export const MOCK_CATEGORIES = PRODUCT_CATEGORIES;

export function getProductBySlug(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function getProductsByCategory(categoryId: string): Product[] {
  return PRODUCTS.filter((p) => p.category === categoryId);
}

export function getCategoryBySlug(slug: string): ProductCategory | undefined {
  return PRODUCT_CATEGORIES.find((c) => c.slug === slug);
}
