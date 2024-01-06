import Price from "@/components/price"
import Image from "next/image"

interface ProductCardProps {
  imageUrl: string
  title: string
  amount: number | string
  currencyCode: string
}

export const ProductCard = ({
  imageUrl,
  title,
  amount,
  currencyCode,
}: ProductCardProps) => {
  return (
    <figure className="space-y-4 whitespace-pre-wrap">
      <div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg bg-gray-100 p-2">
        <Image
          src={imageUrl}
          alt={title}
          sizes="(max-width: 768px) 100vw, 33vw"
          quality="90"
          width={1000}
          height={1000}
          className="aspect-h-1 aspect-w-1 rounded-lg object-contain mix-blend-multiply"
        />
      </div>
      <figcaption className="space-y-2">
        <h2 className="line-clamp-2 text-xs ">{title}</h2>
        <div className="text-md text-gray-500">
          <Price amount={String(amount)} currencyCode={currencyCode} />
        </div>
      </figcaption>
    </figure>
  )
}
