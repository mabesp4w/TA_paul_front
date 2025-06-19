/** @format */
"use client";
// src/app/page.tsx
import BookGrid from "@/components/book/BookGrid";
import useBooksApi from "@/stores/api/Book";
import { useEffect } from "react";
import useCategoryApi from "@/stores/api/Category";
import { useRouter } from "next/navigation";

export default function HomePage() {
  // store
  const { setLatestBooks, setPopularBooks, latestBooks } = useBooksApi();
  const { setPopularCategory } = useCategoryApi();
  // router
  const router = useRouter();

  // get data
  useEffect(() => {
    setLatestBooks();
    setPopularBooks();
    setPopularCategory();
  }, [setLatestBooks, setPopularBooks, setPopularCategory]);

  const handleLogin = () => {
    // Tambahkan logika login di sini
    router.push("/auth/login");
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="navbar bg-base-100 shadow-lg fixed top-0 left-0 right-0 z-50">
        <div className="navbar-start">
          <a className="btn btn-ghost text-xl font-bold">📚 Ruang Baca WWF</a>
        </div>

        <div className="navbar-end">
          <button onClick={handleLogin} className="btn btn-primary">
            Login
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex">
        <div className="flex-1 p-4 md:p-6 mt-20">
          {/* Hero Section */}
          <section className="hero bg-base-200 rounded-box mb-8">
            <div className="hero-content flex-col lg:flex-row py-8">
              <div className="lg:w-1/2">
                <h1 className="text-3xl md:text-4xl font-bold">
                  Selamat datang di Ruang Baca Digital WWF
                </h1>
                <p className="py-4">
                  Akses ribuan buku digital dalam berbagai format. Baca di mana
                  saja dan kapan saja. Temukan buku favorit Anda dan mulai
                  petualangan membaca sekarang!
                </p>
              </div>
            </div>
          </section>

          {/* Buku Terbaru */}
          <section className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">Buku Terbaru</h2>
            </div>
            <BookGrid books={latestBooks} />
          </section>
        </div>
      </div>
    </div>
  );
}
