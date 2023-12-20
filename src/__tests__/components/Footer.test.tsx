/**
 * @jest-environment jsdom
 */

import { render, screen } from "@testing-library/react"

import { Footer } from "@/components/Footer"

describe("<Footer>", () => {
  const makeSut = () => {
    return render(<Footer />)
  }

  it("Footer should render correctly", () => {
    makeSut()
    const footerElement = screen.getByRole("contentinfo")

    expect(footerElement).toBeInTheDocument()

    // const footerElement = getByText(
    //   "© 2023 AE Digi Solutions Inc. ToTestIddos os direitos reservados."
    // );
    // expect(footerElement).toBeInTheDocument();
  })

  it("Should render text Footer", async () => {
    makeSut()

    const spanElement = screen.getByTestId("info-business")

    const spanElementValue = spanElement?.textContent

    expect(screen.getByTestId("info-business")).toBeVisible()
    expect(spanElementValue).toBe("© 2023 AE Digi Solutions Inc. Todos os direitos reservados.")
  })

  it("Should render buniness information", () => {
    makeSut()
    const businessInfo = screen.getByTestId("info-business")
    const businessInfoValue = businessInfo?.textContent

    expect(businessInfo).toBeInTheDocument()
    expect(businessInfoValue).toBe("© 2023 AE Digi Solutions Inc. Todos os direitos reservados.")
  })
})
