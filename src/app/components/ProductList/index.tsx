// import { Content } from "./content";
// import { Description } from "./description";
// import { Image } from "./image";
// import { Label } from "./label";
// import { Link } from "./link";
// import { Product } from "./product";
// import { Title } from "./title";

// export const ProductList = {
//   Product,
//   Label,
//   Image,
//   Content,
//   Link,
//   Title,
//   Description,
// };

// "use client";

import { formatPrice } from "@/utils/formatPrice";
import { storefront } from "@/utils/storefront";
import Image from "next/image";
import Link from "next/link";

// const productsTest = `#graphql
//   {
//     products(sortKey: TITLE, first: 100) {
//       edges {
//         node {
//           id
//           title
//           description
//           handle
//           tags
//           priceRange {
//             minVariantPrice {
//               amount
//             }
//           }
//           images(first: 1) {
//             edges {
//               node {
//                 transformedSrc
//                 altText
//               }
//             }
//           }
//         }
//       }
//     }
//   }
// `;

const productsQuery = `#graphql
  query Products {
    products(first: 200) {
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

// const getProductMediaQuery = `#graphql
//   query getProductMedia {
//     products(first: 3) {
//       edges {
//         cursor
//         node {
//           id
//           title
//           description
//           media(first: 10) {
//             edges {
//               node {
//                 mediaContentType
//                 alt
//                 ...mediaFieldsByType
//               }
//             }
//           }
//         }
//       }
//     }
//   }

//   fragment mediaFieldsByType on Media {
//     ... on ExternalVideo {
//       id
//       host
//       originUrl
//     }
//     ... on MediaImage {
//       image {
//         url
//       }
//     }
//     ... on Model3d {
//       sources {
//         url
//         mimeType
//         format
//         filesize
//       }
//     }
//     ... on Video {
//       sources {
//         url
//         mimeType
//         format
//         height
//         width
//       }
//     }
//   }
// `;

export async function ProductList() {
  const { data } = await storefront(productsQuery);

  const products = await data?.products.edges;

  return (
    <div className="mx-auto max-w-2xl px-4 pb-16 pt-6 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
      <h2 id="products-heading" className="py-4 text-3xl">
        Produtos
      </h2>

      <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 xl:gap-x-8">
        {products?.map((item: any) => {
          const product = item.node;
          const image = product.images.edges[0].node;
          return (
            <Link
              key={product.handle}
              href={`/products/${product.handle}`}
              legacyBehavior
            >
              <a className="group">
                <div className="aspect-w-4 aspect-h-4 w-full overflow-hidden rounded-lg ">
                  <Image
                    src={image.transformedSrc}
                    alt={image.altText}
                    fill
                    sizes="(100%, auto)"
                    className="h-full w-full object-cover object-center group-hover:opacity-75"
                  />
                </div>
                <div className="mt-4 flex flex-col space-y-2 text-base font-medium text-gray-900">
                  <h3 className="line-clamp-2 text-lg font-bold dark:text-white">
                    {product.title}
                  </h3>
                  <p className="text-purple-800 dark:text-purple-500">
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
                </div>
                <p className="mt-1 text-sm italic text-gray-500">
                  {product.tags[0]}
                </p> */}
              </a>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
