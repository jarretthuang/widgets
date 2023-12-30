import Image from "next/image";
import { Exo } from "next/font/google";
import Copyright from "./Copyright";

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
      className={`${pacifico.className} flex h-svh w-screen flex-col items-center justify-between bg-gradient-to-br from-emerald-100 to-cyan-100 p-6 text-slate-700 dark:from-stone-900 dark:to-black dark:text-slate-100`}
    >
      <div className="flex w-full max-w-6xl select-none flex-row content-center pb-5">
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
      <div className="w-full max-w-6xl flex-1">{children}</div>
      <div className="flex w-full max-w-6xl p-2">
        <div className="m-auto">
          <Copyright />
        </div>
      </div>
    </main>
  );
}
