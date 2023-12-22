import { storefront } from "@/utils/storefront"
import type { Metadata } from "next"
import Image from "next/image"

export const dynamic = "force-dynamic"

type Props = {
  params: { handle: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

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
`

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const handle = params.handle

  const { data } = await storefront(SingleProductQuery, {
    handle: handle,
  })

  const shop_name = data?.shop.name as string

  const page = data?.collection

  return {
    title: `${shop_name} | ${page?.title}`,
    description: page?.description,
  }
}

import { Breadcrumb } from "@/components/ui/breadcrumb"

import { getProductRecommendations } from "@/app/data/get-product-recommendations"
import { ProductList } from "@/components/ProductList"
// import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { sorting } from "@/lib/constants"
import { Divider } from "@nextui-org/react"
import { LuChevronLeft, LuChevronRight } from "react-icons/lu"
import { ActionButtonNext, ActionButtonPrev } from "../ActionButton"
import { getCollectionData } from "../actions"

export default async function PageCollections({
  params,
  searchParams,
}: {
  params: { handle: string }
  searchParams: { [key: string]: string | string[] }
}) {
  // const { pageCount } = await getPageCount();

  const { data } = await getCollectionData(params.handle, searchParams.page)

  const collection = data?.collection
  const pagination = collection?.products.pageInfo

  const products = collection?.products.edges
  const image = products?.images?.edges[0]?.node
  const banner = collection?.metafields[0]?.reference.image.src
  const productId = pagination && products[0]?.node.id
  const recommendations = await storefront(getProductRecommendations, {
    productId: productId,
  })

  const productRecommendations = recommendations?.data?.productRecommendations

  const productsCount = collection?.products.filters[0]?.values[0]?.count

  // async function actionHandleSelect(e: any) {
  //   await filterType(e)

  //   revalidatePath(`/collections/${params.handle}`)
  // }

  return (
    <>
      <div className="mt-4 min-h-min w-full">
        <figure className="relative h-[228px]">
          <div
            className="h-[228px] w-full rounded bg-gradient-to-r from-purple-500/80 from-10% 
              via-transparent to-sky-400/20 to-80%"
          >
            <Image
              src={banner}
              alt={collection?.title}
              sizes="(max-width: 768px) 100vw, 33vw"
              fill
              quality="90"
              className="-z-10 rounded-md object-cover"
            />
          </div>
          <figcaption className="absolute inset-0 z-10 flex place-items-center justify-start px-8 py-4 text-xl font-bold text-white drop-shadow-xl sm:text-5xl">
            {collection?.title}
          </figcaption>
        </figure>
        <p className="sr-only">{collection?.description}</p>
      </div>
      <h1 className="my-2 text-xl font-bold text-purple-900 dark:text-purple-500">{collection?.title}</h1>
      <Divider className="my-4 h-[1px] bg-gray-300" />
      <Breadcrumb currentPage={collection?.title} back />
      {/* <form className="my-6 flex items-center justify-between">
        <Select onValueChange={actionHandleSelect}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filtrar por" />
          </SelectTrigger>
          <SelectContent position={"item-aligned"}>
            <SelectGroup>
              <SelectLabel>filtro</SelectLabel>
              {sorting &&
                sorting?.map((item) => (
                  <SelectItem value={item.slug} key={item.slug}>
                    {item.title}
                  </SelectItem>
                ))}
            </SelectGroup>
          </SelectContent>
        </Select>{" "}
        <span>{productsCount} Item(s)</span>
      </form> */}
      <ProductList products={products} />
      {productsCount && (
        <div className="flex items-end justify-center gap-4">
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
          <div className="aspect-w-4 aspect-h-3 overflow-hidden rounded-lg bg-gray-100">
            <Image
              src={image?.transformedSrc}
              alt={image?.altText}
              width={image?.width}
              height={image?.height}
              className="object-cover object-center"
            />
          </div>
        </div>
      </div>
      <ProductList products={productRecommendations} title="Novidades que chegaram pra você" slide />
    </>
  )
}

export async function generateStaticParams({ params }: { params: { handle: string } }) {
  return params.handle ? [{ handle: params.handle }] : []
}
