import axios from "axios";
import { useAuthStore } from "../stores/auth";

const API_BASE = "http://localhost:8000/api";

export async function getProfile() {
  const authStore = useAuthStore();
  const response = await axios.get(`${API_BASE}/profile`, {
    headers: { Authorization: `Bearer ${authStore.token}` },
  });
  return response.data.data || response.data;
}

export async function updateProfile(data) {
  const authStore = useAuthStore();

  console.log("Token:", authStore.token); // Debug line
  console.log("Auth header:", `Bearer ${authStore.token}`); // Debug line

  if (!authStore.token) {
    throw new Error("No authentication token found");
  }

  const response = await axios.put(`${API_BASE}/profile`, data, {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  return response.data.data || response.data;
}
