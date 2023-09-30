import { storefront } from "@/utils/storefront";
import type { Metadata, ResolvingMetadata } from "next";
import Image from "next/image";

type Props = {
  params: { handle: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

const SingleProductQuery = `#graphql
  query getProductsInCollection($handle: String!) {
	collection(handle: $handle) {
		id
		title
    handle
    description
    image {
      altText
      url
      width
      height
    }
		products(first: 50) {
			edges {
				node {
					id
					title
					vendor
					availableForSale
					images(first: 1) {
						edges {
							node {
								id
								url
								width
								height
								altText
							}
						}
					}
					priceRange { # Returns range of prices for a product in the shop's currency.
						minVariantPrice {
							amount
							currencyCode
						}
						maxVariantPrice {
							amount
							currencyCode
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

  const page = data?.collection;

  return {
    title: page.title,
    description: `AE Digi Shop | ${page.description}`,
  };
}

import { ProductList } from "@/components/ProductList";
import Link from "next/link";

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
  const product = data?.collection.product;
  const image = product?.images?.edges[0].node;
  return (
    <>
      <div className="w-full min-h-min">
        <Image
          src={`/collection-banners/${params.handle}.png`}
          alt={collection.image.altText}
          width={10000}
          height={10000}
          className="rounded-md object-cover"
        />
      </div>
      <div className="uppercase text-xs my-2 text-gray-500">
        <Link href="/" className="text-gray-700">
          Home
        </Link>{" "}
        / {collection.title}
      </div>
      <h1 className="font-bold text-lg text-purple-900 my-2">
        {collection.title}
      </h1>
      <ProductList products={product} />
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
    </>
  );
}
