import { defineStore } from "pinia";
import axios from "axios";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null,
    token: localStorage.getItem("token") || null,
  }),

  getters: {
    isAuthenticated: (state) => !!state.token,
    currentUser: (state) => state.user,
  },

  actions: {
    async login(credentials) {
      try {
        const response = await axios.post(
          "http://localhost:8000/api/login",
          credentials
        );

        console.log("Login response:", response.data);

        const token = response.data.data?.token || response.data;

        console.log("Token:", token);

        if (!token) {
          throw new Error("Token not found in response");
        }

        this.token = token;
        localStorage.setItem("token", token);

        try {
          const profileResponse = await axios.get(
            "http://localhost:8000/api/profile",
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          console.log("Profile response:", profileResponse.data);

          const user = profileResponse.data.data || profileResponse.data;
          console.log("User:", user);

          this.user = user;
          localStorage.setItem("user", JSON.stringify(user));
        } catch (profileError) {
          console.error("Failed to fetch profile:", profileError);
          this.user = null;
          localStorage.removeItem("user");
        }

        return response.data;
      } catch (error) {
        console.error("Login error:", error);
        throw error;
      }
    },

    async register(userData) {
      try {
        const response = await axios.post(
          "http://localhost:8000/api/register",
          userData
        );

        console.log("Register response:", response.data);

        const { token, user } = response.data.data;

        console.log("Token:", token);
        console.log("User:", user);

        this.token = token;
        this.user = user;

        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));

        return response.data;
      } catch (error) {
        console.error("Register error:", error);
        throw error;
      }
    },

    logout() {
      this.token = null;
      this.user = null;

      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },

    checkAuth() {
      const token = localStorage.getItem("token");
      const userStr = localStorage.getItem("user");

      console.log("CheckAuth - Token:", token);
      console.log("CheckAuth - User string:", userStr);

      if (token && userStr && userStr !== "undefined" && userStr !== "null") {
        try {
          this.token = token;
          this.user = JSON.parse(userStr);
          console.log("CheckAuth - Parsed user:", this.user);
        } catch (error) {
          console.error("CheckAuth - JSON parse error:", error);
          this.logout();
        }
      } else {
        console.log("CheckAuth - No valid auth data, logging out");
        this.logout();
      }
    },
  },
});
