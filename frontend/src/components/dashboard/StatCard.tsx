import { formatCurrency } from "@/lib/utils";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

type StatCardProps = {
  label: string;
  value: number;
  icon: LucideIcon;
  trend?: number;
  prefix?: string;
  emphasis?: boolean;
};

export function StatCard({
  label,
  value,
  icon: Icon,
  trend,
  prefix,
  emphasis,
}: StatCardProps) {
  const trendLabel =
    trend !== undefined ? `${trend > 0 ? "+" : ""}${trend}% vs last month` : "";
  return (
    <div
      className={cn(
        "rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg",
        emphasis && "bg-slate-900 text-white shadow-xl",
      )}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-2">
          <p
            className={cn(
              "text-sm font-medium text-slate-500",
              emphasis && "text-slate-200",
            )}
          >
            {label}
          </p>
          <p className="text-3xl font-semibold tracking-tight">
            {prefix ? formatCurrency(value) : value.toLocaleString()}
          </p>
          {trend !== undefined && (
            <p
              className={cn(
                "text-xs font-medium",
                trend >= 0 ? "text-emerald-500" : "text-red-500",
                emphasis && "text-emerald-300",
              )}
            >
              {trendLabel}
            </p>
          )}
        </div>
        <div
          className={cn(
            "flex h-11 w-11 items-center justify-center rounded-xl bg-slate-900/5 text-slate-900",
            emphasis && "bg-white/10 text-white",
          )}
        >
          <Icon className="h-5 w-5" />
        </div>
      </div>
    </div>
  );
}

