"use client";
import {
  PiArmchair,
  PiBarbell,
  PiGenderFemaleLight,
  PiGenderMaleLight,
  PiGridFourFill,
  PiHandbagLight,
  PiPokerChipLight,
} from "react-icons/pi";

interface CategoriesTopProps {}

import Link from "next/link";

const navigation = [
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
];

export const CategoriesTop = (props: CategoriesTopProps) => {
  return (
    <>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 my-6">
        <h2 className="text-xl font-bold text-gray-900">Categorias</h2>
        <div className="grid grid-cols-12 gap-8 mx-auto">
          {navigation &&
            navigation.map((item) => (
              <Link href={item.href} key={item.name}>
                <figure className="flex flex-col gap-4 items-center">
                  <div className="bg-gray-300/20 hover:bg-gray-400/20 rounded-full text-2xl text-purple-800 hover:text-purple-500 p-4">
                    {item.icon && item.icon}
                  </div>
                  <figcaption>{item.name}</figcaption>
                </figure>
              </Link>
            ))}
        </div>
      </div>
    </>
  );
};
