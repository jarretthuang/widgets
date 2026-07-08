import Image from "next/image";
import Link from "next/link";
import { Fragment } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import ThemeToggle from "./ThemeToggle";

function formatBreadcrumbLabel(segment: string) {
  return segment
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export default function NavBar({ title = "" }: { title?: string }) {
  const titleSegments = title.split("/").map((segment) => segment.trim());
  const breadcrumbs = titleSegments.filter(Boolean);

  return (
    <header className="z-10 flex w-full select-none">
      <div className="flex w-full flex-row items-center justify-center border-b border-slate-200 bg-white/70 px-4 py-3 text-slate-800 dark:border-slate-800 dark:bg-slate-950/80 dark:text-slate-100 md:px-6">
        <div className="flex w-full max-w-6xl flex-row items-center justify-between">
          <div className="flex min-w-0 flex-row items-center">
            <Image
              src="/logo.svg"
              alt="Logo"
              className="px-2 py-1"
              width={36}
              height={36}
              priority
            />
            <Breadcrumb className="min-w-0 px-2">
              <BreadcrumbList className="gap-1.5 whitespace-nowrap text-sm font-medium md:text-base">
                <BreadcrumbItem>
                  {breadcrumbs.length > 0 ? (
                    <BreadcrumbLink asChild>
                      <Link href="/" className="font-semibold">
                        Widgets
                      </Link>
                    </BreadcrumbLink>
                  ) : (
                    <BreadcrumbPage className="font-semibold">
                      Widgets
                    </BreadcrumbPage>
                  )}
                </BreadcrumbItem>
                {breadcrumbs.map((breadcrumb, index) => {
                  const isCurrentPage = index === breadcrumbs.length - 1;
                  const href = `/app/${breadcrumbs.slice(0, index + 1).join("/")}`;

                  return (
                    <Fragment key={href}>
                      <BreadcrumbSeparator />
                      <BreadcrumbItem>
                        {isCurrentPage ? (
                          <BreadcrumbPage className="font-semibold">
                            {formatBreadcrumbLabel(breadcrumb)}
                          </BreadcrumbPage>
                        ) : (
                          <BreadcrumbLink asChild>
                            <Link href={href}>
                              {formatBreadcrumbLabel(breadcrumb)}
                            </Link>
                          </BreadcrumbLink>
                        )}
                      </BreadcrumbItem>
                    </Fragment>
                  );
                })}
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
