"use client"

import { Suspense } from "react"
import { Swiper, SwiperSlide } from "swiper/react"

import "swiper/css"
import "swiper/css/free-mode"
import "swiper/css/navigation"
import "swiper/css/thumbs"
import "swiper/css/zoom"

import { createUrl } from "@/lib/utils"
import Image from "next/image"
import Link from "next/link"
import { usePathname, useSearchParams } from "next/navigation"
import { FreeMode, Navigation, Thumbs } from "swiper/modules"

interface ThumbsGalleryProps {
  image?: {
    transformedSrc: string
    altText: string
  }
  images: {
    src: string
    altText: string
  }[]
}

export const ThumbsGallery = ({ images }: ThumbsGalleryProps) => {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const imageSearchParam = searchParams.get("image")
  const imageIndex = imageSearchParam ? parseInt(imageSearchParam) : 0

  const nextSearchParams = new URLSearchParams(searchParams.toString())
  const nextImageIndex = imageIndex + 1 < images.length ? imageIndex + 1 : 0
  nextSearchParams.set("image", nextImageIndex.toString())
  // const nextUrl = createUrl(pathname, nextSearchParams);

  const previousSearchParams = new URLSearchParams(searchParams.toString())
  const previousImageIndex =
    imageIndex === 0 ? images?.length - 1 : imageIndex - 1
  // console.log("Item2: " + imageIndex, "Item1:" + images.length);
  previousSearchParams.set("image", previousImageIndex.toString())
  // const previousUrl = createUrl(pathname, previousSearchParams);

  return (
    <div className="space-y-4 bg-transparent">
      <Suspense fallback={<div>Loading...</div>}>
        {images[imageIndex] && (
          <Image
            className="h-full w-full rounded border border-gray-300/40 object-cover object-center mix-blend-multiply"
            sizes="(min-width: 100%) 66vw, 100vw"
            width={100}
            height={100}
            alt={images[imageIndex]?.altText as string}
            src={images[imageIndex]?.src as string}
          />
        )}
      </Suspense>
      {/* <Suspense>
        {images.length > 1 ? (
          <ul className="flex flex-wrap items-center justify-start gap-4 gap-x-4 overflow-auto py-1 lg:mb-0">
            {images.map((image, index) => {
              const isActive = index === imageIndex;
              const imageSearchParams = new URLSearchParams(
                searchParams.toString(),
              );

              imageSearchParams.set("image", index.toString());

              return (
                <li key={image.src} className="h-20 w-20">
                  <Link
                    aria-label="Enlarge product image"
                    href={createUrl(pathname, imageSearchParams)}
                    scroll={false}
                    className="h-full w-full"
                  >
                    <GridTileImage
                      alt={image.altText}
                      src={image.src}
                      width={80}
                      height={80}
                      active={isActive}
                    />
                  </Link>
                </li>
              );
            })}
          </ul>
        ) : null}
      </Suspense> */}
      <Swiper
        onSwiper={(swiper) => console.log(swiper)}
        loop={true}
        spaceBetween={10}
        slidesPerView={7}
        grabCursor={true}
        freeMode={true}
        navigation={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper"
      >
        {images.length > 1
          ? images.map((image, index) => {
              // const isActive = index === imageIndex;
              const imageSearchParams = new URLSearchParams(
                searchParams.toString(),
              )

              imageSearchParams.set("image", index.toString())
              return (
                <SwiperSlide key={image.src}>
                  <Link
                    aria-label="Enlarge product image"
                    href={createUrl(pathname, imageSearchParams)}
                    scroll={false}
                    className="h-full w-full"
                  >
                    <Image
                      src={image?.src}
                      alt={image?.altText}
                      width={100}
                      height={100}
                      sizes="(min-width: 100%) 66vw, 100vw"
                      className="cursor-pointer object-cover object-center ring-1 ring-black ring-opacity-5"
                      // active={isActive}
                    />
                  </Link>
                </SwiperSlide>
              )
            })
          : null}
      </Swiper>
    </div>
  )
}
