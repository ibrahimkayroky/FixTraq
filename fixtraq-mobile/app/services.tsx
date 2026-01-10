import { Card } from "../components/ui/Card";
import { Badge } from "../components/ui/Badge";
import { Button } from "../components/ui/Button";
import { colors } from "../theme";
import { customers, serviceRecords, vehicles } from "../data/mockData";
import { useState } from "react";
import { View, Text, ScrollView, TextInput } from "react-native";

type StatusFilter = "all" | "completed" | "in_progress" | "waiting_parts";

export default function ServicesScreen() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<StatusFilter>("all");

  const [vehicleId, setVehicleId] = useState(vehicles[0]?.id ?? "");
  const [description, setDescription] = useState("");
  const [laborCost, setLaborCost] = useState("0");
  const [partsCost, setPartsCost] = useState("0");

  const parsedLabor = Number(laborCost) || 0;
  const parsedParts = Number(partsCost) || 0;
  const totalCost = parsedLabor + parsedParts;

  const filtered = serviceRecords.filter((record) => {
    const text = [
      record.vehiclePlate,
      record.vehicleModel,
      record.customerName,
      record.description,
    ]
      .join(" ")
      .toLowerCase();
    const matchesText = text.includes(search.toLowerCase());
    const matchesStatus = status === "all" ? true : record.status === status;
    return matchesText && matchesStatus;
  });

  const formatCurrency = (value: number) =>
    `$${value.toLocaleString("en-US", { maximumFractionDigits: 0 })}`;

  const handleSaveMock = () => {
    // UI only – connect to backend API for real behavior
    console.log("Save mock record", {
      vehicleId,
      description,
      laborCost: parsedLabor,
      partsCost: parsedParts,
    });
  };

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: colors.background }}
      contentContainerStyle={{ padding: 16, paddingBottom: 32, gap: 16 }}
    >
      <View>
        <Text
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
        </Text>
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
          {/* <Badge tone={totalCost >= thresholds.highCost ? "warning" : "info"}>
            Total: {formatCurrency(totalCost)}
          </Badge> */}
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
                {vehicle.plate}
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

        <Button onPress={handleSaveMock}>Save record (mock)</Button>
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
              {(["all", "completed", "in_progress", "waiting_parts"] as StatusFilter[]).map(
                (value) => (
                  <Button
                    key={value}
                    size="sm"
                    variant={status === value ? "primary" : "secondary"}
                    onPress={() => setStatus(value)}
                  >
                    {value === "all"
                      ? "All"
                      : value === "completed"
                        ? "Completed"
                        : value === "waiting_parts"
                          ? "Waiting"
                          : "In progress"}
                  </Button>
                ),
              )}
            </View>
          </ScrollView>
        </View>

        <View style={{ marginTop: 8 }}>
          {filtered.map((record) => {
            const total = record.laborCost + record.partsCost;
            // const high = total >= thresholds.highCost;
            const tone =
              record.status === "completed"
                ? "success"
                : record.status === "waiting_parts"
                  ? "warning"
                  : "info";

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
                    <Text
                      style={{
                        fontSize: 12,
                        color: colors.foregroundMuted,
                      }}
                    >
                      {record.customerName}
                    </Text>
                  </View>
                  <Badge tone={tone}>
                    {record.status === "completed"
                      ? "Completed"
                      : record.status === "waiting_parts"
                        ? "Waiting parts"
                        : "In progress"}
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
                    // color: high ? "#B45309" : colors.foreground,
                  }}
                >
                  {formatCurrency(total)}
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


