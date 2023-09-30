import { formatPrice } from "@/utils/formatPrice";
import { storefront } from "@/utils/storefront";
import Link from "next/link";

interface ProductListProps {
  products: string[];
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

export async function ProductList({ products }: ProductListProps) {
  const { data } = await storefront(productsQuery);

  const productItems = await data?.products.edges;

  return (
    <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-5 xl:gap-x-8">
      {productItems?.map((item) => {
        const product = item.node;
        const image = product.images.edges[0].node;
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
              <div className="mt-4 flex flex-col space-y-2 text-base font-medium text-gray-900">
                <h3 className="text-lg font-bold line-clamp-2">
                  {product.title}
                </h3>
                <p>
                  <span className="text-gray-500">Por:</span>{" "}
                  {formatPrice(product.priceRange.minVariantPrice.amount)}
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
}
