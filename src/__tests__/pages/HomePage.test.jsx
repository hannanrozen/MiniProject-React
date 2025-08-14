import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom";
import HomePage from "../../pages/HomePage";

// Mock API
jest.mock("../../services/api", () => ({
  get: jest.fn(() =>
    Promise.resolve({
      data: {
        data: [
          {
            id: 1,
            first_name: "John",
            last_name: "Doe",
            email: "john@example.com",
            avatar: "https://example.com/avatar1.jpg",
          },
        ],
        page: 1,
        total_pages: 1,
        total: 1,
      },
    })
  ),
}));

// Mock all child components
jest.mock("../../components/Navbar", () => () => (
  <div data-testid="navbar">Navbar</div>
));
jest.mock("../../components/Footer", () => () => (
  <div data-testid="footer">Footer</div>
));
jest.mock("../../components/UserCard", () => ({ user, onClick }) => (
  <div data-testid="user-card" onClick={() => onClick(user.id)}>
    {user.first_name} {user.last_name}
  </div>
));
jest.mock("../../components/LoadingSpinner", () => () => (
  <div data-testid="loading">Loading...</div>
));

const renderWithRouter = (component) => {
  return render(<MemoryRouter>{component}</MemoryRouter>);
};

describe("HomePage Component", () => {
  test("renders without crashing", () => {
    renderWithRouter(<HomePage />);

    expect(screen.getByTestId("navbar")).toBeInTheDocument();
    expect(screen.getByTestId("footer")).toBeInTheDocument();
  });

  test("shows loading initially", () => {
    renderWithRouter(<HomePage />);

    expect(screen.getByTestId("loading")).toBeInTheDocument();
  });

  test("renders page title", () => {
    renderWithRouter(<HomePage />);

    expect(screen.getByText(/User Directory/)).toBeInTheDocument();
  });
});
