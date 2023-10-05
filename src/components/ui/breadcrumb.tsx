"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaArrowLeft } from "react-icons/fa6";

interface BreadcrumbProps {
  currentPage?: string;
  back?: boolean;
}

export const Breadcrumb = ({ currentPage, back = false }: BreadcrumbProps) => {
  const route = useRouter();
  return (
    <div className="uppercase text-xs my-2 text-gray-500 space-x-2 flex flex-wrap sm:flex-row">
      {back && (
        <>
          <a
            onClick={() => route.back()}
            className="text-purple-800 hover:text-purple-500 flex flex-row gap-2 items-center cursor-pointer"
          >
            <FaArrowLeft /> Voltar
          </a>
          <span className="text-gray-500">/</span>
        </>
      )}
      <Link href="/" className="text-gray-700 hover:text-gray-900">
        Home
      </Link>{" "}
      {currentPage && (
        <>
          <span>/</span> <div>{currentPage}</div>
        </>
      )}
    </div>
  );
};
