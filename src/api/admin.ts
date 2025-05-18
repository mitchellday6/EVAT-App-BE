// src/api/admin.ts
import axios from "./axios";

export const loginAdmin = (data: { username: string; password: string }) =>
  axios.post("/admin-auth/login", data);

export const verify2FA = (data: { username: string; code: string }) =>
  axios.post("/admin-auth/verify-2fa", data);

export const getUsers = () => axios.get("/admin/users");

export const deleteUser = (id: string) => axios.delete(`/admin/users/${id}`);

export const updateUser = (id: string, data: any) =>
  axios.put(`/admin/users/${id}`, data);

export const getLogs = () => axios.get("/admin/logs");

export const getInsights = () => axios.get("/admin/insights");

export const updateAdminCredentials = (data: { username?: string; password?: string }) =>
  axios.put("/admin-auth/update-credentials", data);
