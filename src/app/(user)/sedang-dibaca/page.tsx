/** @format */

// src/app/sedang-dibaca/page.tsx
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Search, Clock, BookOpen } from "lucide-react";
import UserSidebar from "@/components/sidebar/UserSidebar";
import useReadingProgress from "@/stores/crud/ReadingProgress";
import { ReadingProgress } from "@/types";
import Image from "next/image";
import { url_storage } from "@/services/baseURL";

export default function InProgressPage() {
  // state
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState<ReadingProgress[] | null>(
    null
  );
  // store
  const { setReadingProgress, dtReadingProgress } = useReadingProgress();

  // effect
  useEffect(() => {
    setReadingProgress({
      page: 1,
      per_page: 100,
    });
  }, [setReadingProgress]);

  console.log({ dtReadingProgress });

  useEffect(() => {
    if (dtReadingProgress && dtReadingProgress.data) {
      // Filter buku berdasarkan pencarian
      const filteredBooks = dtReadingProgress.data.filter(
        (progress) =>
          progress.book_detail?.title
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          progress.book_detail?.author
            .toLowerCase()
            .includes(searchQuery.toLowerCase())
      );

      setFilteredData(filteredBooks);
    }
  }, [dtReadingProgress, searchQuery]);

  // Format tanggal ke format lokal Indonesia
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="flex">
      <UserSidebar />
      <div className="flex-1 p-4 md:p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl md:text-3xl font-bold">Sedang Dibaca</h1>
        </div>

        <div className="form-control mb-6">
          <div className="input-group">
            <input
              type="text"
              placeholder="Cari buku..."
              className="input input-bordered w-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button className="btn btn-square">
              <Search size={18} />
            </button>
          </div>
        </div>

        {filteredData && filteredData.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredData &&
              filteredData.map((progress) => (
                <div
                  key={progress.id}
                  className="card bg-base-100 shadow-lg hover:shadow-xl transition-shadow"
                >
                  <div className="card-body p-0">
                    <div className="flex">
                      <div className="w-1/3 h-48 bg-base-200">
                        {progress.book_detail?.cover_image ? (
                          <Image
                            src={
                              url_storage + progress.book_detail?.cover_image
                            }
                            alt={progress.book_detail?.title}
                            className="h-full w-full object-cover rounded-l-lg"
                            width={100}
                            height={100}
                          />
                        ) : (
                          <div className="h-full w-full flex items-center justify-center">
                            <BookOpen size={48} className="opacity-30" />
                          </div>
                        )}
                      </div>
                      <div className="w-2/3 p-4">
                        <h2 className="card-title text-lg">
                          {progress.book_detail?.title}
                        </h2>
                        <p className="text-sm opacity-70">
                          {progress.book_detail?.author}
                        </p>

                        <div className="mt-2">
                          <div className="flex items-center mb-1 gap-x-2 text-xs">
                            <span>Tipe File:</span>
                            <span>{progress.file_type}</span>
                          </div>
                          <div className="flex justify-between items-center mb-1 text-xs">
                            <span>Progress</span>
                            <span>{progress.completion_percentage}%</span>
                          </div>
                          <div className="w-full bg-base-200 rounded-full h-2">
                            <div
                              className="bg-primary h-2 rounded-full"
                              style={{
                                width: `${progress.completion_percentage}%`,
                              }}
                            ></div>
                          </div>
                        </div>

                        <div className="mt-2 flex items-center gap-1 text-xs opacity-70">
                          <Clock size={12} />
                          <span>
                            Terakhir dibaca: {formatDate(progress.last_read)}
                          </span>
                        </div>

                        <div className="card-actions justify-end mt-4">
                          <Link
                            href={`/buku/${progress.book_detail?.id}/baca?type=${progress.file_type}`}
                            className="btn btn-primary btn-sm"
                          >
                            Lanjutkan
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="opacity-30 mb-4">
              <Clock size={64} />
            </div>
            <h3 className="text-xl font-medium mb-2">
              Belum Ada Buku yang Sedang Dibaca
            </h3>
            <p className="opacity-70 mb-4">
              Anda belum memiliki buku yang sedang dibaca. Mulai membaca buku
              dari koleksi untuk melihatnya di sini.
            </p>
            <Link href="/buku" className="btn btn-primary">
              Jelajahi Buku
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
