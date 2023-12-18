"use client";

import { formatPrice } from "@/utils/formatPrice";
import Image from "next/image";
import Link from "next/link";
import "swiper/css";
import "swiper/css/pagination";
import { FreeMode, Navigation, Pagination, Thumbs } from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";

type Product = {
  [x: string]: any;
  id: string;
  handle: string;
  title: string;
  featuredImage: {
    url: string;
    altText: string;
  };
  priceRange: {
    maxVariantPrice: {
      amount: number;
      currencyCode: string;
    };
  };
};

interface CarouselItemsProps {
  title?: string;
  products: Product[] | Product | any;
}
export const CarouselItems = ({ title, products }: CarouselItemsProps) => {
  return (
    <>
      {title && (
        <h2 className="my-8 text-center text-xl font-semibold uppercase text-gray-900 dark:text-white">
          {title}
        </h2>
      )}
      <Swiper
        slidesPerView={1}
        spaceBetween={20}
        loop
        grabCursor={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        breakpoints={{
          520: {
            pagination: true,
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
        modules={[FreeMode, Navigation, Thumbs, Pagination]}
        className="mySwiper2"
      >
        {products?.map((product: Product) => {
          return (
            <SwiperSlide key={product.id}>
              <Link key={product.handle} href={`/products/${product.handle}`}>
                <figure className="flex flex-col rounded-xl bg-slate-50 p-0 dark:bg-slate-800  md:h-[208px] md:flex-row ">
                  <Image
                    src={product.featuredImage?.url}
                    alt={product.featuredImage?.altText}
                    width={100}
                    height={100}
                    sizes="(100%, auto)"
                    className="h-min w-full object-contain group-hover:opacity-75 "
                  />
                  <div className="text-md flex flex-col gap-2 ">
                    <blockquote className="px-4">
                      <p className="font-medium">{product.title}</p>
                    </blockquote>
                    <figcaption className="px-4 font-medium">
                      <div className="text-sky-500 dark:text-sky-400">
                        {formatPrice(product.priceRange.maxVariantPrice.amount)}
                      </div>
                    </figcaption>
                  </div>
                </figure>
                {/* <div className="mt-4 flex flex-col space-y-2 text-base font-medium text-gray-950">
                  <h3 className="text-lg/6  line-clamp-2 dark:text-white">
                    {product.title}
                  </h3>
                  <p className="text-purple-800 dark:text-purple-500">
                    <span>Por:</span>{" "}
                    {formatPrice(product.priceRange.maxVariantPrice.amount)}
                  </p>
                </div> */}
              </Link>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </>
  );
};
