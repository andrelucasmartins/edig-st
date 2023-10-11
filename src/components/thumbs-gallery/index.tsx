"use client";

import { Suspense, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import "swiper/css/zoom";

import type { Swiper as SwiperInterface } from "swiper";
import { FreeMode, Navigation, Thumbs, Zoom } from "swiper/modules";

interface ThumbsGalleryProps {
  image?: {
    transformedSrc: string;
    altText: string;
  };
  list?: any;
}

export const ThumbsGallery = ({ image, list = [] }: ThumbsGalleryProps) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperInterface>();

  return (
    <div className="space-y-4 bg-white">
      <Swiper
        style={{
          "--swiper-navigation-color": "#444",
          "--swiper-pagination-color": "#444",
        }}
        spaceBetween={10}
        navigation={true}
        grabCursor={true}
        loop
        zoom={true}
        thumbs={{ swiper: thumbsSwiper }}
        onChange={(e) => console.log(e)}
        modules={[FreeMode, Navigation, Thumbs, Zoom]}
        className="mySwiper2 drop-shadow-md"
      >
        <Suspense fallback={<div>Loading...</div>}>
          {list.map((item: any, index: number) => (
            <SwiperSlide key={index} className="drop-shadow-xl">
              <img
                src={item?.node?.image?.url}
                alt={item?.node?.alt}
                className="object-center object-cover"
                onClick={() => {
                  setThumbsSwiper(item.id);
                }}
              />
            </SwiperSlide>
          ))}
        </Suspense>
      </Swiper>
      <Swiper
        onSwiper={(swiper) => console.log(swiper)}
        loop={true}
        spaceBetween={10}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper"
      >
        {list.map((thumb: any, index: number) => {
          const image = thumb?.node?.image;
          return (
            <SwiperSlide key={index}>
              <img
                src={image?.url}
                alt={image?.alt}
                className="object-center object-cover cursor-pointer ring-1 ring-black ring-opacity-5"
              />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};
