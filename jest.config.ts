import type { Config } from 'jest';

const config: Config = {
    testEnvironment: 'jsdom',

    preset: 'ts-jest',

    setupFilesAfterEnv: ['<rootDir>/helpers/msw.ts'],
};

export default config;
