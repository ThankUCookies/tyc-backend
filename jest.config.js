module.exports = {
  roots: ['src'],
  preset: 'ts-jest',
  testEnvironment: 'node',
  verbose: true,
  setupFiles: ['./src/__test__/setup.ts'],
  coveragePathIgnorePatterns: ['setup.ts']
};
