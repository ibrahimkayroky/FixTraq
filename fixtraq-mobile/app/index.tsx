import { Card } from "../components/ui/Card";
import { Badge } from "../components/ui/Badge";
import { Button } from "../components/ui/Button";
import { colors } from "../theme";
import { customers, serviceRecords, vehicles } from "../data/mockData";
import { View, Text, ScrollView } from "react-native";

const totals = {
  customers: customers.length,
  vehicles: vehicles.length,
  services: serviceRecords.length,
  revenue: serviceRecords.reduce(
    (sum, r) => sum + r.laborCost + r.partsCost,
    0,
  ),
};

const thresholds = {
  highCost: 1200,
};

export default function DashboardScreen() {
  const recentRecords = [...serviceRecords].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );

  const formatCurrency = (value: number) =>
    `$${value.toLocaleString("en-US", { maximumFractionDigits: 0 })}`;

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: colors.background }}
      contentContainerStyle={{ padding: 16, paddingBottom: 32, gap: 16 }}
    >
      <View style={{ marginBottom: 4 }}>
        <Text
          style={{
            fontSize: 12,
            letterSpacing: 2,
            textTransform: "uppercase",
            color: colors.foregroundMuted,
            fontWeight: "600",
          }}
        >
          FixTraq Control
        </Text>
        <Text
          style={{
            fontSize: 22,
            fontWeight: "700",
            color: colors.foreground,
            marginTop: 2,
          }}
        >
          Dashboard
        </Text>
      </View>

      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          gap: 12,
        }}
      >
        <StatCard label="Customers" value={totals.customers} />
        <StatCard label="Vehicles" value={totals.vehicles} />
        <StatCard label="Service Records" value={totals.services} />
        <StatCard
          label="Total Revenue"
          valueLabel={formatCurrency(totals.revenue)}
          emphasis
        />
      </View>

      <Card style={{ padding: 16, gap: 12 }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <View>
            <Text
              style={{
                fontSize: 15,
                fontWeight: "600",
                color: colors.foreground,
              }}
            >
              Recent Service Records
            </Text>
            <Text
              style={{
                fontSize: 12,
                color: colors.foregroundMuted,
                marginTop: 2,
              }}
            >
              Highlighting services above {formatCurrency(thresholds.highCost)}.
            </Text>
          </View>
          <Badge tone="warning">High cost</Badge>
        </View>

        {recentRecords.map((record) => {
          const total = record.laborCost + record.partsCost;
          const high = total >= thresholds.highCost;
          return (
            <View
              key={record.id}
              style={{
                paddingVertical: 10,
                borderTopWidth: 1,
                borderTopColor: "#E5E7EB",
                flexDirection: "row",
                justifyContent: "space-between",
                gap: 12,
              }}
            >
              <View style={{ flex: 1, gap: 4 }}>
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: "600",
                    color: colors.foreground,
                  }}
                >
                  {record.customerName}
                </Text>
                <Text
                  style={{
                    fontSize: 12,
                    color: colors.foregroundMuted,
                  }}
                  numberOfLines={2}
                >
                  {record.vehiclePlate} • {record.vehicleModel}
                </Text>
                <Text
                  style={{
                    fontSize: 12,
                    color: colors.foregroundMuted,
                  }}
                  numberOfLines={2}
                >
                  {record.description}
                </Text>
              </View>
              <View style={{ alignItems: "flex-end", gap: 4 }}>
                <Text
                  style={{
                    fontSize: 13,
                    fontWeight: "700",
                    color: high ? "#B45309" : colors.foreground,
                  }}
                >
                  {formatCurrency(total)}
                </Text>
                <Text
                  style={{
                    fontSize: 11,
                    color: colors.foregroundMuted,
                  }}
                >
                  L {formatCurrency(record.laborCost)} • P{" "}
                  {formatCurrency(record.partsCost)}
                </Text>
                <Badge
                  tone={
                    record.status === "completed"
                      ? "success"
                      : record.status === "waiting_parts"
                        ? "warning"
                        : "info"
                  }
                >
                  {record.status === "completed"
                    ? "Completed"
                    : record.status === "waiting_parts"
                      ? "Waiting parts"
                      : "In progress"}
                </Badge>
              </View>
            </View>
          );
        })}

        <Button variant="secondary">View all service records</Button>
      </Card>
    </ScrollView>
  );
}

type StatProps = {
  label: string;
  value?: number;
  valueLabel?: string;
  emphasis?: boolean;
};

function StatCard({ label, value, valueLabel, emphasis }: StatProps) {
  return (
    <Card
      style={{
        padding: 14,
        width: "47%",
        backgroundColor: emphasis ? colors.primary : colors.surface,
      }}
    >
      <Text
        style={{
          fontSize: 12,
          color: emphasis ? "#CBD5F5" : colors.foregroundMuted,
          fontWeight: "500",
        }}
      >
        {label}
      </Text>
      <Text
        style={{
          fontSize: 20,
          fontWeight: "700",
          marginTop: 4,
          color: emphasis ? "#FFFFFF" : colors.foreground,
        }}
      >
        {valueLabel ?? value?.toLocaleString()}
      </Text>
    </Card>
  );
}


