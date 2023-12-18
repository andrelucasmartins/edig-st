import { CategoriesTop, MenuNavigation } from "@/components/categories-top";
import { render, screen } from "@testing-library/react";

// var mockMenuNavigation = [
//   { name: "Category1", href: "/category1", icon: <span>Icon1</span> },
//   { name: "Category2", href: "/category2", icon: <span>Icon2</span> },
// ];

jest.mock(
  "next/link",
  () =>
    ({ children }: { children: React.ReactNode }) =>
      children,
);

describe("<CategoriesTop>", () => {
  const makeSut = () => {
    return render(<CategoriesTop />);
  };

  it("Should render correctly", () => {
    makeSut();

    jest.mock("@/components/categories-top", () => ({
      MenuNavigation: MenuNavigation,
    }));

    const categoriesTopElement = screen.getByTestId("categories-top");
    const h2Element = screen.getByRole("heading", { level: 2 });

    expect(categoriesTopElement).toBeInTheDocument();
    expect(h2Element).toHaveTextContent(/Categorias/i);
  });
});
