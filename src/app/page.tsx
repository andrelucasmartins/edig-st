import { ProductList } from "@/app/components/ProductList";
import { Categories } from "@/components/Categories";
import { Carousel } from "@/components/carousel";
import { ThreeItemGrid } from "@/components/grid/three-items";
import type { Metadata } from "next";
import { Suspense } from "react";
import { MoreOffers } from "./components/more-offers";

export const runtime = "edge";

export const metadata: Metadata = {
  description:
    "High-performance ecommerce store built with Next.js, Vercel, and Shopify.",
  openGraph: {
    type: "website",
  },
};

export default function Home() {
  return (
    <main>
      <Categories />
      <Suspense>
        <ThreeItemGrid />
      </Suspense>
      <Suspense>
        <Carousel />
      </Suspense>
      <MoreOffers />
      <ProductList />
    </main>
  );
}
