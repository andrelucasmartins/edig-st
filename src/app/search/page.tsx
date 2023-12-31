import Grid from "@/components/grid"
import ProductGridItems from "@/components/layout/product-grid-items"
import { defaultSort, sorting } from "@/lib/constants"
import { getProducts } from "@/lib/shopify"
// export const dynamic = 'force-dynamic'

export const metadata = {
  metadataBase: new URL("https://aedigi.com.br/"),
  title: "Search",
  description: "Procure produtos na loja",
}

export default async function SearchPage({ searchParams }: { searchParams?: { [key: string]: string | string[] | undefined } }) {
  const { sort, q: searchValue } = searchParams as { [key: string]: string }
  const { sortKey, reverse } = sorting.find((item) => item.slug === sort) || defaultSort

  const products = await getProducts({ sortKey, reverse, query: searchValue })

  const resultsText = products.length > 1 ? "results" : "result"

  return (
    <>
      {searchValue ? (
        <p className="mb-4">
          {products.length === 0 ? "There are no products that match " : `Showing ${products.length} ${resultsText} for `}
          <span className="font-bold">&quot;{searchValue}&quot;</span>
        </p>
      ) : null}
      {products.length > 0 ? (
        <Grid className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          <ProductGridItems products={products} />
        </Grid>
      ) : null}
    </>
  )
}
