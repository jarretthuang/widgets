import HomeLayout from "@/components/HomeLayout";
import type { Metadata } from "next";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import AccessTimeFilledIcon from "@mui/icons-material/AccessTimeFilled";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Widgets",
  description: "A collection of web widgets",
};

export default function Home() {
  return (
    <HomeLayout>
      <div className="flex min-h-[80svh] w-full flex-col items-center overflow-hidden">
        <div className="flex min-h-[60svh] w-full flex-1 flex-col items-center justify-center">
          <div className="relative pb-20 [&>a]:h-40 [&>a]:w-40">
            <a
              href="/finance"
              className="dark:border-1 absolute left-[-5rem] top-[-8rem] flex rotate-[-20deg] cursor-pointer select-none rounded-xl bg-lime-100/40 shadow-lg backdrop-blur duration-100 active:bg-lime-100/70 hover:bg-lime-100/70 md:left-[-12rem] dark:border-stone-500/80 dark:bg-stone-800 dark:active:bg-stone-900/80 dark:hover:bg-stone-900/80"
            >
              <div className="m-auto text-3xl">
                <MonetizationOnIcon fontSize="large" />
                <div>Finance</div>
              </div>
            </a>
            <a
              href="/"
              className="dark:border-1 absolute left-[-5rem] top-[5rem] flex rotate-[30deg] cursor-pointer select-none rounded-xl bg-lime-100/40 shadow-lg backdrop-blur duration-100 active:bg-lime-100/70 hover:bg-lime-100/70 md:left-[2rem] dark:border-stone-500/80 dark:bg-stone-800 dark:active:bg-stone-900/80 dark:hover:bg-stone-900/70"
            >
              <div className="m-auto text-3xl">
                <AccessTimeFilledIcon fontSize="large" />
                <div>Soon!</div>
              </div>
            </a>
          </div>
        </div>
        <div className="pointer-events-none relative inline-flex w-full select-none items-center justify-center py-24 text-xl md:text-2xl">
          <span className="pl-2 md:px-1">Optimized for</span>
          <Image
            src="/notion.png"
            alt="Notion"
            className="p-2 md:p-1"
            width={40}
            height={40}
          />
          <Image
            src="/branch.svg"
            alt="Notion"
            className="absolute p-6 opacity-70 md:p-0 dark:opacity-100 dark:invert"
            width={300}
            height={200}
          />
        </div>
      </div>
    </HomeLayout>
  );
}
