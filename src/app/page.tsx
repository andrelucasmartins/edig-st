import { BannerHome } from "@/components/banner-home"
import { BestSelling } from "@/components/best-selling"
import { Carousel } from "@/components/carousel"
import { CategoriesTop } from "@/components/categories-top"
import { FeaturedProducts } from "@/components/featured-products"
import type { Metadata } from "next"
import { Suspense } from "react"

export const metadata: Metadata = {
  metadataBase: new URL("https://aedigi.com.br/"),
  description:
    "High-performance ecommerce store built with Next.js, Vercel, and Shopify.",
  openGraph: {
    type: "website",
  },
}

export default async function Home() {
  return (
    <>
      <BannerHome />
      <Suspense
        fallback={
          <div className="mx-auto px-4 sm:px-6 sm:py-4 lg:max-w-7xl lg:px-8">
            Loading...
          </div>
        }
      >
        <CategoriesTop />
      </Suspense>
      <Suspense
        fallback={
          <div className="mx-auto px-4 sm:px-6 sm:py-4 lg:max-w-7xl lg:px-8">
            Loading...
          </div>
        }
      >
        <FeaturedProducts collection="hidden-homepage-carousel" />
      </Suspense>
      <Suspense
        fallback={
          <div className="mx-auto px-4 sm:px-6 sm:py-4 lg:max-w-7xl lg:px-8">
            Loading...
          </div>
        }
      >
        <BestSelling />
      </Suspense>
      <Suspense
        fallback={
          <div className="mx-auto px-4 sm:px-6 sm:py-4 lg:max-w-7xl lg:px-8">
            Loading...
          </div>
        }
      >
        <FeaturedProducts collection="para-ela" />
      </Suspense>
      <Suspense
        fallback={
          <div className="mx-auto px-4 sm:px-6 sm:py-4 lg:max-w-7xl lg:px-8">
            Loading...
          </div>
        }
      >
        <FeaturedProducts collection="para-ele" />
      </Suspense>
      <Suspense
        fallback={
          <div className="mx-auto px-4 sm:px-6 sm:py-4 lg:max-w-7xl lg:px-8">
            Loading...
          </div>
        }
      >
        <Carousel collection="hidden-homepage-carousel-main" />
      </Suspense>
      {/* <Categories /> */}
      {/* <MoreOffers /> */}
      {/* <ProductList /> */}
    </>
  )
}
