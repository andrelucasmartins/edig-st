import { Button } from "@/components/ui/button";
import { storefront } from "@/utils/storefront";
import { format } from "date-fns";
import { Breadcrumb } from "../../../components/ui/breadcrumb";
import { formatPrice } from "../../../utils/formatPrice";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const SingleProductQuery = `#graphql
  query getProductByHandle($handle: String!) {
    product(handle: $handle) {
      id
      title
      description
      tags
      updatedAt
      priceRange {
          minVariantPrice {
            amount
            currencyCode  #active local currency
          }
          maxVariantPrice {
            amount
            currencyCode
          }
        }
        compareAtPriceRange {
          minVariantPrice {
            amount
            currencyCode  #active local currency
          }
          maxVariantPrice {
            amount
            currencyCode
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
          }
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

`;

export default async function ProductsPage({
  params,
  searchParams,
}: {
  params: { handle: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const { data } = await storefront(SingleProductQuery, {
    handle: params.handle,
  });

  const product = data?.product;
  const image = product?.images?.edges[0].node;
  return (
    <>
      {/* Product */}
      <Breadcrumb back />
      <div className="lg:grid lg:grid-cols-7 lg:gap-x-8 lg:gap-y-10 xl:gap-x-16">
        {/* Product image */}
        <div className="lg:col-span-4">
          <div className="aspect-w-4 aspect-h-3 rounded-lg bg-gray-100 overflow-hidden">
            <img
              src={image?.transformedSrc}
              alt={image?.altText}
              className="object-center object-cover"
            />
          </div>
        </div>

        {/* Product details */}
        <div className="max-w-2xl mx-auto mt-14 sm:mt-16 lg:max-w-none lg:mt-0 lg:col-span-3">
          <div className="flex flex-col-reverse">
            <div>
              <h1 className="text-2x1 font-extrabold tracking-tight text-gray-900 sm:text-3xl">
                {product.title}
              </h1>

              <h2 id="information-heading" className="sr-only">
                Product information
              </h2>

              <p className="text-sm text-gray-500 mt-2">
                Version {product.tags[0]} &middot; Updated{" "}
                <time dateTime={product.updatedAt}>
                  {format(new Date(product.updatedAt), "dd MMM yyyy")}
                </time>
              </p>

              <div className="flex flex-col mt-4">
                <small className="line-through text-sm text-gray-500">
                  {formatPrice(product.priceRange.maxVariantPrice.amount)}
                </small>
                <h2 className="text-2x1 font-extrabold tracking-tight text-gray-900 sm:text-3xl">
                  {formatPrice(product.priceRange.minVariantPrice.amount)}
                </h2>
                <span className="text-sm text-gray-500">
                  12x{" "}
                  {formatPrice(product.priceRange.maxVariantPrice.amount / 12)}{" "}
                  sem juros no cartão
                </span>
              </div>
            </div>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-x-6 ga´-y-4 sm:grid-cols-1 gap-4">
            <Button
              className="text-green-500 border-2 border-green-500 hover:border-green-500 hover:bg-green-500 hover:text-white py-6 uppercase"
              size={"lg"}
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
          </div>

          <Accordion type="single" collapsible className="text-gray-500 mt-6">
            <AccordionItem value="item-1">
              <AccordionTrigger>Especificações</AccordionTrigger>
              <AccordionContent>{product.description}</AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </>
  );
}
