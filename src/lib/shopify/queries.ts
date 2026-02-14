import { gql } from 'graphql-request';

const PRODUCT_FRAGMENT = gql`
  fragment ProductFields on Product {
    id
    title
    handle
    description
    descriptionHtml
    productType
    tags
    vendor
    availableForSale
    priceRange {
      minVariantPrice {
        amount
        currencyCode
      }
      maxVariantPrice {
        amount
        currencyCode
      }
    }
    images(first: 10) {
      edges {
        node {
          url
          altText
          width
          height
        }
      }
    }
    variants(first: 25) {
      edges {
        node {
          id
          title
          availableForSale
          price {
            amount
            currencyCode
          }
          compareAtPrice {
            amount
            currencyCode
          }
          selectedOptions {
            name
            value
          }
          image {
            url
            altText
            width
            height
          }
        }
      }
    }
    featuredImage {
      url
      altText
      width
      height
    }
  }
`;

export const GET_ALL_PRODUCTS = gql`
  ${PRODUCT_FRAGMENT}
  query GetAllProducts($first: Int = 20, $after: String) {
    products(first: $first, after: $after) {
      edges {
        node {
          ...ProductFields
        }
        cursor
      }
      pageInfo {
        hasNextPage
        hasPreviousPage
        endCursor
        startCursor
      }
    }
  }
`;

export const GET_PRODUCT_BY_HANDLE = gql`
  ${PRODUCT_FRAGMENT}
  query GetProductByHandle($handle: String!) {
    product(handle: $handle) {
      ...ProductFields
    }
  }
`;

export const GET_COLLECTIONS = gql`
  query GetCollections($first: Int = 10) {
    collections(first: $first) {
      edges {
        node {
          id
          title
          handle
          description
          image {
            url
            altText
            width
            height
          }
          products(first: 10) {
            edges {
              node {
                id
                title
                handle
                availableForSale
                priceRange {
                  minVariantPrice {
                    amount
                    currencyCode
                  }
                  maxVariantPrice {
                    amount
                    currencyCode
                  }
                }
                featuredImage {
                  url
                  altText
                  width
                  height
                }
              }
            }
          }
        }
        cursor
      }
      pageInfo {
        hasNextPage
        hasPreviousPage
        endCursor
        startCursor
      }
    }
  }
`;
