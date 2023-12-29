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
    <main className="flex h-svh w-screen flex-col justify-between bg-gradient-to-br from-emerald-100 to-cyan-100 p-6 text-slate-700 dark:from-slate-950 dark:to-stone-800 dark:text-slate-100">
      <div className="flex select-none flex-row content-center pb-5">
        <Image
          src="/favicon.ico"
          alt="Logo"
          className="p-1 dark:invert"
          width={40}
          height={40}
        />
        <div className={`px-2 text-3xl font-semibold ${pacifico.className}`}>
          widgets{title && ` / ${title}`}
        </div>
      </div>
      <div className="w-full">{children}</div>
      <div className="flex w-full p-2">
        <div className="m-auto">
          <Copyright />
        </div>
      </div>
    </main>
  );
}
