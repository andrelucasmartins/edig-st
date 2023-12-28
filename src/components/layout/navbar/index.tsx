import Cart from "@/components/cart"
import OpenCart from "@/components/cart/open-cart"
import { getCollectionsMenu } from "@/lib/shopify"
import { Menu } from "@/lib/shopify/types"
import Image from "next/image"
import Link from "next/link"
import { Suspense } from "react"
import MobileMenu from "./mobile-menu"

import Search from "./search"
const { SITE_NAME } = process.env

export default async function Navbar() {
  const menu = await getCollectionsMenu()

  return (
    <nav className="relative mx-auto flex max-w-screen-2xl items-center justify-between border border-gray-50 p-4 lg:px-16">
      <div className="block flex-none md:hidden">
        <MobileMenu menu={menu} />
      </div>
      <div className="flex w-full items-center">
        <div className="flex w-full ">
          <Link
            href="/"
            className="mr-2 flex w-full items-center justify-center md:w-auto lg:mr-6"
          >
            <Image
              src="/logo.png"
              alt="logo - AE Digi Store"
              width={100}
              height={100}
            />
            <div className="sr-only ml-2 flex-none text-sm font-medium uppercase md:hidden lg:block">
              {SITE_NAME}
            </div>
          </Link>
          {menu.length ? (
            <ul className="hidden gap-6 text-sm md:flex md:items-center">
              {menu.map((item: Menu) => (
                <li key={item.title}>
                  <Link
                    href={item.path}
                    className="text-neutral-500 underline-offset-4 hover:text-black hover:underline dark:text-neutral-400 dark:hover:text-neutral-300"
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
        <div className="hidden justify-center md:flex md:w-1/3">
          <Search />
        </div>
        <div className="flex justify-end">
          <Suspense fallback={<OpenCart />}>
            <Cart />
          </Suspense>
        </div>
      </div>
    </nav>
  )
}
