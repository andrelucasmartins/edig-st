import { getCollectionCarouselProducts } from "@/lib/shopify";
import { CarouselItems } from "./carousel-items";

interface CarouselProps {
  title?: string;
  collection: string;
}

export async function Carousel({ title, collection }: CarouselProps) {
  // Collections that start with `hidden-*` are hidden from the search page.
  const products = await getCollectionCarouselProducts({
    first: 15,
    collection,
  });

  if (!products?.length) return null;

  // Purposefully duplicating products to make the carousel loop and not run out of products on wide screens.
  const carouselProducts = [...products];

  return (
    <div className=" w-full overflow-x-auto pb-6 pt-1">
      <CarouselItems title={title} products={carouselProducts} />
      {/* <ul className="flex animate-carousel gap-4">
        {carouselProducts.map((product, i) => (
          <li
            key={`${product.handle}${i}`}
            className="relative aspect-square h-[30vh] max-h-[275px] w-2/3 max-w-[475px] flex-none md:w-1/3"
          >
            <Link
              href={`/product/${product.handle}`}
              className="relative h-full w-full"
            >
              <GridTileImage
                alt={product.title}
                label={{
                  title: product.title,
                  amount: product.priceRange.maxVariantPrice.amount,
                  currencyCode: product.priceRange.maxVariantPrice.currencyCode,
                }}
                src={product.featuredImage?.url}
                fill
                sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
              />
            </Link>
          </li>
        ))}
      </ul> */}
    </div>
  );
}
