/** @format */
"use client";
// pages/kategori.tsx
import { NextPage } from "next";
import { useState } from "react";
import { Search, Plus, Edit, Trash2 } from "lucide-react";
import Link from "next/link";
import { Category, Book } from "@/types";

const KategoriPage: NextPage = () => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  const [newCategoryName, setNewCategoryName] = useState<string>("");
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [categoryToDelete, setCategoryToDelete] = useState<Category | null>(
    null
  );

  // Sample categories data
  const categories: Category[] = [
    { id: "1", name: "Novel", bookCount: 18 },
    { id: "2", name: "Self-Help", bookCount: 7 },
    { id: "3", name: "Biografi", bookCount: 4 },
    { id: "4", name: "Sejarah", bookCount: 6 },
    { id: "5", name: "Teknologi", bookCount: 9 },
    { id: "6", name: "Pendidikan", bookCount: 5 },
    { id: "7", name: "Bisnis", bookCount: 6 },
    { id: "8", name: "Agama", bookCount: 3 },
  ];

  // Sample books data
  const books: Book[] = [
    {
      id: "1",
      title: "Laskar Pelangi",
      author: "Andrea Hirata",
      year: "2005",
      coverImage: "/covers/laskar-pelangi.jpg",
      createdAt: "",
      updatedAt: "",
    },
    {
      id: "2",
      title: "Bumi Manusia",
      author: "Pramoedya Ananta Toer",
      year: "1980",
      coverImage: "/covers/bumi-manusia.jpg",
      createdAt: "",
      updatedAt: "",
    },
    {
      id: "3",
      title: "Filosofi Teras",
      author: "Henry Manampiring",
      year: "2018",
      coverImage: "/covers/filosofi-teras.jpg",
      createdAt: "",
      updatedAt: "",
    },
    {
      id: "4",
      title: "Hujan",
      author: "Tere Liye",
      year: "2016",
      coverImage: "/covers/hujan.jpg",
      createdAt: "",
      updatedAt: "",
    },
    {
      id: "5",
      title: "Pulang",
      author: "Tere Liye",
      year: "2021",
      coverImage: "/covers/pulang.jpg",
      createdAt: "",
      updatedAt: "",
    },
    {
      id: "6",
      title: "Sebuah Seni untuk Bersikap Bodo Amat",
      author: "Mark Manson",
      year: "2018",
      coverImage: "/covers/seni-bodo-amat.jpg",
      createdAt: "",
      updatedAt: "",
    },
  ];

  // Handle adding a new category
  const handleAddCategory = () => {
    console.log("Adding new category:", newCategoryName);
    setShowAddModal(false);
    setNewCategoryName("");
    // Logic to add a new category would go here
  };

  // Handle initiating category deletion
  const confirmDeleteCategory = (category: Category) => {
    setCategoryToDelete(category);
    setShowDeleteModal(true);
  };

  // Handle actual category deletion
  const handleDeleteCategory = () => {
    if (categoryToDelete) {
      console.log("Deleting category:", categoryToDelete.name);
      // Logic to delete category would go here
    }
    setShowDeleteModal(false);
    setCategoryToDelete(null);
  };

  // Get books for the selected category
  const getCategoryBooks = (categoryId: string): Book[] => {
    console.log({ categoryId });
    // In a real app, you would filter books by category
    // Here we're just returning a subset of sample books
    return books.slice(0, Math.floor(Math.random() * books.length) + 1);
  };

  return (
    <div className="p-6">
      {/* Page Header */}
      <div className="flex items-center justify-between mb-6 mr-12 lg:mr-0">
        <h1 className="text-2xl font-bold">Kategori</h1>

        <div className="flex gap-3">
          <div className="relative max-w-md">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search size={18} className="text-gray-400" />
            </div>
            <input
              type="text"
              className="input input-bordered pl-10 w-full"
              placeholder="Cari kategori..."
            />
          </div>

          <button
            className="btn btn-primary gap-2"
            onClick={() => setShowAddModal(true)}
          >
            <Plus size={18} />
            Tambah Kategori
          </button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Categories Sidebar */}
        <div className="md:w-64 lg:w-80">
          <div className="bg-base-100 rounded-lg shadow-md overflow-hidden">
            <div className="p-3 border-b font-medium">Daftar Kategori</div>
            <ul className="menu p-2">
              {categories.map((category) => (
                <li key={category.id}>
                  <a
                    className={activeCategory === category.id ? "active" : ""}
                    onClick={() => setActiveCategory(category.id)}
                  >
                    <div className="flex justify-between items-center w-full">
                      <span>{category.name}</span>
                      <span className="badge badge-sm">
                        {category.bookCount}
                      </span>
                    </div>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Books in Category */}
        <div className="flex-1">
          {activeCategory ? (
            <div>
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-2">
                  <h2 className="text-xl font-bold">
                    {categories.find((c) => c.id === activeCategory)?.name}
                  </h2>
                  <span className="badge badge-primary badge-sm">
                    {categories.find((c) => c.id === activeCategory)?.bookCount}{" "}
                    buku
                  </span>
                </div>

                <div className="dropdown dropdown-end">
                  <button className="btn btn-sm btn-ghost">Kelola</button>
                  <ul
                    tabIndex={0}
                    className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
                  >
                    <li>
                      <a>
                        <Edit size={16} /> Edit Kategori
                      </a>
                    </li>
                    <li>
                      <a
                        className="text-error"
                        onClick={() => {
                          const category = categories.find(
                            (c) => c.id === activeCategory
                          );
                          if (category) confirmDeleteCategory(category);
                        }}
                      >
                        <Trash2 size={16} /> Hapus Kategori
                      </a>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="divider my-2"></div>

              {/* Books Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {getCategoryBooks(activeCategory).map((book) => (
                  <div
                    key={book.id}
                    className="card bg-base-100 shadow hover:shadow-md transition-shadow"
                  >
                    <div className="p-3 flex items-start gap-3">
                      <div className="w-16 h-24 shrink-0">
                        <img
                          src={book.coverImage || `/api/placeholder/64/96`}
                          alt={`Cover buku ${book.title}`}
                          className="w-full h-full object-cover rounded"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-sm truncate">
                          {book.title}
                        </h3>
                        <p className="text-xs opacity-70 mb-2 truncate">
                          {book.author}
                        </p>
                        <p className="text-xs opacity-70">{book.year}</p>
                        <div className="mt-2">
                          <Link
                            href={`/baca/${book.id}`}
                            className="btn btn-ghost btn-xs"
                          >
                            Baca
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="bg-base-100 rounded-lg shadow-md p-8 text-center">
              <div className="text-5xl mb-3 opacity-30">📚</div>
              <h3 className="text-lg font-medium mb-2">Pilih Kategori</h3>
              <p className="text-base-content/70 mb-4">
                Silakan pilih kategori dari daftar di samping untuk melihat
                buku-buku yang tersedia.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Add Category Modal */}
      {showAddModal && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Tambah Kategori Baru</h3>

            <form
              className="py-4"
              onSubmit={(e) => {
                e.preventDefault();
                handleAddCategory();
              }}
            >
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">Nama Kategori</span>
                </label>
                <input
                  type="text"
                  placeholder="Masukkan nama kategori"
                  className="input input-bordered w-full"
                  value={newCategoryName}
                  onChange={(e) => setNewCategoryName(e.target.value)}
                  required
                />
              </div>
            </form>

            <div className="modal-action">
              <button
                className="btn btn-ghost"
                onClick={() => {
                  setShowAddModal(false);
                  setNewCategoryName("");
                }}
              >
                Batal
              </button>
              <button
                className="btn btn-primary"
                onClick={handleAddCategory}
                disabled={!newCategoryName.trim()}
              >
                Tambah Kategori
              </button>
            </div>
          </div>
          <div
            className="modal-backdrop"
            onClick={() => {
              setShowAddModal(false);
              setNewCategoryName("");
            }}
          ></div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && categoryToDelete && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Hapus Kategori</h3>
            <p className="py-4">
              Apakah Anda yakin ingin menghapus kategori
              <span className="font-medium"> "{categoryToDelete.name}"</span>?
              Semua hubungan buku dengan kategori ini akan dihapus.
            </p>
            <div className="modal-action">
              <button
                className="btn btn-ghost"
                onClick={() => {
                  setShowDeleteModal(false);
                  setCategoryToDelete(null);
                }}
              >
                Batal
              </button>
              <button className="btn btn-error" onClick={handleDeleteCategory}>
                Hapus
              </button>
            </div>
          </div>
          <div
            className="modal-backdrop"
            onClick={() => {
              setShowDeleteModal(false);
              setCategoryToDelete(null);
            }}
          ></div>
        </div>
      )}
    </div>
  );
};

export default KategoriPage;
