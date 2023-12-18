"use client";

import { ReactNode } from "react";

interface DescriptionProps {
  children: ReactNode;
}

export const Description = ({ children }: DescriptionProps) => {
  return <p className="mt-1 text-sm italic text-gray-500">{children}</p>;
};
