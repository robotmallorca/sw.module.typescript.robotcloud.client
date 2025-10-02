export default {
  preset: "ts-jest",
  testEnvironment: "node",
  roots: ["<rootDir>", "./src"],
  modulePaths: ["<rootDir>", "./src"],
  moduleDirectories: ["node_modules"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
};
