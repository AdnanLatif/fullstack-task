import { createDefaultPreset } from 'ts-jest';



/** @type {import("jest").Config} **/
export default {
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.app.json',  // explicitly point here
      isolatedModules: true,
    },
  },
};

