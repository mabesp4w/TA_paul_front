/** @format */

// src/app/anotasi/page.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, Highlighter, BookOpen, Trash2, Edit } from "lucide-react";
import UserSidebar from "@/components/sidebar/UserSidebar";

// Contoh data anotasi
const userAnnotations = [
  {
    id: "1",
    bookId: "1",
    title: "Filosofi Teras",
    author: "Henry Manampiring",
    coverImage: "/images/filosofi-teras.jpg",
    text: "Dikotomi kendali adalah konsep penting dalam filosofi Stoa yang mengajarkan kita untuk fokus pada hal-hal yang dapat kita kendalikan dan menerima hal-hal yang di luar kendali kita.",
    note: "Ini konsep yang bisa saya terapkan untuk mengurangi kecemasan.",
    color: "yellow",
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
    text: "You do not rise to the level of your goals. You fall to the level of your systems.",
    note: "Sistem lebih penting daripada tujuan. Fokus pada proses!",
    color: "green",
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
    text: "System 1 is fast, instinctive and emotional; System 2 is slower, more deliberative, and more logical.",
    note: "",
    color: "blue",
    location: "page=42",
    created_at: "2025-03-15T19:45:00",
    file_type: "pdf",
  },
];

export default function AnnotationsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedColor, setSelectedColor] = useState<string | null>(null);

  // Filter anotasi berdasarkan pencarian dan warna
  const filteredAnnotations = userAnnotations.filter((annotation) => {
    const matchesQuery =
      annotation.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      annotation.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      annotation.text.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (annotation.note &&
        annotation.note.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesColor = selectedColor
      ? annotation.color === selectedColor
      : true;

    return matchesQuery && matchesColor;
  });

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

  // Mendapatkan warna latar belakang berdasarkan warna anotasi
  const getHighlightColor = (color: string) => {
    switch (color) {
      case "yellow":
        return "bg-yellow-200";
      case "green":
        return "bg-green-200";
      case "blue":
        return "bg-blue-200";
      case "purple":
        return "bg-purple-200";
      case "pink":
        return "bg-pink-200";
      default:
        return "bg-yellow-200";
    }
  };

  return (
    <div className="flex">
      <UserSidebar />
      <div className="flex-1 p-4 md:p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl md:text-3xl font-bold">Anotasi Saya</h1>
        </div>

        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="form-control md:flex-1">
            <div className="input-group">
              <input
                type="text"
                placeholder="Cari anotasi..."
                className="input input-bordered w-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button className="btn btn-square">
                <Search size={18} />
              </button>
            </div>
          </div>

          <div className="flex gap-2">
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-outline">
                <div className="flex items-center gap-2">
                  <Highlighter size={16} />
                  <span>Filter Warna</span>
                </div>
              </label>
              <ul
                tabIndex={0}
                className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
              >
                <li>
                  <a onClick={() => setSelectedColor(null)}>Semua Warna</a>
                </li>
                <li>
                  <a
                    onClick={() => setSelectedColor("yellow")}
                    className="flex items-center gap-2"
                  >
                    <span className="w-4 h-4 rounded-full bg-yellow-200"></span>{" "}
                    Kuning
                  </a>
                </li>
                <li>
                  <a
                    onClick={() => setSelectedColor("green")}
                    className="flex items-center gap-2"
                  >
                    <span className="w-4 h-4 rounded-full bg-green-200"></span>{" "}
                    Hijau
                  </a>
                </li>
                <li>
                  <a
                    onClick={() => setSelectedColor("blue")}
                    className="flex items-center gap-2"
                  >
                    <span className="w-4 h-4 rounded-full bg-blue-200"></span>{" "}
                    Biru
                  </a>
                </li>
                <li>
                  <a
                    onClick={() => setSelectedColor("purple")}
                    className="flex items-center gap-2"
                  >
                    <span className="w-4 h-4 rounded-full bg-purple-200"></span>{" "}
                    Ungu
                  </a>
                </li>
                <li>
                  <a
                    onClick={() => setSelectedColor("pink")}
                    className="flex items-center gap-2"
                  >
                    <span className="w-4 h-4 rounded-full bg-pink-200"></span>{" "}
                    Merah Muda
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {filteredAnnotations.length > 0 ? (
          <div className="space-y-4">
            {filteredAnnotations.map((annotation) => (
              <div
                key={annotation.id}
                className="card bg-base-100 shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="card-body">
                  <div className="flex flex-col md:flex-row md:items-start gap-4">
                    <div className="w-full md:w-1/6">
                      <div className="aspect-[2/3] relative bg-base-200 rounded-lg overflow-hidden">
                        {annotation.coverImage ? (
                          <img
                            src={annotation.coverImage}
                            alt={annotation.title}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <div className="h-full w-full flex items-center justify-center">
                            <BookOpen size={48} className="opacity-30" />
                          </div>
                        )}
                      </div>
                      <h3 className="mt-2 font-medium text-sm">
                        {annotation.title}
                      </h3>
                      <p className="text-xs opacity-70">{annotation.author}</p>
                    </div>

                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <div className="flex items-center gap-2">
                          <div
                            className={`w-4 h-4 rounded-full ${getHighlightColor(
                              annotation.color
                            )}`}
                          ></div>
                          <div className="badge badge-outline">
                            {annotation.file_type.toUpperCase()}
                          </div>
                          <span className="text-sm opacity-70">
                            {formatDate(annotation.created_at)}
                          </span>
                        </div>
                        <div className="flex gap-2">
                          <button className="btn btn-ghost btn-sm btn-circle">
                            <Edit size={16} />
                          </button>
                          <button className="btn btn-ghost btn-sm btn-circle text-error">
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>

                      <div
                        className={`p-4 my-3 rounded-md ${getHighlightColor(
                          annotation.color
                        )}`}
                      >
                        <p className="text-sm md:text-base italic">
                          {annotation.text}
                        </p>
                      </div>

                      {annotation.note && (
                        <div className="bg-base-200 p-4 rounded-md">
                          <p className="text-sm">
                            <span className="font-medium">Catatan: </span>
                            {annotation.note}
                          </p>
                        </div>
                      )}

                      <div className="card-actions justify-end mt-4">
                        <Link
                          href={`/buku/${annotation.bookId}/baca?format=${
                            annotation.file_type
                          }&location=${encodeURIComponent(
                            annotation.location
                          )}`}
                          className="btn btn-primary btn-sm"
                        >
                          Buka di Buku
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
              <Highlighter size={64} />
            </div>
            <h3 className="text-xl font-medium mb-2">Belum Ada Anotasi</h3>
            <p className="opacity-70 mb-4">
              Anda belum membuat anotasi pada buku yang Anda baca. Anotasi
              membantu Anda mencatat dan mengingat kutipan penting.
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
