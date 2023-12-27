"use client"

import { formatPrice } from "@/utils/formatPrice"
import Image from "next/image"
import Link from "next/link"
import "swiper/css"
import "swiper/css/pagination"
import "swiper/css/scrollbar"
import {
  Autoplay,
  FreeMode,
  Navigation,
  Pagination,
  Thumbs,
} from "swiper/modules"

import { Swiper, SwiperSlide } from "swiper/react"

type Product = {
  [x: string]: any
  id: string
  handle: string
  title: string
  featuredImage: {
    url: string
    altText: string
  }
  priceRange: {
    maxVariantPrice: {
      amount: number
      currencyCode: string
    }
  }
}

interface CarouselItemsProps {
  title?: string
  products: Product[] | Product | any
}
export const CarouselItems = ({ title, products }: CarouselItemsProps) => {
  return (
    <>
      {title && (
        <h2 className="my-8 text-center text-xl font-semibold uppercase text-gray-900 dark:text-white">
          {title}
        </h2>
      )}
      <div className="mx-auto my-6 max-w-none px-4  sm:px-0 lg:px-0">
        <Swiper
          slidesPerView={1}
          spaceBetween={20}
          loop={true}
          grabCursor={true}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          breakpoints={{
            480: {
              slidesPerView: 2,
            },
            520: {
              pagination: true,
              slidesPerView: 2,
            },
            640: {
              slidesPerView: 2,
            },
            768: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
          }}
          // thumbs={{ swiper: thumbsSwiper }}
          modules={[FreeMode, Navigation, Thumbs, Pagination, Autoplay]}
          className="mySwiper2"
        >
          {products?.map((product: Product) => {
            return (
              <SwiperSlide key={product.id}>
                <Link key={product.handle} href={`/products/${product.handle}`}>
                  <figure className="flex flex-col rounded-xl border-2 border-gray-50 bg-gray-50/50 p-0 dark:bg-slate-800  md:h-[208px] md:flex-row ">
                    <Image
                      src={product.featuredImage?.url}
                      alt={product.featuredImage?.altText}
                      width={200}
                      height={200}
                      sizes="(100%, 100%)"
                      className="aspect-h-1 aspect-w-1 rounded-lg object-contain mix-blend-multiply"
                    />
                    <div className="text-md flex flex-col gap-2 bg-white">
                      <blockquote className="mt-2 px-4">
                        <p className="text-sm font-medium">{product.title}</p>
                      </blockquote>
                      <figcaption className="px-4 font-medium">
                        <div className="text-gray-400 dark:text-gray-400">
                          {formatPrice(
                            product.priceRange.maxVariantPrice.amount,
                          )}
                        </div>
                      </figcaption>
                    </div>
                  </figure>
                </Link>
              </SwiperSlide>
            )
          })}
        </Swiper>
      </div>
    </>
  )
}
