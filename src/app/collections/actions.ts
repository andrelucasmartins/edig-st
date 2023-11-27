"use server";

import { storefront } from "@/utils/storefront";
import { revalidatePath } from "next/cache";

const SingleProductQuery = `#graphql
  query getProductsOfProductTypeInCollection($handle: String!, $afterPage: String, $beforePage: String) {
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

		products(first: 10, after: $afterPage, before: $beforePage) {    
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
let page = "next";
let first: number | null = 10;
let last: number | null;
let afterPage = "";
export async function pageNextCount(afterPage: string) {
  pageCount++;
  page = "next";
  afterPage = afterPage;
  last = null;
  first = 10;
  revalidatePath(`/`);
  //pageCount;
}

export async function pagePreviousCount() {
  pageCount--;
  page = "prev";
  first = null;
  last = 10;
  return pageCount;
}

export const getPageCount = async () =>
  await { pageCount, page, first, last, afterPage };

export async function pageNext(handle: string, after: string) {
  afterPage = after;
  const { data } = await storefront(SingleProductQuery, {
    handle,
    afterPage,
  });
  return afterPage;
}
