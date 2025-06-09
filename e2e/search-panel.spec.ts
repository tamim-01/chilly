import { test, expect } from "@playwright/test";

test.describe("Search panel", () => {
  test("url should have initial params", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveURL(
      "http://localhost:3000/en?category=all&filter=all&page=1"
    );
  });
  test("search input should change the url", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveURL(
      "http://localhost:3000/en?category=all&filter=all&page=1"
    );
    await page.getByPlaceholder("search...").fill("random text");
    await expect(page).toHaveURL(
      "http://localhost:3000/en?category=all&filter=all&page=1&query=random+text"
    );
  });
  test("category and filter should change the url", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveURL(
      "http://localhost:3000/en?category=all&filter=all&page=1"
    );
    await page
      .locator("div")
      .filter({ hasText: /^CategoryALL$/ })
      .getByRole("button")
      .click();
    await page.getByText("Burger", { exact: true }).click();

    await expect(page).toHaveURL(
      "http://localhost:3000/en?category=burger&filter=all&page=1"
    );
    await page
      .locator("div")
      .filter({ hasText: /^FilterALL$/ })
      .getByRole("button")
      .click();
    await page
      .getByRole("listitem")
      .filter({ hasText: /^Spicy$/ })
      .click();

    await expect(page).toHaveURL(
      "http://localhost:3000/en?category=burger&filter=spicy&page=1"
    );
  });
});
