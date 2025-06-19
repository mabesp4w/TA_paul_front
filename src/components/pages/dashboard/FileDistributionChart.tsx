/** @format */

// components/dashboard/FileDistributionChart.tsx

import React from "react";
import dynamic from "next/dynamic";
import { ApexOptions } from "apexcharts";

// Dynamic import untuk ApexCharts agar tidak error saat SSR
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

interface FileDistributionChartProps {
  distribution: Record<string, number>;
  loading?: boolean;
}

const FileDistributionChart: React.FC<FileDistributionChartProps> = ({
  distribution,
  loading = false,
}) => {
  // Prepare data untuk chart
  const chartData = Object.entries(distribution).map(([type, count]) => ({
    label: type.toUpperCase(),
    value: count,
  }));

  const series = chartData.map((item) => item.value);
  const labels = chartData.map((item) => item.label);

  // Color palette untuk berbagai file types
  const colors = [
    "#3B82F6",
    "#10B981",
    "#8B5CF6",
    "#F59E0B",
    "#EF4444",
    "#6B7280",
  ];

  const options: ApexOptions = {
    chart: {
      type: "donut",
      height: 350,
      fontFamily: "Inter, sans-serif",
    },
    labels,
    colors,
    responsive: [
      {
        breakpoint: 640,
        options: {
          chart: {
            height: 280,
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],
    legend: {
      position: "right",
      offsetY: 0,
      height: 230,
      fontSize: "14px",
      itemMargin: {
        horizontal: 5,
        vertical: 8,
      },
    },
    plotOptions: {
      pie: {
        donut: {
          size: "65%",
          labels: {
            show: true,
            name: {
              show: true,
              fontSize: "16px",
              fontWeight: 600,
              color: "#374151",
            },
            value: {
              show: true,
              fontSize: "24px",
              fontWeight: 700,
              color: "#111827",
              formatter: (val: string) => `${parseInt(val).toLocaleString()}`,
            },
            total: {
              show: true,
              showAlways: false,
              label: "Total File",
              fontSize: "14px",
              color: "#6B7280",
              formatter: () => {
                const total = series.reduce((a, b) => a + b, 0);
                return total.toLocaleString();
              },
            },
          },
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    tooltip: {
      theme: "light",
      style: {
        fontSize: "14px",
      },
      y: {
        formatter: (val: number) => `${val.toLocaleString()} file`,
      },
    },
    stroke: {
      width: 2,
      colors: ["#ffffff"],
    },
  };

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-48 mb-6"></div>
          <div className="h-64 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  if (!distribution || Object.keys(distribution).length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">
          Distribusi Tipe File
        </h3>
        <div className="flex items-center justify-center h-64 text-gray-500">
          <div className="text-center">
            <p>Tidak ada data file</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">
          Distribusi Tipe File
        </h3>
        <div className="text-sm text-gray-500">
          Total: {series.reduce((a, b) => a + b, 0).toLocaleString()} file
        </div>
      </div>

      <div className="h-80">
        <Chart options={options} series={series} type="donut" height="100%" />
      </div>
    </div>
  );
};

export default FileDistributionChart;
