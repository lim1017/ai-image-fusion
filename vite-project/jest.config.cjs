module.exports = {
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": "babel-jest",
    "^.+\\.svg$": "<rootDir>/svgTransForm.cjs",
    ".+\\.(css|scss|png|jpg)$": "jest-transform-stub",
  },
  testEnvironment: "jsdom",
};
