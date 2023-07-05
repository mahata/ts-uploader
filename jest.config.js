const nextJest = require("next/jest");

const createJestConfig = nextJest({
    dir: "./",
});

const customJestConfig = {
    setupFilesAfterEnv: ['<rootDir>/setupTests.ts'],
    moduleNameMapper: {
        "^@/src/(.*)$": "<rootDir>/src/$1",
    },
    testEnvironment: "jest-environment-jsdom",
};

module.exports = createJestConfig(customJestConfig);
