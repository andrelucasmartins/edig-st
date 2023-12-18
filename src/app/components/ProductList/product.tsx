"use client";

import { ReactNode } from "react";

interface ProductListProps {
  children: ReactNode;
}

export const Product = ({ children }: ProductListProps) => {
  return (
    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
      {children}
    </div>
  );
};
