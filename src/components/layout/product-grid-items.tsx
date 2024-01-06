import Grid from "@/components/grid"
import { Product } from "@/lib/shopify/types"
import Link from "next/link"
import { ProductCard } from "../product-card"

export default function ProductGridItems({
  products,
}: {
  products: Product[]
}) {
  return (
    <>
      {products.map((product) => (
        <Grid.Item key={product.handle} className="animate-fadeIn">
          <Link
            className="relative inline-block h-full w-full"
            href={`/products/${product.handle}`}
          >
            <ProductCard
              imageUrl={product.featuredImage?.url}
              title={product.title}
              amount={product.priceRange.maxVariantPrice.amount}
              currencyCode={product.priceRange.maxVariantPrice.currencyCode}
            />
            {/* <GridTileImage

              alt={product.title}
              label={{
                title: product.title,
                amount: product.priceRange.maxVariantPrice.amount,
                currencyCode: product.priceRange.maxVariantPrice.currencyCode,
              }}
              src={product.featuredImage?.url}
              fill
              sizes="(min-width: 768px) 33vw, (min-width: 640px) 50vw, 100vw"
            /> */}
          </Link>
        </Grid.Item>
      ))}
    </>
  )
}
