import HomeLayout from "@/components/HomeLayout";
import type { Metadata } from "next";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";

export const metadata: Metadata = {
  title: "Widgets",
  description: "A collection of web widgets",
};

export default function Home() {
  return (
    <HomeLayout>
      <div className="flex h-full w-full p-4">
        <a
          href="/finance"
          className="dark:border-1 m-auto flex h-80 w-80 rotate-[15deg] cursor-pointer select-none rounded-xl bg-lime-100/40 shadow-lg duration-100 hover:bg-lime-100/70 dark:border-stone-500/50 dark:bg-stone-800/60 dark:hover:bg-stone-800/90"
        >
          <div className="m-auto text-3xl">
            <MonetizationOnIcon fontSize="large" />
            <div>Finance</div>
          </div>
        </a>
      </div>
    </HomeLayout>
  );
}
