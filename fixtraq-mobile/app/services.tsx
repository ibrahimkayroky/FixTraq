import { Card } from "../components/ui/Card";
import { Badge } from "../components/ui/Badge";
import { Button } from "../components/ui/Button";
import { colors } from "../theme";
// import { customers, serviceRecords } from "../data/mockData";
import { useEffect, useState } from "react";
import { View, Text, ScrollView, TextInput, Alert } from "react-native";
import { ServicesApi } from "../src/services.api";
import { VehiclesApi } from "../src/vehicles.api";

type MaintenanceFilter = "all" | "SCHEDULED" | "REPAIR" | "EMERGENCY";

type ServiceRecord = {
  id: number;
  vehicleId: number | null;
  vehiclePlate: string;
  vehicleModel: string;
  customerName: string;
  maintenanceType: "SCHEDULED" | "REPAIR" | "EMERGENCY";
  description: string;
  maintenanceDate: string;
  mileageAtService: number;
  cost: number;
  nextScheduledDate: string | null;
};

type SimpleVehicle = {
  id: number;
  plateNumber: string;
  model: string;
};

export default function ServicesScreen() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<MaintenanceFilter>("all");

  const [vehicles, setVehicles] = useState<SimpleVehicle[]>([]);
  const [vehicleId, setVehicleId] = useState<number | null>(null);
  const [maintenanceType, setMaintenanceType] =
    useState<"SCHEDULED" | "REPAIR" | "EMERGENCY">("SCHEDULED");

  const today = new Date().toISOString().slice(0, 10);
  const [maintenanceDate, setMaintenanceDate] = useState(today);
  const [nextScheduledDate, setNextScheduledDate] = useState(today);
  const [mileageAtService, setMileageAtService] = useState("0");

  const [description, setDescription] = useState("");
  const [laborCost, setLaborCost] = useState("0");
  const [partsCost, setPartsCost] = useState("0");

  const parsedLabor = Number(laborCost) || 0;
  const parsedParts = Number(partsCost) || 0;
  const totalCost = parsedLabor + parsedParts;

  const [services, setServices] = useState<ServiceRecord[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const filtered = services.filter((record) => {
    const text = [
      record.vehiclePlate,
      record.vehicleModel,
      record.customerName,
      record.description,
    ]
      .join(" ")
      .toLowerCase();
    const matchesText = text.includes(search.toLowerCase());
    const matchesStatus =
      status === "all" ? true : record.maintenanceType === status;
    return matchesText && matchesStatus;
  });

  const formatCurrency = (value: number) =>
    `$${value.toLocaleString("en-US", { maximumFractionDigits: 0 })}`;

  const handleSave = async () => {
    if (!vehicleId) {
      setError("Please select a vehicle.");
      return;
    }
    if (!description.trim()) {
      setError("Description is required.");
      return;
    }

    setSubmitting(true);
    setError(null);

    try {
      const payload = {
        vehicleId,
        maintenanceType,
        description,
        maintenanceDate,
        mileageAtService: Number(mileageAtService) || 0,
        cost: totalCost,
        nextScheduledDate,
      };

      await ServicesApi.create(payload);
      Alert.alert("Success", "Service record created successfully.");

      // Reset form
      setDescription("");
      setLaborCost("0");
      setPartsCost("0");
      setMileageAtService("0");
      setMaintenanceDate(today);
      setNextScheduledDate(today);
      setMaintenanceType("SCHEDULED");

      // Refresh list
      const data = await ServicesApi.getAll();
      const list = Array.isArray(data) ? data : [];
      const normalized: ServiceRecord[] = list.map(
        (s: any): ServiceRecord => ({
          id: s.id,
          vehicleId: s.vehicle?.id ?? null,
          vehiclePlate: s.vehicle?.plateNumber ?? "",
          vehicleModel: s.vehicle?.model ?? "",
          customerName: s.vehicle?.user?.name ?? "",
          maintenanceType: s.maintenanceType,
          description: s.description,
          maintenanceDate: s.maintenanceDate,
          mileageAtService: s.mileageAtService,
          cost: s.cost,
          nextScheduledDate: s.nextScheduledDate ?? null,
        }),
      );
      setServices(normalized);
    } catch (err) {
      console.error("CREATE MAINTENANCE ERROR:", err);
      setError("Failed to create service record. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };


  // useEffect(() => {
  //   ServicesApi.getAll()
  //     .then(setServices)
  //     .catch(err => console.error(err));
  // }, []);

  // useEffect(() => {
  //   ServicesApi.getAll()
  //     .then(data => {
  //       console.log("SERVICES:", data);
  //       setServices(data);
  //     })
  //     .catch(err => console.error("API ERROR:", err));
  // }, []);
  
  useEffect(() => {
    const load = async () => {
      try {
        const data = await ServicesApi.getAll();
        const list = Array.isArray(data) ? data : [];

        const normalized: ServiceRecord[] = list.map(
          (s: any): ServiceRecord => ({
            id: s.id,
            vehicleId: s.vehicle?.id ?? null,
            vehiclePlate: s.vehicle?.plateNumber ?? "",
            vehicleModel: s.vehicle?.model ?? "",
            customerName: s.vehicle?.user?.name ?? "",
            maintenanceType: s.maintenanceType,
            description: s.description,
            maintenanceDate: s.maintenanceDate,
            mileageAtService: s.mileageAtService,
            cost: s.cost,
            nextScheduledDate: s.nextScheduledDate ?? null,
          }),
        );

        setServices(normalized);
      } catch (err) {
        console.error("API ERROR (maintenance):", err);
      }

      try {
        const vehiclesData = await VehiclesApi.getAll();
        const vehiclesList = Array.isArray(vehiclesData) ? vehiclesData : [];
        const normalizedVehicles: SimpleVehicle[] = vehiclesList.map(
          (v: any): SimpleVehicle => ({
            id: v.id,
            plateNumber: v.plateNumber,
            model: v.model,
          }),
        );
        setVehicles(normalizedVehicles);
        if (normalizedVehicles.length > 0 && vehicleId === null) {
          setVehicleId(normalizedVehicles[0].id);
        }
      } catch (err) {
        console.error("API ERROR (vehicles):", err);
      }
    };

    load();
  }, []);
  
  console.log("SERVICES:", services);
  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: colors.background }}
      contentContainerStyle={{ padding: 16, paddingBottom: 32, gap: 16 }}
    >
      <View>
        {/* <Text
          style={{
            fontSize: 22,
            fontWeight: "700",
            color: colors.foreground,
          }}
        >
          Service Records
        </Text>
        <Text
          style={{
            fontSize: 12,
            color: colors.foregroundMuted,
            marginTop: 4,
          }}
        >
          Intake, track, and export detailed visit records.
        </Text> */}
        {/* {services.map(service => (
        <Text key={service.id}>
          {service.vehiclePlate} - {service.status}
        </Text>
      ))} */}
      </View>

      <Card style={{ padding: 14, gap: 10 }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontSize: 15,
              fontWeight: "600",
              color: colors.foreground,
            }}
          >
            Add new service
          </Text>
          <Badge tone="info">Total: {formatCurrency(totalCost)}</Badge>
        </View>

        <Text style={{ fontSize: 12, color: colors.foregroundMuted }}>
          Vehicle
        </Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={{ flexDirection: "row", gap: 8, paddingVertical: 4 }}>
            {vehicles.map((vehicle) => (
              <Button
                key={vehicle.id}
                variant={vehicle.id === vehicleId ? "primary" : "secondary"}
                size="sm"
                onPress={() => setVehicleId(vehicle.id)}
              >
                {vehicle.plateNumber} • {vehicle.model}
              </Button>
            ))}
          </View>
        </ScrollView>

        <View style={{ flexDirection: "row", gap: 10 }}>
          <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 12, color: colors.foregroundMuted }}>
              Labor cost
            </Text>
            <TextInput
              keyboardType="numeric"
              value={laborCost}
              onChangeText={setLaborCost}
              style={{
                backgroundColor: "#F9FAFB",
                borderRadius: 10,
                paddingHorizontal: 10,
                paddingVertical: 8,
                fontSize: 14,
              }}
            />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 12, color: colors.foregroundMuted }}>
              Parts cost
            </Text>
            <TextInput
              keyboardType="numeric"
              value={partsCost}
              onChangeText={setPartsCost}
              style={{
                backgroundColor: "#F9FAFB",
                borderRadius: 10,
                paddingHorizontal: 10,
                paddingVertical: 8,
                fontSize: 14,
              }}
            />
          </View>
        </View>

        <View style={{ flexDirection: "row", gap: 10 }}>
          <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 12, color: colors.foregroundMuted }}>
              Maintenance date (YYYY-MM-DD)
            </Text>
            <TextInput
              value={maintenanceDate}
              onChangeText={setMaintenanceDate}
              placeholder="YYYY-MM-DD"
              placeholderTextColor="#9CA3AF"
              style={{
                backgroundColor: "#F9FAFB",
                borderRadius: 10,
                paddingHorizontal: 10,
                paddingVertical: 8,
                fontSize: 14,
              }}
            />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 12, color: colors.foregroundMuted }}>
              Next scheduled date (YYYY-MM-DD)
            </Text>
            <TextInput
              value={nextScheduledDate}
              onChangeText={setNextScheduledDate}
              placeholder="YYYY-MM-DD"
              placeholderTextColor="#9CA3AF"
              style={{
                backgroundColor: "#F9FAFB",
                borderRadius: 10,
                paddingHorizontal: 10,
                paddingVertical: 8,
                fontSize: 14,
              }}
            />
          </View>
        </View>

        <View>
          <Text style={{ fontSize: 12, color: colors.foregroundMuted }}>
            Mileage at service
          </Text>
          <TextInput
            keyboardType="numeric"
            value={mileageAtService}
            onChangeText={setMileageAtService}
            placeholder="Mileage at service"
            placeholderTextColor="#9CA3AF"
            style={{
              backgroundColor: "#F9FAFB",
              borderRadius: 10,
              paddingHorizontal: 10,
              paddingVertical: 8,
              fontSize: 14,
            }}
          />
        </View>

        <View>
          <Text style={{ fontSize: 12, color: colors.foregroundMuted }}>
            Description
          </Text>
          <TextInput
            multiline
            value={description}
            onChangeText={setDescription}
            placeholder="Describe the work performed, parts replaced, and key notes."
            placeholderTextColor="#9CA3AF"
            style={{
              backgroundColor: "#F9FAFB",
              borderRadius: 10,
              paddingHorizontal: 10,
              paddingVertical: 8,
              fontSize: 13,
              minHeight: 80,
              textAlignVertical: "top",
            }}
          />
        </View>

        <Button loading={submitting} onPress={handleSave}>
          Save record
        </Button>
      </Card>

      <Card style={{ padding: 14, gap: 10 }}>
        <View style={{ gap: 8 }}>
          <TextInput
            placeholder="Search by plate, model, customer, or description"
            placeholderTextColor="#9CA3AF"
            value={search}
            onChangeText={setSearch}
            style={{
              backgroundColor: "#F9FAFB",
              borderRadius: 10,
              paddingHorizontal: 10,
              paddingVertical: 8,
              fontSize: 14,
            }}
          />

          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={{ flexDirection: "row", gap: 8 }}>
              {(
                ["all", "SCHEDULED", "REPAIR", "EMERGENCY"] as MaintenanceFilter[]
              ).map((value) => (
                <Button
                  key={value}
                  size="sm"
                  variant={status === value ? "primary" : "secondary"}
                  onPress={() => setStatus(value)}
                >
                  {value === "all"
                    ? "All"
                    : value === "SCHEDULED"
                      ? "Scheduled"
                      : value === "REPAIR"
                        ? "Repair"
                        : "Emergency"}
                </Button>
              ))}
            </View>
          </ScrollView>
        </View>

        <View style={{ marginTop: 8 }}>
          {filtered.map((record) => {
            const tone =
              record.maintenanceType === "SCHEDULED"
                ? "info"
                : record.maintenanceType === "REPAIR"
                  ? "warning"
                  : "danger";

            return (
              <View
                key={record.id}
                style={{
                  paddingVertical: 10,
                  borderTopWidth: 1,
                  borderTopColor: "#E5E7EB",
                  gap: 4,
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <View style={{ flex: 1 }}>
                    <Text
                      style={{
                        fontSize: 14,
                        fontWeight: "600",
                        color: colors.foreground,
                      }}
                    >
                      {record.vehiclePlate} • {record.vehicleModel}
                    </Text>
                    {record.customerName ? (
                      <Text
                        style={{
                          fontSize: 12,
                          color: colors.foregroundMuted,
                        }}
                      >
                        {record.customerName}
                      </Text>
                    ) : null}
                  </View>
                  <Badge tone={tone}>
                    {record.maintenanceType === "SCHEDULED"
                      ? "Scheduled"
                      : record.maintenanceType === "REPAIR"
                        ? "Repair"
                        : "Emergency"}
                  </Badge>
                </View>
                <Text
                  style={{
                    fontSize: 12,
                    color: colors.foregroundMuted,
                  }}
                  numberOfLines={2}
                >
                  {record.description}
                </Text>
                <Text
                  style={{
                    fontSize: 13,
                    fontWeight: "600",
                  }}
                >
                  {formatCurrency(record.cost)}
                </Text>
              </View>
            );
          })}

          {filtered.length === 0 && (
            <Text
              style={{
                fontSize: 13,
                color: colors.foregroundMuted,
                marginTop: 8,
              }}
            >
              No records match your filters.
            </Text>
          )}
        </View>
      </Card>
    </ScrollView>
  );
}


