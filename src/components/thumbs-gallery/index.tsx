"use client";

import { Suspense } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import "swiper/css/zoom";

import { createUrl } from "@/lib/utils";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";

interface ThumbsGalleryProps {
  image?: {
    transformedSrc: string;
    altText: string;
  };
  images: {
    src: string;
    altText: string;
  }[];
}

export const ThumbsGallery = ({ image, images }: ThumbsGalleryProps) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const imageSearchParam = searchParams.get("image");
  const imageIndex = imageSearchParam ? parseInt(imageSearchParam) : 0;

  const nextSearchParams = new URLSearchParams(searchParams.toString());
  const nextImageIndex = imageIndex + 1 < images.length ? imageIndex + 1 : 0;
  nextSearchParams.set("image", nextImageIndex.toString());
  const nextUrl = createUrl(pathname, nextSearchParams);

  const previousSearchParams = new URLSearchParams(searchParams.toString());
  const previousImageIndex =
    imageIndex === 0 ? images?.length - 1 : imageIndex - 1;
  // console.log("Item2: " + imageIndex, "Item1:" + images.length);
  previousSearchParams.set("image", previousImageIndex.toString());
  const previousUrl = createUrl(pathname, previousSearchParams);

  return (
    <div className="space-y-4 bg-transparent">
      <Suspense fallback={<div>Loading...</div>}>
        {images[imageIndex] && (
          <img
            className="h-full w-full object-center object-cover rounded"
            sizes="(min-width: 100%) 66vw, 100vw"
            alt={images[imageIndex]?.altText as string}
            src={images[imageIndex]?.src as string}
          />
        )}
      </Suspense>
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
        {images.length > 1
          ? images.map((image, index) => {
              const isActive = index === imageIndex;
              const imageSearchParams = new URLSearchParams(
                searchParams.toString()
              );

              imageSearchParams.set("image", index.toString());
              return (
                <SwiperSlide key={image.src}>
                  <Link
                    aria-label="Enlarge product image"
                    href={createUrl(pathname, imageSearchParams)}
                    scroll={false}
                    className="h-full w-full"
                  >
                    <img
                      src={image?.url}
                      alt={image?.alt}
                      className="object-center object-cover cursor-pointer ring-1 ring-black ring-opacity-5"
                      // active={isActive}
                    />
                  </Link>
                </SwiperSlide>
              );
            })
          : null}
      </Swiper>
    </div>
  );
};
