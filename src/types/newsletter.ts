export interface NewsletterRequest {
  email: string;
}

export interface NewsletterResponse {
  success: boolean;
  message: string;
}

export interface ShopifyCustomerCreateResponse {
  customerCreate: {
    customer: {
      id: string;
      email: string;
      acceptsMarketing: boolean;
    } | null;
    customerUserErrors: {
      field: string[];
      message: string;
    }[];
  };
}
