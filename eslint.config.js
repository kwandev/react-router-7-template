import js from "@eslint/js";
import tailwindBetter from "eslint-plugin-better-tailwindcss";
import importPlugin from "eslint-plugin-import";
import noRelativeImportPaths from "eslint-plugin-no-relative-import-paths";
import prettierPlugin from "eslint-plugin-prettier";
import reactRecommended from "eslint-plugin-react/configs/recommended.js";
import reactHooks from "eslint-plugin-react-hooks";
import tseslint from "typescript-eslint";

/** @type {import('eslint').Linter.Config[]} */
export default [
  // 1. Global Ignores
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

  // 2. Base Configs
  js.configs.recommended,
  ...tseslint.configs.recommended,
  ...tseslint.configs.strict,

  // 3. Main Project Config
  {
    plugins: {
      react: reactRecommended,
      "react-hooks": reactHooks,
      import: importPlugin,
      "no-relative-import-paths": noRelativeImportPaths,
      "better-tailwindcss": tailwindBetter,
      prettier: prettierPlugin,
    },
    settings: {
      "better-tailwindcss": {
        entryPoint: "app/app/styles/app.css",
      },
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      "no-empty-pattern": "warn",

      // Prettier
      "prettier/prettier": "warn",

      // Import & Path Rules
      "import/order": [
        "warn",
        {
          alphabetize: { caseInsensitive: true, order: "asc" },
          groups: ["builtin", "external", "internal", "parent", "sibling", "index", "unknown"],
          "newlines-between": "never",
          pathGroups: [
            {
              group: "unknown",
              pattern: "*.css",
              patternOptions: { matchBase: true },
              position: "after",
            },
          ],
        },
      ],
      "no-relative-import-paths/no-relative-import-paths": [
        "warn",
        { allowSameFolder: true, rootDir: "app", prefix: "~" },
      ],

      // TypeScript Rules
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/unified-signatures": "off",
      "@typescript-eslint/consistent-type-imports": [
        "error",
        { prefer: "type-imports", disallowTypeAnnotations: true },
      ],

      // Tailwind Rules
      ...tailwindBetter.configs["recommended"].rules,
      "better-tailwindcss/enforce-consistent-line-wrapping": [
        "error",
        { group: "newLine", preferSingleLine: false, printWidth: 100 },
      ],
      "better-tailwindcss/no-unregistered-classes": "off",
    },
  },
];
