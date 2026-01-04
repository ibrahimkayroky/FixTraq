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

