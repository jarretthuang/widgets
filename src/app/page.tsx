import HomeLayout from "@/components/HomeLayout";
import type { Metadata } from "next";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Widgets",
  description: "A collection of web widgets",
};

export default function Home() {
  return (
    <HomeLayout>
      <div className="flex h-[70svh] w-full overflow-hidden">
        <div className="m-auto flex flex-col">
          <a
            href="/finance"
            className="dark:border-1 flex h-40 w-40 rotate-[15deg] cursor-pointer select-none rounded-xl bg-lime-100/40 shadow-lg backdrop-blur duration-100 hover:bg-lime-100/70 md:h-80 md:w-80 dark:border-stone-500/80 dark:bg-black/40 dark:hover:bg-black/30"
          >
            <div className="m-auto text-3xl">
              <MonetizationOnIcon fontSize="large" />
              <div>Finance</div>
            </div>
          </a>
          <div className="pointer-events-none inline-flex select-none items-center justify-center pt-16 text-xl md:text-2xl">
            <span className="md:pr-1">Optimized for</span>
            <Image
              src="/notion.png"
              alt="Notion"
              className="p-2 md:p-1"
              width={40}
              height={40}
            />
          </div>
        </div>
      </div>
    </HomeLayout>
  );
}
