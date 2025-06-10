import { test, expect } from "@playwright/test";

test.describe("Search panel", () => {
  test("url should have initial params", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveURL(
      "http://localhost:3000/en?category=all&filter=all&page=1"
    );
  });
  test("search input should change the url and menu fetch data based on them", async ({
    page,
  }) => {
    await page.goto("/");
    await expect(page).toHaveURL(
      "http://localhost:3000/en?category=all&filter=all&page=1"
    );
    await page.getByPlaceholder("search...").fill("pepperoni");
    await expect(page).toHaveURL(
      "http://localhost:3000/en?category=all&filter=all&page=1&query=pepperoni"
    );
    await expect(
      page.getByRole("heading", { name: "Pepperoni" })
    ).toBeVisible();
  });
  test("category and filter should change the url and menu fetch data based on them", async ({
    page,
  }) => {
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
    await expect(
      page.getByRole("heading", { name: "Cheese Burger" })
    ).toBeVisible();
    await page.getByRole("button", { name: "Burger" }).click();
    await page.getByRole("listitem").filter({ hasText: /^All$/ }).click();

    await expect(page).toHaveURL(
      "http://localhost:3000/en?category=all&filter=all&page=1"
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
      "http://localhost:3000/en?category=all&filter=spicy&page=1"
    );
    await expect(page.getByText("Spicy").nth(1)).toBeVisible();
  });
});
