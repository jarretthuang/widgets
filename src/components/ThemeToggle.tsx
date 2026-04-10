"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useMemo, useState } from "react";

export default function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const currentTheme = theme ?? "system";
  const nextTheme =
    currentTheme === "light"
      ? "dark"
      : currentTheme === "dark"
        ? "system"
        : "light";

  const label =
    currentTheme === "light"
      ? "Light"
      : currentTheme === "dark"
        ? "Dark"
        : "System";

  const icon = useMemo(() => {
    return resolvedTheme === "dark" ? (
      <Moon className="h-4 w-4" />
    ) : (
      <Sun className="h-4 w-4" />
    );
  }, [resolvedTheme]);

  if (!mounted) {
    return <div className="h-9 w-9" aria-hidden="true" />;
  }

  return (
    <button
      type="button"
      aria-label={`Theme: ${label}. Switch to ${nextTheme}.`}
      title={`Theme: ${label}`}
      onClick={() => setTheme(nextTheme)}
      className="relative flex h-11 w-11 items-center justify-center rounded-full border border-transparent bg-transparent text-slate-500 transition-colors duration-150 hover:bg-slate-200/60 hover:text-slate-700 active:scale-95 dark:text-slate-300 dark:hover:bg-white/5 dark:hover:text-slate-100"
    >
      {icon}
      {currentTheme === "system" && (
        <span className="absolute bottom-1.5 right-1.5 text-[10px] font-bold leading-none text-slate-500 dark:text-slate-300">
          A
        </span>
      )}
    </button>
  );
}
