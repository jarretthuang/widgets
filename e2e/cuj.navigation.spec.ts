import { expect, test } from "@playwright/test";

const LIGHT_THEME_COLOR = "#f8fafc";
const DARK_THEME_COLOR = "#041c2b";

async function getThemeColor(
  page: Parameters<typeof test>[0]["page"],
  scheme: "light" | "dark",
) {
  return page
    .locator(`meta[name="theme-color"][media="(prefers-color-scheme: ${scheme})"]`)
    .getAttribute("content");
}

async function expectThemeColors(
  page: Parameters<typeof test>[0]["page"],
  expected: {
    light: string;
    dark: string;
    fallback?: string;
  },
) {
  await expect(
    page.locator('meta[name="theme-color"][media="(prefers-color-scheme: light)"]'),
  ).toHaveAttribute("content", expected.light);

  await expect(
    page.locator('meta[name="theme-color"][media="(prefers-color-scheme: dark)"]'),
  ).toHaveAttribute("content", expected.dark);

  if (expected.fallback) {
    await expect(page.locator('meta[name="theme-color"]:not([media])')).toHaveAttribute(
      "content",
      expected.fallback,
    );
  }
}

test("home navigation to finance works", async ({ page }) => {
  await page.goto("/");

  await page.locator('a[href="/finance"]').first().click();
  await expect(page).toHaveURL(/\/finance$/);
  await expect(page.getByRole("heading", { name: /stocks/i })).toBeVisible();
  await expect(page.getByRole("button", { name: "Show presets" })).toBeVisible();
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

  await expectThemeColors(page, {
    light: LIGHT_THEME_COLOR,
    dark: DARK_THEME_COLOR,
    fallback: LIGHT_THEME_COLOR,
  });
});

test("theme toggle cycles light, dark, and system", async ({ page }) => {
  await page.goto("/");

  const toggle = page.getByRole("button", { name: /theme:/i });
  await expect(toggle).toBeVisible();
  await expect(toggle).toHaveAttribute("title", "Theme: System");

  await toggle.click();
  await expect(page.locator("html")).toHaveClass(/light/);
  await expect(toggle).toHaveAttribute("title", "Theme: Light");
  await expectThemeColors(page, {
    light: LIGHT_THEME_COLOR,
    dark: LIGHT_THEME_COLOR,
  });

  await toggle.click();
  await expect(page.locator("html")).toHaveClass(/dark/);
  await expect(toggle).toHaveAttribute("title", "Theme: Dark");
  await expectThemeColors(page, {
    light: DARK_THEME_COLOR,
    dark: DARK_THEME_COLOR,
  });

  await toggle.click();
  await expect(toggle).toHaveAttribute("title", "Theme: System");

  const systemThemeColor = await getThemeColor(page, "dark");
  expect([DARK_THEME_COLOR, LIGHT_THEME_COLOR]).toContain(systemThemeColor);
  await expectThemeColors(page, {
    light: LIGHT_THEME_COLOR,
    dark: DARK_THEME_COLOR,
  });
});

test("finance widget theme follows the app theme toggle", async ({ page }) => {
  await page.goto("/finance");

  const toggle = page.getByRole("button", { name: /theme:/i });

  await toggle.click();
  await expect(toggle).toHaveAttribute("title", "Theme: Light");
  await expect(page.getByRole("switch", { name: "Light" })).toBeVisible();
  await expect(page.locator('iframe[title="Widget preview"]')).toHaveAttribute(
    "src",
    /theme=light/,
  );

  await toggle.click();
  await expect(toggle).toHaveAttribute("title", "Theme: Dark");
  await expect(page.getByRole("switch", { name: "Dark" })).toBeVisible();
  await expect(page.locator('iframe[title="Widget preview"]')).toHaveAttribute(
    "src",
    /theme=dark/,
  );
});
