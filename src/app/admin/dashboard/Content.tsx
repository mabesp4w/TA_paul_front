/** @format */

// pages/dashboard.tsx
"use client";
import React, { useEffect, useState } from "react";
import { RefreshCw } from "lucide-react";
import { toast } from "react-hot-toast";
import Cookies from "js-cookie";

// Store
import useDashboardApi from "@/stores/api/useDashboardApi";

// Components
import FileDistributionChart from "@/components/pages/dashboard/FileDistributionChart";
import RecentBooks from "@/components/pages/dashboard/RecentBooks";
import CategoryDistributionChart from "@/components/pages/dashboard/CategoryDistributionChart";

const DashboardPage: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [lastRefresh, setLastRefresh] = useState<Date>(new Date());

  const {
    dashboardData,
    loading,
    error,
    fetchDashboard,
    fetchUserDashboard,
    refreshDashboard,
    clearError,
    lastUpdated,
  } = useDashboardApi();

  // Check authentication status
  useEffect(() => {
    const token = Cookies.get("token");

    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  console.log({ lastRefresh });

  // Fetch dashboard data on mount
  useEffect(() => {
    const loadDashboard = async () => {
      try {
        await fetchDashboard();

        // Fetch user dashboard if authenticated
        if (isAuthenticated) {
          await fetchUserDashboard();
        }
      } catch (error) {
        console.error("Error loading dashboard:", error);
      }
    };

    loadDashboard();
  }, [isAuthenticated, fetchDashboard, fetchUserDashboard]);

  // Handle refresh
  const handleRefresh = async () => {
    try {
      setLastRefresh(new Date());
      await refreshDashboard();
      toast.success("Dashboard berhasil diperbarui");
    } catch (error) {
      console.log({ error });
      toast.error("Gagal memperbarui dashboard");
    }
  };

  // Clear error when user acknowledges it
  useEffect(() => {
    if (error) {
      toast.error(error);
      clearError();
    }
  }, [error, clearError]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Selamat Datang Admin
              </h1>
              {lastUpdated && (
                <p className="text-sm text-gray-500">
                  Terakhir diperbarui: {lastUpdated.toLocaleTimeString("id-ID")}
                </p>
              )}
            </div>

            <div className="flex items-center space-x-4">
              {/* Refresh Button */}
              <button
                onClick={handleRefresh}
                disabled={loading}
                className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
              >
                <RefreshCw
                  className={`w-4 h-4 mr-2 ${loading ? "animate-spin" : ""}`}
                />
                Refresh
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {dashboardData ? (
          <>
            {/* Main Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              {/* Left Column */}
              <div className="space-y-8">
                {/* File Distribution Chart */}
                <FileDistributionChart
                  distribution={dashboardData.file_type_distribution}
                  loading={loading}
                />
              </div>

              {/* Category Distribution Chart */}
              <CategoryDistributionChart
                categories={dashboardData.popular_categories || []}
                loading={loading}
              />
              <div className="lg:col-span-2">
                {/* Recent Books */}
                <RecentBooks
                  books={dashboardData.recent_books || []}
                  loading={loading}
                />
              </div>
            </div>
          </>
        ) : loading ? (
          // Loading state
          <div className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <FileDistributionChart distribution={{}} loading={true} />
              </div>
              <div>
                <RecentBooks books={[]} loading={true} />
              </div>
            </div>
          </div>
        ) : (
          // Error state
          <div className="text-center py-12">
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto">
              <h3 className="text-lg font-semibold text-red-900 mb-2">
                Gagal Memuat Dashboard
              </h3>
              <p className="text-red-700 text-sm mb-4">
                Terjadi kesalahan saat memuat data dashboard.
              </p>
              <button
                onClick={handleRefresh}
                className="bg-red-600 text-white text-sm font-medium py-2 px-4 rounded-lg hover:bg-red-700 transition-colors duration-200"
              >
                Coba Lagi
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default DashboardPage;
