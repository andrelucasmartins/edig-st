import { storefront } from "@/utils/storefront";
import Image from "next/image";

interface CollectionsQueryProps {
  collections: {
    edges: [
      {
        node: {
          id: string;
          title: string;
          handle: string;
          image: {
            altText: string;
            width: number;
            height: number;
            url: string;
          };
        };
      }
    ];
  };
}

const collectionsQuery = `#graphql
  query getCollections {
    collections(first: 10) {
      edges {
        cursor
        node {
          id
          title
          handle
          image {
          altText
          width
          height
          url
        }
        }
      }
      pageInfo {
        hasNextPage
        hasPreviousPage
      }
    }
  }
`;

export async function Categories() {
  const { data } = await storefront(collectionsQuery);

  const collections = data?.collections.edges;

  return (
    <div className="bg-gray-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl py-16 sm:py-24 lg:max-w-none lg:py-32">
          <h2 className="text-2xl font-bold text-gray-900">Categorias</h2>

          <div className="mt-6 space-y-12 lg:grid lg:grid-cols-5 lg:gap-x-6 lg:space-y-0">
            {collections?.map((item) => {
              const collection = item.node;
              return (
                <div key={collection.handle} className="group relative">
                  <div className="relative h-80 w-full overflow-hidden rounded-lg  sm:aspect-h-1 sm:aspect-w-2 lg:aspect-h-1 lg:aspect-w-1 group-hover:opacity-75 sm:h-64">
                    <Image
                      src={collection.image.url}
                      alt={collection.image.altText}
                      width={collection.image.width}
                      height={collection.image.height}
                      className="w-full object-cover object-center rounded-full"
                    />
                  </div>
                  <h3 className="mt-6 text-sm text-gray-500 text-center">
                    <a href={`/collections/${collection.handle}`}>
                      <span className="absolute inset-0" />
                      {collection.title}
                    </a>
                  </h3>
                  <p className="text-base font-semibold text-gray-900">
                    {collection.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
