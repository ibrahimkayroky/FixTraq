import { useState } from "react";
import { ScrollView, View, Text, TextInput, Alert } from "react-native";
import { useRouter } from "expo-router";
import { Card } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { colors } from "../theme";
import { VehiclesApi } from "../src/vehicles.api";

type VehiclePayload = {
  plateNumber: string;
  type: string;
  model: string;
  year: number;
  mileage: number;
  status: "ACTIVE" | "INACTIVE" | "IN_SHOP";
  lastMaintenanceDate: string;
  // userName: string;
};

export default function CreateVehicleScreen() {
  const router = useRouter();

  const today = new Date().toISOString().slice(0, 10);

  const [form, setForm] = useState<VehiclePayload>({
    plateNumber: "",
    type: "",
    model: "",
    year: new Date().getFullYear(),
    mileage: 0,
    status: "ACTIVE",
    lastMaintenanceDate: today,
    // userName: "",
  });

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const updateField = <K extends keyof VehiclePayload>(key: K, value: VehiclePayload[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const validate = () => {
    if (!form.plateNumber.trim()) return "Plate number is required.";
    if (!form.type.trim()) return "Type is required.";
    if (!form.model.trim()) return "Model is required.";
    // if (!form.userName.trim()) return "Customer name is required.";
    if (!form.year || Number.isNaN(Number(form.year))) return "Year is required.";
    if (!form.status) return "Status is required.";
    if (!form.lastMaintenanceDate.trim()) return "Last maintenance date is required.";
    return null;
  };

  const onSubmit = async () => {
    const validationError = validate();
    if (validationError) {
      setError(validationError);
      setSuccess(null);
      return;
    }

    setSubmitting(true);
    setError(null);

    try {
      const payload: VehiclePayload = {
        ...form,
        year: Number(form.year),
        mileage: Number(form.mileage),
      };

      await VehiclesApi.create(payload);

      setSuccess("Vehicle created successfully.");
      Alert.alert("Success", "Vehicle created successfully.");
    } catch (e) {
      console.error("CREATE VEHICLE ERROR:", e);
      setError("Failed to create vehicle. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: colors.background }}
      contentContainerStyle={{ padding: 16, gap: 16 }}
    >
      <View>
        <Text
          style={{
            fontSize: 22,
            fontWeight: "700",
            color: colors.foreground,
          }}
        >
          Create Vehicle
        </Text>
        <Text
          style={{
            fontSize: 12,
            color: colors.foregroundMuted,
            marginTop: 4,
          }}
        >
          Enter details to add a new vehicle and link it to a customer.
        </Text>
      </View>

      {error && (
        <Card muted style={{ padding: 12 }}>
          <Text style={{ color: colors.danger, fontSize: 13 }}>{error}</Text>
        </Card>
      )}

      {success && (
        <Card muted style={{ padding: 12 }}>
          <Text style={{ color: colors.success, fontSize: 13 }}>
            {success}
          </Text>
          <View style={{ flexDirection: "row", gap: 8, marginTop: 8 }}>
            <Button
              size="sm"
              variant="secondary"
              onPress={() => router.push("/vehicles")}
            >
              View vehicles
            </Button>
          </View>
        </Card>
      )}

      <Card style={{ padding: 14, gap: 12 }}>
        <Text style={{ fontSize: 13, fontWeight: "600", color: colors.foreground }}>
          Vehicle details
        </Text>

        <TextInput
          placeholder="Plate number *"
          placeholderTextColor={colors.foregroundMuted}
          value={form.plateNumber}
          onChangeText={(text) => updateField("plateNumber", text)}
          style={{
            borderWidth: 1,
            borderColor: colors.border,
            borderRadius: 8,
            paddingHorizontal: 10,
            paddingVertical: 8,
            fontSize: 14,
            color: colors.foreground,
          }}
        />

        <TextInput
          placeholder="Type * (e.g., Volkswagen)"
          placeholderTextColor={colors.foregroundMuted}
          value={form.type}
          onChangeText={(text) => updateField("type", text)}
          style={{
            borderWidth: 1,
            borderColor: colors.border,
            borderRadius: 8,
            paddingHorizontal: 10,
            paddingVertical: 8,
            fontSize: 14,
            color: colors.foreground,
          }}
        />

        <TextInput
          placeholder="Model * (e.g., Passat)"
          placeholderTextColor={colors.foregroundMuted}
          value={form.model}
          onChangeText={(text) => updateField("model", text)}
          style={{
            borderWidth: 1,
            borderColor: colors.border,
            borderRadius: 8,
            paddingHorizontal: 10,
            paddingVertical: 8,
            fontSize: 14,
            color: colors.foreground,
          }}
        />

        <TextInput
          placeholder="Year *"
          placeholderTextColor={colors.foregroundMuted}
          keyboardType="numeric"
          value={String(form.year)}
          onChangeText={(text) => updateField("year", Number(text) || 0)}
          style={{
            borderWidth: 1,
            borderColor: colors.border,
            borderRadius: 8,
            paddingHorizontal: 10,
            paddingVertical: 8,
            fontSize: 14,
            color: colors.foreground,
          }}
        />

        <TextInput
          placeholder="Mileage"
          placeholderTextColor={colors.foregroundMuted}
          keyboardType="numeric"
          value={String(form.mileage)}
          onChangeText={(text) => updateField("mileage", Number(text) || 0)}
          style={{
            borderWidth: 1,
            borderColor: colors.border,
            borderRadius: 8,
            paddingHorizontal: 10,
            paddingVertical: 8,
            fontSize: 14,
            color: colors.foreground,
          }}
        />

        <TextInput
          placeholder="Status (ACTIVE / INACTIVE / IN_SHOP)"
          placeholderTextColor={colors.foregroundMuted}
          value={form.status}
          onChangeText={(text) =>
            updateField(
              "status",
              (text.toUpperCase() as VehiclePayload["status"]) || "ACTIVE",
            )
          }
          style={{
            borderWidth: 1,
            borderColor: colors.border,
            borderRadius: 8,
            paddingHorizontal: 10,
            paddingVertical: 8,
            fontSize: 14,
            color: colors.foreground,
          }}
        />

        <TextInput
          placeholder="Last maintenance date (YYYY-MM-DD)"
          placeholderTextColor={colors.foregroundMuted}
          value={form.lastMaintenanceDate}
          onChangeText={(text) => updateField("lastMaintenanceDate", text)}
          style={{
            borderWidth: 1,
            borderColor: colors.border,
            borderRadius: 8,
            paddingHorizontal: 10,
            paddingVertical: 8,
            fontSize: 14,
            color: colors.foreground,
          }}
        />

        <TextInput
          placeholder="Customer name *"
          placeholderTextColor={colors.foregroundMuted}
          // value={form.userName}
          // onChangeText={(text) => updateField("userName", text)}
          style={{
            borderWidth: 1,
            borderColor: colors.border,
            borderRadius: 8,
            paddingHorizontal: 10,
            paddingVertical: 8,
            fontSize: 14,
            color: colors.foreground,
          }}
        />
      </Card>

      <View style={{ flexDirection: "row", gap: 12 }}>
        <Button
          size="md"
          variant="primary"
          loading={submitting}
          onPress={onSubmit}
          style={{ flex: 1 }}
        >
          Save vehicle
        </Button>
        <Button
          size="md"
          variant="secondary"
          onPress={() => router.back()}
          style={{ flex: 1 }}
        >
          Cancel
        </Button>
      </View>
    </ScrollView>
  );
}


