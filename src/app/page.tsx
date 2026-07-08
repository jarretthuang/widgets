import HomeLayout from "@/components/HomeLayout";
import type { Metadata } from "next";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import AccessTimeFilledIcon from "@mui/icons-material/AccessTimeFilled";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Widgets",
  description: "A collection of web widgets",
};

export default function Home() {
  const tileClassName =
    "absolute flex cursor-pointer select-none rounded-[1.4rem] border border-white/60 bg-white/72 text-slate-800 shadow-[0_22px_60px_rgba(15,23,42,0.14)] backdrop-blur-xl transition-[transform,background-color,border-color,box-shadow] duration-150 hover:bg-white/92 hover:shadow-[0_26px_70px_rgba(15,23,42,0.2)] active:bg-white/92 dark:border-white/10 dark:bg-[linear-gradient(160deg,rgba(22,31,47,0.96),rgba(2,6,23,0.99))] dark:text-slate-100 dark:shadow-[0_28px_80px_rgba(2,6,23,0.62)] dark:ring-1 dark:ring-sky-200/8 dark:hover:bg-[linear-gradient(160deg,rgba(30,41,59,0.98),rgba(2,6,23,1))] dark:hover:ring-sky-200/15";

  return (
    <HomeLayout>
      <div className="flex min-h-[80svh] w-full flex-col items-center overflow-hidden">
        <div className="flex min-h-[60svh] w-full flex-1 flex-col items-center justify-center">
          <div className="relative pb-20 [&>a]:h-40 [&>a]:w-40">
            <Link
              href="/app/finance/stocks"
              className={`${tileClassName} left-[-5rem] top-[-8rem] rotate-[-20deg] md:left-[-12rem]`}
            >
              <div className="m-auto flex flex-col items-center gap-1 text-2xl">
                <MonetizationOnIcon
                  fontSize="large"
                  className="text-emerald-600 dark:text-sky-300"
                />
                <div>Finance</div>
              </div>
            </Link>
            <Link
              href="/app/time/countdown"
              className={`${tileClassName} left-[-5rem] top-[5rem] rotate-[30deg] md:left-[2rem]`}
            >
              <div className="m-auto flex flex-col items-center gap-1 text-2xl">
                <AccessTimeFilledIcon
                  fontSize="large"
                  className="text-amber-500 dark:text-cyan-300"
                />
                <div>Time</div>
              </div>
            </Link>
          </div>
        </div>
        <div className="pointer-events-none relative inline-flex w-full select-none items-center justify-center py-24 text-base md:text-lg">
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
            className="absolute p-6 opacity-70 dark:opacity-100 dark:invert md:p-0"
            width={300}
            height={200}
          />
        </div>
      </div>
    </HomeLayout>
  );
}
