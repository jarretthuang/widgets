import GitHubIcon from "@mui/icons-material/GitHub";

export default function Copyright() {
  const currentYear = new Date().getFullYear();
  return (
    <div className="Copyright flex w-fit cursor-pointer flex-row items-center rounded-full bg-white/60 px-5 py-2.5 font-medium shadow-md backdrop-blur dark:bg-teal-900/60">
      <span className="flex select-none whitespace-nowrap text-sm uppercase text-gray-600 duration-100 dark:text-gray-200 md:text-base">
        <span className="px-2"> © {currentYear} </span>
        <a
          className="hover:opacity-80"
          href="https://jhuang.ca"
          target="_blank"
        >
          <span className="hidden md:inline">Jarrett Huang</span>
          <span className="inline md:hidden">JH</span>
        </a>
        <a
          className="flex items-center px-2 hover:opacity-80"
          href="https://github.com/jarretthuang/widgets"
          target="_blank"
        >
          <GitHubIcon fontSize="medium" />
        </a>
      </span>
    </div>
  );
}
