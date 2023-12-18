import type { Config } from "jest";
import nextJest from "next/jest";

const createJestConfig = nextJest({
  dir: "./",
});

const config: Config = {
  coverageProvider: "v8",
  testEnvironment: "jsdom",
  collectCoverage: true,
  detectOpenHandles: true,
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  collectCoverageFrom: ["<rootDir>/src/**/*.{js,jsx,ts,tsx}"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
    "^@/components/(.*)$": "<rootDir>/src/components/$1",
    "^@/utils/(.*)$": "<rootDir>/src/utils/$1",
    "^@/app/(.*)$": "<rootDir>/src/app/$1",
  },
};

export default createJestConfig(config);
