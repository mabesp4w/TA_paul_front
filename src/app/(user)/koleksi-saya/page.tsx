/** @format */

// src/app/koleksi-saya/page.tsx
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Plus, FolderOpen, Book, Trash2, Edit } from "lucide-react";
import UserSidebar from "@/components/sidebar/UserSidebar";
import useCollections from "@/stores/crud/Collections";
import Cookies from "js-cookie";
import Image from "next/image";

export default function CollectionsPage() {
  // cookies
  const user = JSON.parse(Cookies.get("user") || "{}");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [collectionName, setCollectionName] = useState("");
  const [collectionDescription, setCollectionDescription] = useState("");
  // store
  const { setCollection, dtCollection } = useCollections();
  useEffect(() => {
    if (user?.id) {
      setCollection({
        user: user.id,
        per_page: 100,
      });
    }
  }, [setCollection, user.id]);

  console.log({ dtCollection });

  return (
    <div className="flex">
      <UserSidebar />
      <div className="flex-1 p-4 md:p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl md:text-3xl font-bold">Koleksi Saya</h1>
          <button
            className="btn btn-primary btn-sm gap-1"
            onClick={() => setIsModalOpen(true)}
          >
            <Plus size={16} /> Buat Koleksi
          </button>
        </div>

        {dtCollection?.data.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {dtCollection.data.map((collection) => (
              <div
                key={collection.id}
                className="card bg-base-100 shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="card-body">
                  <div className="flex justify-between items-start">
                    <div>
                      <h2 className="card-title">
                        <FolderOpen size={20} className="text-primary" />{" "}
                        {collection.collection_nm}
                      </h2>
                      <p className="text-sm opacity-70">
                        {collection.description}
                      </p>
                    </div>
                    <div className="dropdown dropdown-end">
                      <label
                        tabIndex={0}
                        className="btn btn-ghost btn-xs btn-circle"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          className="inline-block w-5 h-5 stroke-current"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
                          ></path>
                        </svg>
                      </label>
                      <ul
                        tabIndex={0}
                        className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
                      >
                        <li>
                          <a className="flex gap-2">
                            <Edit size={16} /> Edit
                          </a>
                        </li>
                        <li>
                          <a className="flex gap-2 text-error">
                            <Trash2 size={16} /> Hapus
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="mt-2 flex items-center gap-1 text-sm">
                    <Book size={16} />
                    <span>{collection.book_count} buku</span>
                  </div>

                  {/* Preview Buku */}
                  <div className="flex mt-2 mb-4 h-24 overflow-hidden">
                    {collection.book_detail.slice(0, 4).map((book, index) => (
                      <div
                        key={book.id}
                        className="relative h-full w-16 mr-1 overflow-hidden rounded-md"
                        style={{ right: index * 3 + "px" }}
                      >
                        {book.cover_image ? (
                          <Image
                            src={book.cover_image}
                            alt={book.title}
                            className="h-full w-full object-cover"
                            width={100}
                            height={100}
                          />
                        ) : (
                          <div className="h-full w-full bg-base-300 flex items-center justify-center">
                            <Book size={16} className="opacity-40" />
                          </div>
                        )}
                      </div>
                    ))}

                    {collection.book_count > 4 && (
                      <div className="flex items-center justify-center h-full w-16 rounded-md bg-base-200">
                        <span className="text-sm font-medium">
                          +{collection.book_count - 4}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="card-actions justify-end">
                    <Link
                      href={`/koleksi-saya/${collection.id}`}
                      className="btn btn-primary btn-sm"
                    >
                      Lihat
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <FolderOpen size={64} className="opacity-30 mb-4" />
            <h3 className="text-xl font-medium mb-2">Belum Ada Koleksi</h3>
            <p className="opacity-70 mb-4">
              Anda belum memiliki koleksi buku. Buat koleksi untuk mengorganisir
              buku-buku favorit Anda.
            </p>
            <button
              className="btn btn-primary gap-1"
              onClick={() => setIsModalOpen(true)}
            >
              <Plus size={16} /> Buat Koleksi
            </button>
          </div>
        )}

        {/* Modal Buat Koleksi */}
        <dialog
          className={`modal ${isModalOpen ? "modal-open" : ""}`}
          onClick={(e) => e.target === e.currentTarget && setIsModalOpen(false)}
        >
          <div className="modal-box">
            <h3 className="font-bold text-lg mb-4">Buat Koleksi Baru</h3>
            <form>
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Nama Koleksi</span>
                </label>
                <input
                  type="text"
                  placeholder="Masukkan nama koleksi"
                  className="input input-bordered w-full"
                  value={collectionName}
                  onChange={(e) => setCollectionName(e.target.value)}
                />
              </div>

              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Deskripsi</span>
                </label>
                <textarea
                  className="textarea textarea-bordered h-24"
                  placeholder="Deskripsi koleksi (opsional)"
                  value={collectionDescription}
                  onChange={(e) => setCollectionDescription(e.target.value)}
                ></textarea>
              </div>

              <div className="modal-action">
                <button
                  type="button"
                  className="btn btn-ghost"
                  onClick={() => setIsModalOpen(false)}
                >
                  Batal
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => {
                    // Logika untuk menyimpan koleksi baru
                    setIsModalOpen(false);
                  }}
                >
                  Simpan
                </button>
              </div>
            </form>
          </div>
        </dialog>
      </div>
    </div>
  );
}
