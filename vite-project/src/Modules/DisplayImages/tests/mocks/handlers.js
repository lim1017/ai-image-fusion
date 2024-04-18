// fetchMockHandlers.js

import { postsData } from "./mockData";

const baseUrl = `${import.meta.env.VITE_API_URL}`;

const mockResponses = {
  [`${baseUrl}/api/v1/post`]: {
    status: 200,
    body: JSON.stringify(postsData),
  },
  "https://api.example.com/api/v1/user": {
    status: 200,
    body: JSON.stringify({
      id: 1,
      name: "John Doe",
    }),
  },
  // Add more routes and responses as needed
};

export const setupFetchStub = (url) => {
  const response = mockResponses[url];
  console.log("in setupFetchStubssssssssssss");
  if (response) {
    fetch.mockResponseOnce(response.body, { status: response.status });
  } else {
    fetch.mockResponseOnce(JSON.stringify({ message: "Not Found" }), {
      status: 404,
    });
  }
};
