/** @format */
"use client";
// pages/koleksi/[id].tsx
import { useState } from "react";
import {
  Search,
  Plus,
  ChevronLeft,
  Edit,
  Trash2,
  MoreHorizontal,
} from "lucide-react";
import Link from "next/link";
import { Book, Collection } from "@/types";
import BookCard from "@/components/card/BookCard";

const CollectionDetail = ({ params }: { params: { id: string } }) => {
  const { id } = params;

  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  const [selectedBooks, setSelectedBooks] = useState<string[]>([]);

  // Sample collection data
  const collection: Collection = {
    id: typeof id === "string" ? id : "1",
    name: "Favorit",
    description: "Kumpulan buku-buku favorit yang ingin dibaca berulang kali",
    createdAt: "2022-11-12T00:00:00.000Z",
    bookCount: 12,
    lastUpdated: "2 hari yang lalu",
    userId: "user1",
  };

  // Sample books in this collection
  const books: Book[] = [
    {
      id: "1",
      title: "Laskar Pelangi",
      author: "Andrea Hirata",
      year: "2005",
      coverImage: "/covers/laskar-pelangi.jpg",
      createdAt: "",
      updatedAt: "",
    },
    {
      id: "2",
      title: "Bumi Manusia",
      author: "Pramoedya Ananta Toer",
      year: "1980",
      coverImage: "/covers/bumi-manusia.jpg",
      createdAt: "",
      updatedAt: "",
    },
    {
      id: "3",
      title: "Filosofi Teras",
      author: "Henry Manampiring",
      year: "2018",
      coverImage: "/covers/filosofi-teras.jpg",
      createdAt: "",
      updatedAt: "",
    },
    {
      id: "4",
      title: "Hujan",
      author: "Tere Liye",
      year: "2016",
      coverImage: "/covers/hujan.jpg",
      createdAt: "",
      updatedAt: "",
    },
    {
      id: "5",
      title: "Pulang",
      author: "Tere Liye",
      year: "2021",
      coverImage: "/covers/pulang.jpg",
      createdAt: "",
      updatedAt: "",
    },
    {
      id: "6",
      title: "Sebuah Seni untuk Bersikap Bodo Amat",
      author: "Mark Manson",
      year: "2018",
      coverImage: "/covers/seni-bodo-amat.jpg",
      createdAt: "",
      updatedAt: "",
    },
  ];

  // Sample books to add to collection
  const availableBooks: Book[] = [
    {
      id: "7",
      title: "Rentang Kisah",
      author: "Gita Savitri Devi",
      year: "2020",
      coverImage: "/covers/rentang-kisah.jpg",
      createdAt: "",
      updatedAt: "",
    },
    {
      id: "8",
      title: "Tentang Kamu",
      author: "Tere Liye",
      year: "2019",
      coverImage: "/covers/tentang-kamu.jpg",
      createdAt: "",
      updatedAt: "",
    },
    {
      id: "9",
      title: "Laut Bercerita",
      author: "Leila S. Chudori",
      year: "2017",
      coverImage: "/covers/laut-bercerita.jpg",
      createdAt: "",
      updatedAt: "",
    },
    {
      id: "10",
      title: "Sang Pemimpi",
      author: "Andrea Hirata",
      year: "2006",
      coverImage: "/covers/sang-pemimpi.jpg",
      createdAt: "",
      updatedAt: "",
    },
  ];

  // Handle adding books to collection
  const handleAddBooks = () => {
    console.log("Adding books with IDs:", selectedBooks);
    setShowAddModal(false);
    setSelectedBooks([]);
  };

  // Handle checkbox change for book selection
  const handleCheckboxChange = (bookId: string) => {
    setSelectedBooks((prev) => {
      if (prev.includes(bookId)) {
        return prev.filter((id) => id !== bookId);
      } else {
        return [...prev, bookId];
      }
    });
  };

  // Handle removing a book from collection
  const handleRemoveBook = (bookId: string) => {
    console.log("Removing book with ID:", bookId);
    // Logic to remove book would go here
  };

  return (
    <div className="p-6">
      {/* Page Header */}
      <div className="flex flex-wrap items-center gap-3 mb-2 mr-12 lg:mr-0">
        <Link href="/koleksi" className="btn btn-ghost btn-sm gap-1">
          <ChevronLeft size={16} />
          Koleksi
        </Link>
        <h1 className="text-2xl font-bold">{collection.name}</h1>
      </div>

      {/* Collection Metadata */}
      <div className="bg-base-100 rounded-lg shadow p-5 mb-6">
        <div className="flex justify-between">
          <div>
            <p className="text-base-content/70 mb-2">
              {collection.description}
            </p>
            <div className="flex flex-wrap gap-4 text-sm opacity-70">
              <span>{collection.bookCount} buku</span>
              <span>
                Dibuat pada{" "}
                {new Date(collection.createdAt).toLocaleDateString("id-ID", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </span>
            </div>
          </div>

          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-sm btn-ghost btn-circle">
              <MoreHorizontal size={18} />
            </label>
            <ul
              tabIndex={0}
              className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <a>
                  <Edit size={16} /> Edit Koleksi
                </a>
              </li>
              <li>
                <a className="text-error">
                  <Trash2 size={16} /> Hapus Koleksi
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Books Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
        <h2 className="text-xl font-bold">Buku dalam Koleksi</h2>

        <div className="flex gap-3">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search size={18} className="text-gray-400" />
            </div>
            <input
              type="text"
              className="input input-bordered pl-10 w-full md:w-64"
              placeholder="Cari dalam koleksi..."
            />
          </div>

          <button
            className="btn btn-primary gap-2"
            onClick={() => setShowAddModal(true)}
          >
            <Plus size={18} />
            Tambah Buku
          </button>
        </div>
      </div>

      {/* Books Grid */}
      {books.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {books.map((book) => (
            <div key={book.id} className="relative group">
              <BookCard book={book} showProgress={false} />
              <button
                className="btn btn-sm btn-circle btn-error absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                title="Hapus dari koleksi"
                onClick={() => handleRemoveBook(book.id)}
              >
                <Trash2 size={14} />
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-base-100 border border-base-300 rounded-lg p-8 text-center">
          <div className="text-5xl mb-3 opacity-30">📚</div>
          <h3 className="text-lg font-medium mb-2">Koleksi Kosong</h3>
          <p className="text-base-content/70 mb-4">
            Belum ada buku dalam koleksi ini.
          </p>
          <button
            className="btn btn-primary"
            onClick={() => setShowAddModal(true)}
          >
            Tambah Buku ke Koleksi
          </button>
        </div>
      )}

      {/* Add Books Modal */}
      {showAddModal && (
        <div className="modal modal-open">
          <div className="modal-box max-w-4xl">
            <h3 className="font-bold text-lg mb-4">Tambah Buku ke Koleksi</h3>

            <div className="mb-4">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Search size={18} className="text-gray-400" />
                </div>
                <input
                  type="text"
                  className="input input-bordered pl-10 w-full"
                  placeholder="Cari buku untuk ditambahkan..."
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-h-96 overflow-y-auto p-1">
              {availableBooks.map((book) => (
                <div
                  key={book.id}
                  className="card bg-base-100 shadow-sm border hover:shadow-md transition-shadow"
                >
                  <div className="p-3 flex items-center gap-3">
                    <div className="w-12 h-16 shrink-0">
                      <img
                        src={book.coverImage || `/api/placeholder/48/64`}
                        alt={`Cover buku ${book.title}`}
                        className="w-full h-full object-cover rounded"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-sm truncate">
                        {book.title}
                      </h4>
                      <p className="text-xs opacity-70 truncate">
                        {book.author}
                      </p>
                    </div>
                    <div className="form-control">
                      <input
                        type="checkbox"
                        className="checkbox checkbox-primary"
                        checked={selectedBooks.includes(book.id)}
                        onChange={() => handleCheckboxChange(book.id)}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="modal-action mt-6">
              <button
                className="btn btn-ghost"
                onClick={() => {
                  setShowAddModal(false);
                  setSelectedBooks([]);
                }}
              >
                Batal
              </button>
              <button
                className="btn btn-primary gap-2"
                onClick={handleAddBooks}
                disabled={selectedBooks.length === 0}
              >
                <Plus size={16} />
                Tambahkan Buku Terpilih ({selectedBooks.length})
              </button>
            </div>
          </div>
          <div
            className="modal-backdrop"
            onClick={() => {
              setShowAddModal(false);
              setSelectedBooks([]);
            }}
          ></div>
        </div>
      )}
    </div>
  );
};

export default CollectionDetail;
