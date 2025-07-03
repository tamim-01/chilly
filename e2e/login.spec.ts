import { test, expect } from "@playwright/test";

test.describe("Login form", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(`http://localhost:3000/en/dash`);
  });
  test("should display login form", async ({ page }) => {
    await expect(page.getByText("username")).toBeVisible();
    await expect(
      page.getByRole("textbox", { name: "Enter your username..." })
    ).toBeVisible();
    await expect(page.getByText("password")).toBeVisible();
    await expect(
      page.getByRole("textbox", { name: "Enter your password..." })
    ).toBeVisible();
    await expect(page.getByRole("button", { name: "Confirm" })).toBeVisible();
  });

  test("should show error on invalid login", async ({ page }) => {
    await page.getByRole("textbox", { name: "Enter your username..." }).click();
    await page
      .getByRole("textbox", { name: "Enter your username..." })
      .fill("wrong username");
    await page.getByRole("textbox", { name: "Enter your password..." }).click();
    await page
      .getByRole("textbox", { name: "Enter your password..." })
      .fill("wrong password");
    await page.getByRole("button", { name: "Confirm" }).click();
    await expect(
      page.getByText("user name or password incorrect×")
    ).toBeVisible();
  });
  test("should login successfully with valid data", async ({ page }) => {
    await page.getByRole("textbox", { name: "Enter your username..." }).click();
    await page
      .getByRole("textbox", { name: "Enter your username..." })
      .fill("admin");
    await page.getByRole("textbox", { name: "Enter your password..." }).click();
    await page
      .getByRole("textbox", { name: "Enter your password..." })
      .fill("T@8967");
    await page.getByRole("button", { name: "Confirm" }).click();
    await expect(page.getByRole("navigation")).toBeVisible();
  });
});
