import { fireEvent, render, screen } from "@testing-library/react"

import Error from "@/app/error"

describe("Error", () => {
  it("renders without crashing", () => {
    render(<Error reset={() => {}} />)

    expect(screen.getByText("Oh no!")).toBeInTheDocument()
    expect(
      screen.getByText("There was an issue with our storefront. This could be a temporary issue, please try your action again."),
    ).toBeInTheDocument()
    expect(screen.getByText("Try Again")).toBeInTheDocument()
  })

  it("calls the reset function when 'Try Again' button is clicked", () => {
    const mockReset = jest.fn()

    render(<Error reset={mockReset} />)
    const buttonElement = screen.getByText("Try Again")

    fireEvent.click(buttonElement)

    expect(mockReset).toHaveBeenCalled()
  })
})
