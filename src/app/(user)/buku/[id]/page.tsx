/** @format */

// src/app/buku/[id]/page.tsx
"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import BookDetail from "@/components/book/BookDetail";
import BookGrid from "@/components/book/BookGrid";
import UserSidebar from "@/components/sidebar/UserSidebar";

export default function BookDetailPage() {
  const params = useParams();
  const id = params.id as string;

  // Contoh data buku untuk UI (dalam implementasi nyata, ini akan diambil dari API)
  const bookData = {
    id,
    title: "Filosofi Teras",
    author: "Henry Manampiring",
    year: "2019",
    publisher: "Kompas",
    description:
      "Filosofi Teras adalah sebuah buku pengantar filsafat Stoa yang dikemas secara modern dan relevan dengan kehidupan masa kini. Buku ini mengajarkan bagaimana menerapkan filosofi kuno untuk mengatasi kecemasan dan overthinking yang sering terjadi di era digital.",
    coverImage: "/images/filosofi-teras.jpg",
    categories: [
      { id: "1", category_nm: "Filsafat" },
      { id: "2", category_nm: "Pengembangan Diri" },
    ],
    files: [
      { id: "101", file_type: "epub" },
      { id: "102", file_type: "pdf" },
    ],
  };

  // Contoh buku terkait
  const relatedBooks = [
    {
      id: "3",
      title: "Sapiens",
      author: "Yuval Noah Harari",
      coverImage: "/images/sapiens.jpg",
      year: "2015",
    },
    {
      id: "7",
      title: "Thinking, Fast and Slow",
      author: "Daniel Kahneman",
      coverImage: "/images/thinking.jpg",
      year: "2011",
    },
    {
      id: "10",
      title: "Man's Search for Meaning",
      author: "Viktor E. Frankl",
      coverImage: "/images/mans-search.jpg",
      year: "1946",
    },
    {
      id: "11",
      title: "Meditations",
      author: "Marcus Aurelius",
      coverImage: "/images/meditations.jpg",
      year: "180",
    },
  ];

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
                <Link href="/buku">Koleksi Buku</Link>
              </li>
              <li>{bookData.title}</li>
            </ul>
          </div>
        </div>

        <BookDetail {...bookData} />

        <section className="mt-12">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Buku Serupa</h2>
            <Link href="/buku" className="btn btn-ghost btn-sm gap-1">
              Lihat Semua <ChevronRight size={16} />
            </Link>
          </div>
          <BookGrid books={relatedBooks} />
        </section>
      </div>
    </div>
  );
}
