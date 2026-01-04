import { Slot, Tabs } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { View, Text } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { DashboardIcon, UsersIcon, CarIcon, WrenchIcon } from "../components/icons";

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <StatusBar style="dark" />
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: "#0F172A",
          tabBarInactiveTintColor: "#94A3B8",
          tabBarStyle: {
            backgroundColor: "#FFFFFF",
            borderTopColor: "#E2E8F0",
          },
          tabBarLabelStyle: {
            fontSize: 11,
            fontWeight: "600",
          },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Dashboard",
            tabBarIcon: ({ color }) => <DashboardIcon color={color} />,
          }}
        />
        <Tabs.Screen
          name="customers"
          options={{
            title: "Customers",
            tabBarIcon: ({ color }) => <UsersIcon color={color} />,
          }}
        />
        <Tabs.Screen
          name="vehicles"
          options={{
            title: "Vehicles",
            tabBarIcon: ({ color }) => <CarIcon color={color} />,
          }}
        />
        <Tabs.Screen
          name="services"
          options={{
            title: "Services",
            tabBarIcon: ({ color }) => <WrenchIcon color={color} />,
          }}
        />
      </Tabs>
      <Slot />
    </SafeAreaProvider>
  );
}


