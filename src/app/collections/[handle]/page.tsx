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

  const collection = await storefront(SingleProductQuery, {
    handle,
  });

  return {
    title: collection.title,
  };
}

import { ProductList } from "@/components/ProductList";

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

  console.log(data);
  const collection = data?.collection;
  const product = data?.collection.product;
  const image = product?.images?.edges[0].node;
  return (
    <>
      <div className="w-[228px] min-h-min">
        <Image
          src={collection.image.url}
          alt={collection.image.altText}
          width={collection.image.width}
          height={collection.image.height}
          className="rounded-md object-cover"
        />
      </div>
      <h1 className="font-bold text-lg text-purple-900">{collection.title}</h1>
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
