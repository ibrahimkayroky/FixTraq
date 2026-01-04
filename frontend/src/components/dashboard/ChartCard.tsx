"use client";

import { Card } from "@/components/ui/Card";
import { formatCurrency } from "@/lib/utils";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type ChartCardProps = {
  title: string;
  description?: string;
  type: "area" | "bar";
  data: { month: string }[];
  dataKey: string;
  format?: "currency" | "number";
  accent?: string;
};

export function ChartCard({
  title,
  description,
  type,
  data,
  dataKey,
  format = "currency",
  accent = "#0f172a",
}: ChartCardProps) {
  const gradientId = `${title.replace(/\s+/g, "-").toLowerCase()}-gradient`;
  const formatter = (value: number) =>
    format === "currency" ? formatCurrency(value) : value.toLocaleString();

  return (
    <Card className="p-5">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold text-slate-900">{title}</p>
          {description && (
            <p className="text-xs text-slate-500">{description}</p>
          )}
        </div>
      </div>
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          {type === "area" ? (
            <AreaChart data={data}>
              <defs>
                <linearGradient id={gradientId} x1="0" x2="0" y1="0" y2="1">
                  <stop offset="5%" stopColor={accent} stopOpacity={0.35} />
                  <stop offset="95%" stopColor={accent} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="month" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" tickFormatter={formatter} />
              <Tooltip formatter={(value) => formatter(value as number)} />
              <Area
                type="monotone"
                dataKey={dataKey}
                stroke={accent}
                strokeWidth={2.6}
                fill={`url(#${gradientId})`}
              />
            </AreaChart>
          ) : (
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="month" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" tickFormatter={formatter} />
              <Tooltip formatter={(value) => formatter(value as number)} />
              <Bar dataKey={dataKey} fill={accent} radius={[8, 8, 6, 6]} />
            </BarChart>
          )}
        </ResponsiveContainer>
      </div>
    </Card>
  );
}

