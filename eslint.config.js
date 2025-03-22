import prettierConfig from "eslint-config-prettier";
import js from "@eslint/js";
import globals from "globals";
import reactRecommended from "eslint-plugin-react/configs/recommended.js";
import reactHooks from "eslint-plugin-react-hooks";
// import reactRefresh from "eslint-plugin-react-refresh";
import prettierPlugin from "eslint-plugin-prettier";
import noRelativeImportPaths from "eslint-plugin-no-relative-import-paths";
import tseslint from "typescript-eslint";
import importPlugin from "eslint-plugin-import";

/** @type {import('eslint').Linter.Config[]} */
export default [
  js.configs.recommended,
  ...tseslint.configs.recommended,
  ...tseslint.configs.strict,
  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      react: reactRecommended,
      "react-hooks": reactHooks,
      // "react-refresh": reactRefresh,
      prettier: prettierPlugin,
      import: importPlugin,
      "no-relative-import-paths": noRelativeImportPaths,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      "import/order": [
        "warn",
        {
          alphabetize: {
            caseInsensitive: true,
            order: "asc",
          },
          groups: ["builtin", "external", "internal", "parent", "sibling", "index", "unknown"],
          "newlines-between": "never",
          pathGroups: [
            {
              group: "unknown",
              pattern: "*.css",
              patternOptions: {
                matchBase: true,
              },
              position: "after",
            },
          ],
        },
      ],
      "no-relative-import-paths/no-relative-import-paths": [
        "warn",
        { allowSameFolder: true, rootDir: "src", prefix: "@" },
      ],
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/unified-signatures": "off",
      "@typescript-eslint/consistent-type-imports": [
        "error",
        {
          prefer: "type-imports",
          disallowTypeAnnotations: true,
        },
      ],
      "no-empty-pattern": "warn",
    },
  },
  prettierConfig,
  { ignores: ["dist", ".react-router", "node_modules", "build"] },
];
