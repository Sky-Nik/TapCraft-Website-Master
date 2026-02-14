export interface PageSEO {
  title: string;
  description: string;
  keywords: string[];
  openGraph?: {
    title: string;
    description: string;
    image?: string;
    type: string;
  };
}

export const SITE_NAME = 'TapCraft Studio';
export const SITE_URL = 'https://tapcraft.studio';
export const SITE_DESCRIPTION =
  'Custom 3D-printed NFC-enabled products crafted in Melbourne, Australia. Smart business cards, event tags, and retail solutions.';

export const PAGE_SEO: Record<string, PageSEO> = {
  home: {
    title: 'TapCraft Studio | Custom 3D-Printed NFC Products Melbourne',
    description:
      'Design and order custom 3D-printed NFC-enabled business cards, event tags, and smart products. Handcrafted in Melbourne, Australia with premium materials.',
    keywords: [
      'NFC business cards',
      '3D printed NFC',
      'custom NFC tags',
      'smart business cards Melbourne',
      'NFC products Australia',
      'tap to share',
      'contactless business cards',
    ],
    openGraph: {
      title: 'TapCraft Studio | Custom 3D-Printed NFC Products',
      description:
        'Design your own NFC-enabled products. Smart business cards, event tags, and more. Crafted in Melbourne.',
      image: '/images/og/home.jpg',
      type: 'website',
    },
  },
  catalogue: {
    title: 'Product Catalogue | TapCraft Studio',
    description:
      'Browse our range of 3D-printed NFC products including smart business cards, event check-in tags, retail product tags, and corporate solutions.',
    keywords: [
      'NFC product catalogue',
      'buy NFC cards',
      'NFC tags for sale',
      'smart card shop',
      '3D printed products',
      'NFC business card buy',
      'custom NFC products',
    ],
    openGraph: {
      title: 'Product Catalogue | TapCraft Studio',
      description:
        'Explore our full range of NFC-enabled products. Business cards, event tags, retail solutions and more.',
      image: '/images/og/catalogue.jpg',
      type: 'website',
    },
  },
  customize: {
    title: 'Customize Your NFC Product | TapCraft Studio',
    description:
      'Design your perfect NFC product with our real-time 3D customizer. Choose shape, material, NFC chip, text effects, and upload your own design.',
    keywords: [
      'customize NFC card',
      'design NFC tag',
      'custom NFC business card',
      '3D product customizer',
      'NFC card builder',
      'personalized smart card',
      'NFC card designer',
    ],
    openGraph: {
      title: 'Customize Your NFC Product | TapCraft Studio',
      description:
        'Build your perfect NFC product with our interactive customizer. Real-time 3D preview included.',
      image: '/images/og/customize.jpg',
      type: 'website',
    },
  },
};

export const ORGANIZATION_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'TapCraft Studio',
  url: SITE_URL,
  logo: `${SITE_URL}/images/logo.png`,
  description: SITE_DESCRIPTION,
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Melbourne',
    addressRegion: 'VIC',
    addressCountry: 'AU',
  },
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'customer service',
    email: 'hello@tapcraft.studio',
  },
  sameAs: [
    'https://www.instagram.com/tapcraftstudio',
    'https://www.linkedin.com/company/tapcraft-studio',
  ],
};
