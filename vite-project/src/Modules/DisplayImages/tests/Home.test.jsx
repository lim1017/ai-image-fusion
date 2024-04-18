import { render, screen, waitFor } from "@testing-library/react";
import Home from "../pages/Home";
import "@testing-library/jest-dom";
import { customRender } from "../../../utils/test-utils";
import { postResponse } from "./mocks/mockData";

beforeEach(() => {
  fetch.mockResponseOnce(JSON.stringify(postResponse));
});

it("Loads the Home page", async () => {
  const { getAllByTestId, getByTestId, fireEvent, getByText } = customRender(
    <Home />
  );

  const loaderElement = getByTestId("loader"); //
  expect(loaderElement).toBeDefined();
  // Wait for loaderElement to disappear
  await waitFor(() => {
    expect(loaderElement).not.toBeInTheDocument();
  });

  const cards = getAllByTestId("single-card");
  expect(cards.length).toBe(10); // Check if the number of rendered cards is correct
});
