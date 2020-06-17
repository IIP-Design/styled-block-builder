module.exports = {
  moduleNameMapper: {
    '\\.(c|sa|sc)ss$': '<rootDir>/__mocks__/style-mock.js',
  },
  rootDir: '../',
  testEnvironment: 'jest-environment-jsdom',
  transform: {
    '^.+\\.js$': '<rootDir>/config/jest-preprocess.js',
  },
  verbose: true,
};
