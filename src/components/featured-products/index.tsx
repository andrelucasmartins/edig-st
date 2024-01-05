import Price from "@/components/price"
import { storefront } from "@/utils/storefront"
import Image from "next/image"
import Link from "next/link"

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

const featuredProducts_data = /* GraphQL */ `
  query getProductsInCollection($handle: String!) {
    collection(handle: $handle) {
      id
      title
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
  }
`

interface FeaturedProductsProps {
  data: {
    collection: {
      id: string
      title: string
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
}

export const FeaturedProducts = async ({
  collection,
}: {
  collection: string
}) => {
  const { data }: FeaturedProductsProps = await storefront(
    featuredProducts_data,
    {
      handle: collection,
    },
  )

  const collectionData = data?.collection
  const products = collectionData?.products?.edges

  return (
    <div className="mx-auto my-6 max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="mb-6 flex flex-col">
        <div className="relative my-4 flex select-none flex-col items-center justify-center">
          <div className="absolute inset-0 -z-10 mx-auto flex items-center justify-center text-center text-6xl font-bold uppercase text-gray-200 md:text-9xl">
            {collectionData?.title}
          </div>
          <h1 className="text-lg font-bold md:text-4xl ">Produtos</h1>
          <span className="text-sm md:text-base">em destaque</span>
        </div>
      </div>
      <Carousel className="mx-auto w-full max-w-7xl">
        <CarouselContent className="-ml-1">
          {products?.map((product) => {
            const { handle, title, featuredImage, priceRange } = product.node

            return (
              <CarouselItem
                key={handle}
                className="basics-1/2 pl-1 md:basis-1/3 lg:basis-1/4"
              >
                <div className="p-1">
                  <Link href={`/products/${handle}`}>
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
                        <h2 className="line-clamp-1 text-xs">{title}</h2>
                        <div className="text-md text-gray-500">
                          <Price
                            amount={String(priceRange.minVariantPrice.amount)}
                            currencyCode={
                              priceRange.minVariantPrice.currencyCode
                            }
                          />
                        </div>
                      </figcaption>
                    </figure>
                  </Link>
                </div>
              </CarouselItem>
            )
          })}
        </CarouselContent>
        <CarouselPrevious size="icon" />
        <CarouselNext size="icon" />
      </Carousel>
    </div>
  )
}
