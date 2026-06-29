import Image from "next/image";
import Link from "next/link";
import ThemeToggle from "./ThemeToggle";

export default function NavBar({ title = "" }: { title?: string }) {
  return (
    <header className="z-10 flex w-full select-none">
      <nav
        aria-label="Primary"
        className="flex w-full flex-row items-center justify-center border-b border-slate-200 bg-white/70 px-4 py-5 text-slate-800 md:px-6 dark:border-slate-800 dark:bg-slate-950/80 dark:text-slate-100"
      >
        <div className="flex w-full max-w-6xl flex-row items-center justify-between">
          <div className="flex min-w-0 flex-row items-center">
            <Image
              src="/logo.svg"
              alt="Logo"
              className="px-2 py-1"
              width={40}
              height={40}
              priority
            />
            <div className="inline whitespace-nowrap px-2 text-2xl font-semibold md:text-[1.625rem]">
              <Link href="/" className="font-bold hover:opacity-80">
                Widgets
              </Link>
              <span>{title && ` / ${title}`}</span>
            </div>
          </div>
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}
