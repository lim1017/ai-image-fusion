/* eslint-disable no-undef */
import { waitFor, act, screen } from "@testing-library/react";
import CreatePost from "../pages/CreatePost";
import "@testing-library/jest-dom";
import { customRender } from "../../../utils/test-utils";
import userEvent from "@testing-library/user-event";

beforeEach(() => {
  jest.useFakeTimers();
});

afterEach(() => {
  jest.useRealTimers();
});

it("Creates an image", async () => {
  const user = userEvent.setup({ delay: null });

  const { getAllByTestId, getByTestId, getByText, debug } = customRender(
    <CreatePost />
  );

  const title = getByTestId("create-post-title");

  expect(title).toBeInTheDocument();

  const nameInput = getByTestId("create-post-name-input");
  await act(async () => user.type(nameInput, "ggg name"));
  await waitFor(() => expect(nameInput.value).not.toBe(""));

  const randomPromptBtn = getByTestId("random-prompt-btn");
  await act(async () => {
    user.click(randomPromptBtn);
  });
  await waitFor(() => {
    const promptInput = getByTestId("create-post-prompt-input");
    expect(promptInput.value).not.toBe("");
  });

  const generateImgBtn = getByTestId("generate-img-btn");

  await act(async () => {
    user.click(generateImgBtn);
  });

  // const genreateImgLoader = getByTestId("generate-img-loader");

  await waitFor(() => {
    const loadingText = screen.getByText("Generating...");
    expect(loadingText).toBeInTheDocument();

    //   expect(genreateImgLoader).toBeInTheDocument();
  });
});
