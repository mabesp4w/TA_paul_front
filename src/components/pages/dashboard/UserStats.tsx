/** @format */

// components/dashboard/UserStats.tsx

import React from "react";
import {
  Target,
  BookOpen,
  Bookmark,
  HighlighterIcon,
  FolderOpen,
  TrendingUp,
} from "lucide-react";
import { UserStats as UserStatsType } from "@/types/DashboardTypes";

interface UserStatsProps {
  stats: UserStatsType;
  loading?: boolean;
}

const UserStats: React.FC<UserStatsProps> = ({ stats, loading = false }) => {
  // Progress ring component
  const ProgressRing = ({
    percentage,
    size = 80,
    strokeWidth = 8,
    color = "#3B82F6",
  }: {
    percentage: number;
    size?: number;
    strokeWidth?: number;
    color?: string;
  }) => {
    const radius = (size - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;
    const strokeDasharray = circumference;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;

    return (
      <div className="relative" style={{ width: size, height: size }}>
        <svg className="transform -rotate-90" width={size} height={size}>
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="#E5E7EB"
            strokeWidth={strokeWidth}
            fill="transparent"
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={color}
            strokeWidth={strokeWidth}
            fill="transparent"
            strokeDasharray={strokeDasharray}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="transition-all duration-500 ease-out"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-lg font-bold text-gray-900">
            {Math.round(percentage)}%
          </span>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-32 mb-6"></div>
          <div className="grid grid-cols-2 gap-4 mb-6">
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-16 mx-auto mb-1"></div>
                <div className="h-3 bg-gray-200 rounded w-12 mx-auto"></div>
              </div>
            ))}
          </div>
          <div className="h-20 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  const statsData = [
    {
      title: "Koleksi",
      value: stats.collections_count,
      icon: FolderOpen,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
    },
    {
      title: "Bookmark",
      value: stats.bookmarks_count,
      icon: Bookmark,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      title: "Highlight",
      value: stats.annotations_count,
      icon: HighlighterIcon,
      color: "text-yellow-600",
      bgColor: "bg-yellow-100",
    },
    {
      title: "Selesai",
      value: stats.books_completed,
      icon: Target,
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Statistik Saya</h3>
        <TrendingUp className="w-5 h-5 text-gray-400" />
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        {statsData.map((stat, index) => (
          <div key={index} className="text-center">
            <div
              className={`${stat.bgColor} w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2`}
            >
              <stat.icon className={`w-6 h-6 ${stat.color}`} />
            </div>
            <p className="text-2xl font-bold text-gray-900">
              {stat.value.toLocaleString()}
            </p>
            <p className="text-sm text-gray-600">{stat.title}</p>
          </div>
        ))}
      </div>

      {/* Reading Progress */}
      <div className="border-t border-gray-200 pt-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h4 className="text-sm font-semibold text-gray-900">
              Progress Rata-rata
            </h4>
            <p className="text-xs text-gray-600">
              Dari {stats.books_in_progress} buku sedang dibaca
            </p>
          </div>
          <ProgressRing
            percentage={stats.avg_completion_percentage}
            size={60}
            strokeWidth={6}
            color="#10B981"
          />
        </div>

        {/* Reading Stats */}
        <div className="grid grid-cols-2 gap-4 text-center">
          <div className="bg-green-50 rounded-lg p-3">
            <div className="flex items-center justify-center mb-1">
              <BookOpen className="w-4 h-4 text-green-600 mr-1" />
              <span className="text-lg font-bold text-green-900">
                {stats.books_in_progress}
              </span>
            </div>
            <p className="text-xs text-green-700">Sedang Dibaca</p>
          </div>

          <div className="bg-blue-50 rounded-lg p-3">
            <div className="flex items-center justify-center mb-1">
              <Target className="w-4 h-4 text-blue-600 mr-1" />
              <span className="text-lg font-bold text-blue-900">
                {stats.books_completed}
              </span>
            </div>
            <p className="text-xs text-blue-700">Selesai Dibaca</p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-6 pt-4 border-t border-gray-200 space-y-2">
        <button className="w-full bg-blue-50 text-blue-600 text-sm font-medium py-2 px-4 rounded-lg hover:bg-blue-100 transition-colors duration-200">
          Lihat Detail Progress
        </button>
        <button className="w-full text-gray-600 text-sm font-medium py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors duration-200">
          Kelola Koleksi
        </button>
      </div>
    </div>
  );
};

export default UserStats;
