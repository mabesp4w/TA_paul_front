/** @format */

// src/app/kategori/page.tsx
import Link from "next/link";
import { Book, ChevronRight } from "lucide-react";
import UserSidebar from "@/components/sidebar/UserSidebar";

// Contoh data kategori
const allCategories = [
  { id: "1", category_nm: "Pengembangan Diri", bookCount: 24 },
  { id: "2", category_nm: "Psikologi", bookCount: 18 },
  { id: "3", category_nm: "Bisnis", bookCount: 32 },
  { id: "4", category_nm: "Teknologi", bookCount: 15 },
  { id: "5", category_nm: "Sejarah", bookCount: 21 },
  { id: "6", category_nm: "Filsafat", bookCount: 12 },
  { id: "7", category_nm: "Sains", bookCount: 19 },
  { id: "8", category_nm: "Fiksi", bookCount: 28 },
  { id: "9", category_nm: "Kesehatan", bookCount: 14 },
  { id: "10", category_nm: "Pendidikan", bookCount: 16 },
  { id: "11", category_nm: "Politik", bookCount: 9 },
  { id: "12", category_nm: "Seni", bookCount: 11 },
];

export default function CategoriesPage() {
  return (
    <div className="flex">
      <UserSidebar />
      <div className="flex-1 p-4 md:p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl md:text-3xl font-bold">Kategori Buku</h1>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {allCategories.map((category) => (
            <Link
              key={category.id}
              href={`/kategori/${category.id}`}
              className="card bg-base-100 shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="card-body p-4">
                <h3 className="card-title">{category.category_nm}</h3>
                <div className="flex items-center gap-1 text-sm opacity-70">
                  <Book size={16} />
                  <span>{category.bookCount} buku</span>
                </div>
                <div className="card-actions justify-end mt-2">
                  <ChevronRight size={16} className="text-primary" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
