"use client";

import Image from "next/image";
import Link from "next/link";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

export const BannerHome = () => {
  return (
    <div>
      <div className="mx-auto my-6 max-w-7xl px-4 sm:px-6 lg:px-8">
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
      </div>
    </div>
  );
};
