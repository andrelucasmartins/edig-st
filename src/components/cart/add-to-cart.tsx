"use client"

import { addItem } from "@/components/cart/actions"
import { ProductVariant } from "@/lib/shopify/types"
import { PlusIcon } from "@heroicons/react/24/outline"
import clsx from "clsx"
import { useRouter, useSearchParams } from "next/navigation"
import { useTransition } from "react"
import { LuLoader2 } from "react-icons/lu"

export function AddToCart({
  variants,
  availableForSale,
}: {
  variants: ProductVariant[]
  availableForSale: boolean
}) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isPending, startTransition] = useTransition()
  const defaultVariantId = variants.length === 1 ? variants[0]?.id : undefined
  const variant = variants.find((variant: ProductVariant) =>
    variant.selectedOptions.every(
      (option) => option.value === searchParams.get(option.name.toLowerCase()),
    ),
  )
  const selectedVariantId = variant?.id || defaultVariantId
  const title = !availableForSale
    ? "Out of stock"
    : !selectedVariantId
      ? "Please select options"
      : undefined

  return (
    <button
      aria-label="Adicionar item ao carrinho"
      disabled={isPending || !availableForSale || !selectedVariantId}
      title={title}
      onClick={() => {
        // Safeguard in case someone messes with `disabled` in devtools.
        if (!availableForSale || !selectedVariantId) return

        startTransition(async () => {
          const error = await addItem(selectedVariantId)

          if (error) {
            // Trigger the error boundary in the root error.js
            throw new Error(error.toString())
          }

          router.refresh()
        })
      }}
      className={clsx(
        "relative flex w-full items-center justify-center rounded-md border-2 border-green-500 py-4 uppercase text-green-500 hover:border-green-500 hover:bg-green-500 hover:text-white",
        {
          "cursor-not-allowed opacity-60 hover:opacity-60":
            !availableForSale || !selectedVariantId,
          "cursor-not-allowed": isPending,
        },
      )}
    >
      <div className="absolute left-0 ml-4">
        {!isPending ? (
          <PlusIcon className="h-5" />
        ) : (
          <>
            <LuLoader2 className="mr-2 h-4 w-4 animate-spin" />
          </>
        )}
      </div>
      <span>{availableForSale ? "Adicionar ao carrinho" : "Out Of Stock"}</span>
    </button>
  )
}
