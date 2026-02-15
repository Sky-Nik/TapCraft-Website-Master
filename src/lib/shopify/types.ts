export interface ShopifyPrice {
  amount: string;
  currencyCode: string;
}

export interface ShopifyMetafield {
  namespace: string;
  key: string;
  value: string;
}

export interface ShopifyImage {
  url: string;
  altText: string | null;
  width: number;
  height: number;
}

export interface ShopifyVideoSource {
  url: string;
  mimeType: string;
  width: number;
  height: number;
}

export interface ShopifyMediaNode {
  mediaContentType: 'IMAGE' | 'VIDEO' | 'EXTERNAL_VIDEO' | 'MODEL_3D';
  alt: string | null;
  image?: ShopifyImage;
  sources?: ShopifyVideoSource[];
  embedUrl?: string;
  host?: 'YOUTUBE' | 'VIMEO';
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
  media?: {
    edges: {
      node: ShopifyMediaNode;
    }[];
  };
  featuredImage: ShopifyImage | null;
  metafields?: (ShopifyMetafield | null)[];
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

// Cart types for Shopify Storefront API
export interface ShopifyCartLineItem {
  id: string;
  quantity: number;
  merchandise: {
    id: string;
    title: string;
    price: ShopifyPrice;
    product: {
      title: string;
      handle: string;
      featuredImage: ShopifyImage | null;
    };
  };
}

export interface ShopifyCart {
  id: string;
  checkoutUrl: string;
  totalQuantity: number;
  cost: {
    subtotalAmount: ShopifyPrice;
    totalAmount: ShopifyPrice;
  };
  lines: {
    edges: {
      node: ShopifyCartLineItem;
    }[];
  };
}

export interface ShopifyCartResponse {
  cart: ShopifyCart;
}

export interface ShopifyCartCreateResponse {
  cartCreate: {
    cart: ShopifyCart;
  };
}

export interface ShopifyCartLinesAddResponse {
  cartLinesAdd: {
    cart: ShopifyCart;
  };
}

export interface ShopifyCartLinesUpdateResponse {
  cartLinesUpdate: {
    cart: ShopifyCart;
  };
}

export interface ShopifyCartLinesRemoveResponse {
  cartLinesRemove: {
    cart: ShopifyCart;
  };
}
