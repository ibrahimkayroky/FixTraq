import api from "./client";

export const ServicesApi = {
  getAll: async () => {
    const res = await api.get("/services");
    return res.data;
  },

  create: async (payload: any) => {
    const res = await api.post("/services", payload);
    return res.data;
  },
};
