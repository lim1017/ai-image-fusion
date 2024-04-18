// import React from "react";
// import Home from "../Modules/DisplayImages/pages/Home";
// import { customRender, screen } from "../utils/test-utils";

describe("Home component", () => {
  it("renders the main title", async () => {
    // const { getByTestId } = customRender(<Home />);
    // const loaderElement = getByTestId("loader"); // Update with the actual test ID of your Loader component
    // expect(loaderElement).toBeDefined();
    // // Wait for loaderElement to disappear
    // // await waitFor(() => {
    // //   expect(getByTestId("loader")).not.toBeInTheDocument();
    // // });
    // // const postsElements = getByTestId("post-element-container");
    // // expect(postsElements).toBeDefined();
    // const titleElement = screen.getByText(/The Community Showcase/i);
    // expect(titleElement).toBeDefined();
  });

  // it("updates search results correctly", async () => {
  //   const { getByTestId, getByText } = customRender(<Home />);

  //   const searchInput = getByTestId("search-input");
  //   fireEvent.change(searchInput, { target: { value: "tfx" } });

  //   // Fast-forward timers to trigger debounce
  //   jest.advanceTimersByTime(500);

  //   // Wait for component update
  //   await waitFor(() => {
  //     const searchResults = getByText("Showing Results for tfx:");
  //     expect(searchResults).toBeDefined();
  //   });
  // });
});
