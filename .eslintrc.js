module.exports = {
  root: true,
  parserOptions: {
    ecmaVersion: 2017,
    sourceType: 'module'
  },
  extends: 'eslint:recommended',
  env: {
    browser: true
  },
  rules: {
    'no-debugger': 1,
    'no-console': 1,
    'no-unused-vars': 1,
    'indent': [2, 2],
    'semi': ['error', 'always']
  },
  globals: {
    ga: true
  }
};
