import React from "react";
// import { render, screen } from "@testing-library/react";
import Home from "../pages/Home";
import { customRender, screen } from "../utils/test-utils";

describe("Home component", () => {
  it("renders the main title", () => {
    customRender(<Home />);
    const titleElement = screen.getByText(/The Community Showcase/i);
    expect(titleElement).toBeDefined();
  });

  // Add more tests for other components and functionalities
});
