"use client";
interface ImageProps {
  src?: string;
  alt?: string;
}

export const Image = ({ src, alt }: ImageProps) => {
  return (
    <div className="w-full aspect-w-4 aspect-h-4 rounded-lg overflow-hidden ">
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-center object-cover group-hover:opacity-75"
      />
    </div>
  );
};
