// SEO Metadata Configuration for TapCraft Studio

export const siteMetadata = {
  siteName: 'TapCraft Studio',
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://tapcraft.shop',
  defaultImage: '/images/og-default.jpg',
  locale: 'en_AU',
  type: 'website',
  contactEmail: 'contact@tapcraft.com',
  phone: '+61 0 466 887 948',
  address: {
    street: '8 Uganda Street',
    city: 'Burwood',
    state: 'VIC',
    postcode: '3125',
    country: 'Australia',
  },
  geo: {
    latitude: -37.8498,
    longitude: 145.1127,
  },
};

export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'TapCraft Studio',
  description:
    'Melbourne-based 3D printing studio creating smart, NFC-enabled products for businesses and individuals.',
  url: siteMetadata.siteUrl,
  logo: `${siteMetadata.siteUrl}/images/logo/tapcraft-logo.png`,
  image: `${siteMetadata.siteUrl}/images/studio/workshop.jpg`,
  telephone: siteMetadata.phone,
  email: siteMetadata.contactEmail,
  address: {
    '@type': 'PostalAddress',
    streetAddress: siteMetadata.address.street,
    addressLocality: siteMetadata.address.city,
    addressRegion: siteMetadata.address.state,
    postalCode: siteMetadata.address.postcode,
    addressCountry: 'AU',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: siteMetadata.geo.latitude,
    longitude: siteMetadata.geo.longitude,
  },
  priceRange: '$$',
  openingHoursSpecification: {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    opens: '09:00',
    closes: '17:00',
  },
};

export const homepageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'TapCraft Studio - Custom 3D + NFC Products',
  description:
    'Melbourne-based 3D printing studio creating smart, NFC-enabled products for businesses and individuals.',
  url: siteMetadata.siteUrl,
  mainEntity: organizationSchema,
  breadcrumb: {
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: siteMetadata.siteUrl,
      },
    ],
  },
};

export const catalogueSchema = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: 'TapCraft Studio Product Catalogue',
  description: 'Browse our catalogue of 3D printed NFC-enabled products',
  url: `${siteMetadata.siteUrl}/catalogue`,
  breadcrumb: {
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: siteMetadata.siteUrl,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Catalogue',
        item: `${siteMetadata.siteUrl}/catalogue`,
      },
    ],
  },
};

export const customizeSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'TapCraft Product Customizer',
  description:
    'Interactive 3D product customization tool for designing NFC-enabled products',
  url: `${siteMetadata.siteUrl}/customize`,
  applicationCategory: 'DesignApplication',
  operatingSystem: 'Web Browser',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'AUD',
  },
  breadcrumb: {
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: siteMetadata.siteUrl,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Customize',
        item: `${siteMetadata.siteUrl}/customize`,
      },
    ],
  },
};
