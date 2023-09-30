import { ProductList } from "@/app/components/ProductList";
import { Categories } from "@/components/Categories";
import { MoreOffers } from "./components/more-offers";

export default function Home() {
  return (
    <main>
      <Categories />
      <MoreOffers />
      <ProductList />
    </main>
  );
}
