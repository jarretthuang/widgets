import { expect, test } from "@playwright/test";

async function getThemeColor(
  page: Parameters<typeof test>[0]["page"],
  scheme: "light" | "dark",
) {
  return page
    .locator(`meta[name="theme-color"][media="(prefers-color-scheme: ${scheme})"]`)
    .getAttribute("content");
}

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

test("theme color matches the page background in light and dark mode", async ({
  page,
}) => {
  await page.goto("/");

  await expect(
    page.locator(
      'meta[name="theme-color"][media="(prefers-color-scheme: light)"]',
    ),
  ).toHaveAttribute("content", "#d0faec");

  await expect(
    page.locator(
      'meta[name="theme-color"][media="(prefers-color-scheme: dark)"]',
    ),
  ).toHaveAttribute("content", "#041c2b");
});

test("theme toggle cycles light, dark, and system", async ({ page }) => {
  await page.goto("/");

  const toggle = page.getByRole("button", { name: /theme:/i });
  await expect(toggle).toBeVisible();
  await expect(toggle).toHaveAttribute("title", "Theme: System");

  await toggle.click();
  await expect(page.locator("html")).toHaveClass(/light/);
  await expect(toggle).toHaveAttribute("title", "Theme: Light");
  await expect(await getThemeColor(page, "light")).toBe("#d0faec");

  await toggle.click();
  await expect(page.locator("html")).toHaveClass(/dark/);
  await expect(toggle).toHaveAttribute("title", "Theme: Dark");
  await expect(await getThemeColor(page, "dark")).toBe("#041c2b");

  await toggle.click();
  await expect(toggle).toHaveAttribute("title", "Theme: System");

  const systemThemeColor = await getThemeColor(page, "dark");
  expect(["#041c2b", "#d0faec"]).toContain(systemThemeColor);
});
