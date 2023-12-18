export const getProductRecommendations = /* GraphQL */ `
  query getProductRecommendations($productId: ID!) {
    productRecommendations(productId: $productId) {
      id
      title
      description
      handle
      tags
      images(first: 1) {
        edges {
          node {
            transformedSrc
            altText
          }
        }
      }
      variants(first: 3) {
        edges {
          cursor
          node {
            id
            title
            quantityAvailable
            price {
              amount
              currencyCode
            }
          }
        }
      }
    }
  }
`;
