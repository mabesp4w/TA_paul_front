/** @format */
"use client";
// src/app/page.tsx
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import BookGrid from "@/components/book/BookGrid";
import UserSidebar from "@/components/sidebar/UserSidebar";
import useBooksApi from "@/stores/api/Book";
import { useEffect } from "react";
import useCategoryApi from "@/stores/api/Category";

export default function HomePage() {
  // store
  const { setLatestBooks, setPopularBooks, popularBooks, latestBooks } =
    useBooksApi();
  const { setPopularCategory, popularCategory } = useCategoryApi();
  // get data
  useEffect(() => {
    setLatestBooks();
    setPopularBooks();
    setPopularCategory();
  }, [setLatestBooks, setPopularBooks, setPopularCategory]);

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
          <BookGrid books={latestBooks} />
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
            {popularCategory.map((category) => (
              <Link
                key={category.id}
                href={`/kategori/${category.id}`}
                className="card bg-base-100 shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="card-body p-4">
                  <h3 className="card-title">{category.category_nm}</h3>
                  <p className="text-sm opacity-70">
                    {category.book_count} Buku
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
