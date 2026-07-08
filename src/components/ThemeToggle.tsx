"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";

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
      <Moon className="h-5 w-5" />
    ) : (
      <Sun className="h-5 w-5" />
    );
  }, [resolvedTheme]);

  if (!mounted) {
    return <div className="h-10 w-10" aria-hidden="true" />;
  }

  return (
    <Button
      type="button"
      aria-label={`Theme: ${label}. Switch to ${nextTheme}.`}
      title={`Theme: ${label}`}
      onClick={() => setTheme(nextTheme)}
      className="relative h-10 w-10 rounded-full text-slate-500 active:scale-95 dark:text-slate-300"
      size="icon"
      variant="ghost"
    >
      {icon}
      {currentTheme === "system" && (
        <span className="absolute bottom-1.5 right-1.5 text-[10px] font-bold leading-none text-slate-500 dark:text-slate-300">
          A
        </span>
      )}
    </Button>
  );
}
