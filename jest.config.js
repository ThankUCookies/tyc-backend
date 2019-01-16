module.exports = {
  roots: ['src', '__test__'],
  preset: 'ts-jest',
  testEnvironment: 'node',
  verbose: true,
  setupFiles: ['./__test__/setup.ts'],
  coveragePathIgnorePatterns: ['setup.ts']
};
