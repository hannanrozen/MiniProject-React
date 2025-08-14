import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import App from "../App";

// Mock all components to focus on routing logic
jest.mock("../pages/HomePage", () => {
  return function HomePage() {
    return <div data-testid="home-page">Home Page</div>;
  };
});

jest.mock("../pages/LoginPage", () => {
  return function LoginPage() {
    return <div data-testid="login-page">Login Page</div>;
  };
});

jest.mock("../pages/RegisterPage", () => {
  return function RegisterPage() {
    return <div data-testid="register-page">Register Page</div>;
  };
});

jest.mock("../pages/UserDetailPage", () => {
  return function UserDetailPage() {
    return <div data-testid="user-detail-page">User Detail Page</div>;
  };
});

jest.mock("../pages/LandingPage", () => {
  return function LandingPage() {
    return <div data-testid="landing-page">Landing Page</div>;
  };
});

jest.mock("../components/ErrorBoundary", () => {
  return function ErrorBoundary({ children }) {
    return <div data-testid="error-boundary">{children}</div>;
  };
});

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

describe("App Component", () => {
  beforeEach(() => {
    mockLocalStorage.getItem.mockClear();
  });

  test("renders ErrorBoundary wrapper", () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    expect(screen.getByTestId("error-boundary")).toBeInTheDocument();
  });

  test("renders LandingPage on root route", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <App />
      </MemoryRouter>
    );

    expect(screen.getByTestId("landing-page")).toBeInTheDocument();
  });

  test("renders LoginPage on /login route", () => {
    render(
      <MemoryRouter initialEntries={["/login"]}>
        <App />
      </MemoryRouter>
    );

    expect(screen.getByTestId("login-page")).toBeInTheDocument();
  });

  test("renders RegisterPage on /register route", () => {
    render(
      <MemoryRouter initialEntries={["/register"]}>
        <App />
      </MemoryRouter>
    );

    expect(screen.getByTestId("register-page")).toBeInTheDocument();
  });

  test("renders HomePage on /home route when authenticated", () => {
    mockLocalStorage.getItem.mockReturnValue("fake-token");

    render(
      <MemoryRouter initialEntries={["/home"]}>
        <App />
      </MemoryRouter>
    );

    expect(screen.getByTestId("home-page")).toBeInTheDocument();
  });

  test("renders UserDetailPage on /user/:id route", () => {
    mockLocalStorage.getItem.mockReturnValue("fake-token");

    render(
      <MemoryRouter initialEntries={["/user/123"]}>
        <App />
      </MemoryRouter>
    );

    expect(screen.getByTestId("user-detail-page")).toBeInTheDocument();
  });
});
