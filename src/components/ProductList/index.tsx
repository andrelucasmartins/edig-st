"use client";

import { formatPrice } from "@/utils/formatPrice";
import Link from "next/link";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";

interface ProductListProps {
  products: string[];
  title?: string;
  slide?: boolean;
}

const productsTest = `#graphql
  {
    products(sortKey: TITLE, first: 100) {
      edges {
        node {
          id
          title
          description
          handle
          tags
          priceRange {
            minVariantPrice {
              amount
            }
          }
          images(first: 1) {
            edges {
              node {
                transformedSrc
                altText
              }
            }
          }
        }
      }
    }
  }
`;

const productsQuery = `#graphql
  query Products {
    products(first: 8) {
      edges {
        node {
          title
          description
          id
          handle
          tags
          priceRange {
            minVariantPrice {
              amount
            }
          }
          images(first: 1) {
            edges {
              node {
                transformedSrc
                altText
              }
            }
          }
        }
      }
    }
  }
`;

const getProductMediaQuery = `#graphql
  query getProductMedia {
    products(first: 3) {
      edges {
        cursor
        node {
          id
          title
          description
          media(first: 10) {
            edges {
              node {
                mediaContentType
                alt
                ...mediaFieldsByType
              }
            }
          }
        }
      }
    }
  }

  fragment mediaFieldsByType on Media {
    ... on ExternalVideo {
      id
      host
      originUrl
    }
    ... on MediaImage {
      image {
        url
      }
    }
    ... on Model3d {
      sources {
        url
        mimeType
        format
        filesize
      }
    }
    ... on Video {
      sources {
        url
        mimeType
        format
        height
        width
      }
    }
  }
`;

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

import "./style.css";

// import required modules
import { useState } from "react";
import { FreeMode, Navigation, Pagination, Thumbs } from "swiper/modules";

const Product = ({ products }: { products: string[] }) => {
  return (
    <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-5 xl:gap-x-8">
      {products?.map((item) => {
        const product = item || item?.node;
        const image = product?.images?.edges[0].node;
        const price =
          product?.variants?.edges[0].node.price.amount ||
          product.priceRange.minVariantPrice.amount;

        return (
          <Link
            key={product.handle}
            href={`/products/${product.handle}`}
            legacyBehavior
          >
            <a className="group">
              <div className="w-full aspect-w-4 aspect-h-4 rounded-lg overflow-hidden ">
                <img
                  src={image.transformedSrc}
                  alt={image.altText}
                  className="w-full h-full object-center object-cover group-hover:opacity-75"
                />
              </div>
              <div className="mt-4 flex flex-col space-y-2 text-base font-medium text-gray-950">
                <h3 className="text-lg/6  line-clamp-2">{product.title}</h3>
                <p className="text-purple-800">
                  <span>Por:</span> {formatPrice(price)}
                </p>
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
              <p className="mt-1 text-sm italic text-gray-500">
                {product.tags[0]}
              </p>
            </a>
          </Link>
        );
      })}
    </div>
  );
};

const Slider = ({ products }: { products: string[] }) => {
  return (
    <Swiper
      slidesPerView={1}
      spaceBetween={30}
      navigation={true}
      pagination={{
        clickable: true,
      }}
      breakpoints={{
        520: {
          pagination: true,
        },
        640: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
        768: {
          slidesPerView: 4,
          spaceBetween: 40,
        },
        1024: {
          slidesPerView: 5,
          spaceBetween: 50,
        },
      }}
      // thumbs={{ swiper: thumbsSwiper }}
      modules={[FreeMode, Navigation, Thumbs, Pagination]}
      className="mySwiper2"
    >
      {products?.map((item) => {
        const product = item || item?.node;
        const image = product?.images?.edges[0].node;
        const price =
          product?.variants?.edges[0].node.price.amount ||
          product.priceRange.minVariantPrice.amount;

        return (
          <SwiperSlide key={product.id}>
            <Link
              key={product.handle}
              href={`/products/${product.handle}`}
              legacyBehavior
            >
              <a className="group">
                <div className="w-full aspect-w-4 aspect-h-4 rounded-lg overflow-hidden ">
                  <img
                    src={image.transformedSrc}
                    alt={image.altText}
                    className="w-full h-full object-center object-cover group-hover:opacity-75"
                  />
                </div>
                <div className="mt-4 flex flex-col space-y-2 text-base font-medium text-gray-950">
                  <h3 className="text-lg/6  line-clamp-2">{product.title}</h3>
                  <p className="text-purple-800">
                    <span>Por:</span> {formatPrice(price)}
                  </p>
                </div>
                <p className="mt-1 text-sm italic text-gray-500">
                  {product.tags[0]}
                </p>
              </a>
            </Link>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};

export async function ProductList({
  products,
  title,
  slide,
}: ProductListProps) {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  return (
    <>
      {title && (
        <h2 className="text-xl font-semibold text-gray-900 text-center my-8 uppercase">
          {title}
        </h2>
      )}

      {!slide ? (
        <Product products={products} />
      ) : (
        <Slider products={products} />
      )}
    </>
  );
}
