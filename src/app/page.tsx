import { ProductList } from "@/app/components/ProductList";
import { BannerHome } from "@/components/banner-home";
import { Carousel } from "@/components/carousel";
import { CategoriesTop } from "@/components/categories-top";
import { ThreeItemGrid } from "@/components/grid/three-items";
import type { Metadata } from "next";
import { Suspense } from "react";
import { MoreOffers } from "./components/more-offers";

export const metadata: Metadata = {
  metadataBase: new URL("https://aedigi.com.br/"),
  description:
    "High-performance ecommerce store built with Next.js, Vercel, and Shopify.",
  openGraph: {
    type: "website",
  },
};

export default function Home() {
  return (
    <>
      <Suspense>
        <BannerHome />
      </Suspense>
      <Suspense>
        <CategoriesTop />
      </Suspense>
      <Suspense>
        <ThreeItemGrid />
      </Suspense>
      <Suspense>
        <Carousel />
      </Suspense>
      {/* <Categories /> */}
      <MoreOffers />
      <ProductList />
    </>
  );
}
