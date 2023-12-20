import { getCart } from "@/lib/shopify"
import CartModal from "./modal"

import { getCookie } from "cookies-next"

export default async function Cart() {
  const cartId = getCookie("cartId")
  let cart
  if (cartId) {
    cart = await getCart(cartId)
  }

  return <CartModal cart={cart} />
}
