/** @format */

// src/app/buku/page.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { Filter, Search } from "lucide-react";
import BookGrid from "@/components/book/BookGrid";
import UserSidebar from "@/components/sidebar/UserSidebar";

// Contoh data untuk UI
const allBooks = [
  {
    id: "1",
    title: "Filosofi Teras",
    author: "Henry Manampiring",
    coverImage: "/images/filosofi-teras.jpg",
    year: "2019",
  },
  {
    id: "2",
    title: "Atomic Habits",
    author: "James Clear",
    coverImage: "/images/atomic-habits.jpg",
    year: "2018",
  },
  {
    id: "3",
    title: "Sapiens",
    author: "Yuval Noah Harari",
    coverImage: "/images/sapiens.jpg",
    year: "2015",
  },
  {
    id: "4",
    title: "Mindset",
    author: "Carol S. Dweck",
    coverImage: "/images/mindset.jpg",
    year: "2006",
  },
  {
    id: "5",
    title: "Deep Work",
    author: "Cal Newport",
    coverImage: "/images/deep-work.jpg",
    year: "2016",
  },
  {
    id: "6",
    title: "Educated",
    author: "Tara Westover",
    coverImage: "/images/educated.jpg",
    year: "2018",
  },
  {
    id: "7",
    title: "Thinking, Fast and Slow",
    author: "Daniel Kahneman",
    coverImage: "/images/thinking.jpg",
    year: "2011",
  },
  {
    id: "8",
    title: "Outliers",
    author: "Malcolm Gladwell",
    coverImage: "/images/outliers.jpg",
    year: "2008",
  },
  {
    id: "9",
    title: "The Power of Habit",
    author: "Charles Duhigg",
    coverImage: "/images/power-habit.jpg",
    year: "2012",
  },
  {
    id: "10",
    title: "Man's Search for Meaning",
    author: "Viktor E. Frankl",
    coverImage: "/images/mans-search.jpg",
    year: "1946",
  },
  // Tambahkan lebih banyak buku sesuai kebutuhan
];

export default function BooksPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [yearRange, setYearRange] = useState<[number, number]>([1900, 2025]);

  // Filter buku berdasarkan pencarian
  const filteredBooks = allBooks.filter(
    (book) =>
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex">
      <UserSidebar />
      <div className="flex-1 p-4 md:p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl md:text-3xl font-bold">Koleksi Buku</h1>
          <button
            className="btn btn-ghost btn-circle md:hidden"
            onClick={() => setIsFilterOpen(!isFilterOpen)}
          >
            <Filter size={20} />
          </button>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar Filter */}
          <div
            className={`
            md:w-64 bg-base-100 p-4 rounded-lg shadow-md
            ${isFilterOpen ? "block" : "hidden"} md:block
          `}
          >
            <h2 className="text-lg font-bold mb-4">Filter</h2>

            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text font-medium">Pencarian</span>
              </label>
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

            <div className="mb-4">
              <label className="label">
                <span className="label-text font-medium">Kategori</span>
              </label>
              <div className="flex flex-col gap-2">
                {[
                  "Pengembangan Diri",
                  "Psikologi",
                  "Bisnis",
                  "Teknologi",
                  "Sejarah",
                  "Filsafat",
                ].map((category) => (
                  <div key={category} className="form-control">
                    <label className="label cursor-pointer justify-start gap-2">
                      <input
                        type="checkbox"
                        className="checkbox checkbox-sm"
                        checked={selectedCategories.includes(category)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedCategories([
                              ...selectedCategories,
                              category,
                            ]);
                          } else {
                            setSelectedCategories(
                              selectedCategories.filter((c) => c !== category)
                            );
                          }
                        }}
                      />
                      <span className="label-text">{category}</span>
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-4">
              <label className="label">
                <span className="label-text font-medium">Tahun Terbit</span>
              </label>
              <div className="flex flex-col gap-1">
                <input
                  type="range"
                  min="1900"
                  max="2025"
                  value={yearRange[1]}
                  className="range range-sm"
                  onChange={(e) =>
                    setYearRange([yearRange[0], parseInt(e.target.value)])
                  }
                />
                <div className="flex justify-between text-xs opacity-70">
                  <span>{yearRange[0]}</span>
                  <span>{yearRange[1]}</span>
                </div>
              </div>
            </div>

            <button className="btn btn-primary btn-sm w-full">
              Terapkan Filter
            </button>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <div className="mb-4">
              <div className="text-sm breadcrumbs">
                <ul>
                  <li>
                    <Link href="/">Beranda</Link>
                  </li>
                  <li>Koleksi Buku</li>
                </ul>
              </div>
            </div>

            <div className="flex justify-between items-center mb-4">
              <div className="text-sm opacity-70">
                Menampilkan {filteredBooks.length} buku
              </div>
              <div className="flex gap-2 items-center">
                <span className="text-sm hidden md:inline">Urutkan:</span>
                <select className="select select-bordered select-sm w-40">
                  <option value="newest">Terbaru</option>
                  <option value="oldest">Terlama</option>
                  <option value="title_asc">Judul (A-Z)</option>
                  <option value="title_desc">Judul (Z-A)</option>
                </select>
              </div>
            </div>

            <BookGrid
              books={filteredBooks}
              emptyMessage="Tidak ada buku yang sesuai dengan filter Anda."
            />

            {/* Pagination */}
            <div className="flex justify-center mt-8">
              <div className="join">
                <button className="join-item btn btn-sm">«</button>
                <button className="join-item btn btn-sm">1</button>
                <button className="join-item btn btn-sm btn-active">2</button>
                <button className="join-item btn btn-sm">3</button>
                <button className="join-item btn btn-sm">»</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
