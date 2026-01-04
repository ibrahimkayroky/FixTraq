"use client";

import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { DataTable } from "@/components/ui/DataTable";
import { Input } from "@/components/ui/Input";
import { Modal } from "@/components/ui/Modal";
import { customers as seedCustomers, vehicles as seedVehicles } from "@/data/mockData";
import { formatDate } from "@/lib/utils";
import type { Customer } from "@/types";
import { Plus, Search, UserRound, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

export default function CustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [showForm, setShowForm] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null);
  const [form, setForm] = useState<Omit<Customer, "id" | "vehicles">>({
    name: "",
    phone: "",
    email: "",
    lastVisit: new Date().toISOString().slice(0, 10),
  });
  const [formErrors, setFormErrors] = useState<Partial<Record<keyof typeof form, string>>>(
    {},
  );

  const [showVehiclesFor, setShowVehiclesFor] = useState<Customer | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCustomers(seedCustomers);
      setIsLoading(false);
      setError(null);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const filtered = useMemo(() => {
    const term = search.toLowerCase();
    return customers.filter(
      (customer) =>
        customer.name.toLowerCase().includes(term) ||
        customer.phone.toLowerCase().includes(term) ||
        customer.email.toLowerCase().includes(term),
    );
  }, [customers, search]);

  const vehiclesByCustomer = useMemo(() => {
    return seedVehicles.reduce<Record<string, typeof seedVehicles>>((acc, vehicle) => {
      acc[vehicle.ownerId] = acc[vehicle.ownerId] || [];
      acc[vehicle.ownerId].push(vehicle);
      return acc;
    }, {});
  }, []);

  const handleSave = () => {
    const errors: typeof formErrors = {};
    if (!form.name.trim()) errors.name = "Name is required";
    if (!form.phone.trim()) errors.phone = "Phone is required";
    if (!form.email.trim()) errors.email = "Email is required";
    setFormErrors(errors);
    if (Object.keys(errors).length > 0) return;

    if (editingCustomer) {
      setCustomers((prev) =>
        prev.map((c) =>
          c.id === editingCustomer.id
            ? { ...editingCustomer, ...form, vehicles: c.vehicles }
            : c,
        ),
      );
    } else {
      setCustomers((prev) => [
        {
          id: crypto.randomUUID(),
          vehicles: 0,
          ...form,
        },
        ...prev,
      ]);
    }
    setShowForm(false);
    setEditingCustomer(null);
    setFormErrors({});
  };

  const handleDelete = (id: string) => {
    setCustomers((prev) => prev.filter((c) => c.id !== id));
  };

  const openEdit = (customer: Customer) => {
    setEditingCustomer(customer);
    setForm({
      name: customer.name,
      phone: customer.phone,
      email: customer.email,
      lastVisit: customer.lastVisit,
    });
    setShowForm(true);
  };

  const openCreate = () => {
    setEditingCustomer(null);
    setForm({
      name: "",
      phone: "",
      email: "",
      lastVisit: new Date().toISOString().slice(0, 10),
    });
    setShowForm(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-3 md:flex-row md:items-center">
        <div>
          <p className="text-sm font-semibold text-slate-900">Customers</p>
          <p className="text-sm text-slate-500">
            Manage customer records and jump to their vehicles.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="h-10 rounded-xl border border-slate-200 bg-white pl-9 pr-3 text-sm text-slate-900 outline-none ring-0 transition focus:border-slate-300 focus:ring-2 focus:ring-slate-200/80"
              placeholder="Search by name, phone, or email"
            />
          </div>
          <Button iconLeft={<Plus className="h-4 w-4" />} onClick={openCreate}>
            Add Customer
          </Button>
        </div>
      </div>

      <Card className="p-5">
        {error && (
          <div className="mb-4 flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            <X className="h-4 w-4" />
            {error}
          </div>
        )}
        <DataTable
          columns={[
            {
              key: "name",
              label: "Customer",
              render: (row) => (
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-900/5 text-slate-700">
                    <UserRound className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900">
                      {(row as Customer).name}
                    </p>
                    <p className="text-xs text-slate-500">
                      {(row as Customer).email}
                    </p>
                  </div>
                </div>
              ),
            },
            {
              key: "phone",
              label: "Phone",
              render: (row) => <span>{(row as Customer).phone}</span>,
            },
            {
              key: "vehicles",
              label: "Vehicles",
              align: "center",
              render: (row) => (
                <Badge tone="info">
                  {(vehiclesByCustomer[(row as Customer).id]?.length ??
                    (row as Customer).vehicles) || 0}{" "}
                  active
                </Badge>
              ),
            },
            {
              key: "lastVisit",
              label: "Last Visit",
              render: (row) => (
                <span className="text-sm text-slate-700">
                  {formatDate((row as Customer).lastVisit)}
                </span>
              ),
            },
            {
              key: "actions",
              label: "Actions",
              render: (row) => {
                const customer = row as Customer;
                return (
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-xs text-slate-700"
                      onClick={() => setShowVehiclesFor(customer)}
                    >
                      Vehicles
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-xs text-slate-700"
                      onClick={() => openEdit(customer)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-xs text-red-600"
                      onClick={() => handleDelete(customer.id)}
                    >
                      Delete
                    </Button>
                  </div>
                );
              },
            },
          ]}
          data={isLoading ? [] : filtered}
          emptyMessage={
            isLoading
              ? "Loading customers..."
              : "No customers match your filters."
          }
        />
      </Card>

      <Modal
        title={editingCustomer ? "Edit Customer" : "Add Customer"}
        description="Capture clean customer details to keep the workshop organized."
        open={showForm}
        onClose={() => {
          setShowForm(false);
          setFormErrors({});
        }}
      >
        <div className="grid gap-4 md:grid-cols-2">
          <Input
            label="Full name"
            value={form.name}
            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
            error={formErrors.name}
          />
          <Input
            label="Phone"
            value={form.phone}
            onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
            error={formErrors.phone}
          />
          <Input
            label="Email"
            type="email"
            value={form.email}
            onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
            error={formErrors.email}
          />
          <Input
            label="Last visit"
            type="date"
            value={form.lastVisit}
            onChange={(e) =>
              setForm((f) => ({ ...f, lastVisit: e.target.value }))
            }
          />
        </div>
        <div className="flex justify-end gap-2 pt-4">
          <Button variant="ghost" onClick={() => setShowForm(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave}>
            {editingCustomer ? "Save changes" : "Create customer"}
          </Button>
        </div>
      </Modal>

      <Modal
        title="Customer vehicles"
        description={showVehiclesFor?.name}
        open={!!showVehiclesFor}
        onClose={() => setShowVehiclesFor(null)}
      >
        <div className="space-y-3">
          {(vehiclesByCustomer[showVehiclesFor?.id ?? ""] || []).map(
            (vehicle) => (
              <div
                key={vehicle.id}
                className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50/60 px-4 py-3"
              >
                <div>
                  <p className="text-sm font-semibold text-slate-900">
                    {vehicle.plate} — {vehicle.model}
                  </p>
                  <p className="text-xs text-slate-500">
                    {vehicle.year} • {vehicle.mileage.toLocaleString()} miles
                  </p>
                </div>
                <Badge tone="neutral">
                  {vehicle.status === "in_shop" ? "In shop" : "Active"}
                </Badge>
              </div>
            ),
          )}
          {showVehiclesFor &&
            (vehiclesByCustomer[showVehiclesFor.id]?.length ?? 0) === 0 && (
              <p className="text-sm text-slate-500">
                No vehicles linked yet. Add a vehicle from the Vehicles page.
              </p>
            )}
        </div>
      </Modal>
    </div>
  );
}

