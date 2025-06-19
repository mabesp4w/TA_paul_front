/** @format */

// components/dashboard/ReadingProgress.tsx

import React from "react";
import Image from "next/image";
import { BookOpen, Clock, FileText } from "lucide-react";
import { ReadingProgressSummary } from "@/types/DashboardTypes";
import moment from "moment";

interface ReadingProgressProps {
  progress: ReadingProgressSummary[];
  loading?: boolean;
}

const ReadingProgress: React.FC<ReadingProgressProps> = ({
  progress,
  loading = false,
}) => {
  const getProgressColor = (percentage: number) => {
    if (percentage >= 80) return "bg-green-500";
    if (percentage >= 50) return "bg-blue-500";
    if (percentage >= 25) return "bg-yellow-500";
    return "bg-gray-400";
  };

  const getProgressBgColor = (percentage: number) => {
    if (percentage >= 80) return "bg-green-100";
    if (percentage >= 50) return "bg-blue-100";
    if (percentage >= 25) return "bg-yellow-100";
    return "bg-gray-100";
  };

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-40 mb-6"></div>
          <div className="space-y-4">
            {Array.from({ length: 5 }).map((_, index) => (
              <div key={index} className="flex items-center space-x-4">
                <div className="w-12 h-16 bg-gray-200 rounded"></div>
                <div className="flex-1">
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2 mb-2"></div>
                  <div className="h-2 bg-gray-200 rounded w-full"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!progress || progress.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">
          Progress Membaca
        </h3>
        <div className="flex items-center justify-center h-48 text-gray-500">
          <div className="text-center">
            <BookOpen className="w-12 h-12 mx-auto mb-2 opacity-50" />
            <p>Belum ada progress membaca</p>
            <p className="text-sm mt-1">Mulai membaca untuk melihat progress</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">
          Progress Membaca
        </h3>
        <BookOpen className="w-5 h-5 text-gray-400" />
      </div>

      <div className="space-y-4">
        {progress.map((item) => (
          <div
            key={item.id}
            className="flex items-start space-x-4 p-4 rounded-lg hover:bg-gray-50 transition-colors duration-200"
          >
            {/* Book Cover */}
            <div className="relative w-12 h-16 flex-shrink-0">
              {item.book_cover ? (
                <Image
                  src={`${process.env.NEXT_PUBLIC_API_URL}/media/${item.book_cover}`}
                  alt={item.book_title}
                  fill
                  className="object-cover rounded-md border border-gray-200"
                  sizes="48px"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-blue-100 to-blue-200 rounded-md border border-gray-200 flex items-center justify-center">
                  <FileText className="w-4 h-4 text-blue-600" />
                </div>
              )}
            </div>

            {/* Book Info & Progress */}
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-semibold text-gray-900 truncate mb-1">
                {item.book_title}
              </h4>

              <p className="text-xs text-gray-600 truncate mb-2">
                {item.book_author}
              </p>

              {/* Progress Bar */}
              <div className="mb-2">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-medium text-gray-700">
                    {item.completion_percentage.toFixed(1)}% selesai
                  </span>
                  <span className="text-xs text-gray-500 uppercase">
                    {item.file_type}
                  </span>
                </div>

                <div
                  className={`w-full h-2 ${getProgressBgColor(
                    item.completion_percentage
                  )} rounded-full overflow-hidden`}
                >
                  <div
                    className={`h-full ${getProgressColor(
                      item.completion_percentage
                    )} rounded-full transition-all duration-300 ease-out`}
                    style={{
                      width: `${Math.min(item.completion_percentage, 100)}%`,
                    }}
                  />
                </div>
              </div>

              {/* Last Read */}
              <div className="flex items-center text-xs text-gray-500">
                <Clock className="w-3 h-3 mr-1" />
                <span>Terakhir dibaca {moment(item.last_read).fromNow()}</span>
              </div>
            </div>

            {/* Continue Reading Button */}
            <div className="flex-shrink-0">
              <button className="px-3 py-1.5 text-xs font-medium text-blue-600 bg-blue-50 rounded-md hover:bg-blue-100 transition-colors duration-200">
                Lanjut
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* View All Progress Button */}
      <div className="mt-6 pt-4 border-t border-gray-200">
        <button className="w-full text-sm text-blue-600 hover:text-blue-800 font-medium transition-colors duration-200">
          Lihat Semua Progress →
        </button>
      </div>
    </div>
  );
};

export default ReadingProgress;
