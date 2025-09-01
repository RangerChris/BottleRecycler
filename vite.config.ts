import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import istanbul from "vite-plugin-istanbul";

export default defineConfig(({ mode }) => {
  const isCoverage = mode === "coverage";

  return {
    plugins: [
      react(),
      isCoverage &&
        istanbul({
          include: ["src/**/*"],
          exclude: ["node_modules", "tests/**/*"],
          extension: [".ts", ".tsx", ".js", ".jsx"],
          requireEnv: false,
        }),
    ].filter(Boolean),
    base: "/BottleRecycler/",
  };
});
