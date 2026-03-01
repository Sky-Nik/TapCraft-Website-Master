export interface ProductPrice {
  min: number;
  max: number;
  currency: 'AUD';
}

export interface ProductSpecifications {
  material: string;
  nfcChip: string;
  dimensions: {
    width: number;
    height: number;
    depth: number;
    unit: 'mm';
  };
  productionTime: {
    min: number;
    max: number;
    unit: 'business days';
  };
}

export interface ProductImage {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export interface ProductVideo {
  type: 'video';
  src: string;
  mimeType: string;
  alt: string;
  width: number;
  height: number;
}

export interface ProductExternalVideo {
  type: 'external_video';
  embedUrl: string;
  host: 'youtube' | 'vimeo';
  alt: string;
}

export type ProductMedia =
  | (ProductImage & { type: 'image' })
  | ProductVideo
  | ProductExternalVideo;

export interface ProductCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
}

export interface ProductVariant {
  id: string;
  title: string;
  availableForSale: boolean;
  price: number;
  compareAtPrice: number | null;
  options: { name: string; value: string }[];
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  descriptionHtml: string;
  shortDescription: string;
  price: ProductPrice;
  variants: ProductVariant[];
  specifications: ProductSpecifications;
  images: ProductImage[];
  media: ProductMedia[];
  category: string;
  tags: string[];
  featured: boolean;
  inStock: boolean;
  createdAt: string;
  updatedAt: string;
}
