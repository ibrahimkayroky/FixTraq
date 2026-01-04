"use client";

import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import {
  CarFront,
  LayoutDashboard,
  Settings,
  Users,
  Wrench,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/", label: "Dashboard", icon: LayoutDashboard },
  { href: "/customers", label: "Customers", icon: Users },
  { href: "/vehicles", label: "Vehicles", icon: CarFront },
  { href: "/services", label: "Service Records", icon: Wrench },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden w-[260px] shrink-0 border-r border-slate-200 bg-white/95 px-5 py-6 shadow-[0_10px_40px_rgba(15,23,42,0.06)] lg:flex lg:flex-col">
      <div className="mb-8 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-900 text-white shadow-md">
            <Wrench className="h-5 w-5" />
          </div>
          <div>
            <p className="text-lg font-semibold text-slate-900">FixTraq</p>
            <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
              Garage OS
            </p>
          </div>
        </Link>
        <button className="rounded-full border border-slate-200/80 px-2 py-1 text-xs font-semibold text-slate-500">
          v1.0
        </button>
      </div>

      <nav className="space-y-1">
        {navItems.map((item) => {
          const active =
            pathname === item.href ||
            (item.href !== "/" && pathname.startsWith(item.href));
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-600 transition",
                active
                  ? "bg-slate-900 text-white shadow-md shadow-slate-900/15"
                  : "hover:bg-slate-100",
              )}
            >
              <span
                className={cn(
                  "flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200/60 bg-white text-slate-700 transition group-hover:border-slate-200",
                  active && "border-transparent bg-slate-900/10 text-white",
                )}
              >
                <Icon className="h-5 w-5" />
              </span>
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto space-y-4">
        <Link href="/services" className="block">
          <Button
            className="w-full justify-center"
            size="lg"
            iconLeft={<Wrench className="h-5 w-5" />}
          >
            New Service
          </Button>
        </Link>
        <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50/70 p-3 text-xs text-slate-600">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-900/10 text-slate-900">
            <Settings className="h-5 w-5" />
          </div>
          <div>
            <p className="font-semibold text-slate-800">Backend-ready</p>
            <p>Plug into your Spring Boot API anytime.</p>
          </div>
        </div>
      </div>
    </aside>
  );
}

