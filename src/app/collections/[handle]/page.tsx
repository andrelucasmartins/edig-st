import { storefront } from "@/utils/storefront";
import type { Metadata, ResolvingMetadata } from "next";
import Image from "next/image";

export const dynamic = "force-dynamic";

type Props = {
  params: { handle: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

const SingleProductQuery = `#graphql
  query getProductsOfProductTypeInCollection($handle: String!, $afterPage: String, $beforePage: String, $first: Int, $last: Int) {
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

		products(first: $first, last: $last, after: $afterPage, before: $beforePage) {    
      pageInfo {
        hasNextPage
        startCursor
        endCursor
        hasPreviousPage
      }    
			edges {
        cursor
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
      filters {
        values {
          id
          label
          count
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

import { getProductRecommendations } from "@/app/data/get-product-recommendations";
import { ProductList } from "@/components/ProductList";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";
import { ActionButtonNext, ActionButtonPrev } from "../ActionButton";
import { getCollectionData, getPageCount } from "../actions";

// let collection;
// let pagination: {
//   startCursor: string;
//   endCursor: string;
//   hasPreviousPage: boolean;
//   hasNextPage: boolean;
// };

export default async function PageCollections({
  params,
  searchParams,
}: {
  params: { handle: string };
  searchParams: { [key: string]: string | string[] };
}) {
  const { pageCount } = await getPageCount();

  const { data } = await getCollectionData(params.handle, searchParams.page);

  const collection = data?.collection;
  const pagination = collection?.products.pageInfo;

  const products = collection?.products.edges;
  const image = products?.images?.edges[0]?.node;
  const banner = collection?.metafields[0]?.reference.image.src;
  const productId = pagination && products[0]?.node.id;
  const recommendations = await storefront(getProductRecommendations, {
    productId: productId,
  });

  const productRecommendations = recommendations?.data?.productRecommendations;

  const productsCount = collection?.products.filters[0]?.values[0]?.count;

  return (
    <>
      <div className="w-full min-h-min mt-4">
        <figure className="relative h-[228px] ">
          <div
            className="w-full h-[228px] rounded bg-gradient-to-r from-purple-500/80 from-10% 
              via-transparent to-sky-400/20 to-80%"
          >
            <Image
              src={banner}
              alt={collection?.title}
              fill
              className="rounded-md object-cover -z-10"
            />
          </div>
          <figcaption className="absolute inset-0 z-10 px-8 text-white font-bold text-xl sm:text-5xl flex justify-start place-items-center py-4 drop-shadow-xl">
            {collection?.title}
          </figcaption>
        </figure>
        <p className="sr-only">{collection?.description}</p>
      </div>
      <Breadcrumb currentPage={collection?.title} back />
      <div className="flex justify-between items-center">
        <h1 className="font-bold text-xl text-purple-900 dark:text-purple-500 my-2">
          {collection?.title}
        </h1>

        <span>{productsCount} Produto(s)</span>
      </div>
      <ProductList products={products} />
      {productsCount && (
        <div className="flex justify-center items-end gap-4">
          <form className="flex justify-center gap-2">
            <ActionButtonPrev
              link={`/collections/${params.handle}?page=${pagination?.startCursor}`}
              cursor={pagination?.startCursor}
              disabled={!pagination?.hasPreviousPage}
            >
              <LuChevronLeft />
            </ActionButtonPrev>
            {/* <div className="flex self-center">
              {pageCount ?? pageCount} / {Math.ceil(productsCount / 10)}
            </div> */}
            <ActionButtonNext
              link={`/collections/${params.handle}?page=${pagination?.endCursor}`}
              cursor={pagination?.endCursor}
              disabled={!pagination?.hasNextPage}
            >
              <LuChevronRight />
            </ActionButtonNext>
          </form>{" "}
        </div>
      )}

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
      <ProductList
        products={productRecommendations}
        title="Novidades que chegaram pra você"
        slide
      />
    </>
  );
}
