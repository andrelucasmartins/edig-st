import { storefront } from "@/utils/storefront";
import Image from "next/image";

const collectionsQuery = `#graphql
  query getCollections {
    collections(first: 100) {
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

export async function MoreOffers() {
  const { data } = await storefront(collectionsQuery);

  const collections = data?.collections.edges;
  const noHiddenCollections = collections.filter(
    (item: any) => !item.node.handle.includes("hidden")
  );

  return (
    <div className="text-gray-500">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl py-16 sm:py-24 lg:max-w-none lg:py-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-50 text-center">
            Mais ofertas
          </h2>

          <div className="mt-6 space-y-6 lg:grid lg:grid-cols-12 lg:gap-x-6 lg:space-y-0">
            {noHiddenCollections?.map((item: any) => {
              const collection = item.node;
              return (
                <div key={collection.handle} className="group relative">
                  <div className="relative h-80 w-full overflow-hidden rounded-lg  group-hover:opacity-75 sm:h-64 aspect-[3/2]">
                    <Image
                      src={collection?.image?.url}
                      alt={collection?.image?.altText}
                      width={400}
                      height={700}
                      className="w-full object-cover object-center rounded-full"
                    />
                  </div>
                  <h3 className="mt-0 text-sm text-gray-500 dark:text-gray-50 text-center">
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
