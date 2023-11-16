import nestJest from "next/jest.js";

const createJestConfig = nestJest({
  dir: "./",
});

const config = {
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  testEnvironment: "jest-environment-jsdom",
  collectCoverage: true,
  detectOpenHandles: true,
};

export default createJestConfig(config);
