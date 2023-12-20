import { render, screen } from "@testing-library/react"
import { lato, roboto_mono } from "../../app/fonts"

describe("Fonts Loading", () => {
  it("applies Lato font styles", async () => {
    render(
      <div className={lato.className} style={{ fontFamily: "Lato" }}>
        Text with lato font
      </div>,
    )

    const textElement = screen.getByText("Text with lato font")

    const computedStyles = window.getComputedStyle(textElement)

    expect(computedStyles.fontFamily).toContain("Lato")
  })

  it("applies Roboto Mono font styles", async () => {
    render(
      <div className={roboto_mono.className} style={{ fontFamily: "Roboto Mono" }}>
        Text with Roboto Mono font
      </div>,
    )

    const textElement = screen.getByText("Text with Roboto Mono font")

    const computedStyles = window.getComputedStyle(textElement)

    expect(computedStyles.fontFamily).toContain("Roboto Mono")
  })
})
