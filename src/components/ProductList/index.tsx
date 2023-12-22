"use client"

import { formatPrice } from "@/utils/formatPrice"
import Link from "next/link"
import "swiper/css"
import { Swiper, SwiperSlide } from "swiper/react"

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
        minVariantPrice: { amount: number }
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
import clsx from "clsx"
import Image from "next/image"
import { Suspense } from "react"
import { FreeMode, Navigation, Pagination, Thumbs } from "swiper/modules"
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
        const price = product?.priceRange?.minVariantPrice.amount

        return (
          <Link key={handle} href={`/products/${handle}`} legacyBehavior>
            <a className="group">
              <div className="aspect-w-4 aspect-h-4 w-full overflow-hidden rounded-lg shadow-lg shadow-gray-950/20">
                <Image
                  src={image?.transformedSrc || image?.url}
                  alt={image?.altText}
                  width={100}
                  height={100}
                  sizes="(100%, auto)"
                  className={clsx("h-full w-full group-hover:opacity-75")}
                />
              </div>
              <div className="mt-4 flex flex-col space-y-2 text-base font-medium text-gray-950">
                <h3 className="line-clamp-2  text-lg/6 dark:text-white">{title}</h3>
                <p className="text-purple-800 dark:text-purple-500">{formatPrice(price)}</p>
              </div>

              {/* <div className="mt-10 grid grid-cols-1 gap-x-6 ga´-y-4 sm:grid-cols-1 gap-4">
                      <Button
                        className="text-green-500 border-2 border-green-500 hover:border-green-500 hover:bg-green-500 hover:text-white py-6 uppercase"
                        size={"sm"}
                        variant={"outline"}
                      >
                        Adicionar ao carrinho
                      </Button>
                      <Button
                        className="bg-green-500 hover:bg-green-600 hover:text-white py-6 uppercase"
                        size={"lg"}
                      >
                        Comprar Agora
                      </Button>
                    </div> */}
              <p className="mt-1 text-sm italic text-gray-500">{product?.tags[0]}</p>
            </a>
          </Link>
        )
      })}
    </div>
  )
}

const Slider = ({ products }: ProductProps) => {
  return (
    <Swiper
      slidesPerView={1}
      spaceBetween={20}
      navigation={true}
      breakpoints={{
        520: {
          pagination: true,
        },
        640: {
          slidesPerView: 2,
        },
        768: {
          slidesPerView: 4,
        },
        1024: {
          slidesPerView: 5,
        },
      }}
      // thumbs={{ swiper: thumbsSwiper }}
      modules={[FreeMode, Navigation, Thumbs, Pagination]}
      className="mySwiper2"
    >
      {products?.map((item: any[] | any) => {
        const product = item || item?.node
        const image = product?.images?.edges[0].node
        const price = product?.variants?.edges[0].node.price.amount || product.priceRange.minVariantPrice.amount

        return (
          <SwiperSlide key={product.id}>
            <Link key={product.handle} href={`/products/${product.handle}`} legacyBehavior>
              <a className="group">
                <div className="aspect-w-4 aspect-h-4 w-full overflow-hidden rounded-lg shadow-lg shadow-gray-950/20">
                  <Image
                    src={image.transformedSrc}
                    alt={image.altText}
                    width={100}
                    height={100}
                    sizes="(100%, auto)"
                    className="h-full w-full object-cover object-center group-hover:opacity-75 "
                  />
                </div>
                <div className="mt-4 flex flex-col space-y-2 text-base font-medium text-gray-950">
                  <h3 className="line-clamp-2  text-lg/6 dark:text-white">{product.title}</h3>
                  <p className="text-purple-800 dark:text-purple-500">
                    <span>Por:</span> {formatPrice(price)}
                  </p>
                </div>
                <p className="mt-1 text-sm italic text-gray-500">{product.tags[0]}</p>
              </a>
            </Link>
          </SwiperSlide>
        )
      })}
    </Swiper>
  )
}

export async function ProductList({ products, title, slide }: ProductListProps) {
  return (
    <>
      {title && <h2 className="my-8 text-center text-xl font-semibold uppercase text-gray-900 dark:text-white">{title}</h2>}

      {!slide ? (
        <Suspense fallback={<div>Loading...</div>}>
          <Product products={products} />
        </Suspense>
      ) : (
        <Suspense fallback={<div>Loading...</div>}>
          <Slider products={products} />
        </Suspense>
      )}
    </>
  )
}
