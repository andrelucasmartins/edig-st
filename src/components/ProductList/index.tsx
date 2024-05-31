"use client"

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Link from "next/link"
import "swiper/css"

interface ProductProps {
  products: Array<{
    node: {
      id: string
      title: string
      handle: string
      vendor: string
      tags: string[]
      availableForSale: boolean
      priceRange: {
        minVariantPrice: { amount: number; currencyCode: string }
      }
      images: {
        edges: [
          {
            node: {
              id: string
              url: string
              transformedSrc: string
              width: number | string
              height: number | string
              altText: string
            }
          },
        ]
      }
      variants: {
        edges: [
          {
            cursor: string
            node: {
              id: string
              title: string
              quantityAvailable: number
              price: {
                amount: string
                currencyCode: string
              }
            }
          },
        ]
      }
    }
  }>
}

interface ProductListProps extends ProductProps {
  title?: string
  slide?: boolean
}

// const productsTest = `#graphql
//   {
//     products(sortKey: TITLE, first: 100) {
//       edges {
//         node {
//           id
//           title
//           description
//           handle
//           tags
//           priceRange {
//             minVariantPrice {
//               amount
//             }
//           }
//           images(first: 1) {
//             edges {
//               node {
//                 transformedSrc
//                 altText
//               }
//             }
//           }
//         }
//       }
//     }
//   }
// `;

// const productsQuery = `#graphql
//   query Products {
//     products(first: 8) {
//       edges {
//         node {
//           title
//           description
//           id
//           handle
//           tags
//           priceRange {
//             minVariantPrice {
//               amount
//             }
//           }
//           images(first: 1) {
//             edges {
//               node {
//                 transformedSrc
//                 altText
//               }
//             }
//           }
//         }
//       }
//     }
//   }
// `;

// const getProductMediaQuery = `#graphql
//   query getProductMedia {
//     products(first: 3) {
//       edges {
//         cursor
//         node {
//           id
//           title
//           description
//           media(first: 10) {
//             edges {
//               node {
//                 mediaContentType
//                 alt
//                 ...mediaFieldsByType
//               }
//             }
//           }
//         }
//       }
//     }
//   }

//   fragment mediaFieldsByType on Media {
//     ... on ExternalVideo {
//       id
//       host
//       originUrl
//     }
//     ... on MediaImage {
//       image {
//         url
//       }
//     }
//     ... on Model3d {
//       sources {
//         url
//         mimeType
//         format
//         filesize
//       }
//     }
//     ... on Video {
//       sources {
//         url
//         mimeType
//         format
//         height
//         width
//       }
//     }
//   }
// `;

// Import Swiper styles
import "swiper/css"
import "swiper/css/free-mode"
import "swiper/css/navigation"
import "swiper/css/thumbs"

import "./style.css"

// import required modules
import { Suspense } from "react"
import { ProductCard } from "../product-card/index"
// interface Products {
//   node: {
//     id: string;
//     title: string;
//     handle: string;
//     vendor: string;
//     availableForSale: boolean;
//     images: {
//       edges: [
//         {
//           node: {
//             id: string;
//             url: string;
//             width: number | string;
//             height: number | string;
//             altText?: string;
//           };
//         },
//       ];
//     };
//     variants: {
//       edges: [
//         {
//           cursor: string;
//           node: {
//             id: string;
//             title: string;
//             quantityAvailable: number;
//             price: {
//               amount: string;
//               currencyCode: string;
//             };
//           };
//         },
//       ];
//     };
//   };
// }

const Product = ({ products }: ProductProps) => {
  return (
    <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 xl:gap-x-8">
      {products?.map((item) => {
        const product = item && item?.node
        const title = product.title
        const handle = product.handle
        const image = product?.images?.edges[0].node
        const price =
          product?.variants?.edges[0].node.price.amount ||
          product.priceRange.minVariantPrice.amount
        const currencyCode = product?.priceRange?.minVariantPrice?.currencyCode

        return (
          <Link key={handle} href={`/products/${handle}`}>
            <ProductCard
              imageUrl={image.transformedSrc}
              title={title}
              amount={price}
              currencyCode={currencyCode}
            />
          </Link>
        )
      })}
    </div>
  )
}

const Slider = ({ products }: ProductProps) => {
  return (
    <Carousel className="mx-auto w-full max-w-7xl">
      <CarouselContent className="-ml-1">
        {products?.map((item: any[] | any) => {
          const product = item || item?.node
          const image = product?.images?.edges[0].node
          const price =
            product?.variants?.edges[0].node.price.amount ||
            product.priceRange.minVariantPrice.amount
          const currencyCode =
            product?.priceRange?.minVariantPrice?.currencyCode

          return (
            <CarouselItem
              key={product.id}
              className="basics-1/2 pl-1 md:basis-1/3 lg:basis-1/4"
            >
              <div className="p-1">
                <Link key={product.handle} href={`/products/${product.handle}`}>
                  <ProductCard
                    imageUrl={image.transformedSrc}
                    title={product.title}
                    amount={price}
                    currencyCode={currencyCode}
                  />
                </Link>
              </div>
            </CarouselItem>
          )
        })}
      </CarouselContent>
      <CarouselPrevious size="icon" />
      <CarouselNext size="icon" />
    </Carousel>
  )
}

export async function ProductList({
  products,
  title,
  slide,
  ...props
}: ProductListProps) {
  return (
    <>
      {title && (
        <h2 className="my-8 text-center text-xl font-semibold uppercase text-gray-900 dark:text-white">
          {title}
        </h2>
      )}

      {!slide ? (
        <Suspense fallback={<div>Loading...</div>}>
          <Product products={products} {...props} />
        </Suspense>
      ) : (
        <Suspense fallback={<div>Loading...</div>}>
          <Slider products={products} {...props} />
        </Suspense>
      )}
    </>
  )
}
