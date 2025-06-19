/** @format */

// store/useDashboardApi.ts

import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { api } from "@/services/baseURL";
import { DashboardData, UserDashboardData } from "@/types/DashboardTypes";
import Cookies from "js-cookie";

const token = Cookies.get("token");

type DashboardStore = {
  // State
  dashboardData: DashboardData | null;
  userDashboardData: UserDashboardData | null;
  loading: boolean;
  error: string | null;
  lastUpdated: Date | null;

  // Actions
  fetchDashboard: () => Promise<{
    status: string;
    data?: DashboardData;
    error?: any;
  }>;

  fetchUserDashboard: () => Promise<{
    status: string;
    data?: UserDashboardData;
    error?: any;
  }>;

  refreshDashboard: () => Promise<void>;
  clearError: () => void;
  resetDashboard: () => void;
};

const useDashboardApi = create(
  devtools<DashboardStore>((set, get) => ({
    // Initial state
    dashboardData: null,
    userDashboardData: null,
    loading: false,
    error: null,
    lastUpdated: null,

    // Fetch general dashboard data
    fetchDashboard: async () => {
      set({ loading: true, error: null });

      try {
        const headers: Record<string, string> = {
          "Content-Type": "application/json",
        };

        // Add auth header if token exists
        if (token) {
          headers.Authorization = `Bearer ${token}`;
        }

        const response = await api({
          method: "get",
          url: `/dashboard/`,
          headers,
        });

        if (response.data.status === "success") {
          set((state) => ({
            ...state,
            dashboardData: response.data.data,
            loading: false,
            lastUpdated: new Date(),
            error: null,
          }));

          return {
            status: "success",
            data: response.data.data,
          };
        } else {
          throw new Error(
            response.data.message || "Failed to fetch dashboard data"
          );
        }
      } catch (error: any) {
        const errorMessage =
          error.response?.data?.message || error.message || "An error occurred";

        set((state) => ({
          ...state,
          loading: false,
          error: errorMessage,
        }));

        return {
          status: "error",
          error: error.response?.data || error,
        };
      }
    },

    // Fetch user-specific dashboard data
    fetchUserDashboard: async () => {
      if (!token) {
        return {
          status: "error",
          error: { message: "Authentication required" },
        };
      }

      set({ loading: true, error: null });

      try {
        const response = await api({
          method: "get",
          url: `/dashboard/user/`,
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (response.data.status === "success") {
          set((state) => ({
            ...state,
            userDashboardData: response.data.data,
            loading: false,
            lastUpdated: new Date(),
            error: null,
          }));

          return {
            status: "success",
            data: response.data.data,
          };
        } else {
          throw new Error(
            response.data.message || "Failed to fetch user dashboard data"
          );
        }
      } catch (error: any) {
        const errorMessage =
          error.response?.data?.message || error.message || "An error occurred";

        set((state) => ({
          ...state,
          loading: false,
          error: errorMessage,
        }));

        return {
          status: "error",
          error: error.response?.data || error,
        };
      }
    },

    // Refresh both dashboard data
    refreshDashboard: async () => {
      const { fetchDashboard, fetchUserDashboard } = get();

      // Always fetch general dashboard
      await fetchDashboard();

      // Fetch user dashboard if authenticated
      if (token) {
        await fetchUserDashboard();
      }
    },

    // Clear error state
    clearError: () => {
      set({ error: null });
    },

    // Reset all dashboard data
    resetDashboard: () => {
      set({
        dashboardData: null,
        userDashboardData: null,
        loading: false,
        error: null,
        lastUpdated: null,
      });
    },
  }))
);

export default useDashboardApi;
