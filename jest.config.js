/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

/** @type {import('jest').Config} */
const config = {
    coverageDirectory: 'coverage',
    coverageProvider: 'v8',
    collectCoverageFrom: ['src/**/*.js'], // ver todos arquivos que serao coletados para coverage
    globalSetup: '<rootDir>/jest.global-setup.js',
    setupFilesAfterEnv: ['<rootDir>/jest.setup-after-env.js'],
      watchPathIgnorePatterns: ['<rootDir>/.postgres-data'],
  testPathIgnorePatterns: ['<rootDir>/.postgres-data'],
}

export default config