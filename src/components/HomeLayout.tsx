import Image from "next/image";
import { Inter } from "next/font/google";
import Copyright from "./Copyright";
import "./HomeLayout.css";
import React from "react";

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
    <main
      className={`${font.className} relative flex h-fit min-h-svh flex-col items-center justify-between bg-[#d0faec] p-4 text-slate-700 md:p-6 dark:bg-stone-950 dark:text-slate-100`}
    >
      <div
        className={`simple-gradient absolute left-0 top-0 z-0 h-full w-full dark:opacity-50 `}
      ></div>
      <div className="z-10 flex w-full max-w-6xl select-none flex-row content-center py-10 md:py-5">
        <Image
          src="/favicon.ico"
          alt="Logo"
          className="p-1 dark:invert"
          width={40}
          height={40}
        />
        <div className="inline whitespace-nowrap px-2 text-3xl font-semibold">
          <a href="/" className="font-bold hover:opacity-80">
            widgets
          </a>
          <span>{title && ` / ${title}`}</span>
        </div>
      </div>
      <div className="z-10 h-fit min-h-[70svh] w-full max-w-6xl">
        {children}
      </div>
      <div className="z-10 flex w-full max-w-6xl pb-12 pt-24">
        <div className="m-auto">
          <Copyright />
        </div>
      </div>
    </main>
  );
}
