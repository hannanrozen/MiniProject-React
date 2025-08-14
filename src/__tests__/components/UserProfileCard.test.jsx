import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import UserProfileCard from "../../components/UserProfileCard";

// Mock lucide-react icons
jest.mock(
  "lucide-react",
  () => ({
    Mail: ({ size, className }) => (
      <div data-testid="mail-icon" data-size={size} className={className} />
    ),
  }),
  { virtual: true }
);

describe("UserProfileCard Component", () => {
  const mockUser = {
    id: 1,
    first_name: "John",
    last_name: "Doe",
    email: "john.doe@example.com",
    avatar: "https://example.com/avatar.jpg",
  };

  test("renders user profile information correctly", () => {
    render(<UserProfileCard user={mockUser} />);

    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("john.doe@example.com")).toBeInTheDocument();
  });

  test("displays user avatar with correct attributes", () => {
    render(<UserProfileCard user={mockUser} />);

    const avatar = screen.getByRole("img", { name: "John Doe" });
    expect(avatar).toHaveAttribute("src", mockUser.avatar);
    expect(avatar).toHaveAttribute("alt", "John Doe");
  });

  test("renders mail icon", () => {
    render(<UserProfileCard user={mockUser} />);

    expect(screen.getByTestId("mail-icon")).toBeInTheDocument();
  });

  test("displays status badges", () => {
    render(<UserProfileCard user={mockUser} />);

    expect(screen.getByText("Active Member")).toBeInTheDocument();
    expect(screen.getByText("Team Member")).toBeInTheDocument();
  });

  test("displays user statistics", () => {
    render(<UserProfileCard user={mockUser} />);

    // User ID
    expect(screen.getByText(`#${mockUser.id}`)).toBeInTheDocument();
    expect(screen.getByText("User ID")).toBeInTheDocument();

    // Rating
    expect(screen.getByText("5.0")).toBeInTheDocument();
    expect(screen.getByText("Rating")).toBeInTheDocument();

    // Projects
    expect(screen.getByText("24")).toBeInTheDocument();
    expect(screen.getByText("Projects")).toBeInTheDocument();
  });

  test("has correct CSS classes for styling", () => {
    render(<UserProfileCard user={mockUser} />);
    const card = screen.getByTestId("user-card");
    expect(card).toHaveClass("bg-white/90", "backdrop-blur-xl", "rounded-3xl");
  });

  test("renders with different user data", () => {
    const differentUser = {
      id: 999,
      first_name: "Jane",
      last_name: "Smith",
      email: "jane.smith@test.com",
      avatar: "https://test.com/jane.jpg",
    };

    render(<UserProfileCard user={differentUser} />);

    expect(screen.getByText("Jane Smith")).toBeInTheDocument();
    expect(screen.getByText("jane.smith@test.com")).toBeInTheDocument();
    expect(screen.getByText("#999")).toBeInTheDocument();
  });

  test("handles missing user names gracefully", () => {
    const incompleteUser = {
      id: 1,
      first_name: "John",
      // last_name missing
      email: "john@example.com",
      avatar: "https://example.com/avatar.jpg",
    };

    render(<UserProfileCard user={incompleteUser} />);

    expect(screen.getByText("John")).toBeInTheDocument();
    expect(screen.getByText("john@example.com")).toBeInTheDocument();
  });

  test("renders all required UI sections", () => {
    render(<UserProfileCard user={mockUser} />);
    const stats = screen.getByTestId("user-stats");
    expect(stats).toHaveClass("grid", "grid-cols-3");
  });
});
