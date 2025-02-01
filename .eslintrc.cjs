/** @type {import("eslint").Linter.Config} */
const config = {
  root: true,
  parser: "@typescript-eslint/parser",
  plugins: ["prettier", "vitest-globals"],
  ignorePatterns: ["dist", ".eslintrc.cjs"],
  extends: [
    "next/core-web-vitals",
    "plugin:prettier/recommended",
    "plugin:@typescript-eslint/recommended-type-checked",
    "plugin:@typescript-eslint/stylistic-type-checked",
    "plugin:vitest-globals/recommended",
    "plugin:storybook/recommended"
  ],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    tsconfigRootDir: __dirname,
    projectService: true,
  },
  overrides: [
    // Template files don't have reliable type information
    {
      files: ["./cli/template/**/*.{ts,tsx}"],
      extends: ["plugin:@typescript-eslint/disable-type-checked"],
    },
  ],
  rules: {
    // These off/not-configured-the-way-we-want lint rules we like & opt into
    "@typescript-eslint/no-explicit-any": "error",
    "@typescript-eslint/no-unused-vars": [
      "warn",
      {
        argsIgnorePattern: "^_",
        varsIgnorePattern: "^_",
        destructuredArrayIgnorePattern: "^_",
        caughtErrorsIgnorePattern: "^_",
      },
    ],
    "@typescript-eslint/consistent-type-imports": [
      "warn",
      {
        prefer: "type-imports",
        fixStyle: "inline-type-imports",
      },
    ],

    // These lint rules don't make sense for us but are enabled in the preset configs
    "@typescript-eslint/no-confusing-void-expression": "off",
    "@typescript-eslint/restrict-template-expressions": "off",

    // This rule doesn't seem to be working properly
    "@typescript-eslint/prefer-nullish-coalescing": "off",

    "@typescript-eslint/array-type": "off",
    "@typescript-eslint/consistent-type-definitions": "off",
   
    "@typescript-eslint/require-await": "off",
    "@typescript-eslint/no-misused-promises": [
      "error",
      {
        checksVoidReturn: {
          attributes: false,
        },
      },
    ],
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/explicit-function-return-type": "off",
    
    "prettier/prettier": "error",
    eqeqeq: "error",
    "no-console": "warn",
    "no-undef": "off",
  },
};

module.exports = config;