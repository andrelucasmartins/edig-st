"use client";

import { Image } from "@nextui-org/react";
import Link from "next/link";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

export const BannerHome = () => {
  return (
    <>
      <div>
        <div className="mx-auto my-6 max-w-7xl px-4 sm:px-6 lg:px-8">
          <Swiper
            pagination={{
              dynamicBullets: true,
            }}
            modules={[Pagination]}
            className="mySwiper h-72"
          >
            <SwiperSlide>
              <Link href="/para-ela">
                <Image
                  src="/banner-home/desktop_large.webp"
                  alt="Para Ela"
                  width={100}
                  height={100}
                  sizes="(100%, auto)"
                  className="rounded"
                />
              </Link>
            </SwiperSlide>
            <SwiperSlide>Slide 2</SwiperSlide>
            <SwiperSlide>Slide 3</SwiperSlide>
            <SwiperSlide>Slide 4</SwiperSlide>
            <SwiperSlide>Slide 5</SwiperSlide>
            <SwiperSlide>Slide 6</SwiperSlide>
            <SwiperSlide>Slide 7</SwiperSlide>
            <SwiperSlide>Slide 8</SwiperSlide>
            <SwiperSlide>Slide 9</SwiperSlide>
          </Swiper>
        </div>
      </div>
    </>
  );
};
