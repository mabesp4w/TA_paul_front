/** @format */
"use client";
import React from "react";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Search,
  Bookmark,
  ChevronRight,
  Filter,
  Trash2,
  Edit2,
} from "lucide-react";

const BookmarkPage = () => {
  const [showFilters, setShowFilters] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedBookmark, setSelectedBookmark] = useState(null);

  // Sample bookmarks data
  const bookmarks = [
    {
      id: 1,
      title: "Pertemuan Pertama dengan Bu Muslimah",
      location: "Halaman 24",
      book: {
        id: 1,
        title: "Laskar Pelangi",
        author: "Andrea Hirata",
        cover: "/covers/laskar-pelangi.jpg",
      },
      addedAt: "2 hari yang lalu",
      fileType: "EPUB",
    },
    {
      id: 2,
      title: "Penjelasan tentang Stoikisme",
      location: "Halaman 48",
      book: {
        id: 3,
        title: "Filosofi Teras",
        author: "Henry Manampiring",
        cover: "/covers/filosofi-teras.jpg",
      },
      addedAt: "1 minggu yang lalu",
      fileType: "PDF",
    },
    {
      id: 3,
      title: "Konsep Atomic Habits",
      location: "Halaman 35",
      book: {
        id: 11,
        title: "Atomic Habits",
        author: "James Clear",
        cover: "/covers/atomic-habits.jpg",
      },
      addedAt: "2 minggu yang lalu",
      fileType: "EPUB",
    },
    {
      id: 4,
      title: "Adegan Hujan di Jembatan",
      location: "Halaman 115",
      book: {
        id: 4,
        title: "Hujan",
        author: "Tere Liye",
        cover: "/covers/hujan.jpg",
      },
      addedAt: "3 minggu yang lalu",
      fileType: "PDF",
    },
    {
      id: 5,
      title: "Revolusi Kognitif",
      location: "Halaman 67",
      book: {
        id: 12,
        title: "Sapiens",
        author: "Yuval Noah Harari",
        cover: "/covers/sapiens.jpg",
      },
      addedAt: "1 bulan yang lalu",
      fileType: "EPUB",
    },
  ];

  const confirmDelete = (bookmark) => {
    setSelectedBookmark(bookmark);
    setShowDeleteModal(true);
  };

  const handleDelete = () => {
    // Logic to delete bookmark would go here
    console.log(`Deleting bookmark: ${selectedBookmark.id}`);
    setShowDeleteModal(false);
  };

  return (
    <div className="p-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
        <h1 className="text-2xl font-bold">Bookmark Saya</h1>

        <div className="flex gap-3">
          <div className="relative max-w-md w-full">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search size={18} className="text-gray-400" />
            </div>
            <input
              type="text"
              className="input input-bordered pl-10 w-full"
              placeholder="Cari bookmark..."
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

      {/* Filters Panel */}
      {showFilters && (
        <div className="bg-base-100 p-4 rounded-lg shadow-md mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <h3 className="font-medium mb-2">Buku</h3>
              <select className="select select-bordered w-full">
                <option value="">Semua Buku</option>
                <option value="1">Laskar Pelangi</option>
                <option value="3">Filosofi Teras</option>
                <option value="4">Hujan</option>
                <option value="11">Atomic Habits</option>
                <option value="12">Sapiens</option>
              </select>
            </div>

            <div>
              <h3 className="font-medium mb-2">Format File</h3>
              <div className="flex gap-3">
                <label className="cursor-pointer label justify-start gap-2">
                  <input
                    type="checkbox"
                    className="checkbox checkbox-sm checkbox-primary"
                  />
                  <span className="label-text">EPUB</span>
                </label>
                <label className="cursor-pointer label justify-start gap-2">
                  <input
                    type="checkbox"
                    className="checkbox checkbox-sm checkbox-primary"
                  />
                  <span className="label-text">PDF</span>
                </label>
              </div>
            </div>

            <div>
              <h3 className="font-medium mb-2">Urutkan</h3>
              <select className="select select-bordered w-full">
                <option value="newest">Terbaru</option>
                <option value="oldest">Terlama</option>
                <option value="a-z">Judul (A-Z)</option>
                <option value="z-a">Judul (Z-A)</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end mt-4">
            <button className="btn btn-sm btn-ghost">Reset</button>
            <button className="btn btn-sm btn-primary ml-2">Terapkan</button>
          </div>
        </div>
      )}

      {/* Bookmarks List */}
      <div className="bg-base-100 rounded-lg shadow overflow-hidden">
        {bookmarks.length > 0 ? (
          <div className="divide-y">
            {bookmarks.map((bookmark) => (
              <div
                key={bookmark.id}
                className="flex flex-col sm:flex-row sm:items-center p-4 hover:bg-base-200 transition-colors"
              >
                <div className="flex items-center gap-4 flex-1">
                  {/* Book Cover */}
                  <div className="relative w-12 h-16 shrink-0">
                    <img
                      src={bookmark.book.cover || `/api/placeholder/48/64`}
                      alt={`Cover buku ${bookmark.book.title}`}
                      className="w-full h-full object-cover rounded"
                    />
                  </div>

                  {/* Bookmark Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <Bookmark size={14} className="text-primary" />
                      <h3 className="font-medium truncate">{bookmark.title}</h3>
                    </div>
                    <p className="text-sm opacity-70 mb-1">
                      {bookmark.book.title} • {bookmark.book.author}
                    </p>
                    <div className="flex items-center gap-4 text-xs opacity-70">
                      <span>{bookmark.location}</span>
                      <span>{bookmark.fileType}</span>
                      <span>Ditambahkan {bookmark.addedAt}</span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 mt-3 sm:mt-0">
                  <button
                    className="btn btn-ghost btn-sm btn-square"
                    onClick={() => confirmDelete(bookmark)}
                  >
                    <Trash2 size={16} className="text-error" />
                  </button>
                  <button className="btn btn-ghost btn-sm btn-square">
                    <Edit2 size={16} />
                  </button>
                  <Link
                    href={`/baca/${bookmark.book.id}?bookmark=${bookmark.id}`}
                    className="btn btn-primary btn-sm gap-1"
                  >
                    Buka <ChevronRight size={16} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-12 text-center">
            <Bookmark size={48} className="mx-auto opacity-20 mb-4" />
            <h3 className="text-lg font-medium mb-2">Belum Ada Bookmark</h3>
            <p className="text-base-content/70 mb-4">
              Tandai halaman favorit Anda saat membaca.
            </p>
            <Link href="/katalog" className="btn btn-primary">
              Mulai Membaca
            </Link>
          </div>
        )}
      </div>

      {/* Pagination */}
      {bookmarks.length > 0 && (
        <div className="flex justify-center my-8">
          <div className="btn-group">
            <button className="btn btn-sm">«</button>
            <button className="btn btn-sm btn-active">1</button>
            <button className="btn btn-sm">2</button>
            <button className="btn btn-sm">»</button>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Hapus Bookmark</h3>
            <p className="py-4">
              Apakah Anda yakin ingin menghapus bookmark
              <span className="font-medium">
                {" "}
                "{selectedBookmark.title}"
              </span>{" "}
              dari buku
              <span className="font-medium">
                {" "}
                "{selectedBookmark.book.title}"
              </span>
              ?
            </p>
            <div className="modal-action">
              <button
                className="btn btn-ghost"
                onClick={() => setShowDeleteModal(false)}
              >
                Batal
              </button>
              <button className="btn btn-error" onClick={handleDelete}>
                Hapus
              </button>
            </div>
          </div>
          <div
            className="modal-backdrop"
            onClick={() => setShowDeleteModal(false)}
          ></div>
        </div>
      )}
    </div>
  );
};

export default BookmarkPage;
