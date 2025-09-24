import fs from "fs";
import path from "path";
import { test as baseTest, expect as baseExpect } from "@playwright/test";

const coverageDir = path.resolve(process.cwd(), "coverage", "playwright");
fs.mkdirSync(coverageDir, { recursive: true });

baseTest.afterEach(async ({ page }, testInfo) => {
  try {
  const cov = await page.evaluate(() => ((window as unknown) as Record<string, unknown>).__coverage__ || null);
    if (cov) {
      const safeTitle = testInfo.title.replace(/[<>:"/\\|?*\s]+/g, "_");
      const filename = path.join(
        coverageDir,
        `${safeTitle}-${Date.now()}.json`
      );
      fs.writeFileSync(filename, JSON.stringify(cov));
    }
  } catch {
    // ignore
  }
});

export const test = baseTest;
export const expect = baseExpect;
