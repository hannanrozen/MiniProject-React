import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import LoginPage from "../../pages/LoginPage";

// Mock dependencies
const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

// Mock API
jest.mock("../../services/api", () => ({
  default: {
    post: jest.fn(),
  },
}));

// Mock DemoButton
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

describe("LoginPage Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockNavigate.mockClear();
  });

  test("renders login form elements", () => {
    render(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>
    );

    expect(screen.getByText("Welcome Back")).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(/type your e-mail or phone number/i)
    ).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/password/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /sign in/i })
    ).toBeInTheDocument();
  });

  test("renders social login buttons", () => {
    render(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>
    );

    expect(screen.getByRole("button", { name: /google/i })).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /facebook/i })
    ).toBeInTheDocument();
  });

  test("handles form input changes", () => {
    render(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>
    );

    // Use placeholder text instead of labels
    const emailInput = screen.getByPlaceholderText(
      /type your e-mail or phone number/i
    );
    const passwordInput = screen.getByPlaceholderText(/password/i);

    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });

    expect(emailInput).toHaveValue("test@example.com");
    expect(passwordInput).toHaveValue("password123");
  });

  test("renders link to register page", () => {
    render(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>
    );

    expect(screen.getByText(/don't have an account/i)).toBeInTheDocument();

    // Fix: Test actual implementation - it's a button, not a link
    const signUpButton = screen.getByRole("button", {
      name: /create account/i,
    });
    expect(signUpButton).toBeInTheDocument();
    expect(signUpButton).toHaveClass("text-[#4F46E5]");
  });

  test("navigates to register when create account button is clicked", () => {
    render(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>
    );

    const signUpButton = screen.getByRole("button", {
      name: /create account/i,
    });
    fireEvent.click(signUpButton);

    expect(mockNavigate).toHaveBeenCalledWith("/register");
  });

  test("renders remember me checkbox", () => {
    render(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>
    );

    const checkbox = screen.getByRole("checkbox", { name: /remember me/i });
    expect(checkbox).toBeInTheDocument();
  });

  test("renders forgot password link", () => {
    render(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>
    );

    const forgotLink = screen.getByRole("link", { name: /forgot password/i });
    expect(forgotLink).toBeInTheDocument();
    expect(forgotLink).toHaveAttribute("href", "#");
  });

  test("renders demo button", () => {
    render(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>
    );

    expect(screen.getByTestId("demo-button")).toBeInTheDocument();
  });
});
