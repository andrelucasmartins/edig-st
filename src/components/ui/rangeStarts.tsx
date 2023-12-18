"use client";

import ReactStars from "react-rating-star-with-type";
interface RangeStartsProps {
  size: number;
  edit?: boolean;
}

export const RangeStarts = ({ size, ...props }: RangeStartsProps) => {
  return (
    <ReactStars count={5} value={size} edit={false} size={20} {...props} />
  );
};
