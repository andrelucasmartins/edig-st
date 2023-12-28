import { getCart } from "@/lib/shopify"
import { cookies } from "next/headers"
import CartModal from "./modal"

import { getCookie } from "cookies-next"

export default async function Cart() {
  const cartId = getCookie("cartId", { cookies })
  let cart
  if (cartId) {
    cart = await getCart(cartId)
  }

  return <CartModal cart={cart} />
}
