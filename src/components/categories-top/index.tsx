"use client";

interface CategoriesTopProps {}

import Link from "next/link";

const navigation = [
  {
    name: "Para Ela",
    href: "/collection/para-ela",
    img: "/collection/for-she.png",
  },
  {
    name: "Para Ele",
    href: "/collection/para-ela",
    img: "/collection/for-she.png",
  },
  {
    name: "Para sua casa",
    href: "/collection/casa",
    img: "/collection/home.png",
  },
  {
    name: "Fitness",
    href: "/collection/casa",
    img: "/collection/home.png",
  },
  {
    name: "Todas as Categorias",
    href: "/search",
    img: "/collection/all-categories.png",
  },
];

export const CategoriesTop = (props: CategoriesTopProps) => {
  return (
    <>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 my-6">
        <div className="grid grid-cols-12 gap-8">
          {navigation &&
            navigation.map((item) => (
              <Link href={item.href} key={item.name}>
                <figure className="flex flex-col gap-4 items-center">
                  <div className="bg-gray-300/20 hover:bg-gray-500 rounded-2xl ">
                    <img src={item.img} alt={item.name} />
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
