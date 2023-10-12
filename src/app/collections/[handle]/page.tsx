import { storefront } from "@/utils/storefront";
import type { Metadata, ResolvingMetadata } from "next";
import Image from "next/image";

type Props = {
  params: { handle: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

const SingleProductQuery = `#graphql
  query getProductsInCollection($handle: String!) {
  shop {
    name
  }
	collection(handle: $handle) {
		id
		title
    handle
    description
    metafields(identifiers: {key: "banner", namespace: "custom"}) {
      id
      reference {
        ... on MediaImage {
          id
          image {
            src
            altText
          }
        }
      }
    }      

		products(first: 50) {
			edges {
				node {
					id
					title
          handle
          tags
					vendor
					priceRange {
            minVariantPrice {
              amount
              currencyCode
            }
            maxVariantPrice {
              amount
              currencyCode
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
          variants(first: 3) {
            edges {
              cursor
              node {
                id
                title
                quantityAvailable
                price {
                  amount
                  currencyCode
                }
                compareAtPrice {
                  amount
                  currencyCode
                }
              }
            }
          }
				}
			}
      
		}    
	}
}
`;

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const handle = params.handle;

  const { data } = await storefront(SingleProductQuery, {
    handle: handle,
  });

  const shop_name = data?.shop.name as string;

  const page = data?.collection;

  return {
    title: `${shop_name} | ${page?.title}`,
    description: page?.description,
  };
}

import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Skeleton } from "@/components/ui/skeleton";

import { ProductList } from "@/components/ProductList";
import { Suspense } from "react";

export default async function Page({
  params,
  searchParams,
}: {
  params: { handle: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const { data } = await storefront(SingleProductQuery, {
    handle: params.handle,
  });

  const collection = data?.collection;
  const products = collection?.products.edges;
  const image = products?.images?.edges[0].node;
  const banner = collection?.metafields[0].reference.image.src;

  // const product_recommendations = await storefront(getProductRecommendations, {
  //   id: collection?.id,
  // });

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="w-full min-h-min">
        <figure className="relative">
          <Suspense
            fallback={<Skeleton className="w-full h-[228px] rounded" />}
          >
            <Image
              src={banner}
              alt={collection?.title}
              width={10000}
              height={10000}
              className="rounded-md object-cover"
            />
            <figcaption className="absolute inset-0 z-10 px-8 text-gray-50 font-bold text-xl sm:text-5xl flex justify-start place-items-center py-4 drop-shadow-xl">
              {collection?.title}
            </figcaption>
          </Suspense>
        </figure>
        <p className="sr-only">{collection?.description}</p>
      </div>
      <Breadcrumb currentPage={collection?.title} back />
      <h1 className="font-bold text-lg text-purple-900 my-2">
        {collection?.title}
      </h1>
      <ProductList products={products} />
      {/* Product */}
      <div className="lg:grid lg:grid-cols-7 lg:gap-x-8 lg:gap-y-10 xl:gap-x-16">
        {/* Product image */}

        <div className="lg:col-span-4">
          <div className="aspect-w-4 aspect-h-3 rounded-lg bg-gray-100 overflow-hidden">
            <img
              src={image?.transformedSrc}
              alt={image?.altText}
              width={image?.width}
              height={image?.height}
              className="object-center object-cover"
            />
          </div>
        </div>
      </div>
    </Suspense>
  );
}