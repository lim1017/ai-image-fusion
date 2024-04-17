// src/components/MyComponent.test.js
import { render, screen, waitFor } from "@testing-library/react";
import Home from "../pages/Home";
import "@testing-library/jest-dom";

describe("Home component", () => {
  test("displays data fetched from backend", async () => {
    render(<Home />);

    // Wait for the data to be displayed
    await waitFor(() => {
      expect(screen.getByText("First Post")).toBeInTheDocument();
      expect(screen.getByText("Second Post")).toBeInTheDocument();
    });
  });
});
