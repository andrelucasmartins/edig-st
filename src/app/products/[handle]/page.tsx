import { getProductRecommendations } from "@/app/data/get-product-recommendations";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { HIDDEN_PRODUCT_TAG } from "@/lib/constants";
import { getProduct } from "@/lib/shopify";
import { storefront } from "@/utils/storefront";
import { format } from "date-fns";

import type { Metadata } from "next";
import { notFound } from "next/navigation";

type Props = {
  params: { handle: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata({
  params,
}: {
  params: { handle: string };
}): Promise<Metadata> {
  const product = await getProduct(params.handle);

  if (!product) return notFound();

  const { url, width, height, altText: alt } = product.featuredImage || {};
  const indexable = !product.tags.includes(HIDDEN_PRODUCT_TAG);

  return {
    title: product.seo.title || product.title,
    description: product.seo.description || product.description,
    robots: {
      index: indexable,
      follow: indexable,
      googleBot: {
        index: indexable,
        follow: indexable,
      },
    },
    openGraph: url
      ? {
          images: [
            {
              url,
              width,
              height,
              alt,
            },
          ],
        }
      : null,
  };
}

import { ProductList } from "@/components/ProductList";
import { AddToCart } from "@/components/cart/add-to-cart";
import Price from "@/components/price";
import { ProductReviews } from "@/components/product-reviews";
import { VariantSelector } from "@/components/product/variant-selector";
import { ThumbsGallery } from "@/components/thumbs-gallery";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Image } from "@/lib/shopify/types";

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

export default async function ProductsPage({
  params,
}: {
  params: { handle: string };
}) {
  const product = await getProduct(params.handle);

  if (!product) return notFound();

  const recommendations = await storefront(getProductRecommendations, {
    productId: product.id,
  });

  const productRecommendations = recommendations?.data?.productRecommendations;

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    description: product.description,
    image: product.featuredImage.url,
    offers: {
      "@type": "AggregateOffer",
      availability: product.availableForSale
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
      priceCurrency: product.priceRange.minVariantPrice.currencyCode,
      highPrice: product.priceRange.maxVariantPrice.amount,
      lowPrice: product.priceRange.minVariantPrice.amount,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(productJsonLd),
        }}
      />
      <section className="mx-auto px-4 sm:py-4 sm:px-6 lg:max-w-7xl lg:px-8">
        {/* Product */}
        <Breadcrumb back />
        <div className="lg:grid lg:grid-cols-7 lg:gap-x-8 lg:gap-y-10 xl:gap-x-16">
          {/* Product image */}
          <div className="lg:col-span-4">
            <div className="aspect-w-4 aspect-h-3 rounded-lg  overflow-hidden">
              <ThumbsGallery
                images={product.images.map((image: Image) => ({
                  src: image.url,
                  altText: image.altText,
                }))}
              />
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
                  <small className="line-through text-sm text-gray-500 dark:text-gray-500">
                    <Price
                      amount={product.priceRange.maxVariantPrice.amount}
                      currencyCode={
                        product.priceRange.maxVariantPrice.currencyCode
                      }
                    />
                  </small>
                  <h2 className="text-2x1 font-extrabold tracking-tight text-gray-900 dark:text-purple-500 sm:text-3xl">
                    <Price
                      amount={product.priceRange.minVariantPrice.amount}
                      currencyCode={
                        product.priceRange.minVariantPrice.currencyCode
                      }
                    />
                  </h2>
                  {/* <span className="text-sm text-gray-500 dark:text-gray-50">
                    12x{" "}
                    {formatPrice(
                      product.priceRange.maxVariantPrice.amount / 12
                    )}{" "}
                    sem juros no cartão
                  </span> */}
                  <VariantSelector
                    options={product.options}
                    variants={product.variants}
                  />
                </div>
              </div>
            </div>

            <div className="mt-10 grid grid-cols-1 gap-x-6 ga´-y-4 sm:grid-cols-1 gap-4">
              <AddToCart
                variants={product.variants}
                availableForSale={product.availableForSale}
              />
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
                <AccordionContent>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: product.descriptionHtml,
                    }}
                  />
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
        <ProductReviews productId={product.id} />

        <ProductList
          products={productRecommendations}
          title="Novidades que chegaram pra você"
          slide
        />
      </section>
    </>
  );
}
