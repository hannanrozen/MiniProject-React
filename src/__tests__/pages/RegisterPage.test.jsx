import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import RegisterPage from "../../pages/RegisterPage";

// Mock dependencies
const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

// Mock API with default export
jest.mock("../../services/api", () => ({
  default: {
    post: jest.fn(),
  },
}));

// Mock DemoButton component
jest.mock("../../components/DemoButton", () => {
  return function MockDemoButton({ onDemoData }) {
    return (
      <button
        data-testid="demo-button"
        onClick={() =>
          onDemoData?.({ email: "demo@test.com", password: "demo123" })
        }
      >
        Account Demo
      </button>
    );
  };
});

describe("RegisterPage Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockNavigate.mockClear();
  });

  test("renders registration form elements", () => {
    render(
      <MemoryRouter>
        <RegisterPage />
      </MemoryRouter>
    );

    // Use more specific selector to avoid multiple elements
    expect(
      screen.getByRole("heading", { name: /create account/i })
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(/enter your email address/i)
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(/create a strong password/i)
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(/confirm your password/i)
    ).toBeInTheDocument();
  });

  test("renders link to login page", () => {
    render(
      <MemoryRouter>
        <RegisterPage />
      </MemoryRouter>
    );

    expect(screen.getByText(/already have an account/i)).toBeInTheDocument();

    const signInButton = screen.getByRole("button", { name: /sign in here/i });
    expect(signInButton).toBeInTheDocument();
  });

  test("navigates to login when sign in button is clicked", () => {
    render(
      <MemoryRouter>
        <RegisterPage />
      </MemoryRouter>
    );

    const signInButton = screen.getByRole("button", { name: /sign in here/i });
    fireEvent.click(signInButton);

    expect(mockNavigate).toHaveBeenCalledWith("/login");
  });

  test("handles form input changes", () => {
    render(
      <MemoryRouter>
        <RegisterPage />
      </MemoryRouter>
    );

    const emailInput = screen.getByPlaceholderText(/enter your email address/i);
    const passwordInput = screen.getByPlaceholderText(
      /create a strong password/i
    );
    const confirmPasswordInput = screen.getByPlaceholderText(
      /confirm your password/i
    );

    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });
    fireEvent.change(confirmPasswordInput, {
      target: { value: "password123" },
    });

    expect(emailInput).toHaveValue("test@example.com");
    expect(passwordInput).toHaveValue("password123");
    expect(confirmPasswordInput).toHaveValue("password123");
  });

  test("shows error when passwords do not match", async () => {
    render(
      <MemoryRouter>
        <RegisterPage />
      </MemoryRouter>
    );

    const emailInput = screen.getByPlaceholderText(/enter your email address/i);
    const passwordInput = screen.getByPlaceholderText(
      /create a strong password/i
    );
    const confirmPasswordInput = screen.getByPlaceholderText(
      /confirm your password/i
    );
    const submitButton = screen.getByRole("button", {
      name: /create account/i,
    });
    const checkbox = screen.getByRole("checkbox");

    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });
    fireEvent.change(confirmPasswordInput, {
      target: { value: "differentpassword" },
    });
    fireEvent.click(checkbox);
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/password tidak cocok/i)).toBeInTheDocument();
    });
  });
});
