import { test, expect } from "@playwright/test";

test.describe("Add item", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(`http://localhost:3000/en/dash`);

    await page
      .getByRole("textbox", { name: "Enter your username..." })
      .fill("admin");
    await page
      .getByRole("textbox", { name: "Enter your password..." })
      .fill("T@8967");
    await page.getByRole("button", { name: "Confirm" }).click();

    await expect(page.getByRole("button", { name: "+ Add New" })).toBeVisible({
      timeout: 30000,
    });

    await page.getByRole("button", { name: "+ Add New" }).click();
    await expect(page.locator("form")).toBeVisible({ timeout: 10000 });
  });

  test("should display error for empty inputs", async ({ page }) => {
    const confirmButton = page.getByRole("button", { name: "Confirm" });
    await expect(confirmButton).toBeVisible();

    const priceInput = page.getByPlaceholder(" 6$ for example...");
    await priceInput.click();
    await priceInput.fill("12");

    await confirmButton.click();

    await expect(page.getByText("Food name Must have at least")).toBeVisible();
    await expect(page.getByText("you have to select an option")).toBeVisible();
    await expect(page.getByText("No files selected")).toBeVisible();
    await expect(page.getByText("you have to select at least")).toBeVisible();
    await expect(page.getByText("Description must be at least")).toBeVisible();
  });

  test("should add item with valid data", async ({ page }) => {
    const confirmButton = page.getByRole("button", { name: "Confirm" });
    await expect(confirmButton).toBeVisible();

    const priceInput = page.getByPlaceholder(" 6$ for example...");
    await priceInput.click();
    await priceInput.fill("12");

    const foodNameInput = page.getByRole("textbox", {
      name: "Taco with avocado...",
    });
    await foodNameInput.click();
    await foodNameInput.fill("new food");

    await page.getByRole("button", { name: "Select an option" }).click();
    await page.getByRole("listitem").filter({ hasText: "Burger" }).click();

    const fileInput = page.locator('input[type="file"]');
    await fileInput.setInputFiles([
      "/home/tamim/Southern-Mac-Salad_Featured.webp",
      "/home/tamim/side-view-double-cheeseburger-with-grilled-beef-patties-cheese-lettuce-leaf-burger-buns.jpg",
      "/home/tamim/slice-cut-from-classic-pepperoni-pizza-with-green-pepper-rolls.jpg",
    ]);

    await page.getByRole("textbox", { name: "Select an option" }).click();
    await page.getByRole("listitem").filter({ hasText: "pork" }).click();

    const descriptionInput = page.getByRole("textbox", {
      name: "Write a brief description",
    });
    await descriptionInput.fill("random text for description");

    await confirmButton.click();

    await expect(page.getByText("Item added successfully×")).toBeVisible({
      timeout: 30000,
    });
  });
});
