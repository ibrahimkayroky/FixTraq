"use client";

import { Button } from "@/components/ui/Button";
import { formatDate } from "@/lib/utils";
import { Bell, Download } from "lucide-react";
import { usePathname } from "next/navigation";

const titles: Record<string, string> = {
  "/": "Dashboard",
  "/customers": "Customers",
  "/vehicles": "Vehicles",
  "/services": "Service Records",
};

export default function Topbar() {
  const pathname = usePathname();
  const title =
    titles[pathname] ||
    titles[
      Object.keys(titles).find((key) => pathname.startsWith(key)) ?? "/"
    ] ||
    "Dashboard";

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between gap-4 border-b border-slate-200 bg-white/80 px-4 py-3 backdrop-blur lg:px-8">
      <div className="space-y-0.5">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
          FixTraq Control
        </p>
        <h1 className="text-xl font-semibold text-slate-900">{title}</h1>
      </div>
      <div className="flex items-center gap-3">
        <span className="hidden text-sm font-medium text-slate-600 md:inline">
          {formatDate(new Date())}
        </span>
        <Button
          variant="outline"
          size="sm"
          className="gap-2 rounded-full px-3"
          iconLeft={<Download className="h-4 w-4" />}
        >
          Export
        </Button>
        <button className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
          <Bell className="h-4 w-4" />
        </button>
        <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 shadow-sm">
          <div className="h-8 w-8 rounded-full bg-gradient-to-br from-slate-800 to-slate-600" />
          <div>
            <p className="text-xs font-semibold text-slate-600">Admin</p>
            <p className="text-[11px] font-medium text-slate-400">
              Workshop Lead
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}

