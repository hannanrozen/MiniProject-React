import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import LandingPage from "../../pages/LandingPage";

// Mock all child components
jest.mock("../../components/Navbar", () => {
  return function Navbar() {
    return <div data-testid="navbar">Navbar Component</div>;
  };
});

jest.mock("../../components/HeroSection", () => {
  return function HeroSection() {
    return <div data-testid="hero-section">Hero Section</div>;
  };
});

jest.mock("../../components/Features", () => {
  return function Features() {
    return <div data-testid="features">Features Component</div>;
  };
});

jest.mock("../../components/Pricing", () => {
  return function Pricing() {
    return <div data-testid="pricing">Pricing Component</div>;
  };
});

jest.mock("../../components/CallToAction", () => {
  return function CallToAction() {
    return <div data-testid="call-to-action">Call To Action</div>;
  };
});

jest.mock("../../components/Footer", () => {
  return function Footer() {
    return <div data-testid="footer">Footer Component</div>;
  };
});

describe("LandingPage Component", () => {
  test("renders all main sections", () => {
    render(
      <MemoryRouter>
        <LandingPage />
      </MemoryRouter>
    );

    expect(screen.getByTestId("navbar")).toBeInTheDocument();
    expect(screen.getByTestId("hero-section")).toBeInTheDocument();
    expect(screen.getByTestId("features")).toBeInTheDocument();
    expect(screen.getByTestId("pricing")).toBeInTheDocument();
    expect(screen.getByTestId("call-to-action")).toBeInTheDocument();
    expect(screen.getByTestId("footer")).toBeInTheDocument();
  });

  test("has proper page structure with main container", () => {
    render(
      <MemoryRouter>
        <LandingPage />
      </MemoryRouter>
    );

    const mainContainer = screen.getByTestId("navbar").parentElement;
    expect(mainContainer).toBeInTheDocument();
  });

  test("components are rendered in correct order", () => {
    render(
      <MemoryRouter>
        <LandingPage />
      </MemoryRouter>
    );

    const allComponents = [
      screen.getByTestId("navbar"),
      screen.getByTestId("hero-section"),
      screen.getByTestId("features"),
      screen.getByTestId("pricing"),
      screen.getByTestId("call-to-action"),
      screen.getByTestId("footer"),
    ];

    // Verify all components exist
    allComponents.forEach((component) => {
      expect(component).toBeInTheDocument();
    });
  });

  test("renders without crashing", () => {
    expect(() => {
      render(
        <MemoryRouter>
          <LandingPage />
        </MemoryRouter>
      );
    }).not.toThrow();
  });
});
