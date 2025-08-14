import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import UserActions from "../../components/UserActions";

// Mock lucide-react icons
jest.mock("lucide-react", () => ({
  Copy: () => <div data-testid="copy-icon" />,
  Mail: () => <div data-testid="mail-icon" />,
  ExternalLink: () => <div data-testid="external-link-icon" />,
}));

describe("UserActions Component", () => {
  const mockUser = {
    id: 1,
    email: "test@example.com",
  };

  beforeEach(() => {
    jest.clearAllMocks();

    // Mock clipboard API
    Object.assign(navigator, {
      clipboard: {
        writeText: jest.fn().mockResolvedValue(),
      },
    });

    // Mock window.alert
    window.alert = jest.fn();

    // Mock window.location.href (tanpa delete)
    delete window.location;
    window.location = { href: "" };
  });

  test("renders all action buttons", () => {
    render(<UserActions user={mockUser} />);

    expect(screen.getByText("Send Email")).toBeInTheDocument();
    expect(screen.getByText("Copy ID")).toBeInTheDocument();
    expect(screen.getByText("Visit API")).toBeInTheDocument();
  });

  test("copies user ID to clipboard", () => {
    render(<UserActions user={mockUser} />);

    const copyButton = screen.getByText("Copy ID");
    fireEvent.click(copyButton);

    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(1);
    expect(window.alert).toHaveBeenCalledWith("User ID copied!");
  });

  test("Visit API link has correct attributes", () => {
    render(<UserActions user={mockUser} />);

    const apiLink = screen.getByText("Visit API");
    expect(apiLink).toHaveAttribute("href", "https://reqres.in/");
    expect(apiLink).toHaveAttribute("target", "_blank");
  });
});
