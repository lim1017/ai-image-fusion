import { server } from "../DisplayImages/tests/mocks/server";

// Start server before all tests
beforeAll(() => server.listen());

// Reset handlers after each test to clear state between tests
afterEach(() => server.resetHandlers());

// Close server after all tests
afterAll(() => server.close());
