export type SortFilterItem = {
  title: string
  slug: string
  sortKey: "RELEVANCE" | "BEST_SELLING" | "CREATED" | "PRICE"
  reverse: boolean
}

export const defaultSort: SortFilterItem = {
  title: "Relevantes",
  slug: "relevance-desc",
  sortKey: "RELEVANCE",
  reverse: false,
}

export const sorting: SortFilterItem[] = [
  defaultSort,
  {
    title: "Tendencias",
    slug: "trending-desc",
    sortKey: "BEST_SELLING",
    reverse: false,
  }, // asc
  {
    title: "Últimas novidades",
    slug: "latest-desc",
    sortKey: "CREATED",
    reverse: true,
  },
  {
    title: "Preço: baixo à alto",
    slug: "price-asc",
    sortKey: "PRICE",
    reverse: false,
  }, // asc
  {
    title: "Preço: alto à baixo",
    slug: "price-desc",
    sortKey: "PRICE",
    reverse: true,
  },
]

export const TAGS = {
  collections: "collections",
  products: "products",
}

export const HIDDEN_PRODUCT_TAG = "nextjs-frontend-hidden"
export const DEFAULT_OPTION = "Default Title"
export const SHOPIFY_GRAPHQL_API_ENDPOINT = "/api/2024-01/graphql.json"
