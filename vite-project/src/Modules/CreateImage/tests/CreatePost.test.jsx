/* eslint-disable no-undef */
import { waitFor, act, screen } from "@testing-library/react";
import CreatePost from "../pages/CreatePost";
import "@testing-library/jest-dom";
import { customRender } from "../../../utils/test-utils";
import userEvent from "@testing-library/user-event";

beforeEach(() => {
  jest.useFakeTimers();
  fetch.mockResponse((req) => {
    if (req.url.includes("/api/v1/dalle")) {
      return Promise.resolve(JSON.stringify({ photo: "User1" }));
    } else if (req.url.includes("/api/v1/post")) {
      return Promise.resolve(JSON.stringify({ data: [1, 2, 3] }));
    }
    return Promise.reject(new Error("Not Found"));
  });
});

afterEach(() => {
  jest.useRealTimers();
});

it("Creates an image with random prompt", async () => {
  const user = userEvent.setup({ delay: null });

  const { getByTestId } = customRender(<CreatePost />);

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

  await waitFor(() => {
    const loadingText = screen.getByText("Generating...");
    expect(loadingText).toBeInTheDocument();
  });

  await waitFor(() => {
    const doneLoadingText = screen.getByText("Generate");

    expect(doneLoadingText).toBeInTheDocument();
  });

  const submitBtn = getByTestId("create-post-submit-btn");
  await act(async () => {
    user.click(submitBtn);
  });

  await waitFor(
    () => {
      expect(window.location.pathname).toBe("/");
    },
    { timeout: 5000 }
  );
});
