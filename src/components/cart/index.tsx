import { getCart } from "@/lib/shopify";
import { cookies } from "next/headers";
import CartModal from "./modal";

export default async function Cart() {
  const cookieStore = cookies();
  const cartId = cookieStore?.get("cartId")?.value;
  let cart;
  if (cartId) {
    cart = await getCart(cartId);
  }

  return <CartModal cart={cart} />;
}
