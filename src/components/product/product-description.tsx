import { AddToCart } from "@/components/cart/add-to-cart";
import Price from "@/components/price";
import { Product } from "@/lib/shopify/types";
import { VariantSelector } from "./variant-selector";

export function ProductDescription({ product }: { product: Product }) {
  return (
    <>
      <div className="mb-6 flex flex-col border-b pb-6 dark:border-neutral-700">
        <h1 className="text-2x1 font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-3xl">
          {product.title}
        </h1>
        <div className="mr-auto w-auto rounded-full bg-purple-600 p-2 text-sm text-white">
          <Price
            amount={product.priceRange.maxVariantPrice.amount}
            currencyCode={product.priceRange.maxVariantPrice.currencyCode}
          />
        </div>
      </div>
      <VariantSelector options={product.options} variants={product.variants} />

      {product.descriptionHtml ? (
        <div
          className="mb-6 text-sm leading-tight dark:text-white"
          dangerouslySetInnerHTML={{
            __html: product.descriptionHtml,
          }}
        />
      ) : null}

      <AddToCart
        variants={product.variants}
        availableForSale={product.availableForSale}
      />
    </>
  );
}
