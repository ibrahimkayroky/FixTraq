"use client";

import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { DataTable } from "@/components/ui/DataTable";
import { Input } from "@/components/ui/Input";
import { Modal } from "@/components/ui/Modal";
import { Select } from "@/components/ui/Select";
import { customers, serviceRecords, vehicles as seedVehicles } from "@/data/mockData";
import { formatDate } from "@/lib/utils";
import type { Vehicle } from "@/types";
import { CarFront, Plus, Search } from "lucide-react";
import { useMemo, useState } from "react";

export default function VehiclesPage() {
  const [vehicles, setVehicles] = useState(seedVehicles);
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Vehicle | null>(null);
  const [form, setForm] = useState<Omit<Vehicle, "id">>({
    plate: "",
    model: "",
    year: new Date().getFullYear(),
    mileage: 0,
    ownerId: customers[0]?.id ?? "",
    ownerName: customers[0]?.name ?? "",
    status: "active",
  });

  const [historyFor, setHistoryFor] = useState<Vehicle | null>(null);

  const filtered = useMemo(() => {
    const term = search.toLowerCase();
    return vehicles.filter(
      (vehicle) =>
        vehicle.plate.toLowerCase().includes(term) ||
        vehicle.model.toLowerCase().includes(term) ||
        vehicle.ownerName.toLowerCase().includes(term),
    );
  }, [vehicles, search]);

  const handleSave = () => {
    if (!form.plate.trim() || !form.model.trim()) return;
    if (editing) {
      setVehicles((prev) =>
        prev.map((v) => (v.id === editing.id ? { ...editing, ...form } : v)),
      );
    } else {
      setVehicles((prev) => [
        { id: crypto.randomUUID(), ...form },
        ...prev,
      ]);
    }
    setShowForm(false);
    setEditing(null);
  };

  const openCreate = () => {
    setEditing(null);
    setForm({
      plate: "",
      model: "",
      year: new Date().getFullYear(),
      mileage: 0,
      ownerId: customers[0]?.id ?? "",
      ownerName: customers[0]?.name ?? "",
      status: "active",
    });
    setShowForm(true);
  };

  const statusTone = (status?: Vehicle["status"]) =>
    status === "in_shop"
      ? ("warning" as const)
      : status === "inactive"
        ? ("danger" as const)
        : ("info" as const);

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-3 md:flex-row md:items-center">
        <div>
          <p className="text-sm font-semibold text-slate-900">Vehicles</p>
          <p className="text-sm text-slate-500">
            Track registrations, mileage, and ownership.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="h-10 rounded-xl border border-slate-200 bg-white pl-9 pr-3 text-sm text-slate-900 outline-none ring-0 transition focus:border-slate-300 focus:ring-2 focus:ring-slate-200/80"
              placeholder="Search by plate, model, or owner"
            />
          </div>
          <Button iconLeft={<Plus className="h-4 w-4" />} onClick={openCreate}>
            Add Vehicle
          </Button>
        </div>
      </div>

      <Card className="p-5">
        <DataTable
          columns={[
            {
              key: "vehicle",
              label: "Vehicle",
              render: (row) => {
                const vehicle = row as Vehicle;
                return (
                  <div className="space-y-1">
                    <p className="text-sm font-semibold text-slate-900">
                      {vehicle.plate}
                    </p>
                    <p className="text-xs text-slate-500">
                      {vehicle.model} • {vehicle.year}
                    </p>
                  </div>
                );
              },
            },
            {
              key: "owner",
              label: "Owner",
              render: (row) => (
                <div className="space-y-0.5">
                  <p className="font-semibold text-slate-900">
                    {(row as Vehicle).ownerName}
                  </p>
                  <p className="text-xs text-slate-500">
                    {customers.find((c) => c.id === (row as Vehicle).ownerId)?.phone}
                  </p>
                </div>
              ),
            },
            {
              key: "mileage",
              label: "Mileage",
              render: (row) => (
                <span className="text-sm text-slate-800">
                  {(row as Vehicle).mileage.toLocaleString()} mi
                </span>
              ),
            },
            {
              key: "status",
              label: "Status",
              render: (row) => {
                const status = (row as Vehicle).status;
                const label =
                  status === "in_shop"
                    ? "In shop"
                    : status === "inactive"
                      ? "Inactive"
                      : "Active";
                return <Badge tone={statusTone(status)}>{label}</Badge>;
              },
            },
            {
              key: "actions",
              label: "Actions",
              render: (row) => {
                const vehicle = row as Vehicle;
                return (
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-xs text-slate-700"
                      onClick={() => setHistoryFor(vehicle)}
                    >
                      History
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-xs text-slate-700"
                      onClick={() => {
                        setEditing(vehicle);
                        setForm({ ...vehicle });
                        setShowForm(true);
                      }}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-xs text-red-600"
                      onClick={() =>
                        setVehicles((prev) => prev.filter((v) => v.id !== vehicle.id))
                      }
                    >
                      Delete
                    </Button>
                  </div>
                );
              },
            },
          ]}
          data={filtered}
          emptyMessage="No vehicles found."
        />
      </Card>

      <Modal
        title={editing ? "Edit vehicle" : "Add vehicle"}
        description="Keep registration details precise to speed up service intake."
        open={showForm}
        onClose={() => setShowForm(false)}
      >
        <div className="grid gap-4 md:grid-cols-2">
          <Input
            label="Plate number"
            value={form.plate}
            onChange={(e) => setForm((f) => ({ ...f, plate: e.target.value }))}
          />
          <Input
            label="Model"
            value={form.model}
            onChange={(e) => setForm((f) => ({ ...f, model: e.target.value }))}
          />
          <Input
            label="Year"
            type="number"
            value={form.year}
            onChange={(e) =>
              setForm((f) => ({ ...f, year: Number(e.target.value) }))
            }
          />
          <Input
            label="Mileage"
            type="number"
            value={form.mileage}
            onChange={(e) =>
              setForm((f) => ({ ...f, mileage: Number(e.target.value) }))
            }
          />
          <Select
            label="Owner"
            value={form.ownerId}
            onChange={(e) =>
              setForm((f) => ({
                ...f,
                ownerId: e.target.value,
                ownerName: customers.find((c) => c.id === e.target.value)?.name ?? "",
              }))
            }
          >
            {customers.map((customer) => (
              <option key={customer.id} value={customer.id}>
                {customer.name}
              </option>
            ))}
          </Select>
          <Select
            label="Status"
            value={form.status}
            onChange={(e) =>
              setForm((f) => ({
                ...f,
                status: e.target.value as Vehicle["status"],
              }))
            }
          >
            <option value="active">Active</option>
            <option value="in_shop">In shop</option>
            <option value="inactive">Inactive</option>
          </Select>
        </div>
        <div className="flex justify-end gap-2 pt-4">
          <Button variant="ghost" onClick={() => setShowForm(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave}>
            {editing ? "Save changes" : "Add vehicle"}
          </Button>
        </div>
      </Modal>

      <Modal
        title="Service history"
        description={
          historyFor
            ? `${historyFor.plate} — ${historyFor.model}`
            : "Recent visits"
        }
        open={!!historyFor}
        onClose={() => setHistoryFor(null)}
      >
        <div className="space-y-3">
          {historyFor &&
            serviceRecords
              .filter((record) => record.vehicleId === historyFor.id)
              .map((record) => (
                <div
                  key={record.id}
                  className="flex items-start justify-between gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3"
                >
                  <div>
                    <p className="text-sm font-semibold text-slate-900">
                      {formatDate(record.date)}
                    </p>
                    <p className="text-xs text-slate-500">{record.description}</p>
                    <p className="text-xs text-slate-400">
                      Tech: {record.technician}
                    </p>
                  </div>
                  <Badge tone={statusTone("in_shop")}>
                    ${(record.laborCost + record.partsCost).toLocaleString()}
                  </Badge>
                </div>
              ))}
          {historyFor &&
            serviceRecords.filter((r) => r.vehicleId === historyFor.id).length ===
              0 && (
              <p className="text-sm text-slate-500">
                No service history yet. Log the next visit from Service Records.
              </p>
            )}
        </div>
      </Modal>

      <div className="flex flex-wrap items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900 text-white">
          <CarFront className="h-5 w-5" />
        </div>
        <div>
          <p className="text-sm font-semibold text-slate-900">
            Search by plate or model
          </p>
          <p className="text-sm text-slate-500">
            Use the search bar to jump to a vehicle without scrolling long lists.
          </p>
        </div>
      </div>
    </div>
  );
}

