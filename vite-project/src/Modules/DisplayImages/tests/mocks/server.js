import { setupServer } from "msw/node";
import { handlers } from "./handlers";

// Create a server instance using a set of request handlers
export const server = setupServer(...handlers);
