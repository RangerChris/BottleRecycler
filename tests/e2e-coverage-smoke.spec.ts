import { test, expect } from "./playwright-coverage";

test("Simple UI interaction triggers coverage", async ({ page }) => {
  await page.goto("/");
  // Interact with the UI to trigger code in src/components
  await expect(page).toHaveTitle(/Bottle Recycler/);
  await page.getByRole("button", { name: "Start game" }).click();
  await page.getByRole("button", { name: "Buy recycler" }).click();
  await expect(page.locator("#root")).toContainText("Recycler 1");
});
