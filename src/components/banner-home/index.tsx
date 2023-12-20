"use client"

import Image from "next/image"
import Link from "next/link"
import { Suspense } from "react"
import "swiper/css"
import "swiper/css/pagination"
import { Pagination } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"

import { Skeleton } from "@/components/ui/skeleton"

export const BannerHome = () => {
  return (
    <div className="mx-auto my-6 max-w-7xl px-4 sm:px-6 lg:px-8">
      <Suspense
        fallback={
          <div className="h-72 w-full space-y-5 rounded bg-purple-800 p-4">
            <Skeleton className="rounded-lg bg-purple-600">
              <div className="bg-default-300 h-32 rounded-lg" />
            </Skeleton>
            <div className="space-y-3">
              <Skeleton className="w-4/5 rounded-lg bg-purple-600">
                <div className="bg-default-200 h-3 w-4/5 rounded-lg"></div>
              </Skeleton>
              <Skeleton className="w-2/5 rounded-lg bg-purple-600">
                <div className="bg-default-300 h-3 w-2/5 rounded-lg"></div>
              </Skeleton>
            </div>
          </div>
        }
      >
        <Swiper
          loop={true}
          pagination={{
            dynamicBullets: true,
          }}
          modules={[Pagination]}
          className="mySwiper h-72 "
        >
          <SwiperSlide>
            <Link href="/collections/para-ela">
              <Image
                src="/banner-home/desktop_large.webp"
                alt="Para Ela"
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="rounded object-cover"
                quality={100}
              />
            </Link>
          </SwiperSlide>
          <SwiperSlide>Slide 2</SwiperSlide>
          <SwiperSlide>Slide 3</SwiperSlide>
          <SwiperSlide>Slide 4</SwiperSlide>
        </Swiper>
      </Suspense>
    </div>
  )
}
