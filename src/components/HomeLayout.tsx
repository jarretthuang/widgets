import { Inter } from "next/font/google";
import Copyright from "./Copyright";
import React from "react";
import NavBar from "./NavBar";

const font = Inter({
  subsets: ["latin"],
  weight: [
    "300",
    "400",
    "500",
    "600",
    "700",
    "800",
  ],
});

export default function HomeLayout({
  children,
  title = "",
}: {
  children: React.ReactNode;
  title?: string;
}) {
  return (
    <div
      className={`${font.className} relative flex h-fit min-h-svh flex-col items-center justify-between bg-[var(--page-background)] text-slate-700 dark:text-slate-100`}
    >
      <NavBar title={title} />
      <main className="z-10 h-fit min-h-[70svh] w-full max-w-6xl px-4 md:px-6">
        {children}
      </main>
      <div className="z-10 flex w-full max-w-6xl px-4 pb-12 pt-24 md:px-6">
        <div className="m-auto">
          <Copyright />
        </div>
      </div>
    </div>
  );
}
