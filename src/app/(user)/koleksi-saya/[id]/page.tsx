/** @format */

// src/app/koleksi-saya/[id]/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { FolderOpen, Plus, Search, Book } from "lucide-react";
import UserSidebar from "@/components/sidebar/UserSidebar";
import useCollections from "@/stores/crud/Collections";
import { Book as BookType } from "@/types";
import Image from "next/image";
import BookCard from "@/components/book/BookCard";
import { url_storage } from "@/services/baseURL";

export default function CollectionDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddBookModalOpen, setIsAddBookModalOpen] = useState(false);
  const [filteredBooks, setFilteredBooks] = useState<BookType[]>([]);

  // store
  const {
    setShowCollection,
    showCollection,
    setAvailableBooks,
    dtAvailableBooks,
  } = useCollections();

  useEffect(() => {
    setShowCollection(id);
    setAvailableBooks(id);
  }, [id, setAvailableBooks, setShowCollection]);

  // Filter buku berdasarkan pencarian
  useEffect(() => {
    if (showCollection) {
      const filtered = showCollection?.book_detail?.filter(
        (book: BookType) =>
          book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          book.author.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredBooks(filtered);
    }
  }, [searchQuery, showCollection]);

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
              <li>{showCollection?.collection_nm}</li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-start gap-6 mb-6">
          <div>
            <div className="flex items-center gap-2">
              <FolderOpen size={24} className="text-primary" />
              <h1 className="text-2xl md:text-3xl font-bold">
                {showCollection?.collection_nm}
              </h1>
            </div>
            <p className="mt-2 text-gray-600 max-w-2xl">
              {showCollection?.description}
            </p>
          </div>

          <div className="flex flex-wrap gap-2 self-start">
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

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {filteredBooks.length > 0 &&
            filteredBooks.map((book: BookType) => (
              <BookCard
                key={book.id}
                id={book.id}
                title={book.title}
                author={book.author}
                coverImage={(url_storage + book.cover_image) as string}
                year={book.year as string}
              />
            ))}
        </div>

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
              {dtAvailableBooks &&
                dtAvailableBooks.map((book) => (
                  <div
                    key={book.id}
                    className="card card-compact card-side bg-base-100 shadow"
                  >
                    <figure className="w-20 h-auto bg-base-200">
                      {book.cover_image ? (
                        <Image
                          src={url_storage + book.cover_image}
                          alt={book.title}
                          className="h-full object-cover"
                          width={100}
                          height={150}
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
