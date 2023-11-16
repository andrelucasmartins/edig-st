/**
 * @jest-environment jsdom
 */

import { render, screen } from "@testing-library/react";

import { Footer } from "./";

describe("<Footer>", () => {
  const makeSut = () => {
    return render(<Footer />);
  };

  it("Footer should render correctly", () => {
    const { getByRole } = makeSut();

    const footerElement = getByRole("contentinfo");

    expect(footerElement).toBeInTheDocument();

    // const footerElement = getByText(
    //   "© 2023 AE Digi Solutions Inc. ToTestIddos os direitos reservados."
    // );
    // expect(footerElement).toBeInTheDocument();
  });

  it("Should render text Footer", async () => {
    const { getByTestId } = makeSut();

    const spanElement = getByTestId("info-business");

    const spanElementValue = spanElement?.textContent;

    expect(await screen.getByTestId("info-business")).toBeVisible();
    expect(spanElementValue).toBe(
      "© 2023 AE Digi Solutions Inc. Todos os direitos reservados."
    );
  });

  it("Should render buniness information", () => {
    makeSut();
    const businessInfo = screen.getByTestId("info-business");
    const businessInfoValue = businessInfo?.textContent;

    expect(businessInfo).toBeInTheDocument();
    expect(businessInfoValue).toBe(
      "© 2023 AE Digi Solutions Inc. Todos os direitos reservados."
    );
  });
});
