import Link from "next/link";

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
    <nav
      aria-label="Finance pages"
      className="flex flex-wrap gap-2 pt-4"
    >
      {financePages.map((page) => (
        <Link
          aria-current={activePage === page.id ? "page" : undefined}
          className="rounded-lg border border-stone-300 bg-white/70 px-3 py-2 text-sm font-semibold text-stone-700 transition active:bg-stone-100 aria-[current=page]:border-stone-500 aria-[current=page]:bg-stone-200 hover:bg-stone-100 dark:border-stone-700 dark:bg-stone-900/80 dark:text-stone-100 dark:active:bg-stone-800 dark:aria-[current=page]:border-stone-500 dark:aria-[current=page]:bg-stone-700 dark:hover:bg-stone-800"
          href={page.href}
          key={page.id}
        >
          {page.label}
        </Link>
      ))}
    </nav>
  );
}
