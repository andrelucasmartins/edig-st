"use server"
import { sorting } from "@/lib/constants"
import { storefront } from "@/utils/storefront"

const SingleProductQueryNextPage = /* GraphQL */ `
  query getProductsOfProductTypeInCollection(
    $handle: String!
    $afterPage: String
    $sortKey: ProductCollectionSortKeys
    $reverse: Boolean
  ) {
    shop {
      name
    }
    collection(handle: $handle) {
      id
      title
      handle
      description
      metafields(identifiers: { key: "banner", namespace: "custom" }) {
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

      products(
        first: 10
        after: $afterPage
        sortKey: $sortKey
        reverse: $reverse
      ) {
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
`
const SingleProductQueryPrevPage = /* GraphQL */ `
  query getProductsOfProductTypeInCollection(
    $handle: String!
    $beforePage: String
    $sortKey: ProductCollectionSortKeys
    $reverse: Boolean
  ) {
    shop {
      name
    }
    collection(handle: $handle) {
      id
      title
      handle
      description
      metafields(identifiers: { key: "banner", namespace: "custom" }) {
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

      products(
        last: 10
        before: $beforePage
        sortKey: $sortKey
        reverse: $reverse
      ) {
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
`

let pageCount = 1
let page = ""
// eslint-disable-next-line no-unused-vars
let cursor: string | string[] | undefined
let sortKey = "RELEVANCE"
let reverse = false

const filterData = (itemType: string) =>
  sorting.filter((item) => item.slug === itemType)

export async function pageNextCount(afterPage: string) {
  cursor = afterPage
  pageCount++
  page = "next"

  return await pageCount
}

export async function pagePrevCount(beforePage: string) {
  cursor = beforePage
  pageCount--
  page = "prev"
  return pageCount
}

export async function filterType(type: string) {
  let newFilterData = filterData(type)
  sortKey = newFilterData[0]?.sortKey
  reverse = newFilterData[0]?.reverse
}

export async function getCollectionData(
  handle: string,
  cursor?: string | string[] | undefined,
) {
  // let newFilterData = filterData(sortKey);
  // sortKey = newFilterData[0]?.sortKey;
  // reverse = newFilterData[0]?.reverse;

  if (page === "") {
    pageCount = 1
    const res = await await storefront(SingleProductQueryNextPage, {
      handle,
      sortKey,
      reverse,
    })

    return res
  }
  if (page === "next") {
    const res = await await storefront(SingleProductQueryNextPage, {
      handle,
      afterPage: cursor,
      sortKey,
      reverse,
    })

    return res
  }

  if (page === "prev") {
    const prevPage = await await storefront(SingleProductQueryPrevPage, {
      handle,
      beforePage: cursor,
      sortKey,
      reverse,
    })

    return prevPage
  }
}

export const getPageCount = async () => await { pageCount }
