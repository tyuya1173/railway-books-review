// jest.config.cjs
/**
 * @type {import('@jest/types').Config.InitialOptions}
 */
const config = {
  testEnvironment: 'jest-environment-jsdom', // `jest-environment-jsdom`を指定
  roots: ['<rootDir>/tests/jest'], // Jestのテストファイルが含まれるディレクトリ
};

module.exports = config;
