import { test, expect } from "@playwright/test";

const baseUrl = "http://localhost:5173/";
test("has title", async ({ page }) => {
  await page.goto(baseUrl);

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Bottle Recycler/);
});
