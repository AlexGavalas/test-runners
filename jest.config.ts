import type { Config } from 'jest';

const config: Config = {
    testEnvironment: 'jest-fixed-jsdom',

    testEnvironmentOptions: {
        customExportConditions: [''],
    },

    preset: 'ts-jest',

    setupFilesAfterEnv: ['<rootDir>/helpers/msw.ts'],
};

export default config;
