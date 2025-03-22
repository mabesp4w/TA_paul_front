/** @format */

"use client";
import React from "react";
import { Search } from "lucide-react";
import BookCard from "@/components/card/BookCard";
import StatCard from "@/components/card/StatCard";
import ReadingHistoryTable from "@/components/table/ReadingHistoryTable";

const Content = () => {
  // Sample data for the dashboard
  const stats = [
    {
      title: "Total Buku Dibaca",
      value: 27,
      change: "+3 bulan ini",
      positive: true,
    },
    { title: "Sedang Dibaca", value: 4, change: "Buku aktif", positive: null },
    {
      title: "Bookmark",
      value: 36,
      change: "Halaman ditandai",
      positive: null,
    },
    { title: "Anotasi", value: 58, change: "Catatan dibuat", positive: null },
  ];

  // Continuing reading books
  const currentBooks = [
    {
      id: 1,
      title: "Laskar Pelangi",
      author: "Andrea Hirata",
      progress: 75,
      format: "EPUB",
      cover: "/covers/laskar-pelangi.jpg",
    },
    {
      id: 2,
      title: "Bumi Manusia",
      author: "Pramoedya Ananta Toer",
      progress: 42,
      format: "PDF",
      cover: "/covers/bumi-manusia.jpg",
    },
    {
      id: 3,
      title: "Filosofi Teras",
      author: "Henry Manampiring",
      progress: 18,
      format: "EPUB",
      cover: "/covers/filosofi-teras.jpg",
    },
    {
      id: 4,
      title: "Hujan",
      author: "Tere Liye",
      progress: 8,
      format: "PDF",
      cover: "/covers/hujan.jpg",
    },
  ];

  // New books
  const newBooks = [
    {
      id: 5,
      title: "Pulang",
      author: "Tere Liye",
      year: "2021",
      category: "Novel",
      cover: "/covers/pulang.jpg",
    },
    {
      id: 6,
      title: "Sebuah Seni untuk Bersikap Bodo Amat",
      author: "Mark Manson",
      year: "2018",
      category: "Self-Help",
      cover: "/covers/seni-bodo-amat.jpg",
    },
    {
      id: 7,
      title: "Rentang Kisah",
      author: "Gita Savitri Devi",
      year: "2020",
      category: "Biografi",
      cover: "/covers/rentang-kisah.jpg",
    },
    {
      id: 8,
      title: "Tentang Kamu",
      author: "Tere Liye",
      year: "2019",
      category: "Novel",
      cover: "/covers/tentang-kamu.jpg",
    },
  ];

  // Reading history
  const readingHistory = [
    {
      id: 1,
      title: "Laskar Pelangi",
      author: "Andrea Hirata",
      progress: 75,
      format: "EPUB",
      lastRead: "2 jam yang lalu",
      status: "Aktif",
      cover: "/covers/laskar-pelangi.jpg",
    },
    {
      id: 2,
      title: "Bumi Manusia",
      author: "Pramoedya Ananta Toer",
      progress: 42,
      format: "PDF",
      lastRead: "Kemarin",
      status: "Aktif",
      cover: "/covers/bumi-manusia.jpg",
    },
    {
      id: 3,
      title: "Laut Bercerita",
      author: "Leila S. Chudori",
      progress: 100,
      format: "EPUB",
      lastRead: "3 hari yang lalu",
      status: "Selesai",
      cover: "/covers/laut-bercerita.jpg",
    },
  ];
  return (
    <div className="p-6">
      {/* Top Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <h1 className="text-2xl font-bold">Selamat Datang Kembali, Ahmad!</h1>

        <div className="flex gap-4">
          <div className="relative max-w-sm">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search size={18} className="text-gray-400" />
            </div>
            <input
              type="text"
              className="input input-bordered pl-10 w-full md:w-64 mr-12 lg:mr-0"
              placeholder="Cari buku, penulis, kategori..."
            />
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <StatCard
            key={index}
            title={stat.title}
            value={stat.value}
            change={stat.change}
            positive={stat.positive}
          />
        ))}
      </div>

      {/* Continue Reading Section */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold">Lanjutkan Membaca</h2>
        <a href="#" className="link link-primary font-medium">
          Lihat Semua
        </a>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
        {currentBooks.map((book) => (
          <BookCard key={book.id} book={book} showProgress={true} />
        ))}
      </div>

      {/* New Books Section */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold">Buku Terbaru</h2>
        <a href="#" className="link link-primary font-medium">
          Lihat Semua
        </a>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
        {newBooks.map((book) => (
          <BookCard key={book.id} book={book} showProgress={false} />
        ))}
      </div>

      {/* Reading History */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold">Riwayat Membaca</h2>
        <a href="#" className="link link-primary font-medium">
          Lihat Semua
        </a>
      </div>

      <ReadingHistoryTable history={readingHistory} />
    </div>
  );
};

export default Content;
