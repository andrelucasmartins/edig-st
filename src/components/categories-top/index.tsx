"use client"
import {
  PiArmchair,
  PiBarbell,
  PiGenderFemaleLight,
  PiGenderMaleLight,
  PiGridFourFill,
  PiHandbagLight,
  PiPokerChipLight,
} from "react-icons/pi"

import Link from "next/link"

export const MenuNavigation = [
  {
    name: "Novidades",
    href: "/collections/produtos-mais-vendidos",
    icon: <PiHandbagLight />,
  },
  {
    name: "Ela",
    href: "/collections/para-ela",
    icon: <PiGenderFemaleLight />,
  },
  {
    name: "Bijuterias",
    href: "/collections/bijuterias",
    icon: <PiPokerChipLight />,
  },
  {
    name: "Fitness",
    href: "/collections/fitness",
    icon: <PiBarbell />,
  },
  {
    name: "Casa",
    href: "/collections/casa",
    icon: <PiArmchair />,
  },
  {
    name: "Ele",
    href: "/collections/para-ele",
    icon: <PiGenderMaleLight />,
  },
  {
    name: "Categorias",
    href: "/search",
    icon: <PiGridFourFill />,
  },
]

const CategoriesTop = () => {
  return (
    <div
      className="mx-auto my-6 max-w-7xl px-4 sm:px-6 lg:px-8 "
      data-testid="categories-top"
    >
      <h2 className="sr-only text-xl font-bold text-gray-900">Categorias</h2>
      <div className="flex items-center justify-center">
        <div className="list-items flex flex-row flex-wrap gap-8">
          {MenuNavigation &&
            MenuNavigation.map((item) => (
              <Link href={item.href} key={item.name}>
                <figure className="flex flex-col items-center gap-4">
                  <div className="rounded-full bg-gray-300/20 p-4 text-2xl text-purple-800 hover:bg-gray-400/20 hover:text-purple-500">
                    {item.icon && item.icon}
                  </div>
                  <figcaption>{item.name}</figcaption>
                </figure>
              </Link>
            ))}
        </div>
      </div>
    </div>
  )
}

export { CategoriesTop }
