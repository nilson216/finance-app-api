/** @type {import('jest').Config} */
const config = {
  testEnvironment: 'node',
  transform: {
    '^.+\\.js$': 'babel-jest', // transpila seus arquivos e dependências ESM
  },
  transformIgnorePatterns: [
    '/node_modules/(?!@faker-js/faker)' // transpila faker também
  ],
  testMatch: ['**/?(*.)+(spec|test).js'],
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
};

export default config;
