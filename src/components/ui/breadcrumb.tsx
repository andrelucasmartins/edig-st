"use client";

import { BreadcrumbItem, Breadcrumbs } from "@nextui-org/react";

interface BreadcrumbProps {
  currentPage?: string;
  back?: boolean;
}

export const Breadcrumb = ({ currentPage, back = false }: BreadcrumbProps) => {
  return (
    // <div className="uppercase text-xs my-2 text-gray-500 space-x-2 flex flex-wrap sm:flex-row">
    //   {back && (
    //     <>
    //       <a
    //         onClick={() => route.back()}
    //         className="text-purple-800 hover:text-purple-500 dark:text-purple-500 dark:hover:text-fuchsia-400 flex flex-row gap-2 items-center cursor-pointer"
    //       >
    //         <FaArrowLeft /> Voltar
    //       </a>
    //       <span className="text-gray-500 dark:text-gray-50">/</span>
    //     </>
    //   )}
    //   <Link
    //     href="/"
    //     className="text-gray-700 hover:text-gray-900 dark:text-gray-200 dark:hover:text-white"
    //   >
    //     Inicio
    //   </Link>{" "}
    //   {currentPage && (
    //     <>
    //       <span>/</span> <div>{currentPage}</div>
    //     </>
    //   )}
    // </div>
    <Breadcrumbs
      separator="/"
      itemClasses={{
        separator: "px-2",
      }}
      className="uppercase text-xs my-2 text-gray-500"
    >
      <BreadcrumbItem
        href="/"
        classNames={{
          item: "text-purple-800 hover:text-purple-500 dark:text-purple-500 dark:hover:text-fuchsia-400",
        }}
        // className="text-purple-800 hover:text-purple-500 dark:text-purple-500 dark:hover:text-fuchsia-400"
      >
        Inicio
      </BreadcrumbItem>
      <BreadcrumbItem>{currentPage}</BreadcrumbItem>
    </Breadcrumbs>
  );
};
