import { ChartCard } from "@/components/dashboard/ChartCard";
import { StatCard } from "@/components/dashboard/StatCard";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { DataTable } from "@/components/ui/DataTable";
import { formatCurrency, formatDate } from "@/lib/utils";
import {
  revenueByMonth,
  serviceRecords,
  servicesByMonth,
  thresholds,
  totals,
} from "@/data/mockData";
import {
  CarFront,
  CreditCard,
  Users,
  Wrench,
  AlertTriangle,
} from "lucide-react";

const recentRecords = [...serviceRecords].sort(
  (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
);

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Total Customers"
          value={totals.customers}
          icon={Users}
          trend={8}
        />
        <StatCard
          label="Total Vehicles"
          value={totals.vehicles}
          icon={CarFront}
          trend={6}
        />
        <StatCard
          label="Service Records"
          value={totals.services}
          icon={Wrench}
          trend={12}
        />
        <StatCard
          label="Total Revenue"
          value={totals.revenue}
          prefix="$"
          icon={CreditCard}
          trend={9}
          emphasis
        />
      </div>

      <div className="grid gap-4 xl:grid-cols-2">
        <ChartCard
          title="Monthly Revenue"
          description="Revenue trend across the last 6 months"
          type="area"
          data={revenueByMonth.map((item) => ({
            ...item,
            revenue: item.revenue,
          }))}
          dataKey="revenue"
          format="currency"
          accent="#0f172a"
        />
        <ChartCard
          title="Services per Month"
          description="Completed services and in-progress work"
          type="bar"
          data={servicesByMonth.map((item) => ({
            ...item,
            count: item.count,
          }))}
          dataKey="count"
          format="number"
          accent="#06b6d4"
        />
      </div>

      <Card className="p-5">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <p className="text-base font-semibold text-slate-900">
              Recent Service Records
            </p>
            <p className="text-sm text-slate-500">
              Highlighting services above {formatCurrency(thresholds.highCost)}{" "}
              to monitor spend.
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
            <AlertTriangle className="h-4 w-4 text-amber-500" />
            High cost threshold
          </div>
        </div>
        <DataTable
          columns={[
            { key: "customerName", label: "Customer" },
            {
              key: "vehiclePlate",
              label: "Vehicle",
              render: (row) => (
                <div className="space-y-0.5">
                  <p className="font-semibold text-slate-900">
                    {(row as typeof serviceRecords[number]).vehiclePlate}
                  </p>
                  <p className="text-xs text-slate-500">
                    {(row as typeof serviceRecords[number]).vehicleModel}
                  </p>
                </div>
              ),
            },
            {
              key: "date",
              label: "Service Date",
              render: (row) => formatDate((row as { date: string }).date),
            },
            {
              key: "description",
              label: "Description",
              render: (row) => (
                <p className="max-w-xs text-sm text-slate-700">
                  {(row as typeof serviceRecords[number]).description}
                </p>
              ),
            },
            {
              key: "total",
              label: "Total Cost",
              align: "right",
              render: (row) => {
                const record = row as typeof serviceRecords[number];
                const total = record.laborCost + record.partsCost;
                const high = total >= thresholds.highCost;
                return (
                  <div className="text-right">
                    <p
                      className={high ? "font-semibold text-amber-600" : ""}
                    >
                      {formatCurrency(total)}
                    </p>
                    <p className="text-[11px] text-slate-500">
                      L {formatCurrency(record.laborCost)} · P{" "}
                      {formatCurrency(record.partsCost)}
                    </p>
                  </div>
                );
              },
            },
            {
              key: "status",
              label: "Status",
              render: (row) => {
                const status = (row as typeof serviceRecords[number]).status;
                const tone =
                  status === "completed"
                    ? "success"
                    : status === "in_progress"
                      ? "info"
                      : "warning";
                const label =
                  status === "completed"
                    ? "Completed"
                    : status === "in_progress"
                      ? "In Progress"
                      : "Waiting Parts";
                return <Badge tone={tone}>{label}</Badge>;
              },
            },
          ]}
          data={recentRecords}
          highlightRow={(row) => {
            const record = row as (typeof serviceRecords)[number];
            return record.laborCost + record.partsCost >= thresholds.highCost;
          }}
        />
      </Card>
    </div>
  );
}

