/** @format */
"use client";
// pages/sedang-dibaca.tsx
import { NextPage } from "next";
import { useState } from "react";
import Link from "next/link";
import {
  Search,
  BookOpen,
  Filter,
  MoreHorizontal,
  Clock,
  Calendar,
} from "lucide-react";
import { BookWithProgress } from "@/types";

interface ReadingStats {
  totalReading: number;
  totalPages: number;
  totalReadPages: number;
  averageProgress: number;
  mostReadBook: string;
}

const SedangDibacaPage: NextPage = () => {
  const [showFilters, setShowFilters] = useState<boolean>(false);
  const [filterFormat, setFilterFormat] = useState<string[]>([]);
  const [sortOption, setSortOption] = useState<string>("progress");

  // Sample books being read
  const currentBooks: BookWithProgress[] = [
    {
      id: "1",
      title: "Laskar Pelangi",
      author: "Andrea Hirata",
      year: "2005",
      coverImage: "/covers/laskar-pelangi.jpg",
      progress: 75,
      format: "EPUB",
      lastRead: "2 jam yang lalu",
      status: "Aktif",
      createdAt: "",
      updatedAt: "",
    },
    {
      id: "2",
      title: "Bumi Manusia",
      author: "Pramoedya Ananta Toer",
      year: "1980",
      coverImage: "/covers/bumi-manusia.jpg",
      progress: 42,
      format: "PDF",
      lastRead: "Kemarin",
      status: "Aktif",
      createdAt: "",
      updatedAt: "",
    },
    {
      id: "3",
      title: "Filosofi Teras",
      author: "Henry Manampiring",
      year: "2018",
      coverImage: "/covers/filosofi-teras.jpg",
      progress: 18,
      format: "EPUB",
      lastRead: "3 hari yang lalu",
      status: "Aktif",
      createdAt: "",
      updatedAt: "",
    },
    {
      id: "4",
      title: "Hujan",
      author: "Tere Liye",
      year: "2016",
      coverImage: "/covers/hujan.jpg",
      progress: 8,
      format: "PDF",
      lastRead: "1 minggu yang lalu",
      status: "Aktif",
      createdAt: "",
      updatedAt: "",
    },
  ];

  // Sample reading statistics
  const readingStats: ReadingStats = {
    totalReading: currentBooks.length,
    totalPages: 1480,
    totalReadPages: 542,
    averageProgress: 36,
    mostReadBook: "Laskar Pelangi",
  };

  // Filter and sort the books
  const getFilteredBooks = (): BookWithProgress[] => {
    let filtered = [...currentBooks];

    // Apply format filter
    if (filterFormat.length > 0) {
      filtered = filtered.filter((book) => filterFormat.includes(book.format));
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortOption) {
        case "progress-desc":
          return b.progress - a.progress;
        case "progress-asc":
          return a.progress - b.progress;
        case "title":
          return a.title.localeCompare(b.title);
        case "recent":
          // In a real app, you would compare dates
          return 0;
        default:
          return 0;
      }
    });

    return filtered;
  };

  // Toggle format filter
  const toggleFormatFilter = (format: string) => {
    setFilterFormat((prev) => {
      if (prev.includes(format)) {
        return prev.filter((f) => f !== format);
      } else {
        return [...prev, format];
      }
    });
  };

  // Get unique formats from books
  const getUniqueFormats = (): string[] => {
    const formats = currentBooks.map((book) => book.format);
    return Array.from(new Set(formats));
  };

  return (
    <div className="p-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4  mr-12 lg:mr-0">
        <h1 className="text-2xl font-bold">Sedang Dibaca</h1>

        <div className="flex gap-3">
          <div className="relative max-w-md w-full">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search size={18} className="text-gray-400" />
            </div>
            <input
              type="text"
              className="input input-bordered pl-10 w-full"
              placeholder="Cari buku..."
            />
          </div>

          <button
            className="btn btn-outline gap-2"
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter size={18} />
            Filter
          </button>
        </div>
      </div>

      {/* Reading Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-6">
        <div className="stats shadow">
          <div className="stat">
            <div className="stat-figure text-primary">
              <BookOpen size={24} />
            </div>
            <div className="stat-title">Total Buku</div>
            <div className="stat-value text-primary">
              {readingStats.totalReading}
            </div>
            <div className="stat-desc">Sedang Dibaca</div>
          </div>
        </div>

        <div className="stats shadow">
          <div className="stat">
            <div className="stat-figure text-primary">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 15h14M5 9h14" />
              </svg>
            </div>
            <div className="stat-title">Total Halaman</div>
            <div className="stat-value text-primary">
              {readingStats.totalPages}
            </div>
            <div className="stat-desc">Dari Semua Buku</div>
          </div>
        </div>

        <div className="stats shadow">
          <div className="stat">
            <div className="stat-figure text-success">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14M12 5v14" />
              </svg>
            </div>
            <div className="stat-title">Halaman Dibaca</div>
            <div className="stat-value text-success">
              {readingStats.totalReadPages}
            </div>
            <div className="stat-desc">Dari Semua Buku</div>
          </div>
        </div>

        <div className="stats shadow">
          <div className="stat">
            <div className="stat-figure text-secondary">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M12 6v6l4 2" />
              </svg>
            </div>
            <div className="stat-title">Rata-rata Progres</div>
            <div className="stat-value text-secondary">
              {readingStats.averageProgress}%
            </div>
            <div className="stat-desc">Dari Semua Buku</div>
          </div>
        </div>

        <div className="stats shadow">
          <div className="stat">
            <div className="stat-figure text-accent">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
              </svg>
            </div>
            <div className="stat-title">Buku Terbanyak</div>
            <div className="stat-value text-accent">
              {readingStats.mostReadBook}
            </div>
            <div className="stat-desc">Dibaca</div>
          </div>
        </div>
      </div>

      {/* Filters Panel */}
      {showFilters && (
        <div className="bg-base-100 p-4 rounded-lg shadow-md mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <h3 className="font-medium mb-2">Format File</h3>
              <div className="flex flex-wrap gap-2">
                {getUniqueFormats().map((format) => (
                  <label
                    key={format}
                    className="cursor-pointer label justify-start gap-2"
                  >
                    <input
                      type="checkbox"
                      className="checkbox checkbox-sm checkbox-primary"
                      checked={filterFormat.includes(format)}
                      onChange={() => toggleFormatFilter(format)}
                    />
                    <span className="label-text">{format}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-medium mb-2">Progres</h3>
              <select
                className="select select-bordered w-full max-w-xs"
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
              >
                <option value="progress-desc">Progres (Tertinggi)</option>
                <option value="progress-asc">Progres (Terendah)</option>
                <option value="title">Judul (A-Z)</option>
                <option value="recent">Baru dibaca</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end mt-4">
            <button
              className="btn btn-sm btn-ghost"
              onClick={() => {
                setFilterFormat([]);
                setSortOption("progress-desc");
              }}
            >
              Reset
            </button>
          </div>
        </div>
      )}

      {/* Currently Reading Books */}
      <div className="bg-base-100 rounded-lg shadow-md overflow-hidden">
        {getFilteredBooks().length > 0 ? (
          <div className="overflow-x-auto">
            <table className="table w-full">
              <thead>
                <tr>
                  <th>Buku</th>
                  <th>Progres</th>
                  <th className="hidden md:table-cell">Format</th>
                  <th className="hidden md:table-cell">Terakhir Dibaca</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {getFilteredBooks().map((book) => (
                  <tr key={book.id}>
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="relative w-10 h-14 shrink-0">
                          <img
                            src={book.coverImage || `/api/placeholder/40/56`}
                            alt={`Cover buku ${book.title}`}
                            className="w-full h-full object-cover rounded"
                          />
                        </div>
                        <div>
                          <div className="font-bold">{book.title}</div>
                          <div className="text-xs opacity-70">
                            {book.author}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="w-32 md:w-48">
                        <div className="mb-1 text-xs flex justify-between">
                          <span>{book.progress}%</span>
                          <span className="hidden md:inline opacity-70">
                            {Math.floor((book.progress / 100) * 300)} dari ~300
                            halaman
                          </span>
                        </div>
                        <progress
                          className="progress progress-primary h-1.5"
                          value={book.progress}
                          max="100"
                        ></progress>
                      </div>
                    </td>
                    <td className="hidden md:table-cell">{book.format}</td>
                    <td className="hidden md:table-cell">
                      <div className="flex items-center gap-1">
                        <Clock size={14} className="opacity-50" />
                        <span>{book.lastRead}</span>
                      </div>
                    </td>
                    <td>
                      <div className="flex justify-end gap-2">
                        <div className="dropdown dropdown-end">
                          <label
                            tabIndex={0}
                            className="btn btn-ghost btn-sm btn-circle"
                          >
                            <MoreHorizontal size={16} />
                          </label>
                          <ul
                            tabIndex={0}
                            className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
                          >
                            <li>
                              <a>
                                <span className="flex items-center gap-2">
                                  <Calendar size={14} />
                                  Set Selesai Dibaca
                                </span>
                              </a>
                            </li>
                            <li>
                              <a>
                                <span className="flex items-center gap-2">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="14"
                                    height="14"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  >
                                    <polyline points="3 6 5 6 21 6"></polyline>
                                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                                  </svg>
                                  Hapus dari Sedang Dibaca
                                </span>
                              </a>
                            </li>
                          </ul>
                        </div>
                        <Link
                          href={`/baca/${book.id}`}
                          className="btn btn-primary btn-sm"
                        >
                          Lanjutkan
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="py-12 text-center">
            <BookOpen size={48} className="mx-auto opacity-20 mb-4" />
            <h3 className="text-lg font-medium mb-2">
              Belum Ada Buku yang Sedang Dibaca
            </h3>
            <p className="text-base-content/70 mb-4">
              Anda belum memiliki buku yang sedang dibaca saat ini.
            </p>
            <Link href="/katalog" className="btn btn-primary">
              Temukan Buku
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default SedangDibacaPage;
