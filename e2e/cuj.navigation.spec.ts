import { expect, test, type Page } from "@playwright/test";

const LIGHT_THEME_COLOR = "#f8fafc";
const DARK_THEME_COLOR = "#020617";

async function getThemeColor(
  page: Page,
  scheme: "light" | "dark"
) {
  return page
    .locator(
      `meta[name="theme-color"][media="(prefers-color-scheme: ${scheme})"]`
    )
    .getAttribute("content");
}

async function expectThemeColors(
  page: Page,
  expected: {
    light: string;
    dark: string;
    fallback?: string;
  }
) {
  await expect(
    page.locator(
      'meta[name="theme-color"][media="(prefers-color-scheme: light)"]'
    )
  ).toHaveAttribute("content", expected.light);

  await expect(
    page.locator(
      'meta[name="theme-color"][media="(prefers-color-scheme: dark)"]'
    )
  ).toHaveAttribute("content", expected.dark);

  if (expected.fallback) {
    await expect(
      page.locator('meta[name="theme-color"]:not([media])')
    ).toHaveAttribute("content", expected.fallback);
  }
}

test("home navigation to finance works", async ({ page }) => {
  await page.goto("/");

  await page.locator('a[href="/app/finance/stocks"]').first().click();
  await expect(page).toHaveURL(/\/app\/finance\/stocks$/);
  await expect(page.getByRole("heading", { name: /stocks/i })).toBeVisible();
  await expect(
    page.getByRole("button", { name: "Show presets" })
  ).toBeVisible();
});

test("time route CUJ loads and card link is present on home", async ({
  page,
}) => {
  await page.goto("/");

  const timeLink = page.locator('a[href="/app/time/countdown"]').first();
  await expect(timeLink).toBeVisible();
  await expect(timeLink).toHaveAttribute("href", "/app/time/countdown");

  await page.goto("/app/time/countdown");
  await expect(page).toHaveURL(/\/app\/time\/countdown$/);
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
  await page.goto("/app/finance/stocks");

  const toggle = page.getByRole("button", { name: /theme:/i });

  await toggle.click();
  await expect(toggle).toHaveAttribute("title", "Theme: Light");
  await expect(page.getByRole("switch", { name: "Light" })).toBeVisible();
  await expect(page.locator('iframe[title="Widget preview"]')).toHaveAttribute(
    "src",
    /theme=light/
  );

  await toggle.click();
  await expect(toggle).toHaveAttribute("title", "Theme: Dark");
  await expect(page.getByRole("switch", { name: "Dark" })).toBeVisible();
  await expect(page.locator('iframe[title="Widget preview"]')).toHaveAttribute(
    "src",
    /theme=dark/
  );
});

test("finance pages use app routes and survive refresh", async ({
  page,
}) => {
  await page.goto("/app/finance/stocks");

  await page.getByRole("link", { name: "Rates" }).click();
  await expect(page).toHaveURL(/\/app\/finance\/rates$/);
  await expect(
    page.getByRole("heading", { name: /^rates$/i })
  ).toBeVisible();

  await page.reload();
  await expect(page).toHaveURL(/\/app\/finance\/rates$/);
  await expect(
    page.getByRole("heading", { name: /^rates$/i })
  ).toBeVisible();
  await expect(
    page.getByRole("link", { name: "Rates" })
  ).toHaveAttribute("aria-current", "page");

  await page.getByRole("link", { name: "Stocks" }).click();
  await expect(page).toHaveURL(/\/app\/finance\/stocks$/);
  await expect(page.getByRole("heading", { name: /^stocks$/i })).toBeVisible();

  await page.reload();
  await expect(page).toHaveURL(/\/app\/finance\/stocks$/);
  await expect(page.getByRole("heading", { name: /^stocks$/i })).toBeVisible();
  await expect(page.getByRole("link", { name: "Stocks" })).toHaveAttribute(
    "aria-current",
    "page"
  );
});

test("legacy category routes redirect to app pages", async ({ page }) => {
  await page.goto("/finance?tab=rates");
  await expect(page).toHaveURL(/\/app\/finance\/rates$/);
  await expect(page.getByRole("heading", { name: /^rates$/i })).toBeVisible();

  await page.goto("/finance?widget=rates");
  await expect(page).toHaveURL(/\/app\/finance\/rates$/);
  await expect(page.getByRole("heading", { name: /^rates$/i })).toBeVisible();

  await page.goto("/app/finance");
  await expect(page).toHaveURL(/\/app\/finance\/stocks$/);
  await expect(page.getByRole("heading", { name: /^stocks$/i })).toBeVisible();

  await page.goto("/app/time");
  await expect(page).toHaveURL(/\/app\/time\/countdown$/);
  await expect(page.getByRole("heading", { name: /countdown/i })).toBeVisible();
});

test("rates range changes the embedded widget URL", async ({
  page,
}) => {
  await page.goto("/app/finance/rates");

  const widgetPreview = page.locator('iframe[title="Widget preview"]');
  await expect(widgetPreview).toHaveAttribute("src", /months=60/);
  await expect(widgetPreview).not.toHaveAttribute("src", /frequency=/);

  await page.getByRole("button", { name: "1Y" }).click();
  await expect(widgetPreview).toHaveAttribute("src", /months=12/);

  await page.getByRole("button", { name: "5Y" }).click();
  await expect(widgetPreview).toHaveAttribute("src", /months=60/);

  await page.getByLabel("Country").selectOption("CA");
  await expect(widgetPreview).toHaveAttribute("src", /IR3TIB01CAM156N/);
  await expect(page.getByLabel("Rate")).toHaveValue("IR3TIB01CAM156N");

  await page.getByLabel("Country").selectOption("CN");
  await expect(widgetPreview).toHaveAttribute("src", /IR3TIB01CNM156N/);
  await expect(page.getByLabel("Rate")).toHaveValue("IR3TIB01CNM156N");
});
