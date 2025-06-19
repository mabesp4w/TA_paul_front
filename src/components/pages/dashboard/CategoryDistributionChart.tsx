/** @format */

// components/dashboard/CategoryDistributionChart.tsx

import React from "react";
import dynamic from "next/dynamic";
import { ApexOptions } from "apexcharts";
import { PopularCategory } from "@/types/DashboardTypes";

// Dynamic import untuk ApexCharts agar tidak error saat SSR
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

interface CategoryDistributionChartProps {
  categories: PopularCategory[];
  loading?: boolean;
}

const CategoryDistributionChart: React.FC<CategoryDistributionChartProps> = ({
  categories,
  loading = false,
}) => {
  // Prepare data untuk chart
  const chartData = categories.map((cat) => ({
    name: cat.category_nm,
    count: cat.book_count,
  }));

  const [chartType, setChartType] = React.useState<"bar" | "donut" | "treemap">(
    "bar"
  );

  // Sort by count descending dan ambil top 10
  const sortedData = chartData.sort((a, b) => b.count - a.count).slice(0, 10);

  const series =
    chartType === "donut"
      ? sortedData.map((item) => item.count)
      : [
          {
            name: "Jumlah Buku",
            data: sortedData.map((item) => item.count),
          },
        ];

  const labels = sortedData.map((item) => item.name);

  // Color palette yang lebih beragam untuk kategori
  const colors = [
    "#3B82F6",
    "#10B981",
    "#8B5CF6",
    "#F59E0B",
    "#EF4444",
    "#6B7280",
    "#EC4899",
    "#14B8A6",
    "#F97316",
    "#84CC16",
    "#6366F1",
    "#F43F5E",
    "#06B6D4",
    "#8B5A2B",
    "#7C3AED",
  ];

  const getChartOptions = (): ApexOptions => {
    const baseOptions: ApexOptions = {
      chart: {
        fontFamily: "Inter, sans-serif",
        toolbar: {
          show: false,
        },
      },
      colors,
      responsive: [
        {
          breakpoint: 640,
          options: {
            chart: {
              height: 300,
            },
          },
        },
      ],
      tooltip: {
        theme: "light",
        style: {
          fontSize: "14px",
        },
      },
    };

    switch (chartType) {
      case "donut":
        return {
          ...baseOptions,
          chart: {
            ...baseOptions.chart,
            type: "donut",
            height: 350,
          },
          labels,
          plotOptions: {
            pie: {
              donut: {
                size: "70%",
                labels: {
                  show: true,
                  name: {
                    show: true,
                    fontSize: "14px",
                    fontWeight: 600,
                  },
                  value: {
                    show: true,
                    fontSize: "20px",
                    fontWeight: 700,
                    formatter: (val: string) =>
                      `${parseInt(val).toLocaleString()}`,
                  },
                  total: {
                    show: true,
                    label: "Total Buku",
                    fontSize: "12px",
                    formatter: () => {
                      const total = (series as number[]).reduce(
                        (a, b) => a + b,
                        0
                      );
                      return total.toLocaleString();
                    },
                  },
                },
              },
            },
          },
          legend: {
            position: "bottom",
            fontSize: "12px",
          },
          dataLabels: {
            enabled: false,
          },
          tooltip: {
            y: {
              formatter: (val: number) => `${val.toLocaleString()} buku`,
            },
          },
        };

      case "treemap":
        return {
          ...baseOptions,
          chart: {
            ...baseOptions.chart,
            type: "treemap",
            height: 350,
          },
          plotOptions: {
            treemap: {
              enableShades: true,
              shadeIntensity: 0.5,
              reverseNegativeShade: true,
              colorScale: {
                ranges: sortedData.map((item, index) => ({
                  from: item.count,
                  to: item.count,
                  color: colors[index % colors.length],
                })),
              },
            },
          },
          tooltip: {
            y: {
              formatter: (val: number) => `${val.toLocaleString()} buku`,
            },
          },
        };

      default: // bar
        return {
          ...baseOptions,
          chart: {
            ...baseOptions.chart,
            type: "bar",
            height: 350,
          },
          plotOptions: {
            bar: {
              borderRadius: 8,
              horizontal: false,
              columnWidth: "60%",
              dataLabels: {
                position: "top",
              },
            },
          },
          dataLabels: {
            enabled: true,
            formatter: (val: number) => val.toLocaleString(),
            offsetY: -20,
            style: {
              fontSize: "12px",
              colors: ["#374151"],
            },
          },
          xaxis: {
            categories: labels,
            labels: {
              style: {
                fontSize: "12px",
              },
              rotate: -45,
            },
          },
          yaxis: {
            title: {
              text: "Jumlah Buku",
              style: {
                fontSize: "14px",
                fontWeight: 600,
              },
            },
            labels: {
              formatter: (val: number) => val.toLocaleString(),
            },
          },
          grid: {
            borderColor: "#E5E7EB",
          },
          tooltip: {
            y: {
              formatter: (val: number) => `${val.toLocaleString()} buku`,
            },
          },
        };
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-48 mb-6"></div>
          <div className="h-80 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  if (!categories || categories.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">
          Distribusi Kategori
        </h3>
        <div className="flex items-center justify-center h-80 text-gray-500">
          <div className="text-center">
            <p>Tidak ada data kategori</p>
          </div>
        </div>
      </div>
    );
  }

  const getChartTitle = () => {
    switch (chartType) {
      case "donut":
        return "Distribusi Kategori (Donut)";
      case "treemap":
        return "Peta Kategori (TreeMap)";
      default:
        return "Distribusi Kategori (Bar Chart)";
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">
          {getChartTitle()}
        </h3>
        <div className="text-sm text-gray-500">
          Top {Math.min(sortedData.length, 10)} kategori
        </div>
      </div>

      <div className="h-80">
        <Chart
          key={`chart-${chartType}`}
          options={getChartOptions()}
          series={series}
          type={chartType}
          height="100%"
        />
      </div>

      {/* Chart Type Switcher */}
      <div className="mt-6 pt-4 border-t border-gray-200">
        <div className="flex items-center justify-center space-x-2">
          <span className="text-sm text-gray-600 mr-3">Tampilan:</span>
          {(["bar", "donut"] as const).map((type) => (
            <button
              key={type}
              onClick={() => {
                setChartType(type);
              }}
              className={`px-3 py-1 text-xs rounded-md transition-colors duration-200 ${
                chartType === type
                  ? "bg-blue-100 text-blue-700 font-medium"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {type === "bar" ? "Bar" : type === "donut" ? "Donut" : "TreeMap"}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryDistributionChart;
