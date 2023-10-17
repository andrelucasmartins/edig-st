import { getProductRecommendations } from "@/app/data/get-product-recommendations";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/utils/formatPrice";
import { storefront } from "@/utils/storefront";
import { format } from "date-fns";

import type { Metadata, ResolvingMetadata } from "next";

type Props = {
  params: { handle: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const handle = params.handle;

  const { data } = await storefront(SingleProductQuery, {
    handle: handle,
  });

  const shop_name = data?.shop.name as string;
  const seo = data?.product?.seo;

  const page = data?.collection;

  return {
    title: `${shop_name} | ${seo?.title}`,
    description: page?.description,
  };
}

import { ProductList } from "@/components/ProductList";
import { ThumbsGallery } from "@/components/thumbs-gallery";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const SingleProductQuery = `#graphql
  query getProductByHandle($handle: String!) {
    shop {
      name
    }
    product(handle: $handle) {
      id
      title
      description
      handle
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
      variants(first: 1) {
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

  fragment mediaFieldsByType on Media {
  ... on ExternalVideo {
    id
    embeddedUrl
  }
  ... on MediaImage {
    image {
      id
      url,
      altText
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

const checkoutMutation = `#graphql

  mutation createCart($cartInput: CartInput) {
    cartCreate(input: $cartInput) {
      cart {
        id
        createdAt
        updatedAt
        checkoutUrl
        lines(first: 100) {
          edges {
            node {
              id
              merchandise {
                ... on ProductVariant {
                  id
                }
              }
            }
          }
        }
        attributes {
          key
          value
        }
        cost {
          totalAmount {
            amount
            currencyCode
          }
          subtotalAmount {
            amount
            currencyCode
          }
          totalTaxAmount {
            amount
            currencyCode
          }
          totalDutyAmount {
            amount
            currencyCode
          }
        }
      }
    }
  }
`;

interface MediaProps {
  media: {
    edges: [
      {
        node: {
          mediaContentType: string;
          alt: string;
          image: {
            url: string;
          };
        };
      }
    ];
  };
}

async function checkout(variantId: string) {
  const { data } = await storefront(checkoutMutation, variantId);

  const { webUrl } = data?.cartCreate?.checkoutUrl;

  window.location.href = webUrl;
}

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
  const medias: MediaProps["media"] = product?.media?.edges;

  const variantId = product.variants.edges[0].node.id as string;

  checkout(variantId);

  const recommendations = await storefront(getProductRecommendations, {
    productId: product.id,
  });

  const productRecommendations = recommendations?.data?.productRecommendations;

  return (
    <section className="mx-auto px-4 sm:py-4 sm:px-6 lg:max-w-7xl lg:px-8">
      {/* Product */}
      <Breadcrumb back />
      <div className="lg:grid lg:grid-cols-7 lg:gap-x-8 lg:gap-y-10 xl:gap-x-16">
        {/* Product image */}
        <div className="lg:col-span-4">
          <div className="aspect-w-4 aspect-h-3 rounded-lg bg-gray-100 overflow-hidden">
            <ThumbsGallery image={image} list={medias} />
          </div>
        </div>

        {/* Product details */}
        <div className="max-w-2xl mx-auto mt-14 sm:mt-16 lg:max-w-none lg:mt-0 lg:col-span-3">
          <div className="flex flex-col-reverse">
            <div>
              <h1 className="text-2x1 font-extrabold tracking-tight text-gray-900 sm:text-3xl dark:text-white">
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
                <small className="line-through text-sm text-gray-500 dark:text-red-400">
                  {formatPrice(product.priceRange.maxVariantPrice.amount)}
                </small>
                <h2 className="text-2x1 font-extrabold tracking-tight text-gray-900 dark:text-purple-500 sm:text-3xl">
                  {formatPrice(product.priceRange.minVariantPrice.amount)}
                </h2>
                <span className="text-sm text-gray-500 dark:text-gray-50">
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

      <ProductList
        products={productRecommendations}
        title="Novidades que chegaram pra você"
        slide
      />
    </section>
  );
}
