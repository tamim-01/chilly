import { test, expect } from "@playwright/test";
import path from "path";

test.describe("Add item", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:3000/en/dash");

    const username = page.getByRole("textbox", { name: "Enter your username..." });
    const password = page.getByRole("textbox", { name: "Enter your password..." });
    const loginButton = page.getByRole("button", { name: "Confirm" });

    await expect(username).toBeVisible({ timeout: 10000 });
    await username.fill("admin");

    await expect(password).toBeVisible({ timeout: 10000 });
    await password.fill("T@8967");

    await expect(loginButton).toBeVisible({ timeout: 10000 });
    await loginButton.click();

    const addNewButton = page.getByRole("button", { name: "+ Add New" });
    await expect(addNewButton).toBeVisible({ timeout: 30000 });
    await addNewButton.click();

    await expect(page.locator("form")).toBeVisible({ timeout: 10000 });
  });

  test("should display error for empty inputs", async ({ page }) => {
    const confirmButton = page.getByRole("button", { name: "Confirm" });
    await expect(confirmButton).toBeVisible({ timeout: 10000 });

    const priceInput = page.getByPlaceholder(" 6$ for example...");
    await expect(priceInput).toBeVisible({ timeout: 10000 });
    await priceInput.fill("12");

    await confirmButton.click();

    await expect(page.getByText(/Food name Must have at least/i)).toBeVisible({ timeout: 10000 });
    await expect(page.getByText(/you have to select an option/i)).toBeVisible({ timeout: 10000 });
    await expect(page.getByText(/No files selected/i)).toBeVisible({ timeout: 10000 });
    await expect(page.getByText(/you have to select at least/i)).toBeVisible({ timeout: 10000 });
    await expect(page.getByText(/Description must be at least/i)).toBeVisible({ timeout: 10000 });
  });

  test("should add item with valid data", async ({ page }) => {
    const confirmButton = page.getByRole("button", { name: "Confirm" });
    await expect(confirmButton).toBeVisible({ timeout: 10000 });

    const priceInput = page.getByPlaceholder(" 6$ for example...");
    await expect(priceInput).toBeVisible({ timeout: 10000 });
    await priceInput.fill("12");

    const foodNameInput = page.getByRole("textbox", {
      name: "Taco with avocado...",
    });
    await expect(foodNameInput).toBeVisible({ timeout: 10000 });
    await foodNameInput.fill("new food");

    const categoryButton = page.getByRole("button", { name: "Select an option" }).first();
    await expect(categoryButton).toBeVisible({ timeout: 10000 });
    await categoryButton.click();

    const dropdownItem = page.getByRole("listitem").filter({ hasText: "Burger" });
await expect(dropdownItem).toBeVisible();
await dropdownItem.click();

    const fileInput = page.locator('input[type="file"]');
   

    const burgerImg = path.resolve(__dirname, "../public/image/burger.png");
    const enImg = path.resolve(__dirname, "../public/image/en.png");

    await fileInput.setInputFiles([burgerImg, enImg]);

    const typeSelector = page.getByRole("textbox", { name: "Select an option" });
    await expect(typeSelector).toBeVisible({ timeout: 10000 });
    await typeSelector.click();

    const typeItem = page.getByRole("listitem").filter({ hasText: "pork" });
await expect(typeItem).toBeVisible();
await typeItem.click();

    // Fill description
    const descriptionInput = page.getByRole("textbox", {
      name: "Write a brief description",
    });
    await expect(descriptionInput).toBeVisible({ timeout: 10000 });
    await descriptionInput.fill("random text for description");

    await expect(confirmButton).toBeEnabled();
    await confirmButton.click();

    await expect(
      page.getByText("Item added successfully×", { exact: false })
    ).toBeVisible({ timeout: 30000 });
  });
});
