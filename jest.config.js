module.exports = {
  moduleFileExtensions: ['js', 'jsx', 'json', 'ts', 'tsx'],
  transform: {
    '^.+\\.(j|t)sx?$': 'babel-jest'
  },
  moduleNameMapper: {
    '\\.(css|postcss|less|stylus|styl|sass|scss)$':
      '<rootDir>/__files__/test.stub.js',
    [`^@/(.*)$`]: `<rootDir>/src/$1`
  },
  modulePaths: ['<rootDir>/src/'],
  moduleDirectories: ['node_modules', '<rootDir>/src/'],
  testRegex: '(/__tests__/.*|(\\.|/)test)\\.((t|j)sx?)$'
}
