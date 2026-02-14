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

export interface ProductCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  shortDescription: string;
  price: ProductPrice;
  specifications: ProductSpecifications;
  images: ProductImage[];
  category: string;
  tags: string[];
  featured: boolean;
  inStock: boolean;
  createdAt: string;
  updatedAt: string;
}
