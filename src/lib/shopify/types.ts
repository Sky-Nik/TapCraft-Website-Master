export interface ShopifyPrice {
  amount: string;
  currencyCode: string;
}

export interface ShopifyImage {
  url: string;
  altText: string | null;
  width: number;
  height: number;
}

export interface ShopifyVariant {
  id: string;
  title: string;
  availableForSale: boolean;
  price: ShopifyPrice;
  compareAtPrice: ShopifyPrice | null;
  selectedOptions: {
    name: string;
    value: string;
  }[];
  image: ShopifyImage | null;
}

export interface ShopifyProduct {
  id: string;
  title: string;
  handle: string;
  description: string;
  descriptionHtml: string;
  productType: string;
  tags: string[];
  vendor: string;
  availableForSale: boolean;
  priceRange: {
    minVariantPrice: ShopifyPrice;
    maxVariantPrice: ShopifyPrice;
  };
  images: {
    edges: {
      node: ShopifyImage;
    }[];
  };
  variants: {
    edges: {
      node: ShopifyVariant;
    }[];
  };
  featuredImage: ShopifyImage | null;
}

export interface ShopifyCollection {
  id: string;
  title: string;
  handle: string;
  description: string;
  image: ShopifyImage | null;
  products: {
    edges: {
      node: ShopifyProduct;
    }[];
  };
}

export interface ShopifyPageInfo {
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  endCursor: string | null;
  startCursor: string | null;
}

export interface ShopifyProductEdge {
  node: ShopifyProduct;
  cursor: string;
}

export interface ShopifyProductsResponse {
  products: {
    edges: ShopifyProductEdge[];
    pageInfo: ShopifyPageInfo;
  };
}

export interface ShopifyProductByHandleResponse {
  product: ShopifyProduct | null;
}

export interface ShopifyCollectionsResponse {
  collections: {
    edges: {
      node: ShopifyCollection;
      cursor: string;
    }[];
    pageInfo: ShopifyPageInfo;
  };
}
