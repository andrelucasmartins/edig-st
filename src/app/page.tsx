import { Categories } from "@/components/Categories";
import { ProductList } from "@/components/ProductList";
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
