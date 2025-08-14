import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Navbar from "../../components/Navbar";

// Mock localStorage
const mockLocalStorage = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};
Object.defineProperty(window, "localStorage", {
  value: mockLocalStorage,
});

// Mock navigate
const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
  useLocation: () => ({ pathname: "/" }),
}));

const renderWithRouter = (component) => {
  return render(<MemoryRouter>{component}</MemoryRouter>);
};

describe("Navbar Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockLocalStorage.getItem.mockReturnValue(null);
  });

  test("renders navbar with logo", () => {
    renderWithRouter(<Navbar />);

    // Test actual logo element instead of text
    expect(screen.getByAltText("Staffinity Logo")).toBeInTheDocument();
    expect(screen.getByTestId("navbar-logo")).toBeInTheDocument();
  });

  test("renders navigation links when not authenticated", () => {
    renderWithRouter(<Navbar />);

    // Test actual text that exists in component
    expect(screen.getByText("Features")).toBeInTheDocument();
    expect(screen.getByText("Pricing")).toBeInTheDocument();
    expect(screen.getByText("Login")).toBeInTheDocument();
    expect(screen.getByText("Register")).toBeInTheDocument();
  });

  test("renders login button when not authenticated", () => {
    renderWithRouter(<Navbar />);

    // Test actual button text
    const loginButton = screen.getByRole("button", { name: /login/i });
    expect(loginButton).toBeInTheDocument();
  });

  test("navigates to login when login button clicked", () => {
    renderWithRouter(<Navbar />);

    const loginButton = screen.getByRole("button", { name: /login/i });
    fireEvent.click(loginButton);

    expect(mockNavigate).toHaveBeenCalledWith("/login");
  });

  test("navigates to register when register button clicked", () => {
    renderWithRouter(<Navbar />);

    const registerButton = screen.getByRole("button", { name: /register/i });
    fireEvent.click(registerButton);

    expect(mockNavigate).toHaveBeenCalledWith("/register");
  });
});
