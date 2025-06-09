import { test, expect } from "@playwright/test";

test.describe("Language Switcher", () => {
  test("switches from EN to FA and updates the URL", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveURL("http://localhost:3000/en");
    await expect(page.getByRole("button", { name: "english EN" })).toHaveText(
      "EN"
    );
    await page.getByRole("button", { name: "english EN" }).click();
    await page
      .getByTestId("lang-select")
      .getByRole("listitem")
      .filter({ hasText: "FA" })
      .click();
    await expect(page.getByRole("button", { name: "farsi FA" })).toHaveText(
      "FA"
    );
  });

  test("sets the locale cookie", async ({ page, context }) => {
    await page.goto("/");

    await page.getByRole("button", { name: "english EN" }).click();
    await page
      .getByTestId("lang-select")
      .getByRole("listitem")
      .filter({ hasText: "FA" })
      .click();

    const cookies = await context.cookies();
    const localeCookie = cookies.find((c) => c.name === "locale");

    expect(localeCookie?.value).toBe("fa");
  });
});
