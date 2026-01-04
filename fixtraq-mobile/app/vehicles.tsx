import { Card } from "../components/ui/Card";
import { Badge } from "../components/ui/Badge";
import { Button } from "../components/ui/Button";
import { colors } from "../theme";
import { customers, serviceRecords, vehicles } from "../data/mockData";
import { useState } from "react";
import { View, Text, ScrollView, TextInput } from "react-native";

export default function VehiclesScreen() {
  const [query, setQuery] = useState("");
  const filtered = vehicles.filter(
    (v) =>
      v.plate.toLowerCase().includes(query.toLowerCase()) ||
      v.model.toLowerCase().includes(query.toLowerCase()) ||
      v.ownerName.toLowerCase().includes(query.toLowerCase()),
  );

  const formatMileage = (m: number) => `${m.toLocaleString()} mi`;

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
          Vehicles
        </Text>
        <Text
          style={{
            fontSize: 12,
            color: colors.foregroundMuted,
            marginTop: 4,
          }}
        >
          Search by plate, model, or owner.
        </Text>
      </View>

      <Card
        style={{
          padding: 12,
          flexDirection: "row",
          alignItems: "center",
          gap: 8,
        }}
      >
        <TextInput
          placeholder="Search vehicles"
          placeholderTextColor="#9CA3AF"
          value={query}
          onChangeText={setQuery}
          style={{
            flex: 1,
            fontSize: 14,
            color: colors.foreground,
          }}
        />
      </Card>

      {filtered.map((vehicle) => {
        const owner = customers.find((c) => c.id === vehicle.ownerId);
        const statusTone =
          vehicle.status === "in_shop"
            ? ("warning" as const)
            : vehicle.status === "inactive"
              ? ("danger" as const)
              : ("info" as const);
        const statusLabel =
          vehicle.status === "in_shop"
            ? "In shop"
            : vehicle.status === "inactive"
              ? "Inactive"
              : "Active";

        return (
          <Card key={vehicle.id} style={{ padding: 14, gap: 8 }}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <View>
                <Text
                  style={{
                    fontSize: 15,
                    fontWeight: "700",
                    color: colors.foreground,
                  }}
                >
                  {vehicle.plate}
                </Text>
                <Text
                  style={{
                    fontSize: 12,
                    color: colors.foregroundMuted,
                    marginTop: 2,
                  }}
                >
                  {vehicle.model} • {vehicle.year}
                </Text>
              </View>
              <Badge tone={statusTone}>{statusLabel}</Badge>
            </View>

            <Text
              style={{
                fontSize: 12,
                color: colors.foregroundMuted,
              }}
            >
              Owner: {owner?.name ?? vehicle.ownerName}
            </Text>

            <Text
              style={{
                fontSize: 12,
                color: colors.foregroundMuted,
              }}
            >
              Mileage: {formatMileage(vehicle.mileage)}
            </Text>

            <View
              style={{
                flexDirection: "row",
                justifyContent: "flex-end",
                gap: 8,
                marginTop: 4,
              }}
            >
              <Button variant="ghost" size="sm">
                History
              </Button>
              <Button variant="ghost" size="sm">
                Edit
              </Button>
            </View>
          </Card>
        );
      })}

      {filtered.length === 0 && (
        <Card style={{ padding: 16 }}>
          <Text
            style={{
              fontSize: 13,
              color: colors.foregroundMuted,
            }}
          >
            No vehicles match your filters.
          </Text>
        </Card>
      )}

      <Card
        style={{
          padding: 14,
          flexDirection: "row",
          alignItems: "center",
          gap: 12,
        }}
      >
        <View
          style={{
            width: 32,
            height: 32,
            borderRadius: 999,
            backgroundColor: "#0F172A11",
          }}
        />
        <View style={{ flex: 1 }}>
          <Text
            style={{
              fontSize: 13,
              fontWeight: "600",
              color: colors.foreground,
            }}
          >
            Quick search
          </Text>
          <Text
            style={{
              fontSize: 12,
              color: colors.foregroundMuted,
            }}
          >
            Use the search bar to jump directly to any vehicle.
          </Text>
        </View>
      </Card>
    </ScrollView>
  );
}


