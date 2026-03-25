import api from "./client";

export const UsersApi = {
  getAll: async () => {
    const res = await api.get("/users");
    return res.data;
  },

  create: async (payload: any) => {
    const res = await api.post("/users", payload);
    return res.data;
  },
};


