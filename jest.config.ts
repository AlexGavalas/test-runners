import type { Config } from 'jest';

const config: Config = {
    testEnvironment: 'jsdom',

    preset: 'ts-jest',

    setupFilesAfterEnv: ['<rootDir>/src/setup-tests.ts'],
};

export default config;
