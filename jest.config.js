module.exports = {
  moduleFileExtensions: ['js'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1'
  },
  transform: {
    '^.+\\.js$': 'babel-jest'
  },
  collectCoverageFrom: [
    'src/*.js'
  ],
  coverageReporters: ['json', 'lcov', 'text', 'text-summary']
}
