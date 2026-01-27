import { useState } from "react";
import { ScrollView, View, Text, TextInput, Alert } from "react-native";
import { useRouter } from "expo-router";
import { Card } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { colors } from "../theme";
import { UsersApi } from "../src/users.api";

type Role = "ADMIN" | "MECHANIC";

type UserPayload = {
  id: number;
  name: string;
  email: string;
  phone: string;
  password: string;
  role: Role;
};

export default function CreateCustomerScreen() {
  const router = useRouter();

  const [form, setForm] = useState<UserPayload>({
    id: 0,
    name: "",
    email: "",
    phone: "",
    password: "",
    role: "MECHANIC",
  });

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const updateField = <K extends keyof UserPayload>(key: K, value: UserPayload[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const validate = () => {
    if (!form.name.trim()) return "Name is required.";
    if (!form.email.trim()) return "Email is required.";
    if (!form.phone.trim()) return "Phone is required.";
    if (!form.password.trim()) return "Password is required.";
    if (!form.role) return "Role is required.";
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
      const payload: UserPayload = {
        ...form,
      };

      await UsersApi.create(payload);

      setSuccess("Customer created successfully.");
      Alert.alert("Success", "Customer created successfully.");
    } catch (e) {
      console.error("CREATE CUSTOMER ERROR:", e);
      setError("Failed to create customer. Please try again.");
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
          Create Customer
        </Text>
        <Text
          style={{
            fontSize: 12,
            color: colors.foregroundMuted,
            marginTop: 4,
          }}
        >
          Enter details to add a new customer.
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
              onPress={() => router.push("/customers")}
            >
              View customers
            </Button>
          </View>
        </Card>
      )}

      <Card style={{ padding: 14, gap: 12 }}>
        <Text style={{ fontSize: 13, fontWeight: "600", color: colors.foreground }}>
          Customer details
        </Text>

        <TextInput
          placeholder="Name *"
          placeholderTextColor={colors.foregroundMuted}
          value={form.name}
          onChangeText={(text) => updateField("name", text)}
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
          placeholder="Email *"
          placeholderTextColor={colors.foregroundMuted}
          value={form.email}
          keyboardType="email-address"
          autoCapitalize="none"
          onChangeText={(text) => updateField("email", text)}
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
          placeholder="Phone *"
          placeholderTextColor={colors.foregroundMuted}
          value={form.phone}
          keyboardType="phone-pad"
          onChangeText={(text) => updateField("phone", text)}
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
          placeholder="Password *"
          placeholderTextColor={colors.foregroundMuted}
          value={form.password}
          secureTextEntry
          onChangeText={(text) => updateField("password", text)}
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
          placeholder="Role (ADMIN / MECHANIC)"
          placeholderTextColor={colors.foregroundMuted}
          value={form.role}
          autoCapitalize="characters"
          onChangeText={(text) =>
            updateField(
              "role",
              (text.toUpperCase() as Role) || "MECHANIC",
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
      </Card>

      <View style={{ flexDirection: "row", gap: 12 }}>
        <Button
          size="md"
          variant="primary"
          loading={submitting}
          onPress={onSubmit}
          style={{ flex: 1 }}
        >
          Save customer
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


