import { ReactNode } from "react";

interface PoliciesLayoutProps {
  children: ReactNode;
  params?: {
    tag: string;
    item: string;
  };
}
export default function PoliciesLayout({ children }: PoliciesLayoutProps) {
  // URL -> /shop/shoes/nike-air-max-97
  // `params` -> { tag: 'shoes', item: 'nike-air-max-97' }
  return (
    <section className="mx-auto min-h-min px-4  py-4 sm:px-6 lg:max-w-7xl lg:px-8">
      {children}
    </section>
  );
}
