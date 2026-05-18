import { createJsWithTsEsmPreset } from 'ts-jest';
import type { Config } from 'jest';

const config: Config = {
    ...createJsWithTsEsmPreset({
        diagnostics: {
            ignoreCodes: [5107],
        },
    }),
    testEnvironment: 'jest-fixed-jsdom',
    testEnvironmentOptions: {
        customExportConditions: [''],
    },
    transformIgnorePatterns: ['/node_modules/(?!(\\.pnpm/)?(msw|until-async))'],
    setupFilesAfterEnv: ['<rootDir>/helpers/msw.ts'],
};

export default config;
