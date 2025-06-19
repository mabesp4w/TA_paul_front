/** @format */

// components/dashboard/RecentBooks.tsx

import React from "react";
import Image from "next/image";
import { Clock, User, Calendar, FileText } from "lucide-react";
import { RecentBook } from "@/types/DashboardTypes";
import moment from "moment";
import { url_storage } from "@/services/baseURL";

interface RecentBooksProps {
  books: RecentBook[];
  loading?: boolean;
}

const RecentBooks: React.FC<RecentBooksProps> = ({
  books,
  loading = false,
}) => {
  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-32 mb-6"></div>
          <div className="space-y-4">
            {Array.from({ length: 5 }).map((_, index) => (
              <div key={index} className="flex items-center space-x-4">
                <div className="w-16 h-20 bg-gray-200 rounded"></div>
                <div className="flex-1">
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2 mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/3"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!books || books.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">
          Buku Terbaru
        </h3>
        <div className="flex items-center justify-center h-48 text-gray-500">
          <div className="text-center">
            <FileText className="w-12 h-12 mx-auto mb-2 opacity-50" />
            <p>Belum ada buku</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Buku Terbaru</h3>
        <Clock className="w-5 h-5 text-gray-400" />
      </div>

      <div className="space-y-4">
        {books.map((book) => (
          <div
            key={book.id}
            className="flex items-start space-x-4 p-4 rounded-lg hover:bg-gray-50 transition-colors duration-200 cursor-pointer"
          >
            {/* Book Cover */}
            <div className="relative w-16 h-20 flex-shrink-0">
              {book.cover_image ? (
                <Image
                  src={url_storage + book.cover_image}
                  alt={book.title}
                  fill
                  className="object-cover rounded-md border border-gray-200"
                  sizes="64px"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-blue-100 to-blue-200 rounded-md border border-gray-200 flex items-center justify-center">
                  <FileText className="w-6 h-6 text-blue-600" />
                </div>
              )}
            </div>

            {/* Book Info */}
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-semibold text-gray-900 truncate mb-1">
                {book.title}
              </h4>

              <div className="flex items-center text-xs text-gray-600 mb-2">
                <User className="w-3 h-3 mr-1" />
                <span className="truncate">{book.author}</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center text-xs text-gray-500">
                  <Calendar className="w-3 h-3 mr-1" />
                  <span>{moment(book.created_at).format("DD MMM YYYY")}</span>
                </div>

                {book.year && (
                  <span className="text-xs text-gray-500">{book.year}</span>
                )}
              </div>

              {/* File Types */}
              {book.file_types && book.file_types.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-2">
                  {book.file_types.map((type) => (
                    <span
                      key={type}
                      className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800"
                    >
                      {type.toUpperCase()}
                    </span>
                  ))}
                </div>
              )}

              {/* Categories */}
              {book.categories && book.categories.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-1">
                  {book.categories.slice(0, 2).map((category) => (
                    <span
                      key={category}
                      className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-700"
                    >
                      {category}
                    </span>
                  ))}
                  {book.categories.length > 2 && (
                    <span className="text-xs text-gray-500">
                      +{book.categories.length - 2} lainnya
                    </span>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* View All Button */}
      <div className="mt-6 pt-4 border-t border-gray-200">
        <button className="w-full text-sm text-blue-600 hover:text-blue-800 font-medium transition-colors duration-200">
          Lihat Semua Buku →
        </button>
      </div>
    </div>
  );
};

export default RecentBooks;
