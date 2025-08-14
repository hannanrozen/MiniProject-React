module.exports = {
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.js"],

  maxWorkers: 1,
  forceExit: true,
  testTimeout: 10000,

  testMatch: ["<rootDir>/src/__tests__/**/*.{js,jsx}"],

  transform: {
    "^.+\\.(js|jsx)$": [
      "babel-jest",
      {
        presets: [
          ["@babel/preset-env", { targets: { node: "current" } }],
          ["@babel/preset-react", { runtime: "automatic" }],
        ],
      },
    ],
  },

  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
    "\\.(gif|jpg|jpeg|png|svg|webp)$": "<rootDir>/src/__mocks__/fileMock.cjs",
  },

  transformIgnorePatterns: ["/node_modules/(?!(lucide-react)/)"],
};
