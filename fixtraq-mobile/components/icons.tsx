import { Text } from "react-native";

// Minimal icon placeholders using text; replace with react-native-vector-icons if desired.

type IconProps = {
  color?: string;
};

export function DashboardIcon({ color = "#0F172A" }: IconProps) {
  return <Text style={{ color, fontSize: 18 }}>◆</Text>;
}

export function UsersIcon({ color = "#0F172A" }: IconProps) {
  return <Text style={{ color, fontSize: 18 }}>👥</Text>;
}

export function CarIcon({ color = "#0F172A" }: IconProps) {
  return <Text style={{ color, fontSize: 18 }}>🚗</Text>;
}

export function WrenchIcon({ color = "#0F172A" }: IconProps) {
  return <Text style={{ color, fontSize: 18 }}>🔧</Text>;
}


