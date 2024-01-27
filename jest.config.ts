import type { Config } from 'jest';

const config: Config = {
    testEnvironment: 'jsdom',

    testEnvironmentOptions: {
        customExportConditions: [''],
    },

    preset: 'ts-jest',

    setupFiles: ['<rootDir>/helpers/jest.polyfills.ts'],
    setupFilesAfterEnv: ['<rootDir>/helpers/msw.ts'],
};

export default config;
