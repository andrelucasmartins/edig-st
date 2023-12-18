"use client";
import Image, { ImageProps } from "next/image";
interface ImageCustomProps extends ImageProps {}

export const ImageCustom = ({ src, alt }: ImageCustomProps) => {
  return (
    <div className="aspect-w-4 aspect-h-4 w-full overflow-hidden rounded-lg ">
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(100%, auto)"
        className="h-full w-full object-cover object-center group-hover:opacity-75"
      />
    </div>
  );
};
