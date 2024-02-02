// eslint-disable-next-line import/no-commonjs
module.exports = {
  parserOptions: {
    project: "./tsconfig.json",
    sourceType: "module",
  },
  env: {
    node: true,
  },
  parser: "@typescript-eslint/parser",
  extends: ["plugin:@typescript-eslint/recommended", "eslint:recommended", "prettier"],
  plugins: ["@typescript-eslint", "deprecation"],
  overrides: [
    {
      files: [
        "src/__tests__/**/*",
        "src/__mocks__/**/*",
        "src/__tests-utils__/**/*",
      ],
      rules: {
        "@typescript-eslint/no-var-requires": "off",
        "no-use-before-define": "off",
      },
    },
  ],
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "error" : "warn",
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "warn",
    "block-scoped-var": "warn",
    "eol-last": ["warn", "always"],
    // TS
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/no-empty-interface": "off",
    "@typescript-eslint/no-inferrable-types": "off",
    "@typescript-eslint/no-empty-function": "warn",
    "@typescript-eslint/no-non-null-assertion": "off",
    "deprecation/deprecation": "warn",
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": [
      "error",
      {
        "argsIgnorePattern": "^_",
        "varsIgnorePattern": "^_",
        "caughtErrorsIgnorePattern": "^_"
      }
    ]
  },
};
