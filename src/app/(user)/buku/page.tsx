/** @format */

// src/app/buku/page.tsx
"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { Filter, Search } from "lucide-react";
import BookGrid from "@/components/book/BookGrid";
import UserSidebar from "@/components/sidebar/UserSidebar";
import useBook from "@/stores/crud/Book";
import PaginationDef from "@/components/pagination/PaginationDef";
import useCategoryApi from "@/stores/api/Category";

// Contoh data untuk UI

export default function BooksPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [yearRange, setYearRange] = useState<[number, number]>([1900, 2025]);
  const [page, setPage] = useState(1);
  // store
  const { setBook, dtBook } = useBook();
  const { setCategory, dtCategory } = useCategoryApi();

  // get set book
  const getData = useCallback(async () => {
    await setBook({
      page,
      search: searchQuery,
      sortby: "",
      order: "",
    });
    await setCategory();
  }, [page, searchQuery, setBook, setCategory]);

  useEffect(() => {
    getData();
  }, [getData]);

  // Filter buku berdasarkan pencarian

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
                {dtCategory.map((category) => (
                  <div key={category.id} className="form-control">
                    <label className="label cursor-pointer justify-start gap-2">
                      <input
                        type="checkbox"
                        className="checkbox checkbox-sm"
                        checked={selectedCategories.includes(category.id)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedCategories([
                              ...selectedCategories,
                              category.id,
                            ]);
                          } else {
                            setSelectedCategories(
                              selectedCategories.filter(
                                (c) => c !== category.id
                              )
                            );
                          }
                        }}
                      />
                      <span className="label-text">{category.category_nm}</span>
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
                Menampilkan {dtBook?.data.length} buku
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
              books={dtBook?.data}
              emptyMessage="Tidak ada buku yang sesuai dengan filter Anda."
            />

            {/* Pagination */}
            <div className="flex justify-center mt-8">
              {dtBook?.last_page > 1 && (
                <div className="mt-4">
                  <PaginationDef
                    currentPage={dtBook?.current_page}
                    totalPages={dtBook?.last_page}
                    setPage={setPage}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
