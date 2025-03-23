/** @format */

// src/app/page.tsx
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import BookGrid from "@/components/book/BookGrid";
import UserSidebar from "@/components/sidebar/UserSidebar";

// Contoh data untuk UI
const recentBooks = [
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
  {
    id: "5",
    title: "Deep Work",
    author: "Cal Newport",
    coverImage: "/images/deep-work.jpg",
    year: "2016",
  },
];

const popularBooks = [
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
  {
    id: "9",
    title: "The Power of Habit",
    author: "Charles Duhigg",
    coverImage: "/images/power-habit.jpg",
    year: "2012",
  },
  {
    id: "10",
    title: "Man's Search for Meaning",
    author: "Viktor E. Frankl",
    coverImage: "/images/mans-search.jpg",
    year: "1946",
  },
];

const categories = [
  { id: "1", name: "Pengembangan Diri", count: 24 },
  { id: "2", name: "Psikologi", count: 18 },
  { id: "3", name: "Bisnis", count: 32 },
  { id: "4", name: "Teknologi", count: 15 },
  { id: "5", name: "Sejarah", count: 21 },
  { id: "6", name: "Filsafat", count: 12 },
];

export default function HomePage() {
  return (
    <div className="flex">
      <UserSidebar />
      <div className="flex-1 p-4 md:p-6">
        {/* Hero Section */}
        <section className="hero bg-base-200 rounded-box mb-8">
          <div className="hero-content flex-col lg:flex-row py-8">
            <div className="lg:w-1/2">
              <h1 className="text-3xl md:text-4xl font-bold">
                Selamat Datang di Ruang Baca Digital
              </h1>
              <p className="py-4">
                Akses ribuan buku digital dalam berbagai format. Baca di mana
                saja dan kapan saja. Temukan buku favorit Anda dan mulai
                petualangan membaca sekarang!
              </p>
              <div className="flex flex-wrap gap-2">
                <Link href="/buku" className="btn btn-primary">
                  Jelajahi Buku
                </Link>
                <Link href="/kategori" className="btn btn-outline">
                  Lihat Kategori
                </Link>
              </div>
            </div>
            <div className="lg:w-1/2 flex justify-center mt-4 lg:mt-0">
              <img
                src="/images/hero-illustration.svg"
                alt="Ruang Baca"
                className="max-w-sm"
              />
            </div>
          </div>
        </section>

        {/* Buku Terbaru */}
        <section className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Buku Terbaru</h2>
            <Link
              href="/buku?sort=newest"
              className="btn btn-ghost btn-sm gap-1"
            >
              Lihat Semua <ChevronRight size={16} />
            </Link>
          </div>
          <BookGrid books={recentBooks} />
        </section>

        {/* Buku Populer */}
        <section className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Buku Populer</h2>
            <Link
              href="/buku?sort=popular"
              className="btn btn-ghost btn-sm gap-1"
            >
              Lihat Semua <ChevronRight size={16} />
            </Link>
          </div>
          <BookGrid books={popularBooks} />
        </section>

        {/* Kategori */}
        <section className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Kategori Populer</h2>
            <Link href="/kategori" className="btn btn-ghost btn-sm gap-1">
              Lihat Semua <ChevronRight size={16} />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/kategori/${category.id}`}
                className="card bg-base-100 shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="card-body p-4">
                  <h3 className="card-title">{category.name}</h3>
                  <p className="text-sm opacity-70">{category.count} Buku</p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="card bg-primary text-primary-content shadow-lg my-8">
          <div className="card-body py-8">
            <h2 className="card-title text-2xl">
              Mulai Petualangan Membaca Anda
            </h2>
            <p>
              Bergabunglah dengan ribuan pembaca lain dan temukan pengetahuan
              baru setiap hari.
            </p>
            <div className="card-actions justify-end mt-4">
              <Link
                href="/daftar"
                className="btn btn-outline text-white border-white hover:bg-white hover:text-primary"
              >
                Daftar Sekarang
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
