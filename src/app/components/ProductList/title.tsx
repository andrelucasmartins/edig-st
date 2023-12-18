"use client";
import { ReactNode } from "react";
interface TitleProps {
  children: ReactNode;
}

export const Title = ({ children }: TitleProps) => {
  return (
    <h2 id="products-heading" className="py-4 text-3xl">
      {children}
    </h2>
  );
};
