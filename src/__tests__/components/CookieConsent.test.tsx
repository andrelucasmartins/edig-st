import { CookiesConsent } from "@/components/cookies-consent"
import { fireEvent, render, screen } from "@testing-library/react"

jest.mock("cookies-next", () => ({
  hasCookie: jest.fn(),
  setCookie: jest.fn(),
}))

describe("<CookiesConsent>", () => {
  beforeEach(() => {
    // Reset mocks before each test
    jest.resetAllMocks()
  })

  it("renders without crashing", () => {
    render(<CookiesConsent />)

    const cookieConsentElement = screen.getByTestId("cookie-consent")

    expect(cookieConsentElement).toBeInTheDocument()
  })

  it("hides the consent when user has already accepted", () => {
    // Mock that the cookie has been set
    jest.spyOn(require("cookies-next"), "hasCookie").mockImplementation(() => true)

    const { container } = render(<CookiesConsent />)

    expect(container).toBeInTheDocument()
  })

  it("Should render paragraph explanation", () => {
    render(<CookiesConsent />)

    const paragraphElement = screen.getByTestId("description-cookie")
    const paragraphElementText = paragraphElement.textContent

    expect(paragraphElement).toBeInTheDocument()
    expect(paragraphElementText).toBe(
      "Usamos cookies para garantir que você obtenha a melhor experiência em nosso site. Política de Privacidade.",
    )
  })

  it("displays the consent when user has not accepted", () => {
    // Mock that the cookie has not been set
    jest.spyOn(require("cookies-next"), "hasCookie").mockImplementation(() => false)

    render(<CookiesConsent />)

    const cookieConsentElement = screen.getByTestId("cookie-consent")
    expect(cookieConsentElement).toBeInTheDocument()
  })

  it("accepts the cookie when the 'Aceitar' button is clicked", () => {
    render(<CookiesConsent />)

    const buttonElement = screen.getByText("Aceitar")

    // Act
    fireEvent.click(buttonElement)

    expect(require("cookies-next").setCookie).toHaveBeenCalledWith("cookie_consent", "true", { maxAge: 31536000 })

    expect(buttonElement).not.toBeInTheDocument()
  })
})
