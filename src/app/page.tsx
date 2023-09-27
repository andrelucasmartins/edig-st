import { Categories } from "@/components/Categories";
import { ProductList } from "@/components/ProductList";

const staticProducts = [
  {
    id: 1,
    name: "Focus Paper Refill",
    href: "#",
    price: "$16.00",
    description: "3 sizes avaliable",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/category-page-01-image-card-01.jpg",
    imageAlt:
      "Three shirts in gray, white, and blue arranged on table with same line drawing of hands and shapes overlapping on front of shirt.",
  },
  {
    id: 2,
    name: "Focus Card Holder",
    href: "#",
    price: "$16.00",
    description: "walnut",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/category-page-01-image-card-02.jpg",
    imageAlt: "Paper card sitting upright in walnut card holder on desk.",
  },
  {
    id: 3,
    name: "Focus Paper Refill",
    href: "#",
    price: "$16.00",
    description: "3 sizes avaliable",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/category-page-01-image-card-03.jpg",
    imageAlt:
      "Three shirts in gray, white, and blue arranged on table with same line drawing of hands and shapes overlapping on front of shirt.",
  },
  {
    id: 4,
    name: "Focus Paper Refill",
    href: "#",
    price: "$16.00",
    description: "3 sizes avaliable",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/category-page-01-image-card-04.jpg",
    imageAlt:
      "Three shirts in gray, white, and blue arranged on table with same line drawing of hands and shapes overlapping on front of shirt.",
  },
  {
    id: 5,
    name: "Focus Paper Refill",
    href: "#",
    price: "$16.00",
    description: "3 sizes avaliable",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/category-page-01-image-card-05.jpg",
    imageAlt:
      "Three shirts in gray, white, and blue arranged on table with same line drawing of hands and shapes overlapping on front of shirt.",
  },
  {
    id: 6,
    name: "Focus Paper Refill",
    href: "#",
    price: "$16.00",
    description: "3 sizes avaliable",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/category-page-01-image-card-06.jpg",
    imageAlt:
      "Three shirts in gray, white, and blue arranged on table with same line drawing of hands and shapes overlapping on front of shirt.",
  },
  {
    id: 7,
    name: "Focus Paper Refill",
    href: "#",
    price: "$16.00",
    description: "3 sizes avaliable",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/category-page-01-image-card-07.jpg",
    imageAlt:
      "Three shirts in gray, white, and blue arranged on table with same line drawing of hands and shapes overlapping on front of shirt.",
  },
];

export default function Home() {
  return (
    <main>
      <Categories />
      <ProductList />
    </main>
  );
}
