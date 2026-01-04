"use client";

import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { DataTable } from "@/components/ui/DataTable";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { TextArea } from "@/components/ui/TextArea";
import {
  customers,
  serviceRecords as seedRecords,
  thresholds,
  vehicles,
} from "@/data/mockData";
import { formatCurrency, formatDate } from "@/lib/utils";
import type { ServiceRecord } from "@/types";
import { Download, Filter, Plus, Search } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

type Filters = {
  search: string;
  status: "all" | ServiceRecord["status"];
  sort: "date_desc" | "date_asc" | "cost_desc" | "cost_asc";
};

export default function ServicesPage() {
  const [records, setRecords] = useState<ServiceRecord[]>([]);
  const [filters, setFilters] = useState<Filters>({
    search: "",
    status: "all",
    sort: "date_desc",
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isExporting, setIsExporting] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  const [form, setForm] = useState({
    vehicleId: vehicles[0]?.id ?? "",
    description: "",
    laborCost: 0,
    partsCost: 0,
    technician: "Unassigned",
    status: "in_progress" as ServiceRecord["status"],
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const totalCost = form.laborCost + form.partsCost;

  useEffect(() => {
    const timer = setTimeout(() => {
      setRecords(seedRecords);
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const filtered = useMemo(() => {
    const term = filters.search.toLowerCase();
    const status = filters.status;

    const searchFilter = (record: ServiceRecord) =>
      record.vehiclePlate.toLowerCase().includes(term) ||
      record.vehicleModel.toLowerCase().includes(term) ||
      record.customerName.toLowerCase().includes(term) ||
      record.description.toLowerCase().includes(term);

    const statusFilter = (record: ServiceRecord) =>
      status === "all" ? true : record.status === status;

    const sorted = [...records]
      .filter(searchFilter)
      .filter(statusFilter)
      .sort((a, b) => {
        const totalA = a.laborCost + a.partsCost;
        const totalB = b.laborCost + b.partsCost;
        switch (filters.sort) {
          case "date_asc":
            return new Date(a.date).getTime() - new Date(b.date).getTime();
          case "cost_desc":
            return totalB - totalA;
          case "cost_asc":
            return totalA - totalB;
          default:
            return new Date(b.date).getTime() - new Date(a.date).getTime();
        }
      });

    return sorted;
  }, [records, filters]);

  const handleSubmit = () => {
    const errors: typeof formErrors = {};
    if (!form.vehicleId) errors.vehicleId = "Select a vehicle";
    if (!form.description.trim()) errors.description = "Description is required";
    if (form.laborCost < 0) errors.laborCost = "Cannot be negative";
    if (form.partsCost < 0) errors.partsCost = "Cannot be negative";
    setFormErrors(errors);
    if (Object.keys(errors).length > 0) return;

    const vehicle = vehicles.find((v) => v.id === form.vehicleId);
    if (!vehicle) {
      setSaveError("Vehicle not found. Please try again.");
      return;
    }
    const customer = customers.find((c) => c.id === vehicle.ownerId);
    const newRecord: ServiceRecord = {
      id: crypto.randomUUID(),
      vehicleId: vehicle.id,
      vehiclePlate: vehicle.plate,
      vehicleModel: vehicle.model,
      customerId: vehicle.ownerId,
      customerName: customer?.name ?? "Unknown",
      description: form.description,
      laborCost: form.laborCost,
      partsCost: form.partsCost,
      date: new Date().toISOString(),
      technician: form.technician,
      status: form.status,
    };
    setRecords((prev) => [newRecord, ...prev]);
    setForm({
      vehicleId: vehicles[0]?.id ?? "",
      description: "",
      laborCost: 0,
      partsCost: 0,
      technician: "Unassigned",
      status: "in_progress",
    });
    setFormErrors({});
    setSaveError(null);
  };

  const handleExport = () => {
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      alert("PDF export ready (mock). Hook this up to the backend exporter.");
    }, 800);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-3 md:flex-row md:items-center">
        <div>
          <p className="text-sm font-semibold text-slate-900">Service Records</p>
          <p className="text-sm text-slate-500">
            Intake, track, and export detailed visit records.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            className="gap-2 rounded-full"
            iconLeft={<Download className="h-4 w-4" />}
            loading={isExporting}
            onClick={handleExport}
          >
            Export PDF
          </Button>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-[1.1fr_1.2fr]">
        <Card className="p-5">
          <div className="mb-4 flex items-center justify-between">
            <p className="text-base font-semibold text-slate-900">
              Add new service record
            </p>
            <Badge tone={totalCost >= thresholds.highCost ? "warning" : "info"}>
              Total: {formatCurrency(totalCost)}
            </Badge>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <Select
              label="Vehicle"
              value={form.vehicleId}
              onChange={(e) =>
                setForm((f) => ({ ...f, vehicleId: e.target.value }))
              }
              error={formErrors.vehicleId}
            >
              {vehicles.map((vehicle) => (
                <option key={vehicle.id} value={vehicle.id}>
                  {vehicle.plate} — {vehicle.model}
                </option>
              ))}
            </Select>
            <Select
              label="Status"
              value={form.status}
              onChange={(e) =>
                setForm((f) => ({
                  ...f,
                  status: e.target.value as ServiceRecord["status"],
                }))
              }
            >
              <option value="in_progress">In progress</option>
              <option value="waiting_parts">Waiting parts</option>
              <option value="completed">Completed</option>
            </Select>
            <Input
              label="Labor cost"
              type="number"
              value={form.laborCost}
              onChange={(e) =>
                setForm((f) => ({ ...f, laborCost: Number(e.target.value) }))
              }
              error={formErrors.laborCost}
            />
            <Input
              label="Parts cost"
              type="number"
              value={form.partsCost}
              onChange={(e) =>
                setForm((f) => ({ ...f, partsCost: Number(e.target.value) }))
              }
              error={formErrors.partsCost}
            />
            <Input
              label="Technician"
              value={form.technician}
              onChange={(e) =>
                setForm((f) => ({ ...f, technician: e.target.value }))
              }
            />
          </div>
          <div className="mt-3">
            <TextArea
              label="Service description"
              placeholder="Describe the work performed, parts replaced, and key notes for the next visit."
              value={form.description}
              onChange={(e) =>
                setForm((f) => ({ ...f, description: e.target.value }))
              }
              error={formErrors.description}
            />
          </div>
          {saveError && (
            <p className="mt-3 text-sm text-red-600">
              {saveError}. Validate the vehicle and try again.
            </p>
          )}
          <div className="mt-4 flex items-center justify-between">
            <div className="text-xs text-slate-500">
              Form validation, loading, and error states are wired. Connect the
              save handler to your Spring Boot endpoint.
            </div>
            <Button
              iconLeft={<Plus className="h-4 w-4" />}
              onClick={handleSubmit}
              disabled={isLoading}
            >
              Save record
            </Button>
          </div>
        </Card>

        <Card className="p-5">
          <div className="mb-4 flex flex-wrap items-center gap-3">
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                value={filters.search}
                onChange={(e) =>
                  setFilters((f) => ({ ...f, search: e.target.value }))
                }
                className="h-10 rounded-xl border border-slate-200 bg-white pl-9 pr-3 text-sm text-slate-900 outline-none ring-0 transition focus:border-slate-300 focus:ring-2 focus:ring-slate-200/80"
                placeholder="Search by plate, model, customer, or description"
              />
            </div>
            <Select
              value={filters.status}
              onChange={(e) =>
                setFilters((f) => ({ ...f, status: e.target.value as Filters["status"] }))
              }
              className="md:w-40"
            >
              <option value="all">All statuses</option>
              <option value="completed">Completed</option>
              <option value="in_progress">In progress</option>
              <option value="waiting_parts">Waiting parts</option>
            </Select>
            <Select
              value={filters.sort}
              onChange={(e) =>
                setFilters((f) => ({ ...f, sort: e.target.value as Filters["sort"] }))
              }
              className="md:w-40"
            >
              <option value="date_desc">Latest first</option>
              <option value="date_asc">Oldest first</option>
              <option value="cost_desc">Cost high → low</option>
              <option value="cost_asc">Cost low → high</option>
            </Select>
            <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-600">
              <Filter className="h-4 w-4" />
              Filters active
            </div>
          </div>

          <DataTable
            columns={[
              {
                key: "vehicle",
                label: "Vehicle",
                render: (row) => (
                  <div className="space-y-1">
                    <p className="font-semibold text-slate-900">
                      {(row as ServiceRecord).vehiclePlate}
                    </p>
                    <p className="text-xs text-slate-500">
                      {(row as ServiceRecord).vehicleModel}
                    </p>
                  </div>
                ),
              },
              {
                key: "customer",
                label: "Customer",
                render: (row) => (
                  <p className="text-sm text-slate-800">
                    {(row as ServiceRecord).customerName}
                  </p>
                ),
              },
              {
                key: "date",
                label: "Date",
                render: (row) => (
                  <span className="text-sm text-slate-700">
                    {formatDate((row as ServiceRecord).date)}
                  </span>
                ),
              },
              {
                key: "description",
                label: "Description",
                render: (row) => (
                  <p className="max-w-[260px] text-sm text-slate-700">
                    {(row as ServiceRecord).description}
                  </p>
                ),
              },
              {
                key: "cost",
                label: "Cost",
                align: "right",
                render: (row) => {
                  const record = row as ServiceRecord;
                  const total = record.laborCost + record.partsCost;
                  const high = total >= thresholds.highCost;
                  return (
                    <div className="text-right">
                      <p className={high ? "font-semibold text-amber-600" : ""}>
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
                  const status = (row as ServiceRecord).status;
                  const tone =
                    status === "completed"
                      ? "success"
                      : status === "waiting_parts"
                        ? "warning"
                        : "info";
                  const label =
                    status === "completed"
                      ? "Completed"
                      : status === "waiting_parts"
                        ? "Waiting parts"
                        : "In progress";
                  return <Badge tone={tone}>{label}</Badge>;
                },
              },
            ]}
            data={isLoading ? [] : filtered}
            highlightRow={(row) => {
              const record = row as ServiceRecord;
              return record.laborCost + record.partsCost >= thresholds.highCost;
            }}
            emptyMessage={
              isLoading
                ? "Loading records..."
                : "No records match your filters."
            }
          />
        </Card>
      </div>
    </div>
  );
}

