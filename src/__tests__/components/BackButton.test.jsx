import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import BackButton from "../../components/BackButton";

// Mock react-router-dom
const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

// Mock lucide-react icons
jest.mock("lucide-react", () => ({
  ArrowLeft: () => <div data-testid="arrow-left-icon">ArrowLeft</div>,
}));

describe("BackButton Component", () => {
  beforeEach(() => {
    mockNavigate.mockClear();
  });

  test("renders back button with test-id and arrow icon", () => {
    render(
      <MemoryRouter>
        <BackButton />
      </MemoryRouter>
    );

    const backButton = screen.getByTestId("back-button");
    expect(backButton).toBeInTheDocument();
    expect(screen.getByTestId("arrow-left-icon")).toBeInTheDocument();
    expect(screen.getByText(/Back/i)).toBeInTheDocument();
  });

  test("navigates to default route when clicked", () => {
    render(
      <MemoryRouter>
        <BackButton />
      </MemoryRouter>
    );

    const backButton = screen.getByTestId("back-button");
    fireEvent.click(backButton);

    expect(mockNavigate).toHaveBeenCalledWith("/home");
  });

  test("has correct button styling classes", () => {
    render(
      <MemoryRouter>
        <BackButton />
      </MemoryRouter>
    );

    const backButton = screen.getByRole("button");
    expect(backButton).toHaveClass("bg-gray-100");
    expect(backButton).toHaveClass("hover:bg-gray-200");
  });

  test("has proper accessibility attributes", () => {
    render(
      <MemoryRouter>
        <BackButton />
      </MemoryRouter>
    );

    const backButton = screen.getByRole("button");
    expect(backButton).toBeInTheDocument();
    expect(backButton.tagName).toBe("BUTTON");
  });
});
