/** @format */
"use client";
// pages/koleksi.tsx
import { NextPage } from "next";
import { useState } from "react";
import { Plus, MoreHorizontal, Edit, Trash2, ChevronRight } from "lucide-react";
import Link from "next/link";
import { Collection } from "@/types";

interface CollectionFormData {
  name: string;
  description: string;
}

const KoleksiPage: NextPage = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [modalMode, setModalMode] = useState<"create" | "edit">("create");
  const [formData, setFormData] = useState<CollectionFormData>({
    name: "",
    description: "",
  });
  const [editingCollectionId, setEditingCollectionId] = useState<string | null>(
    null
  );

  // Sample collections data
  const collections: Collection[] = [
    {
      id: "1",
      name: "Favorit",
      description: "Kumpulan buku-buku favorit",
      bookCount: 12,
      lastUpdated: "2 hari yang lalu",
      coverImages: [
        "/covers/laskar-pelangi.jpg",
        "/covers/bumi-manusia.jpg",
        "/covers/filosofi-teras.jpg",
      ],
      createdAt: "",
      userId: "user1",
    },
    {
      id: "2",
      name: "Untuk Dibaca",
      description: "Buku yang ingin dibaca di masa depan",
      bookCount: 8,
      lastUpdated: "1 minggu yang lalu",
      coverImages: ["/covers/sang-pemimpi.jpg", "/covers/atomic-habits.jpg"],
      createdAt: "",
      userId: "user1",
    },
    {
      id: "3",
      name: "Teknologi",
      description: "Buku-buku tentang teknologi dan pemrograman",
      bookCount: 5,
      lastUpdated: "3 minggu yang lalu",
      coverImages: ["/covers/sapiens.jpg"],
      createdAt: "",
      userId: "user1",
    },
    {
      id: "4",
      name: "Motivasi",
      description: "Buku-buku pengembangan diri",
      bookCount: 7,
      lastUpdated: "1 bulan yang lalu",
      coverImages: ["/covers/seni-bodo-amat.jpg", "/covers/atomic-habits.jpg"],
      createdAt: "",
      userId: "user1",
    },
  ];

  // Handle opening modal in different modes
  const openCreateModal = () => {
    setFormData({ name: "", description: "" });
    setModalMode("create");
    setEditingCollectionId(null);
    setShowModal(true);
  };

  const openEditModal = (collectionId: string) => {
    const collection = collections.find((c) => c.id === collectionId);
    if (collection) {
      setFormData({
        name: collection.name,
        description: collection.description || "",
      });
      setModalMode("edit");
      setEditingCollectionId(collectionId);
      setShowModal(true);
    }
  };

  // Handle form changes
  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = () => {
    if (modalMode === "create") {
      console.log("Creating new collection:", formData);
      // Logic to create collection would go here
    } else {
      console.log("Updating collection:", editingCollectionId, formData);
      // Logic to update collection would go here
    }
    setShowModal(false);
  };

  return (
    <div className="p-6">
      {/* Page Header */}
      <div className="flex items-center justify-between mb-6 mr-12 lg:mr-0">
        <h1 className="text-2xl font-bold">Koleksi Saya</h1>

        <button className="btn btn-primary gap-2" onClick={openCreateModal}>
          <Plus size={18} />
          Buat Koleksi
        </button>
      </div>

      {/* Collections Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {collections.map((collection) => (
          <div
            key={collection.id}
            className="card bg-base-100 shadow-lg hover:shadow-xl transition-all"
          >
            <div className="card-body p-0">
              {/* Card Header with Collection Cover */}
              <div className="relative h-40 bg-base-200 rounded-t-lg overflow-hidden">
                <div className="absolute inset-0 flex justify-center items-center">
                  {collection.coverImages &&
                  collection.coverImages.length > 0 ? (
                    <div className="flex -space-x-4 transform -rotate-6">
                      {collection.coverImages.map((cover, index) => (
                        <div
                          key={index}
                          className="w-24 h-32 rounded shadow-md"
                          style={{
                            backgroundImage: `url(${
                              cover || "/api/placeholder/100/140"
                            })`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                            zIndex: collection.coverImages
                              ? collection.coverImages.length - index
                              : 1,
                            transform: `rotate(${index * 5}deg)`,
                          }}
                        ></div>
                      ))}
                    </div>
                  ) : (
                    <div className="bg-base-300 flex items-center justify-center w-24 h-32 rounded shadow-md">
                      <span className="text-base-content opacity-50">
                        Kosong
                      </span>
                    </div>
                  )}
                </div>

                {/* Menu Button */}
                <div className="dropdown dropdown-end absolute top-2 right-2">
                  <label
                    tabIndex={0}
                    className="btn btn-ghost btn-sm btn-circle"
                  >
                    <MoreHorizontal size={18} />
                  </label>
                  <ul
                    tabIndex={0}
                    className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
                  >
                    <li>
                      <a onClick={() => openEditModal(collection.id)}>
                        <Edit size={16} /> Edit Koleksi
                      </a>
                    </li>
                    <li>
                      <a className="text-error">
                        <Trash2 size={16} /> Hapus Koleksi
                      </a>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Card Content */}
              <div className="p-4">
                <h2 className="card-title text-lg">{collection.name}</h2>
                <p className="text-sm opacity-70 line-clamp-2 mb-2">
                  {collection.description}
                </p>

                <div className="flex justify-between items-center text-xs opacity-70">
                  <span>{collection.bookCount} buku</span>
                  <span>Diperbarui {collection.lastUpdated}</span>
                </div>

                <div className="card-actions justify-end mt-4">
                  <Link
                    href={`/koleksi/${collection.id}`}
                    className="btn btn-outline btn-sm gap-1"
                  >
                    Lihat <ChevronRight size={16} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Create/Edit Collection Modal */}
      {showModal && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg">
              {modalMode === "create" ? "Buat Koleksi Baru" : "Edit Koleksi"}
            </h3>

            <form
              className="py-4"
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit();
              }}
            >
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">Nama Koleksi</span>
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="Masukkan nama koleksi"
                  className="input input-bordered w-full"
                  value={formData.name}
                  onChange={handleFormChange}
                  required
                />
              </div>

              <div className="form-control w-full mt-4">
                <label className="label">
                  <span className="label-text">Deskripsi (Opsional)</span>
                </label>
                <textarea
                  name="description"
                  className="textarea textarea-bordered h-24"
                  placeholder="Deskripsi koleksi"
                  value={formData.description}
                  onChange={handleFormChange}
                ></textarea>
              </div>
            </form>

            <div className="modal-action">
              <button
                className="btn btn-ghost"
                onClick={() => setShowModal(false)}
              >
                Batal
              </button>
              <button
                className="btn btn-primary"
                onClick={handleSubmit}
                disabled={!formData.name}
              >
                {modalMode === "create" ? "Buat Koleksi" : "Simpan Perubahan"}
              </button>
            </div>
          </div>
          <div
            className="modal-backdrop"
            onClick={() => setShowModal(false)}
          ></div>
        </div>
      )}
    </div>
  );
};

export default KoleksiPage;
