import { http, HttpResponse } from "msw";

// Export handlers to be used in both development and test setups
export const handlers = [
  http.get("/api/v1/post", () => {
    console.log("in GET api posts");
    return HttpResponse.json(
      [
        { id: 1, title: "First Post" },
        { id: 2, title: "Second Post" },
      ],
      { status: 200 }
    );
  }),
];
