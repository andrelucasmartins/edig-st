"use client";
interface LabelProps {
  title?: string;
  price?: number | string;
}

export const Label = ({ title, price }: LabelProps) => {
  return (
    <div className="mt-4 flex items-center justify-between text-base font-medium text-gray-900">
      <h3>{title}</h3>
      <p>{price}</p>
    </div>
  );
};
