/* eslint-disable no-undef */
import { waitFor, act } from "@testing-library/react";
import Home from "../pages/Home";
import "@testing-library/jest-dom";
import { customRender } from "../../../utils/test-utils";
import { postResponse } from "./mocks/mockData";
import userEvent from "@testing-library/user-event";

beforeEach(() => {
  jest.useFakeTimers();
  fetch.mockResponseOnce(JSON.stringify(postResponse));
});

afterEach(() => {
  jest.useRealTimers();
});

it("Loads the Home page", async () => {
  const { getAllByTestId, getByTestId, getByText, debug } = customRender(
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

  const user = userEvent.setup({ delay: null });

  const searchInput = getByTestId("search-input");
  act(() => {
    user.type(searchInput, "perfect day");
    // Fast-forward timers to trigger debounce
    jest.advanceTimersByTime(500);
  });

  await waitFor(() => {
    const cardAfterSearch = getAllByTestId("single-card");

    expect(cardAfterSearch.length).toBe(1); // Check if the number of rendered cards is correct
  });
});
