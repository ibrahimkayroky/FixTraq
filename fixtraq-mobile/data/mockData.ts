export type Customer = {
  id: string;
  name: string;
  phone: string;
  email: string;
  vehicles: number;
  lastVisit: string;
};

export type Vehicle = {
  id: string;
  plate: string;
  model: string;
  year: number;
  mileage: number;
  ownerId: string;
  ownerName: string;
  status?: "active" | "in_shop" | "inactive";
};

export type ServiceRecord = {
  id: string;
  vehicleId: string;
  vehiclePlate: string;
  vehicleModel: string;
  customerId: string;
  customerName: string;
  description: string;
  laborCost: number;
  partsCost: number;
  date: string;
  technician: string;
  status: "in_progress" | "completed" | "waiting_parts";
};

export const customers: Customer[] = [
  {
    id: "c1",
    name: "Amelia Carter",
    phone: "(415) 555-1298",
    email: "amelia.carter@email.com",
    vehicles: 2,
    lastVisit: "2025-01-18",
  },
  {
    id: "c2",
    name: "Diego Martinez",
    phone: "(206) 555-7732",
    email: "diego.martinez@email.com",
    vehicles: 1,
    lastVisit: "2025-01-12",
  },
];

export const vehicles: Vehicle[] = [
  {
    id: "v1",
    plate: "ABC-2198",
    model: "Toyota Hilux",
    year: 2021,
    mileage: 48200,
    ownerId: "c1",
    ownerName: "Amelia Carter",
    status: "active",
  },
  {
    id: "v2",
    plate: "NYX-8831",
    model: "Honda Accord",
    year: 2020,
    mileage: 67310,
    ownerId: "c2",
    ownerName: "Diego Martinez",
    status: "in_shop",
  },
];

export const serviceRecords: ServiceRecord[] = [
  {
    id: "s1",
    vehicleId: "v1",
    vehiclePlate: "ABC-2198",
    vehicleModel: "Toyota Hilux",
    customerId: "c1",
    customerName: "Amelia Carter",
    description: "Major service with suspension refresh and brake overhaul",
    laborCost: 480,
    partsCost: 620,
    date: "2025-01-20",
    technician: "M. Daniels",
    status: "completed",
  },
  {
    id: "s2",
    vehicleId: "v2",
    vehiclePlate: "NYX-8831",
    vehicleModel: "Honda Accord",
    customerId: "c2",
    customerName: "Diego Martinez",
    description: "Timing belt replacement and transmission service",
    laborCost: 640,
    partsCost: 540,
    date: "2025-01-10",
    technician: "K. Smith",
    status: "in_progress",
  },
];


