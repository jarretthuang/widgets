"use client";

import { useEffect } from "react";

export default function RateWidgetTheme({
  theme,
}: {
  theme: "dark" | "light";
}) {
  useEffect(() => {
    const root = document.documentElement;
    const previousDark = root.classList.contains("dark");
    const previousLight = root.classList.contains("light");
    const previousColorScheme = root.style.colorScheme;

    root.classList.toggle("dark", theme === "dark");
    root.classList.toggle("light", theme === "light");
    root.style.colorScheme = theme;

    return () => {
      root.classList.toggle("dark", previousDark);
      root.classList.toggle("light", previousLight);
      root.style.colorScheme = previousColorScheme;
    };
  }, [theme]);

  return null;
}
