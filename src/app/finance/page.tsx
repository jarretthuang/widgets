import HomeLayout from "@/components/HomeLayout";
import type { Metadata } from "next";
import LinkIcon from "@mui/icons-material/Link";
export const metadata: Metadata = {
  title: "Widgets | Finance",
  description: "A collection of web widgets for finance",
};

export default function Finance() {
  return (
    <HomeLayout title="finance">
      <div className="flex h-full w-full flex-col">
        <div className="py-4 text-2xl">
          <span className="pr-2">Stocks</span>
          <a
            className="cursor-pointer hover:opacity-80"
            href="/finance/stocks?symbol=AMEX:VOO"
            target="_blank"
          >
            <LinkIcon fontSize="large" />
          </a>
        </div>
        <div className="flex-1 py-2">
          <iframe
            className="h-[450px] w-full rounded-lg bg-white p-4"
            src="/finance/stocks?symbol=AMEX:VOO"
          ></iframe>
        </div>
      </div>
    </HomeLayout>
  );
}
