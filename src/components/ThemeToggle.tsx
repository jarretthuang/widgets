"use client";

import { Monitor, Moon, Sun } from "lucide-react";
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
    if (currentTheme === "system") {
      return <Monitor className="h-4 w-4" />;
    }

    return resolvedTheme === "dark" ? (
      <Moon className="h-4 w-4" />
    ) : (
      <Sun className="h-4 w-4" />
    );
  }, [currentTheme, resolvedTheme]);


  if (!mounted) {
    return <div className="h-9 w-9" aria-hidden="true" />;
  }

  return (
    <button
      type="button"
      aria-label={`Theme: ${label}. Switch to ${nextTheme}.`}
      title={`Theme: ${label}`}
      onClick={() => setTheme(nextTheme)}
      className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/50 bg-white/40 text-slate-700 shadow-lg backdrop-blur transition-all duration-150 hover:-translate-y-0.5 hover:bg-white/60 hover:shadow-xl active:translate-y-0 active:scale-95 dark:border-stone-500/70 dark:bg-stone-900/50 dark:text-slate-100 dark:hover:bg-stone-800/70"
    >
      <span className="transition-transform duration-150 hover:rotate-6">{icon}</span>
    </button>
  );
}
