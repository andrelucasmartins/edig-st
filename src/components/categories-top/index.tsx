"use client";

interface CategoriesTopProps {}

import Link from "next/link";

export const CategoriesTop = (props: CategoriesTopProps) => {
  return (
    <>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 my-6">
        <div className="grid grid-cols-12 gap-8">
          <Link href="/para-ela">
            <figure className="flex flex-col gap-4">
              <div className="bg-gray-300/20 hover:bg-gray-500 rounded-2xl ">
                <img src="/collection/for-she.png" alt="Para-Ela" />
              </div>
              <figcaption>Para Ela</figcaption>
            </figure>
          </Link>
          <Link href="/para-ela">
            <figure className="flex flex-col gap-4 items-center">
              <div className="bg-gray-300/20 hover:bg-gray-500 rounded-2xl ">
                <img src="/collection/home.png" alt="Casa" />
              </div>
              <figcaption>Casa</figcaption>
            </figure>
          </Link>
          <Link href="/para-ela">
            <figure className="flex flex-col gap-4">
              <div className="bg-gray-300/20 hover:bg-gray-500 rounded-2xl ">
                <img src="/collection/for-she.png" alt="Para-Ela" />
              </div>
              <figcaption>Para Ela</figcaption>
            </figure>
          </Link>
          <Link href="/para-ela">
            <figure className="flex flex-col gap-4">
              <div className="bg-gray-300/20 hover:bg-gray-500 rounded-2xl ">
                <img src="/collection/for-she.png" alt="Para-Ela" />
              </div>
              <figcaption>Para Ela</figcaption>
            </figure>
          </Link>
          <Link href="/para-ela">
            <figure className="flex flex-col gap-4">
              <div className="bg-gray-300/20 hover:bg-gray-500 rounded-2xl ">
                <img src="/collection/for-she.png" alt="Para-Ela" />
              </div>
              <figcaption>Para Ela</figcaption>
            </figure>
          </Link>
          <Link href="/para-ela">
            <figure className="flex flex-col gap-4">
              <div className="bg-gray-300/20 hover:bg-gray-500 rounded-2xl ">
                <img src="/collection/for-she.png" alt="Para-Ela" />
              </div>
              <figcaption>Para Ela</figcaption>
            </figure>
          </Link>
          <Link href="/para-ela">
            <figure className="flex flex-col gap-4">
              <div className="bg-gray-300/20 hover:bg-gray-500 rounded-2xl ">
                <img src="/collection/for-she.png" alt="Para-Ela" />
              </div>
              <figcaption>Para Ela</figcaption>
            </figure>
          </Link>
        </div>
      </div>
    </>
  );
};
