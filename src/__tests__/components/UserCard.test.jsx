import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import UserCard from "../../components/UserCard";

// Mock lucide-react icons
jest.mock("lucide-react", () => ({
  MessageCircle: () => <div data-testid="message-icon">Message</div>,
}));

describe("UserCard Component", () => {
  const mockUser = {
    id: 1,
    first_name: "John",
    last_name: "Doe",
    email: "john.doe@example.com",
    avatar: "https://example.com/avatar.jpg",
  };

  const mockOnClick = jest.fn();

  beforeEach(() => {
    mockOnClick.mockClear();
  });

  test("renders user card with test-id", () => {
    render(<UserCard user={mockUser} onClick={mockOnClick} />);

    const userCard = screen.getByTestId("user-card");
    expect(userCard).toBeInTheDocument();
  });

  test("renders user information correctly", () => {
    render(<UserCard user={mockUser} onClick={mockOnClick} />);

    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("john.doe@example.com")).toBeInTheDocument();
  });

  test("displays user avatar", () => {
    render(<UserCard user={mockUser} onClick={mockOnClick} />);

    const avatar = screen.getByRole("img");
    expect(avatar).toHaveAttribute("src", mockUser.avatar);
    expect(avatar).toHaveAttribute("alt", "John Doe");
  });

  test("calls onClick when card is clicked", () => {
    render(<UserCard user={mockUser} onClick={mockOnClick} />);

    const card = screen.getByTestId("user-card");
    fireEvent.click(card);

    expect(mockOnClick).toHaveBeenCalledWith(mockUser.id);
  });

  test("renders message icon", () => {
    render(<UserCard user={mockUser} onClick={mockOnClick} />);

    expect(screen.getByTestId("message-icon")).toBeInTheDocument();
  });
});
