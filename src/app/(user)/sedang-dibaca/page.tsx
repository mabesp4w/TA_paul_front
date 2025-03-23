/** @format */

// src/app/sedang-dibaca/page.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, Clock, BookOpen } from "lucide-react";
import UserSidebar from "@/components/sidebar/UserSidebar";

// Contoh data buku yang sedang dibaca
const inProgressBooks = [
  {
    id: "1",
    title: "Filosofi Teras",
    author: "Henry Manampiring",
    coverImage: "/images/filosofi-teras.jpg",
    progress: 45,
    lastRead: "2025-03-22T14:30:00",
    format: "epub",
  },
  {
    id: "2",
    title: "Atomic Habits",
    author: "James Clear",
    coverImage: "/images/atomic-habits.jpg",
    progress: 32,
    lastRead: "2025-03-20T10:15:00",
    format: "pdf",
  },
  {
    id: "7",
    title: "Thinking, Fast and Slow",
    author: "Daniel Kahneman",
    coverImage: "/images/thinking.jpg",
    progress: 18,
    lastRead: "2025-03-18T21:45:00",
    format: "epub",
  },
];

export default function InProgressPage() {
  const [searchQuery, setSearchQuery] = useState("");

  // Filter buku berdasarkan pencarian
  const filteredBooks = inProgressBooks.filter(
    (book) =>
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase())
  );

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

        {filteredBooks.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBooks.map((book) => (
              <div
                key={book.id}
                className="card bg-base-100 shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="card-body p-0">
                  <div className="flex">
                    <div className="w-1/3 h-48 bg-base-200">
                      {book.coverImage ? (
                        <img
                          src={book.coverImage}
                          alt={book.title}
                          className="h-full w-full object-cover rounded-l-lg"
                        />
                      ) : (
                        <div className="h-full w-full flex items-center justify-center">
                          <BookOpen size={48} className="opacity-30" />
                        </div>
                      )}
                    </div>
                    <div className="w-2/3 p-4">
                      <h2 className="card-title text-lg">{book.title}</h2>
                      <p className="text-sm opacity-70">{book.author}</p>

                      <div className="mt-4">
                        <div className="flex justify-between items-center mb-1 text-xs">
                          <span>Progress</span>
                          <span>{book.progress}%</span>
                        </div>
                        <div className="w-full bg-base-200 rounded-full h-2">
                          <div
                            className="bg-primary h-2 rounded-full"
                            style={{ width: `${book.progress}%` }}
                          ></div>
                        </div>
                      </div>

                      <div className="mt-2 flex items-center gap-1 text-xs opacity-70">
                        <Clock size={12} />
                        <span>
                          Terakhir dibaca: {formatDate(book.lastRead)}
                        </span>
                      </div>

                      <div className="card-actions justify-end mt-4">
                        <Link
                          href={`/buku/${book.id}/baca?format=${book.format}`}
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
