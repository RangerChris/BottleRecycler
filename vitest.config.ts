import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true,
    environment: "jsdom",
    include: [
      "tests/domain/**/*.spec.ts",
      "tests/components/**/*.spec.{ts,tsx}"
    ],
    setupFiles: ["tests/setupTests.ts"],
    exclude: [
      "tests/e2e-*.spec.ts",
      "tests/e2e/*.spec.ts",
      "tests/playwright-coverage.ts",
    ],
    coverage: {
      provider: "v8",
      reportsDirectory: "coverage/vitest",
      reporter: ["html", "text"],
      include: ["src/**/*.ts", "src/**/*.tsx"],
      // Exclude Playwright e2e specs & helper, but allow domain specs to contribute to coverage
      exclude: [
        "src/domain/Bottle.ts",
      ],
    },
  },
});
