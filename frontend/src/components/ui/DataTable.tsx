import { cn, formatCurrency } from "@/lib/utils";
import type { ReactNode } from "react";

type Column<T> = {
  key: keyof T | string;
  label: string;
  align?: "left" | "right" | "center";
  render?: (row: T) => ReactNode;
};

type DataTableProps<T> = {
  columns: Column<T>[];
  data: T[];
  emptyMessage?: string;
  highlightRow?: (row: T) => boolean;
};

export function DataTable<T>({
  columns,
  data,
  emptyMessage = "No records found.",
  highlightRow,
}: DataTableProps<T>) {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-200 text-sm">
          <thead className="bg-slate-50/70">
            <tr>
              {columns.map((column) => (
                <th
                  key={String(column.key)}
                  className={cn(
                    "px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500",
                    column.align === "right" && "text-right",
                    column.align === "center" && "text-center",
                  )}
                >
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {data.length === 0 && (
              <tr>
                <td
                  className="px-4 py-10 text-center text-sm text-slate-500"
                  colSpan={columns.length}
                >
                  {emptyMessage}
                </td>
              </tr>
            )}
            {data.map((row, idx) => (
              <tr
                key={idx}
                className={cn(
                  "transition hover:bg-slate-50/80",
                  highlightRow?.(row) && "bg-amber-50/80",
                )}
              >
                {columns.map((column) => (
                  <td
                    key={String(column.key)}
                    className={cn(
                      "px-4 py-3 text-sm text-slate-800",
                      column.align === "right" && "text-right",
                      column.align === "center" && "text-center",
                    )}
                  >
                    {column.render
                      ? column.render(row)
                      : renderCell(row, column.key)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function renderCell<T>(row: T, key: keyof T | string) {
  const value = row[key as keyof T];
  if (typeof value === "number") return formatCurrency(value);
  if (value instanceof Date) return value.toLocaleDateString();
  return value as ReactNode;
}

