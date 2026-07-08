import Link from "next/link";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

type FinanceAppPage = "stocks" | "rates";

const financePages: { href: string; id: FinanceAppPage; label: string }[] = [
  { href: "/app/finance/stocks", id: "stocks", label: "Stocks" },
  {
    href: "/app/finance/rates",
    id: "rates",
    label: "Rates",
  },
];

export default function FinanceAppNav({
  activePage,
}: {
  activePage: FinanceAppPage;
}) {
  return (
    <Tabs aria-label="Finance pages" className="pb-3 pt-4" value={activePage}>
      <TabsList>
        {financePages.map((page) => (
          <TabsTrigger asChild key={page.id} value={page.id}>
            <Link
              aria-current={activePage === page.id ? "page" : undefined}
              href={page.href}
            >
              {page.label}
            </Link>
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
}
