import { addToCart, createCart, getCart, removeFromCart, updateCart } from "@/lib/shopify"
import { Cart } from "@/lib/shopify/types"
import { getCookie, setCookie } from "cookies-next"

export const addItem = async (variantId: string | undefined): Promise<String | undefined> => {
  let cartId = getCookie("cartId")
  var cart: Cart | undefined

  if (cartId) {
    cart = await getCart(cartId)
  }

  if (!cartId || !cart) {
    cart = await createCart()
    cartId = cart.id
    setCookie("cartId", cartId)
  }

  if (!variantId) {
    return "Missing product variant ID"
  }

  try {
    await addToCart(cartId, [{ merchandiseId: variantId, quantity: 1 }])
  } catch (e) {
    return "Error adding item to cart"
  }
}

export const removeItem = async (lineId: string): Promise<String | undefined> => {
  const cartId = getCookie("cartId")

  if (!cartId) {
    return "Missing cart ID"
  }
  try {
    await removeFromCart(cartId, [lineId])
  } catch (e) {
    return "Error removing item from cart"
  }
}

export const updateItemQuantity = async ({
  lineId,
  variantId,
  quantity,
}: {
  lineId: string
  variantId: string
  quantity: number
}): Promise<String | undefined> => {
  const cartId = getCookie("cartId")

  if (!cartId) {
    return "Missing cart ID"
  }
  try {
    await updateCart(cartId, [
      {
        id: lineId,
        merchandiseId: variantId,
        quantity,
      },
    ])
  } catch (e) {
    return "Error updating item quantity"
  }
}
