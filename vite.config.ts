import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import istanbul from "vite-plugin-istanbul";

export default defineConfig(({ mode }) => {
  const isCoverage = mode === "coverage";

  return {
    plugins: [
      react(),
      isCoverage &&
        (() => {
          console.log("Istanbul plugin active: coverage mode");
          return istanbul({
            include: ["src/**/*"],
          });
        })(),
    ].filter(Boolean),
    base: "/BottleRecycler/",
  };
});
