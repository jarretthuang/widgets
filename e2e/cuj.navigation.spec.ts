import { expect, test } from "@playwright/test";

test("home navigation to finance works", async ({ page }) => {
  await page.goto("/");

  await page.locator('a[href="/finance"]').first().click();
  await expect(page).toHaveURL(/\/finance$/);
  await expect(page.getByRole("heading", { name: /stocks/i })).toBeVisible();
});

test("time route CUJ loads and card link is present on home", async ({ page }) => {
  await page.goto("/");

  const timeLink = page.locator('a[href="/time"]').first();
  await expect(timeLink).toBeVisible();
  await expect(timeLink).toHaveAttribute("href", "/time");

  await page.goto("/time");
  await expect(page).toHaveURL(/\/time$/);
  await expect(page.getByRole("heading", { name: /countdown/i })).toBeVisible();
});

test.describe("theme color metadata", () => {
  test("light mode theme color matches the page background", async ({ page }) => {
    await page.emulateMedia({ colorScheme: "light" });
    await page.goto("/");

    await expect(
      page.locator(
        'meta[name="theme-color"][media="(prefers-color-scheme: light)"]'
      )
    ).toHaveAttribute("content", "#d0faec");

    await expect
      .poll(async () =>
        page.evaluate(() => getComputedStyle(document.body).backgroundColor)
      )
      .toBe("rgb(208, 250, 236)");
  });

  test("dark mode theme color matches the page background", async ({ page }) => {
    await page.emulateMedia({ colorScheme: "dark" });
    await page.goto("/");

    await expect(
      page.locator(
        'meta[name="theme-color"][media="(prefers-color-scheme: dark)"]'
      )
    ).toHaveAttribute("content", "#0c0a09");

    await expect
      .poll(async () =>
        page.evaluate(() => getComputedStyle(document.body).backgroundColor)
      )
      .toBe("rgb(12, 10, 9)");
  });
});
