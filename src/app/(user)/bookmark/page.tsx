/** @format */

// src/app/bookmark/page.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, Bookmark, BookOpen, Trash2, Calendar } from "lucide-react";
import UserSidebar from "@/components/sidebar/UserSidebar";

// Contoh data bookmark
const userBookmarks = [
  {
    id: "1",
    bookId: "1",
    title: "Filosofi Teras",
    author: "Henry Manampiring",
    coverImage: "/images/filosofi-teras.jpg",
    bookmarkTitle: "Bab 3: Konsep Dikotomi Kendali",
    location: "epubcfi(/6/12!/4/2/4/2[pgepubid00035]/1:0)",
    created_at: "2025-03-20T10:15:00",
    file_type: "epub",
  },
  {
    id: "2",
    bookId: "2",
    title: "Atomic Habits",
    author: "James Clear",
    coverImage: "/images/atomic-habits.jpg",
    bookmarkTitle: "Four Laws of Behavior Change",
    location: "epubcfi(/6/14!/4/2/10/2[ch04]/1:0)",
    created_at: "2025-03-18T16:30:00",
    file_type: "epub",
  },
  {
    id: "3",
    bookId: "7",
    title: "Thinking, Fast and Slow",
    author: "Daniel Kahneman",
    coverImage: "/images/thinking.jpg",
    bookmarkTitle: "System 1 and System 2",
    location: "page=42",
    created_at: "2025-03-15T19:45:00",
    file_type: "pdf",
  },
];

export default function BookmarksPage() {
  const [searchQuery, setSearchQuery] = useState("");

  // Filter bookmark berdasarkan pencarian
  const filteredBookmarks = userBookmarks.filter(
    (bookmark) =>
      bookmark.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      bookmark.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      bookmark.bookmarkTitle.toLowerCase().includes(searchQuery.toLowerCase())
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
          <h1 className="text-2xl md:text-3xl font-bold">Bookmark Saya</h1>
        </div>

        <div className="form-control mb-6">
          <div className="input-group">
            <input
              type="text"
              placeholder="Cari bookmark..."
              className="input input-bordered w-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button className="btn btn-square">
              <Search size={18} />
            </button>
          </div>
        </div>

        {filteredBookmarks.length > 0 ? (
          <div className="space-y-4">
            {filteredBookmarks.map((bookmark) => (
              <div
                key={bookmark.id}
                className="card bg-base-100 shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="card-body p-0">
                  <div className="flex flex-col md:flex-row">
                    <div className="w-full md:w-1/5 h-48 md:h-auto bg-base-200">
                      {bookmark.coverImage ? (
                        <img
                          src={bookmark.coverImage}
                          alt={bookmark.title}
                          className="h-full w-full object-cover md:rounded-l-lg"
                        />
                      ) : (
                        <div className="h-full w-full flex items-center justify-center">
                          <BookOpen size={48} className="opacity-30" />
                        </div>
                      )}
                    </div>
                    <div className="w-full md:w-4/5 p-4">
                      <div className="flex flex-wrap justify-between items-start">
                        <div>
                          <h2 className="text-lg font-bold">
                            {bookmark.title}
                          </h2>
                          <p className="text-sm opacity-70">
                            {bookmark.author}
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <button className="btn btn-ghost btn-sm btn-circle text-error">
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>

                      <div className="divider my-2"></div>

                      <div className="flex items-center gap-2 mb-2">
                        <Bookmark size={16} className="text-primary" />
                        <h3 className="font-medium">
                          {bookmark.bookmarkTitle || "Bookmark tanpa judul"}
                        </h3>
                      </div>

                      <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-4 text-sm opacity-70 mb-4">
                        <div className="flex items-center gap-1">
                          <Calendar size={14} />
                          <span>{formatDate(bookmark.created_at)}</span>
                        </div>
                        <div className="badge badge-outline">
                          {bookmark.file_type.toUpperCase()}
                        </div>
                      </div>

                      <div className="card-actions justify-end">
                        <Link
                          href={`/buku/${bookmark.bookId}/baca?format=${
                            bookmark.file_type
                          }&location=${encodeURIComponent(bookmark.location)}`}
                          className="btn btn-primary btn-sm"
                        >
                          Buka Bookmark
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
              <Bookmark size={64} />
            </div>
            <h3 className="text-xl font-medium mb-2">Belum Ada Bookmark</h3>
            <p className="opacity-70 mb-4">
              Anda belum membuat bookmark pada buku yang Anda baca. Bookmark
              membantu Anda mengingat bagian penting dalam buku.
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
