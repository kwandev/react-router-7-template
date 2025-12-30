import js from "@eslint/js";
import prettier from "eslint-config-prettier";
import tailwindBetter from "eslint-plugin-better-tailwindcss";
import importPlugin from "eslint-plugin-import";
import noRelativeImportPaths from "eslint-plugin-no-relative-import-paths";
import prettierPlugin from "eslint-plugin-prettier";
import reactRecommended from "eslint-plugin-react/configs/recommended.js";
import reactHooks from "eslint-plugin-react-hooks";
import tseslint from "typescript-eslint";

/** @type {import('eslint').Linter.Config[]} */
export default [
  js.configs.recommended,
  ...tseslint.configs.recommended,
  ...tseslint.configs.strict,
  {
    plugins: {
      react: reactRecommended,
      "react-hooks": reactHooks,
      import: importPlugin,
      "no-relative-import-paths": noRelativeImportPaths,
      "better-tailwindcss": tailwindBetter,
      prettier: prettierPlugin,
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
        { allowSameFolder: true, rootDir: "app", prefix: "~" },
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
      ...tailwindBetter.configs["recommended"].rules,
      "better-tailwindcss/enforce-consistent-line-wrapping": [
        "error",
        { group: "newLine", preferSingleLine: false, printWidth: 100 },
      ],
      "better-tailwindcss/no-unregistered-classes": "off",
    },
    settings: {
      "better-tailwindcss": {
        entryPoint: "app/app/styles/app.css",
      },
    },
  },
  prettier,
  {
    ignores: [
      "dist",
      ".react-router",
      "node_modules",
      "build",
      ".cursor",
      ".windsurf",
      "playwright-report",
      "test-results",
      "coverage",
      "**/*.min.js",
      "**/.env*",
      "public",
    ],
  },
];
