import { Card } from "../components/ui/Card";
import { Badge } from "../components/ui/Badge";
import { Button } from "../components/ui/Button";
import { colors } from "../theme";
import { customers, vehicles } from "../data/mockData";
import { useState } from "react";
import { View, Text, ScrollView, TextInput } from "react-native";

export default function CustomersScreen() {
  const [query, setQuery] = useState("");
  const filtered = customers.filter(
    (c) =>
      c.name.toLowerCase().includes(query.toLowerCase()) ||
      c.phone.toLowerCase().includes(query.toLowerCase()) ||
      c.email.toLowerCase().includes(query.toLowerCase()),
  );

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
          Customers
        </Text>
        <Text
          style={{
            fontSize: 12,
            color: colors.foregroundMuted,
            marginTop: 4,
          }}
        >
          Manage customer records and their vehicles.
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
          placeholder="Search by name, phone, or email"
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

      {filtered.map((customer) => {
        const count =
          vehicles.filter((v) => v.ownerId === customer.id).length ||
          customer.vehicles;
        return (
          <Card
            key={customer.id}
            style={{ padding: 14, gap: 8, backgroundColor: colors.surface }}
          >
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
                    fontWeight: "600",
                    color: colors.foreground,
                  }}
                >
                  {customer.name}
                </Text>
                <Text
                  style={{
                    fontSize: 12,
                    color: colors.foregroundMuted,
                    marginTop: 2,
                  }}
                >
                  {customer.email}
                </Text>
              </View>
              <Badge tone="info">{count} vehicles</Badge>
            </View>

            <Text
              style={{
                fontSize: 12,
                color: colors.foregroundMuted,
              }}
            >
              {customer.phone}
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
                Vehicles
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
            No customers match your search. Try a different name or phone.
          </Text>
        </Card>
      )}
    </ScrollView>
  );
}


