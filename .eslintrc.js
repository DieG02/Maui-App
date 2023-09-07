// eslint-disable-next-line no-undef
module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 12,
    sourceType: "module",
  },
  plugins: ["@typescript-eslint"],
  rules: {
    // "no-unused-vars": "off",

    "@typescript-eslint/no-unused-vars": ["error"],

    "no-underscore-dangle": "off",
    // "@typescript-eslint/no-unused-vars": "warn",
    "object-curly-spacing": ["warn", "always"],
    "@typescript-eslint/no-explicit-any": "warn",
    "no-plusplus": ["error", { allowForLoopAfterthoughts: true }],

    "react/jsx-props-no-spreading": "off",
    "import/prefer-default-export": "off",
    "react/jsx-boolean-value": "off",
    "react/prop-types": "off",
    "react/no-unescaped-entities": "off",
    "react/jsx-one-expression-per-line": "off",
    "react/jsx-wrap-multilines": "off",
    "no-use-before-define": "off",
    "@typescript-eslint/no-use-before-define": "warn",
    "react/require-default-props": "off",
    "no-extra-boolean-cast": "warn",
    "no-constant-condition": "warn",
    "@typescript-eslint/no-empty-function": "warn",
    "@typescript-eslint/ban-ts-comment": "off",

    "@typescript-eslint/ban-types": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "react/react-in-jsx-scope": "off",
    "comma-dangle": "off",
    "@typescript-eslint/comma-dangle": "off",
  },
};
