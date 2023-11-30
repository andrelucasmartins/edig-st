"use server";

import { storefront } from "@/utils/storefront";

const SingleProductQueryNextPage = `#graphql
  query getProductsOfProductTypeInCollection($handle: String!, $afterPage: String) {
  shop {
    name
  }
	collection(handle: $handle) {
		id
		title
    handle
    description
    metafields(identifiers: {key: "banner", namespace: "custom"}) {
      id
      reference {
        ... on MediaImage {
          id
          image {
            src
            altText
          }
        }
      }
    }      

		products(first: 10, after: $afterPage) {    
      pageInfo {
        hasNextPage
        startCursor
        endCursor
        hasPreviousPage
      }    
			edges {
        cursor
				node {
					id
					title
          handle
          tags
					vendor
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
                compareAtPrice {
                  amount
                  currencyCode
                }
              }
            }            
          }
				}
			}
      filters {
        values {
          id
          label
          count
        }
      } 
                      
		}    
	}
}
`;
const SingleProductQueryPrevPage = `#graphql
  query getProductsOfProductTypeInCollection($handle: String!,  $beforePage: String) {
  shop {
    name
  }
	collection(handle: $handle) {
		id
		title
    handle
    description
    metafields(identifiers: {key: "banner", namespace: "custom"}) {
      id
      reference {
        ... on MediaImage {
          id
          image {
            src
            altText
          }
        }
      }
    }      

		products(last: 10, before: $beforePage) {    
      pageInfo {
        hasNextPage
        startCursor
        endCursor
        hasPreviousPage
      }    
			edges {
        cursor
				node {
					id
					title
          handle
          tags
					vendor
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
                compareAtPrice {
                  amount
                  currencyCode
                }
              }
            }            
          }
				}
			}
      filters {
        values {
          id
          label
          count
        }
      } 
                      
		}    
	}
}
`;

let pageCount = 1;
let page = "";
let cursor: string | string[] | undefined;

export async function pageNextCount(afterPage: string) {
  cursor = afterPage;
  pageCount++;
  page = "next";

  return await pageCount;
}

export async function pagePrevCount(beforePage: string) {
  cursor = beforePage;
  pageCount--;
  page = "prev";
  return pageCount;
}

export async function getCollectionData(
  handle: string,
  cursor?: string | string[] | undefined
) {
  if (page === "") {
    pageCount = 1;
    const res = await await storefront(SingleProductQueryNextPage, {
      handle,
    });

    return res;
  }
  if (page === "next") {
    const res = await await storefront(SingleProductQueryNextPage, {
      handle,
      afterPage: cursor,
    });

    return res;
  }

  if (page === "prev") {
    const prevPage = await await storefront(SingleProductQueryPrevPage, {
      handle,
      beforePage: cursor,
    });

    return prevPage;
  }
}

export const getPageCount = async () => await { pageCount };
