import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "JH Copyright",
  description:
    "A widget that marks the current page as copyrighted by Jarrett Huang",
};

export default function Copyright() {
  const currentYear = new Date().getFullYear();
  return (
    <a
      href="https://jhuang.ca"
      target="_blank"
      className="Copyright group m-auto flex w-fit cursor-pointer flex-row items-center rounded-3xl bg-black/10 px-8 py-3 font-medium shadow-md backdrop-blur dark:bg-white/20"
    >
      <span className="select-none whitespace-nowrap text-lg text-black opacity-70 duration-100 group-hover:opacity-90 dark:text-white">
        <span className="hidden md:inline">Copyright</span> © {currentYear}{" "}
        Jarrett Huang
      </span>
    </a>
  );
}
