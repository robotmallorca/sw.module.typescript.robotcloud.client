export default {
  preset: "ts-jest",
  testEnvironment: "node",
  roots: ["<rootDir>", "./src"],
  modulePaths: ["<rootDir>", "./src"],
  moduleDirectories: ["node_modules"],
  moduleNameMapper: {
    "^(.*)$": "<rootDir>/src/$1",
    '^client/(.*)$': '<rootDir>/src/client/$1',
    '^helpers/(.*)$': '<rootDir>/src/helpers/$1',
    '^utils/(.*)$': '<rootDir>/src/utils/$1',
  },
};
