/** @format */

// src/app/koleksi-saya/[id]/page.tsx
"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { FolderOpen, Edit, Trash2, Plus, Search, Book } from "lucide-react";
import BookGrid from "@/components/book/BookGrid";
import UserSidebar from "@/components/sidebar/UserSidebar";

export default function CollectionDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddBookModalOpen, setIsAddBookModalOpen] = useState(false);

  // Contoh data koleksi (dalam implementasi nyata, ini akan diambil dari API)
  const collection = {
    id,
    collection_nm: "Favorit",
    description: "Buku-buku favorit pilihan saya untuk dibaca kapan saja.",
    books: [
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
    ],
  };

  // Contoh buku untuk ditambahkan ke koleksi
  const availableBooks = [
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
  ];

  // Filter buku berdasarkan pencarian
  const filteredBooks = collection.books.filter(
    (book) =>
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex">
      <UserSidebar />
      <div className="flex-1 p-4 md:p-6">
        <div className="mb-4">
          <div className="text-sm breadcrumbs">
            <ul>
              <li>
                <Link href="/">Beranda</Link>
              </li>
              <li>
                <Link href="/koleksi-saya">Koleksi Saya</Link>
              </li>
              <li>{collection.collection_nm}</li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-start gap-6 mb-6">
          <div>
            <div className="flex items-center gap-2">
              <FolderOpen size={24} className="text-primary" />
              <h1 className="text-2xl md:text-3xl font-bold">
                {collection.collection_nm}
              </h1>
            </div>
            <p className="mt-2 text-gray-600 max-w-2xl">
              {collection.description}
            </p>
          </div>

          <div className="flex flex-wrap gap-2 self-start">
            <button className="btn btn-outline btn-sm gap-1">
              <Edit size={16} /> Edit
            </button>
            <button className="btn btn-error btn-outline btn-sm gap-1">
              <Trash2 size={16} /> Hapus
            </button>
            <button
              className="btn btn-primary btn-sm gap-1"
              onClick={() => setIsAddBookModalOpen(true)}
            >
              <Plus size={16} /> Tambah Buku
            </button>
          </div>
        </div>

        <div className="form-control mb-6">
          <div className="input-group">
            <input
              type="text"
              placeholder="Cari buku dalam koleksi..."
              className="input input-bordered w-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button className="btn btn-square">
              <Search size={18} />
            </button>
          </div>
        </div>

        <BookGrid
          books={filteredBooks}
          emptyMessage="Tidak ada buku dalam koleksi ini."
          header={
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">
                Daftar Buku ({collection.books.length})
              </h2>
              <div className="flex gap-2 items-center">
                <span className="text-sm">Urutkan:</span>
                <select className="select select-bordered select-sm">
                  <option value="title_asc">Judul (A-Z)</option>
                  <option value="title_desc">Judul (Z-A)</option>
                  <option value="author">Penulis</option>
                  <option value="year_desc">Tahun (Terbaru)</option>
                  <option value="year_asc">Tahun (Terlama)</option>
                </select>
              </div>
            </div>
          }
        />

        {/* Modal Tambah Buku ke Koleksi */}
        <dialog
          className={`modal ${isAddBookModalOpen ? "modal-open" : ""}`}
          onClick={(e) =>
            e.target === e.currentTarget && setIsAddBookModalOpen(false)
          }
        >
          <div className="modal-box max-w-3xl">
            <h3 className="font-bold text-lg mb-4">Tambah Buku ke Koleksi</h3>

            <div className="form-control mb-4">
              <div className="input-group">
                <input
                  type="text"
                  placeholder="Cari buku..."
                  className="input input-bordered w-full"
                />
                <button className="btn btn-square">
                  <Search size={18} />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-96 overflow-y-auto p-1">
              {availableBooks.map((book) => (
                <div
                  key={book.id}
                  className="card card-compact card-side bg-base-100 shadow"
                >
                  <figure className="w-20 h-auto bg-base-200">
                    {book.coverImage ? (
                      <img
                        src={book.coverImage}
                        alt={book.title}
                        className="h-full object-cover"
                      />
                    ) : (
                      <div className="flex items-center justify-center w-full h-full">
                        <Book size={20} className="opacity-30" />
                      </div>
                    )}
                  </figure>
                  <div className="card-body">
                    <h2 className="card-title text-sm">{book.title}</h2>
                    <p className="text-xs opacity-70">{book.author}</p>
                    <div className="card-actions justify-end">
                      <button className="btn btn-primary btn-xs">
                        Tambahkan
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="modal-action">
              <button
                type="button"
                className="btn"
                onClick={() => setIsAddBookModalOpen(false)}
              >
                Tutup
              </button>
            </div>
          </div>
        </dialog>
      </div>
    </div>
  );
}
