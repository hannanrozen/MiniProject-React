import React from "react";
import { render, screen } from "@testing-library/react";
import Footer from "../../components/Footer";

// Mock lucide-react icons
jest.mock("lucide-react", () => ({
  Github: () => <div data-testid="github-icon">Github</div>,
  Twitter: () => <div data-testid="twitter-icon">Twitter</div>,
  Linkedin: () => <div data-testid="linkedin-icon">Linkedin</div>,
  MessageSquare: () => <div data-testid="message-icon">Message</div>,
  Send: () => <div data-testid="send-icon">Send</div>,
}));

describe("Footer Component", () => {
  test("renders footer with test-id", () => {
    render(<Footer />);

    const footer = screen.getByTestId("footer");
    expect(footer).toBeInTheDocument();
  });

  test("renders footer with company name", () => {
    render(<Footer />);
    expect(screen.getByText(/Staffinity/i)).toBeInTheDocument();
  });

  test("renders all navigation links", () => {
    render(<Footer />);
    expect(screen.getByText(/Features/i)).toBeInTheDocument();
    expect(screen.getByText(/Pricing/i)).toBeInTheDocument();
  });

  test("renders copyright text with current year", () => {
    render(<Footer />);
    const currentYear = new Date().getFullYear();
    expect(
      screen.getByText(new RegExp(currentYear.toString()))
    ).toBeInTheDocument();
  });
});
