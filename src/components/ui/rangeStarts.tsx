"use client";

import ReactStars from "react-rating-star-with-type";
interface RangeStartsProps {
  size: number;
}

export const RangeStarts = ({ size }: RangeStartsProps) => {
  return <ReactStars count={5} value={size} edit={false} size={20} />;
};
