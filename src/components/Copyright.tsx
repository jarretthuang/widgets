import GitHubIcon from "@mui/icons-material/GitHub";

export default function Copyright() {
  const currentYear = new Date().getFullYear();
  return (
    <div className="Copyright flex w-fit cursor-pointer flex-row items-center rounded-3xl bg-lime-50 px-8 py-3 font-medium shadow-md backdrop-blur dark:bg-teal-900/80">
      <span className="flex select-none whitespace-nowrap text-xl text-gray-700 duration-100 md:text-lg dark:text-gray-200">
        <span className="hidden md:inline">Copyright</span>
        <span className="px-2"> © {currentYear} </span>
        <a
          className="hover:opacity-80"
          href="https://labs.jhuang.ca"
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
