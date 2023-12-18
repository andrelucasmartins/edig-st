"use client";

import { ReactNode } from "react";

interface ContentProps {
  children: ReactNode;
}

export const Content = ({ children }: ContentProps) => {
  return (
    <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
      {children}
    </div>
  );
};
