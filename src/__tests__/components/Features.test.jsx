import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Features from "../../components/Features";

// Mock lucide-react icons
jest.mock("lucide-react", () => ({
  GitBranch: () => <div data-testid="git-branch-icon" />,
  BarChart3: () => <div data-testid="bar-chart-icon" />,
  Star: () => <div data-testid="star-icon" />,
  Bell: () => <div data-testid="bell-icon" />,
  ArrowRight: () => <div data-testid="arrow-right-icon" />,
}));

describe("Features Component", () => {
  test("renders features section with test-id", () => {
    render(<Features />);

    const featuresSection = screen.getByTestId("features");
    expect(featuresSection).toBeInTheDocument();
  });

  test("renders main heading", () => {
    render(<Features />);

    expect(screen.getByText("✨ POWERFUL FEATURES")).toBeInTheDocument();
    expect(
      screen.getByText(/Everything you need to manage/)
    ).toBeInTheDocument();
  });

  test("renders all feature cards", () => {
    render(<Features />);

    expect(screen.getByText("Visual Organization")).toBeInTheDocument();
    expect(screen.getByText("HR Analytics")).toBeInTheDocument();
    expect(screen.getByText("Recognize Excellence")).toBeInTheDocument();
    expect(screen.getByText("Smart Notifications")).toBeInTheDocument();
  });

  test("renders feature descriptions", () => {
    render(<Features />);

    expect(
      screen.getByText(/See your entire team in a dynamic org chart/)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Track growth, engagement, and retention/)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Celebrate employee milestones/)
    ).toBeInTheDocument();
    expect(screen.getByText(/Get intelligent reminders/)).toBeInTheDocument();
  });

  test("renders all icons", () => {
    render(<Features />);

    expect(screen.getByTestId("git-branch-icon")).toBeInTheDocument();
    expect(screen.getByTestId("bar-chart-icon")).toBeInTheDocument();
    expect(screen.getByTestId("star-icon")).toBeInTheDocument();
    expect(screen.getByTestId("bell-icon")).toBeInTheDocument();
  });

  test("renders explore button", () => {
    render(<Features />);

    expect(screen.getByText("Explore All Features")).toBeInTheDocument();
    expect(screen.getByTestId("arrow-right-icon")).toBeInTheDocument();
  });

  test("has correct section id", () => {
    render(<Features />);

    const section = screen.getByText("Visual Organization").closest("section");
    expect(section).toHaveAttribute("id", "features");
  });
});
