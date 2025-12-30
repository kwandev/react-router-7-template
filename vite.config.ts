import path from "path";
import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
// import { reactRouterDevTools } from "react-router-devtools";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig(({ mode }) => {
  const isTest = mode === "test" || !!process.env.VITEST;

  return {
    plugins: [
      // reactRouterDevTools(),
      tailwindcss(),
      ...(isTest ? [react()] : [reactRouter()]),
      tsconfigPaths(),
    ],
    resolve: {
      alias: {
        "~": path.resolve(__dirname, "./app"),
      },
    },
    test: {
      environment: "jsdom",
      setupFiles: ["./app/test/setup-tests.ts"],
      include: ["app/**/*.{test,spec}.{ts,tsx}", "app/**/__tests__/**/*.{ts,tsx}"],
      exclude: ["node_modules/**/*"],
      coverage: {
        provider: "v8",
        exclude: [
          "build/**",
          "dist/**",
          "node_modules/**",
          ".react-router/**",
          "public/**",
          "e2e/**",
          "playwright-report/**",
          "test-results/**",
          "**/*.config.{ts,js}",
          "**/*.d.ts",
          ".better-commits.json",
        ],
      },
      css: true,
    },
  };
});
