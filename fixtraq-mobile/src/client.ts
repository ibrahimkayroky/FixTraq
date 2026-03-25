import axios from "axios";
import { Platform } from "react-native";

// Use host that is reachable from the mobile runtime:
// - Android emulator: 10.0.2.2 points to the host machine
// - Web / other: localhost works
const baseURL =
  Platform.OS === "android"
    ? "http://10.0.2.2:8080/api"
    : "http://localhost:8080/api";

const api = axios.create({
  baseURL,
  timeout: 20000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
