/** @format */

// src/app/buku/[id]/page.tsx
"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import BookDetail from "@/components/book/BookDetail";
// import BookGrid from "@/components/book/BookGrid";
import UserSidebar from "@/components/sidebar/UserSidebar";
import useBook from "@/stores/crud/Book";
import { useEffect } from "react";

export default function BookDetailPage() {
  const params = useParams();
  const id = params.id as string;
  // store
  const { setShowBook, showDtBook } = useBook();
  // effect
  useEffect(() => {
    setShowBook(id);
  }, [id, setShowBook]);

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
              <li className="whitespace-normal">{showDtBook?.title}</li>
            </ul>
          </div>
        </div>

        <BookDetail {...(showDtBook as any)} />

        <section className="mt-12">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Buku Serupa</h2>
            <Link href="/buku" className="btn btn-ghost btn-sm gap-1">
              Lihat Semua <ChevronRight size={16} />
            </Link>
          </div>
          {/* <BookGrid books={showDtBook} /> */}
        </section>
      </div>
    </div>
  );
}
