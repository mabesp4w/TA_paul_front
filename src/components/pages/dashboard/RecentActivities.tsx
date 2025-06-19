/** @format */
"use client";
// components/dashboard/RecentActivities.tsx

import React from "react";
import { Activity, Bookmark, HighlighterIcon, BookOpen } from "lucide-react";
import { RecentActivity } from "@/types/DashboardTypes";
import moment from "moment";

interface RecentActivitiesProps {
  activities: RecentActivity[];
  loading?: boolean;
}

const RecentActivities: React.FC<RecentActivitiesProps> = ({
  activities,
  loading = false,
}) => {
  const getActivityIcon = (type: string) => {
    switch (type) {
      case "bookmark":
        return Bookmark;
      case "annotation":
        return HighlighterIcon;
      case "reading":
        return BookOpen;
      default:
        return Activity;
    }
  };

  const getActivityColor = (type: string) => {
    switch (type) {
      case "bookmark":
        return {
          bg: "bg-blue-100",
          text: "text-blue-600",
          dot: "bg-blue-500",
        };
      case "annotation":
        return {
          bg: "bg-yellow-100",
          text: "text-yellow-600",
          dot: "bg-yellow-500",
        };
      case "reading":
        return {
          bg: "bg-green-100",
          text: "text-green-600",
          dot: "bg-green-500",
        };
      default:
        return {
          bg: "bg-gray-100",
          text: "text-gray-600",
          dot: "bg-gray-500",
        };
    }
  };

  const getActivityLabel = (type: string) => {
    switch (type) {
      case "bookmark":
        return "Bookmark";
      case "annotation":
        return "Highlight";
      case "reading":
        return "Membaca";
      default:
        return "Aktivitas";
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-32 mb-6"></div>
          <div className="space-y-4">
            {Array.from({ length: 5 }).map((_, index) => (
              <div key={index} className="flex items-start space-x-4">
                <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                <div className="flex-1">
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2 mb-1"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/3"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!activities || activities.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">
          Aktivitas Terbaru
        </h3>
        <div className="flex items-center justify-center h-48 text-gray-500">
          <div className="text-center">
            <Activity className="w-12 h-12 mx-auto mb-2 opacity-50" />
            <p>Belum ada aktivitas</p>
            <p className="text-sm mt-1">
              Mulai membaca untuk melihat aktivitas
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">
          Aktivitas Terbaru
        </h3>
        <Activity className="w-5 h-5 text-gray-400" />
      </div>

      <div className="space-y-4">
        {activities.map((activity, index) => {
          const Icon = getActivityIcon(activity.type);
          const colors = getActivityColor(activity.type);
          const isLast = index === activities.length - 1;

          return (
            <div
              key={`${activity.type}-${activity.timestamp}-${index}`}
              className="relative"
            >
              <div className="flex items-start space-x-4">
                {/* Timeline dot and line */}
                <div className="relative flex-shrink-0">
                  <div
                    className={`w-10 h-10 ${colors.bg} rounded-full flex items-center justify-center`}
                  >
                    <Icon className={`w-5 h-5 ${colors.text}`} />
                  </div>
                  {!isLast && (
                    <div className="absolute top-10 left-5 w-px h-8 bg-gray-200"></div>
                  )}
                </div>

                {/* Activity content */}
                <div className="flex-1 min-w-0 pb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${colors.bg} ${colors.text}`}
                    >
                      {getActivityLabel(activity.type)}
                    </span>
                    <span className="text-xs text-gray-500">
                      {moment(activity.timestamp).fromNow()}
                    </span>
                  </div>

                  <h4 className="text-sm font-medium text-gray-900 mb-1">
                    {activity.title}
                  </h4>

                  <p className="text-sm text-gray-600 mb-2">
                    dalam{" "}
                    <span className="font-medium">{activity.book_title}</span>
                  </p>

                  {/* Activity details */}
                  {activity.details && (
                    <div className="mt-2">
                      {activity.type === "annotation" &&
                        activity.details.text && (
                          <div className="bg-gray-50 rounded-md p-3 border-l-4 border-yellow-400">
                            <p className="text-sm text-gray-700 italic">
                              &quot;{activity.details.text.substring(0, 100)}
                              &quot;
                            </p>
                            {activity.details.note && (
                              <p className="text-xs text-gray-600 mt-1">
                                Catatan: {activity.details.note}
                              </p>
                            )}
                          </div>
                        )}

                      {activity.type === "reading" &&
                        activity.details.completion_percentage && (
                          <div className="flex items-center text-sm text-gray-600">
                            <div className="w-16 h-2 bg-gray-200 rounded-full mr-2">
                              <div
                                className="h-full bg-green-500 rounded-full"
                                style={{
                                  width: `${Math.min(
                                    activity.details.completion_percentage,
                                    100
                                  )}%`,
                                }}
                              />
                            </div>
                            <span>
                              {activity.details.completion_percentage.toFixed(
                                1
                              )}
                              %
                            </span>
                          </div>
                        )}

                      {activity.details.file_type && (
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-700 mt-2">
                          {activity.details.file_type.toUpperCase()}
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* View All Activities Button */}
      <div className="mt-6 pt-4 border-t border-gray-200">
        <button className="w-full text-sm text-blue-600 hover:text-blue-800 font-medium transition-colors duration-200">
          Lihat Semua Aktivitas →
        </button>
      </div>
    </div>
  );
};

export default RecentActivities;
