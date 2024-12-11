module.exports = {
  root: true,
  env: { node: true, browser: true, es2020: true },
  extends: ['eslint:recommended', 'plugin:security/recommended', 'plugin:prettier/recommended'],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  rules: {
    'no-console': 'error',
    'func-names': 'off',
    'no-underscore-dangle': 'off',
    'consistent-return': 'off',
    'jest/expect-expect': 'off',
    'security/detect-object-injection': 'off',
  },
};
