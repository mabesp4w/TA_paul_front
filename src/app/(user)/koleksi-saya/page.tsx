/** @format */

// src/app/koleksi-saya/page.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { Plus, FolderOpen, Book, Trash2, Edit } from "lucide-react";
import UserSidebar from "@/components/sidebar/UserSidebar";

// Contoh data koleksi
const userCollections = [
  {
    id: "1",
    collection_nm: "Favorit",
    description: "Buku-buku favorit saya",
    bookCount: 8,
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
  },
  {
    id: "2",
    collection_nm: "Self Improvement",
    description: "Buku-buku pengembangan diri",
    bookCount: 12,
    books: [
      {
        id: "2",
        title: "Atomic Habits",
        author: "James Clear",
        coverImage: "/images/atomic-habits.jpg",
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
        id: "9",
        title: "The Power of Habit",
        author: "Charles Duhigg",
        coverImage: "/images/power-habit.jpg",
        year: "2012",
      },
    ],
  },
  {
    id: "3",
    collection_nm: "Filsafat",
    description: "Buku-buku filsafat",
    bookCount: 5,
    books: [
      {
        id: "1",
        title: "Filosofi Teras",
        author: "Henry Manampiring",
        coverImage: "/images/filosofi-teras.jpg",
        year: "2019",
      },
      {
        id: "10",
        title: "Man's Search for Meaning",
        author: "Viktor E. Frankl",
        coverImage: "/images/mans-search.jpg",
        year: "1946",
      },
    ],
  },
];

export default function CollectionsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [collectionName, setCollectionName] = useState("");
  const [collectionDescription, setCollectionDescription] = useState("");

  return (
    <div className="flex">
      <UserSidebar />
      <div className="flex-1 p-4 md:p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl md:text-3xl font-bold">Koleksi Saya</h1>
          <button
            className="btn btn-primary btn-sm gap-1"
            onClick={() => setIsModalOpen(true)}
          >
            <Plus size={16} /> Buat Koleksi
          </button>
        </div>

        {userCollections.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {userCollections.map((collection) => (
              <div
                key={collection.id}
                className="card bg-base-100 shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="card-body">
                  <div className="flex justify-between items-start">
                    <div>
                      <h2 className="card-title">
                        <FolderOpen size={20} className="text-primary" />{" "}
                        {collection.collection_nm}
                      </h2>
                      <p className="text-sm opacity-70">
                        {collection.description}
                      </p>
                    </div>
                    <div className="dropdown dropdown-end">
                      <label
                        tabIndex={0}
                        className="btn btn-ghost btn-xs btn-circle"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          className="inline-block w-5 h-5 stroke-current"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
                          ></path>
                        </svg>
                      </label>
                      <ul
                        tabIndex={0}
                        className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
                      >
                        <li>
                          <a className="flex gap-2">
                            <Edit size={16} /> Edit
                          </a>
                        </li>
                        <li>
                          <a className="flex gap-2 text-error">
                            <Trash2 size={16} /> Hapus
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="mt-2 flex items-center gap-1 text-sm">
                    <Book size={16} />
                    <span>{collection.bookCount} buku</span>
                  </div>

                  {/* Preview Buku */}
                  <div className="flex mt-2 mb-4 h-24 overflow-hidden">
                    {collection.books.slice(0, 4).map((book, index) => (
                      <div
                        key={book.id}
                        className="relative h-full w-16 mr-1 overflow-hidden rounded-md"
                        style={{ right: index * 3 + "px" }}
                      >
                        {book.coverImage ? (
                          <img
                            src={book.coverImage}
                            alt={book.title}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <div className="h-full w-full bg-base-300 flex items-center justify-center">
                            <Book size={16} className="opacity-40" />
                          </div>
                        )}
                      </div>
                    ))}

                    {collection.bookCount > 4 && (
                      <div className="flex items-center justify-center h-full w-16 rounded-md bg-base-200">
                        <span className="text-sm font-medium">
                          +{collection.bookCount - 4}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="card-actions justify-end">
                    <Link
                      href={`/koleksi-saya/${collection.id}`}
                      className="btn btn-primary btn-sm"
                    >
                      Lihat
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <FolderOpen size={64} className="opacity-30 mb-4" />
            <h3 className="text-xl font-medium mb-2">Belum Ada Koleksi</h3>
            <p className="opacity-70 mb-4">
              Anda belum memiliki koleksi buku. Buat koleksi untuk mengorganisir
              buku-buku favorit Anda.
            </p>
            <button
              className="btn btn-primary gap-1"
              onClick={() => setIsModalOpen(true)}
            >
              <Plus size={16} /> Buat Koleksi
            </button>
          </div>
        )}

        {/* Modal Buat Koleksi */}
        <dialog
          className={`modal ${isModalOpen ? "modal-open" : ""}`}
          onClick={(e) => e.target === e.currentTarget && setIsModalOpen(false)}
        >
          <div className="modal-box">
            <h3 className="font-bold text-lg mb-4">Buat Koleksi Baru</h3>
            <form>
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Nama Koleksi</span>
                </label>
                <input
                  type="text"
                  placeholder="Masukkan nama koleksi"
                  className="input input-bordered w-full"
                  value={collectionName}
                  onChange={(e) => setCollectionName(e.target.value)}
                />
              </div>

              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Deskripsi</span>
                </label>
                <textarea
                  className="textarea textarea-bordered h-24"
                  placeholder="Deskripsi koleksi (opsional)"
                  value={collectionDescription}
                  onChange={(e) => setCollectionDescription(e.target.value)}
                ></textarea>
              </div>

              <div className="modal-action">
                <button
                  type="button"
                  className="btn btn-ghost"
                  onClick={() => setIsModalOpen(false)}
                >
                  Batal
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => {
                    // Logika untuk menyimpan koleksi baru
                    setIsModalOpen(false);
                  }}
                >
                  Simpan
                </button>
              </div>
            </form>
          </div>
        </dialog>
      </div>
    </div>
  );
}
