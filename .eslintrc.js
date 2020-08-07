module.exports = {
  overrides: [
    // Config for all Typescript source files.
    {
      files: ["src/**/*.ts"],

      // Our TS files use the latest syntax and expect a browser environment.
      env: {
        browser: true,
        es2020: true,
      },

      extends: [
        // business logic
        "eslint:recommended",
        "airbnb-typescript/base",
        "plugin:@typescript-eslint/eslint-recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:@typescript-eslint/recommended-requiring-type-checking",

        // tests
        "plugin:jest/recommended",
        "plugin:jest/style",
        "plugin:testing-library/recommended",
        "plugin:jest-dom/recommended",

        // formatting
        "plugin:prettier/recommended",
        "prettier/@typescript-eslint",
      ],

      // ESLint works with an AST. We must use a parser that can generate an AST
      // from TS code.
      parser: "@typescript-eslint/parser",
      parserOptions: {
        ecmaVersion: 11,
        sourceType: "module",
        project: "./tsconfig.json",
      },

      // Used for their configs used in `extends` section above.
      plugins: [
        "@typescript-eslint",
        "jest",
        "jest-dom",
        "prettier",
        "testing-library",
      ],

      rules: {
        // keeping recommended defaults
      },
    },

    // Config for files written in JavaScript used by tooling running on
    // Node (i.e., Babel, ESLint, Jest, Webpack config files)
    {
      files: ["*.js"],

      // Config files are run by Node.js
      env: {
        node: true,
      },

      // Minimal set of rules for config files.
      extends: [
        "eslint:recommended",
        "airbnb-base",
        "plugin:prettier/recommended",
      ],

      parserOptions: {
        // Current Node LTS (v12) generally supports up to ES2019 features. See
        // https://node.green/.
        ecmaVersion: 2019,
      },
      plugins: ["prettier"],
      rules: {
        // keeping recommended defaults
      },
      // overrides: [
      //     {
      //         files: ['config/jestSetup/*.js'],
      //         env: {
      //             jest: true,
      //         },
      //         globals: {
      //             window: true,
      //         },
      //     },
      // ],
    },
  ],
};
