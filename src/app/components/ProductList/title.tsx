"use client";
interface TitleProps {
  children: React.ReactNode;
}

export const Title = ({ children }: TitleProps) => {
  return (
    <h2 id="products-heading" className="text-3xl py-4">
      {children}
    </h2>
  );
};
