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

"use client";

import { formatPrice } from "@/utils/formatPrice";
import { storefront } from "@/utils/storefront";
import Link from "next/link";

interface ProductListProps {
  children: React.ReactNode;
}

const gql = String.raw;

const productsTest = gql`
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

const productsQuery = gql`
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

const getProductMediaQuery = gql`
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

const staticProducts = [
  {
    id: 1,
    name: "Focus Paper Refill",
    href: "#",
    price: "$16.00",
    description: "3 sizes avaliable",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/category-page-01-image-card-01.jpg",
    imageAlt:
      "Three shirts in gray, white, and blue arranged on table with same line drawing of hands and shapes overlapping on front of shirt.",
  },
  {
    id: 2,
    name: "Focus Card Holder",
    href: "#",
    price: "$16.00",
    description: "walnut",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/category-page-01-image-card-02.jpg",
    imageAlt: "Paper card sitting upright in walnut card holder on desk.",
  },
  {
    id: 3,
    name: "Focus Paper Refill",
    href: "#",
    price: "$16.00",
    description: "3 sizes avaliable",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/category-page-01-image-card-03.jpg",
    imageAlt:
      "Three shirts in gray, white, and blue arranged on table with same line drawing of hands and shapes overlapping on front of shirt.",
  },
  {
    id: 4,
    name: "Focus Paper Refill",
    href: "#",
    price: "$16.00",
    description: "3 sizes avaliable",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/category-page-01-image-card-04.jpg",
    imageAlt:
      "Three shirts in gray, white, and blue arranged on table with same line drawing of hands and shapes overlapping on front of shirt.",
  },
  {
    id: 5,
    name: "Focus Paper Refill",
    href: "#",
    price: "$16.00",
    description: "3 sizes avaliable",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/category-page-01-image-card-05.jpg",
    imageAlt:
      "Three shirts in gray, white, and blue arranged on table with same line drawing of hands and shapes overlapping on front of shirt.",
  },
  {
    id: 6,
    name: "Focus Paper Refill",
    href: "#",
    price: "$16.00",
    description: "3 sizes avaliable",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/category-page-01-image-card-06.jpg",
    imageAlt:
      "Three shirts in gray, white, and blue arranged on table with same line drawing of hands and shapes overlapping on front of shirt.",
  },
  {
    id: 7,
    name: "Focus Paper Refill",
    href: "#",
    price: "$16.00",
    description: "3 sizes avaliable",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/category-page-01-image-card-07.jpg",
    imageAlt:
      "Three shirts in gray, white, and blue arranged on table with same line drawing of hands and shapes overlapping on front of shirt.",
  },
];

export async function ProductList() {
  const { data } = await storefront(productsQuery);

  const products = await data?.products.edges;

  return (
    <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
      <h2 id="products-heading" className="text-3xl py-4">
        Produtos
      </h2>

      <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
        {products?.map((item) => {
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
                <div className="mt-4 flex items-center justify-between text-base font-medium text-gray-900">
                  <h3 className="text-lg font-bold">{product.title}</h3>
                  <p>
                    {formatPrice(product.priceRange.minVariantPrice.amount)}
                  </p>
                </div>
                <p className="mt-1 text-sm italic text-gray-500">
                  {product.tags[0]}
                </p>
              </a>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
