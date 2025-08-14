import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import HeroSection from "../../components/HeroSection";

describe("HeroSection Component", () => {
  test("renders hero section with test-id", () => {
    render(<HeroSection />);

    const heroSection = screen.getByTestId("hero");
    expect(heroSection).toBeInTheDocument();
  });

  test("renders main heading correctly", () => {
    render(<HeroSection />);

    expect(screen.getByText(/Build a Stronger/i)).toBeInTheDocument();
    expect(screen.getByText("Connection")).toBeInTheDocument();
  });

  test("renders trust badge", () => {
    render(<HeroSection />);

    expect(
      screen.getByText("Trusted by 10,000+ companies worldwide")
    ).toBeInTheDocument();
  });

  test("renders description text", () => {
    render(<HeroSection />);

    expect(
      screen.getByText(/Staffinity empowers modern HR teams/)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/manage employees, track performance/)
    ).toBeInTheDocument();
  });

  test("renders action buttons", () => {
    render(<HeroSection />);

    expect(screen.getByText("Try Demo")).toBeInTheDocument();
    expect(screen.getByText("Learn More")).toBeInTheDocument();
  });

  test("renders statistics section", () => {
    render(<HeroSection />);

    // Statistics values
    expect(screen.getByText("10K+")).toBeInTheDocument();
    expect(screen.getByText("99.9%")).toBeInTheDocument();
    expect(screen.getByText("24/7")).toBeInTheDocument();

    // Statistics labels
    expect(screen.getByText("Active Users")).toBeInTheDocument();
    expect(screen.getByText("Uptime")).toBeInTheDocument();
    expect(screen.getByText("Support")).toBeInTheDocument();
  });

  test("buttons are clickable", () => {
    render(<HeroSection />);

    const tryDemoButton = screen.getByText("Try Demo");
    const learnMoreButton = screen.getByText("Learn More");

    expect(tryDemoButton).toBeInTheDocument();
    expect(learnMoreButton).toBeInTheDocument();

    // Test that buttons can receive click events
    fireEvent.click(tryDemoButton);
    fireEvent.click(learnMoreButton);
  });

  test("has correct section structure and styling", () => {
    const { getByTestId } = render(<HeroSection />);
    const section = getByTestId("hero");
    expect(section).toHaveClass("pt-32", "pb-24", "px-6", "md:px-12");
    expect(section).toHaveClass(
      "bg-gradient-to-br",
      "from-slate-50",
      "via-blue-50",
      "to-indigo-50"
    );
  });

  test("buttons have correct styling classes", () => {
    render(<HeroSection />);

    const tryDemoButton = screen.getByText("Try Demo");
    const learnMoreButton = screen.getByText("Learn More");

    expect(tryDemoButton).toHaveClass(
      "bg-gradient-to-r",
      "from-[#4F46E5]",
      "to-purple-600"
    );
    expect(learnMoreButton).toHaveClass("bg-white/80", "backdrop-blur-sm");
  });

  test("statistics grid has correct layout", () => {
    render(<HeroSection />);
    const stats = screen.getByTestId("hero-stats");
    expect(stats).toHaveClass("grid", "grid-cols-1", "sm:grid-cols-3");
  });

  test("statistics values have correct styling", () => {
    render(<HeroSection />);

    const activeUsersValue = screen.getByText("10K+");
    const uptimeValue = screen.getByText("99.9%");
    const supportValue = screen.getByText("24/7");

    expect(activeUsersValue).toHaveClass(
      "text-3xl",
      "font-black",
      "text-[#4F46E5]"
    );
    expect(uptimeValue).toHaveClass(
      "text-3xl",
      "font-black",
      "text-purple-600"
    );
    expect(supportValue).toHaveClass(
      "text-3xl",
      "font-black",
      "text-emerald-600"
    );
  });

  test("trust badge has correct elements", () => {
    render(<HeroSection />);

    const trustBadge = screen
      .getByText("Trusted by 10,000+ companies worldwide")
      .closest("div");
    expect(trustBadge).toHaveClass(
      "inline-flex",
      "items-center",
      "px-4",
      "py-2"
    );
    expect(trustBadge).toHaveClass("bg-white/60", "backdrop-blur-sm");
  });

  test("all text content is accessible", () => {
    render(<HeroSection />);

    // Main content accessibility
    expect(
      screen.getByRole("button", { name: "Try Demo" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Learn More" })
    ).toBeInTheDocument();
  });
});
