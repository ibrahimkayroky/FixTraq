import api from "./client";

export const VehiclesApi = {
  getAll: async () => {
    const res = await api.get("/vehicles");
    return res.data;
  },

  create: async (payload: any) => {
    const res = await api.post("/vehicles", payload);
    return res.data;
  },
};
