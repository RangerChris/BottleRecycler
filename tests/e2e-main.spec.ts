import { test, expect } from "@playwright/test";

test("Go to main page", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveTitle(/Bottle Recycler/);
});

test("Add a recycler and start it", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveTitle(/Bottle Recycler/);
  await page.getByRole("button", { name: "Buy recycler" }).click();
  await expect(page.locator("#root")).toContainText("Recycler 1");
  await expect(page.getByRole("list")).toContainText("Stopped");
  await page.getByLabel("Starts or stops the recycler").click();
  await expect(page.getByRole("list")).toContainText("Running");
});
