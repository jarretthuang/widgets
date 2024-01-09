import Image from "next/image";
import { Exo } from "next/font/google";
import Copyright from "./Copyright";
import "./HomeLayout.css";

const pacifico = Exo({ subsets: ["latin"] });

export default function HomeLayout({
  children,
  title = "",
}: {
  children: React.ReactNode;
  title?: string;
}) {
  return (
    <main
      className={`${pacifico.className} relative flex h-fit min-h-svh w-screen flex-col  items-center justify-between  p-6 text-slate-700  dark:text-slate-100`}
    >
      <div
        className={`simple-gradient dark:diverse-gradient absolute bottom-0 left-0 right-0 top-0 z-0 h-full w-full dark:m-auto dark:w-1/2 md:dark:w-1/4`}
      ></div>
      <div className="z-10 flex w-full max-w-6xl select-none flex-row content-center pb-5">
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
      <div className="z-10 flex w-full max-w-6xl p-5">
        <div className="m-auto">
          <Copyright />
        </div>
      </div>
    </main>
  );
}
