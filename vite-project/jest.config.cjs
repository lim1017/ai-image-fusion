// module.exports = {
//   transform: {
//     "^.+\\.(js|jsx|ts|tsx)$": "babel-jest",
//     "^.+\\.svg$": "<rootDir>/svgTransForm.cjs",
//     ".+\\.(css|scss|png|jpg)$": "jest-transform-stub",
//   },
//   testEnvironment: "jsdom",
// };

module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/src/Modules/tests/setupTests.js"],
  setupFiles: ["./jest.polyfills.js"],
  moduleNameMapper: {
    // Map your module aliases here if necessary, but no specific mapping for 'msw/node'
  },
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": "babel-jest",
    "^.+\\.svg$": "<rootDir>/svgTransForm.cjs",
    ".+\\.(css|scss|png|jpg)$": "jest-transform-stub",
  },
  testEnvironmentOptions: {
    customExportConditions: [""],
  },
  transformIgnorePatterns: ["/node_modules/(?!msw).+\\.js$"],
};
