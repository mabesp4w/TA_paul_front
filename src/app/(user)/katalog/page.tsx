/** @format */

"use client";

import BookCard from "@/components/card/BookCard";
import { ChevronDown, Filter, Search } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";

const Katalog = () => {
  const [viewMode, setViewMode] = useState("grid"); // 'grid' or 'list'
  const [showFilters, setShowFilters] = useState(false);

  // Sample book data
  const books = [
    {
      id: 1,
      title: "Laskar Pelangi",
      author: "Andrea Hirata",
      year: "2005",
      category: "Novel",
      cover: "/covers/laskar-pelangi.jpg",
    },
    {
      id: 2,
      title: "Bumi Manusia",
      author: "Pramoedya Ananta Toer",
      year: "1980",
      category: "Novel",
      cover: "/covers/bumi-manusia.jpg",
    },
    {
      id: 3,
      title: "Filosofi Teras",
      author: "Henry Manampiring",
      year: "2018",
      category: "Self-Help",
      cover: "/covers/filosofi-teras.jpg",
    },
    {
      id: 4,
      title: "Hujan",
      author: "Tere Liye",
      year: "2016",
      category: "Novel",
      cover: "/covers/hujan.jpg",
    },
    {
      id: 5,
      title: "Pulang",
      author: "Tere Liye",
      year: "2021",
      category: "Novel",
      cover: "/covers/pulang.jpg",
    },
    {
      id: 6,
      title: "Sebuah Seni untuk Bersikap Bodo Amat",
      author: "Mark Manson",
      year: "2018",
      category: "Self-Help",
      cover: "/covers/seni-bodo-amat.jpg",
    },
    {
      id: 7,
      title: "Rentang Kisah",
      author: "Gita Savitri Devi",
      year: "2020",
      category: "Biografi",
      cover: "/covers/rentang-kisah.jpg",
    },
    {
      id: 8,
      title: "Tentang Kamu",
      author: "Tere Liye",
      year: "2019",
      category: "Novel",
      cover: "/covers/tentang-kamu.jpg",
    },
    {
      id: 9,
      title: "Laut Bercerita",
      author: "Leila S. Chudori",
      year: "2017",
      category: "Novel",
      cover: "/covers/laut-bercerita.jpg",
    },
    {
      id: 10,
      title: "Sang Pemimpi",
      author: "Andrea Hirata",
      year: "2006",
      category: "Novel",
      cover: "/covers/sang-pemimpi.jpg",
    },
    {
      id: 11,
      title: "Atomic Habits",
      author: "James Clear",
      year: "2018",
      category: "Self-Help",
      cover: "/covers/atomic-habits.jpg",
    },
    {
      id: 12,
      title: "Sapiens",
      author: "Yuval Noah Harari",
      year: "2014",
      category: "Sejarah",
      cover: "/covers/sapiens.jpg",
    },
  ];

  // Filter and sort options
  const categories = [
    "Novel",
    "Self-Help",
    "Biografi",
    "Sejarah",
    "Pendidikan",
    "Teknologi",
  ];
  const years = [
    "2022",
    "2021",
    "2020",
    "2019",
    "2018",
    "2017",
    "2016",
    "2010-2015",
    "2000-2009",
    "Sebelum 2000",
  ];
  const sortOptions = [
    { value: "newest", label: "Terbaru" },
    { value: "oldest", label: "Terlama" },
    { value: "a-z", label: "Judul (A-Z)" },
    { value: "z-a", label: "Judul (Z-A)" },
  ];

  return (
    <div className="p-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
        <h1 className="text-2xl font-bold">Katalog Buku</h1>

        <div className="flex flex-wrap gap-3">
          {/* Search */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search size={18} className="text-gray-400" />
            </div>
            <input
              type="text"
              className="input input-bordered pl-10 w-full md:w-64"
              placeholder="Cari buku, penulis..."
            />
          </div>

          {/* View Mode Toggle */}
          <div className="btn-group">
            <button
              className={`btn btn-sm ${
                viewMode === "grid" ? "btn-active" : ""
              }`}
              onClick={() => setViewMode("grid")}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="3" y="3" width="7" height="7"></rect>
                <rect x="14" y="3" width="7" height="7"></rect>
                <rect x="14" y="14" width="7" height="7"></rect>
                <rect x="3" y="14" width="7" height="7"></rect>
              </svg>
            </button>
            <button
              className={`btn btn-sm ${
                viewMode === "list" ? "btn-active" : ""
              }`}
              onClick={() => setViewMode("list")}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="8" y1="6" x2="21" y2="6"></line>
                <line x1="8" y1="12" x2="21" y2="12"></line>
                <line x1="8" y1="18" x2="21" y2="18"></line>
                <line x1="3" y1="6" x2="3.01" y2="6"></line>
                <line x1="3" y1="12" x2="3.01" y2="12"></line>
                <line x1="3" y1="18" x2="3.01" y2="18"></line>
              </svg>
            </button>
          </div>

          {/* Filter Button */}
          <button
            className="btn btn-outline gap-2"
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter size={18} />
            Filter
            <ChevronDown
              size={16}
              className={`transition-transform ${
                showFilters ? "rotate-180" : ""
              }`}
            />
          </button>
        </div>
      </div>

      {/* Filters Panel */}
      {showFilters && (
        <div className="bg-base-100 p-4 rounded-lg shadow-md mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <h3 className="font-medium mb-2">Kategori</h3>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <label
                  key={category}
                  className="cursor-pointer label p-0 gap-2"
                >
                  <input
                    type="checkbox"
                    className="checkbox checkbox-sm checkbox-primary"
                  />
                  <span className="label-text">{category}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-medium mb-2">Tahun Terbit</h3>
            <div className="flex flex-wrap gap-2">
              {years.map((year) => (
                <label key={year} className="cursor-pointer label p-0 gap-2">
                  <input
                    type="checkbox"
                    className="checkbox checkbox-sm checkbox-primary"
                  />
                  <span className="label-text">{year}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-medium mb-2">Urutkan</h3>
            <select className="select select-bordered w-full max-w-xs">
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>

            <div className="flex justify-end mt-4">
              <button className="btn btn-sm btn-ghost">Reset</button>
              <button className="btn btn-sm btn-primary ml-2">Terapkan</button>
            </div>
          </div>
        </div>
      )}

      {/* Books Grid/List View */}
      {viewMode === "grid" ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {books.map((book) => (
            <BookCard key={book.id} book={book} showProgress={false} />
          ))}
        </div>
      ) : (
        <div className="bg-base-100 rounded-lg shadow overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr>
                <th>Buku</th>
                <th>Kategori</th>
                <th>Tahun</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {books.map((book) => (
                <tr key={book.id}>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="relative w-10 h-14 shrink-0">
                        <Image
                          src={book.cover || `/api/placeholder/40/60`}
                          alt={`Cover buku ${book.title}`}
                          className="object-cover rounded w-full h-full"
                        />
                      </div>
                      <div>
                        <div className="font-bold">{book.title}</div>
                        <div className="text-xs opacity-70">{book.author}</div>
                      </div>
                    </div>
                  </td>
                  <td>{book.category}</td>
                  <td>{book.year}</td>
                  <td>
                    <div className="flex justify-end gap-2">
                      <button className="btn btn-ghost btn-xs">Detail</button>
                      <button className="btn btn-primary btn-xs">Baca</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination */}
      <div className="flex justify-center my-8">
        <div className="btn-group">
          <button className="btn btn-sm">«</button>
          <button className="btn btn-sm btn-active">1</button>
          <button className="btn btn-sm">2</button>
          <button className="btn btn-sm">3</button>
          <button className="btn btn-sm">»</button>
        </div>
      </div>
    </div>
  );
};

export default Katalog;
