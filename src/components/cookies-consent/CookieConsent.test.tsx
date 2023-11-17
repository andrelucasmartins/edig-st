import { fireEvent, render, screen } from "@testing-library/react";
import { CookiesConsent } from ".";

describe("<CookiesConsent>", () => {
  const makeSut = () => {
    return render(<CookiesConsent />);
  };

  it("Should render CookieConsent no agree", () => {
    makeSut();

    const cookieConsentElement = screen.getByTestId("cookie-consent");

    expect(cookieConsentElement).toBeInTheDocument();
  });

  it("Should render paragraph explanation", () => {
    makeSut();

    const paragraphElement = screen.getByTestId("description-cookie");
    const paragraphElementText = paragraphElement.textContent;

    expect(paragraphElement).toBeInTheDocument();
    expect(paragraphElementText).toBe(
      "Usamos cookies para garantir que você obtenha a melhor experiência em nosso site. Política de Privacidade."
    );
  });

  describe("Button accept", () => {
    it("Should render CookieConsent button", () => {
      makeSut();

      const buttonElement = screen.getByRole("button");
      const buttonElementText = buttonElement.textContent;

      expect(buttonElement).toBeInTheDocument();
      expect(buttonElementText).toBe("Aceitar");
    });

    it("Should called when the button is clicked", () => {
      const { getByTestId } = makeSut();

      const buttonElement = screen.getByRole("button", { name: "Aceitar" });
      const DivElement = getByTestId("cookie-consent");

      expect(buttonElement).toBeInTheDocument();

      // Act
      fireEvent.click(buttonElement);

      expect(DivElement).not.toBeInTheDocument();
    });
  });
});
