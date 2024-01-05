import Price from "@/components/price"
import { storefront } from "@/utils/storefront"
import Image from "next/image"
import Link from "next/link"

const best_selling_data = /* GraphQL */ `
  query getProductSellingPlans {
    products(first: 9, sortKey: BEST_SELLING, reverse: true) {
      edges {
        node {
          title
          description
          handle
          featuredImage {
            id
            url
            altText
          }
          priceRange {
            minVariantPrice {
              amount
              currencyCode
            }
          }
        }
      }
    }
  }
`

interface BestSellingProps {
  data: {
    products: {
      edges: {
        node: {
          title: string
          description: string
          handle: string
          featuredImage: {
            id: string
            url: string
            altText: string
          }
          priceRange: {
            minVariantPrice: {
              amount: number
              currencyCode: string
            }
          }
        }
      }[]
    }
  }
}

export const BestSelling = async () => {
  const { data }: BestSellingProps = await storefront(best_selling_data)
  const products = data?.products?.edges

  return (
    <div className="mx-auto my-6 max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="mb-6 flex flex-col">
        <div className="relative my-4 flex select-none flex-col items-center justify-center">
          <div className="absolute inset-0 -z-10 mx-auto flex items-center justify-center text-center text-9xl font-bold uppercase text-gray-200">
            produto
          </div>
          <h1 className="text-4xl font-bold ">Mais vendidos</h1>
          <span className="">produtos</span>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="flex flex-col items-center justify-center">
          {products?.[0]?.node.description && (
            <Link
              href={`/products/${products?.[0]?.node?.handle}`}
              className="flex flex-col items-center justify-center"
            >
              <figure className="flex flex-col gap-4">
                <div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg bg-gray-50 p-2">
                  <Image
                    src={products?.[0]?.node?.featuredImage.url}
                    alt={products?.[0]?.node.title}
                    sizes="(max-width: 768px) 100vw, 33vw"
                    quality="90"
                    width={500}
                    height={500}
                    className="mx-auto rounded-lg  object-cover mix-blend-multiply"
                  />
                </div>
                <figcaption className="flex flex-col gap-2">
                  <h1>{products?.[0]?.node?.title}</h1>
                  <div className="text-xl text-gray-500">
                    <Price
                      amount={String(
                        products?.[0]?.node.priceRange.minVariantPrice.amount,
                      )}
                      currencyCode={
                        products?.[0]?.node.priceRange.minVariantPrice
                          .currencyCode
                      }
                    />
                  </div>
                </figcaption>
              </figure>
            </Link>
          )}
        </div>

        <div className="grid grid-cols-3 items-start gap-4 self-start">
          {products?.map((product, index: number) => {
            const { handle, title, featuredImage, priceRange } = product.node

            if (index > 2)
              return (
                <Link href={`/products/${handle}`} key={handle}>
                  <figure className="space-y-4 whitespace-pre-wrap">
                    <div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg bg-gray-100 p-2">
                      <Image
                        src={featuredImage.url}
                        alt={title}
                        sizes="(max-width: 768px) 100vw, 33vw"
                        quality="90"
                        width={1000}
                        height={1000}
                        className="aspect-h-1 aspect-w-1 rounded-lg object-contain mix-blend-multiply"
                      />
                    </div>
                    <figcaption>
                      <h2 className="line-clamp-2 text-xs">{title}</h2>
                      <div className="text-md text-gray-500">
                        <Price
                          amount={String(priceRange.minVariantPrice.amount)}
                          currencyCode={priceRange.minVariantPrice.currencyCode}
                        />
                      </div>
                    </figcaption>
                  </figure>
                </Link>
              )
          })}
        </div>
      </div>
    </div>
  )
}
