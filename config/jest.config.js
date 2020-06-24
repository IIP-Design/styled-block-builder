module.exports = {
  moduleNameMapper: {
    '\\.(c|sa|sc)ss$': '<rootDir>/__mocks__/style-mock.js',
  },
  rootDir: '../',
  setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'],
  testEnvironment: 'jest-environment-jsdom',
  transform: {
    '^.+\\.js$': '<rootDir>/config/jest-preprocess.js',
  },
  verbose: true,
};
