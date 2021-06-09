module.exports = {
  transform: {
    '\\.(js)?$': 'babel-jest'
  },
  testMatch: ['<rootDir>/tests/**/*.js', '**/*.test.js'],
  testEnvironment: 'jsdom',
  moduleDirectories: ['node_modules', '<rootDir>'],
  // Поддержка алиасов абсолютных путей импорта, указанных в jsconfig.json
  moduleNameMapper: {
    '^@sharedComp/(.*)$': '<rootDir>/components/_shared/$1',
    '^@config$': '<rootDir>/config'
  },
  testPathIgnorePatterns: [
    '/node_modules/',
    '/public/',
    '/config/',
    '/data/',
    '/hooks/',
    '/helpers/',
    '/animations/',
    '/middlewares',
    '/.next/'
  ],
  setupFilesAfterEnv: [
    '<rootDir>/jest.setup.js',
    '@testing-library/jest-dom/extend-expect'
  ],
  collectCoverageFrom: ['<rootDir>/components/**/*.js']
};
