/** @format */
"use client";
// pages/anotasi.js
import { useState } from "react";
import Link from "next/link";
import {
  Search,
  Filter,
  Highlighter,
  ChevronRight,
  Edit2,
  Trash2,
} from "lucide-react";

export default function AnotasiPage() {
  const [showFilters, setShowFilters] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedAnnotation, setSelectedAnnotation] = useState(null);
  const [noteText, setNoteText] = useState("");

  // Sample annotations data
  const annotations = [
    {
      id: 1,
      text: "Pada hari pertama di sekolah, pagi itu, kami duduk di bangku panjang di depan kelas seperti deretan bebek yang berjalan ke sungai.",
      note: "Metafora yang sangat menarik tentang anak-anak di hari pertama sekolah.",
      color: "yellow",
      book: {
        id: 1,
        title: "Laskar Pelangi",
        author: "Andrea Hirata",
        cover: "/covers/laskar-pelangi.jpg",
      },
      location: "Halaman 5",
      addedAt: "2 hari yang lalu",
    },
    {
      id: 2,
      text: "Ilmu adalah seberkas cahaya di kegelapan gulita, yang menerangi jalan raya peradaban manusia.",
      note: "Pernyataan kuat tentang pentingnya pendidikan.",
      color: "blue",
      book: {
        id: 1,
        title: "Laskar Pelangi",
        author: "Andrea Hirata",
        cover: "/covers/laskar-pelangi.jpg",
      },
      location: "Halaman 28",
      addedAt: "3 hari yang lalu",
    },
    {
      id: 3,
      text: "Ketika kita menganggap suatu hal tidak penting, maka kita akan kehilangan momen belajar yang sangat berharga.",
      note: "Perspektif menarik tentang kesempatan belajar dalam keseharian.",
      color: "green",
      book: {
        id: 3,
        title: "Filosofi Teras",
        author: "Henry Manampiring",
        cover: "/covers/filosofi-teras.jpg",
      },
      location: "Halaman 42",
      addedAt: "1 minggu yang lalu",
    },
    {
      id: 4,
      text: "Tidak ada yang namanya kebetulan. Takdir seseorang adalah akumulasi dari setiap keputusan yang ia buat selama hidupnya.",
      note: "",
      color: "yellow",
      book: {
        id: 4,
        title: "Hujan",
        author: "Tere Liye",
        cover: "/covers/hujan.jpg",
      },
      location: "Halaman 74",
      addedAt: "2 minggu yang lalu",
    },
  ];

  const getColorClass = (color) => {
    switch (color) {
      case "yellow":
        return "bg-amber-100 border-amber-400";
      case "green":
        return "bg-green-100 border-green-400";
      case "blue":
        return "bg-blue-100 border-blue-400";
      default:
        return "bg-amber-100 border-amber-400";
    }
  };

  const confirmDelete = (annotation) => {
    setSelectedAnnotation(annotation);
    setShowDeleteModal(true);
  };

  const openEditModal = (annotation) => {
    setSelectedAnnotation(annotation);
    setNoteText(annotation.note);
    setShowEditModal(true);
  };

  const handleDelete = () => {
    // Logic to delete annotation would go here
    console.log(`Deleting annotation: ${selectedAnnotation.id}`);
    setShowDeleteModal(false);
  };

  const handleSaveNote = () => {
    // Logic to save edited note would go here
    console.log(`Saving note for annotation: ${selectedAnnotation.id}`);
    console.log(`New note: ${noteText}`);
    setShowEditModal(false);
  };

  return (
    <div className="p-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4 mr-12 lg:mr-0">
        <h1 className="text-2xl font-bold">Anotasi Saya</h1>

        <div className="flex gap-3">
          <div className="relative max-w-md w-full">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search size={18} className="text-gray-400" />
            </div>
            <input
              type="text"
              className="input input-bordered pl-10 w-full"
              placeholder="Cari dalam anotasi..."
            />
          </div>

          <button
            className="btn btn-outline gap-2"
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter size={18} />
            Filter
          </button>
        </div>
      </div>

      {/* Filters Panel */}
      {showFilters && (
        <div className="bg-base-100 p-4 rounded-lg shadow-md mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <h3 className="font-medium mb-2">Buku</h3>
              <select className="select select-bordered w-full">
                <option value="">Semua Buku</option>
                <option value="1">Laskar Pelangi</option>
                <option value="3">Filosofi Teras</option>
                <option value="4">Hujan</option>
              </select>
            </div>

            <div>
              <h3 className="font-medium mb-2">Warna Highlight</h3>
              <div className="flex gap-3">
                <label className="cursor-pointer label justify-start gap-2">
                  <input
                    type="checkbox"
                    className="checkbox checkbox-sm checkbox-warning"
                  />
                  <span className="label-text">Kuning</span>
                </label>
                <label className="cursor-pointer label justify-start gap-2">
                  <input
                    type="checkbox"
                    className="checkbox checkbox-sm checkbox-success"
                  />
                  <span className="label-text">Hijau</span>
                </label>
                <label className="cursor-pointer label justify-start gap-2">
                  <input
                    type="checkbox"
                    className="checkbox checkbox-sm checkbox-info"
                  />
                  <span className="label-text">Biru</span>
                </label>
              </div>
            </div>

            <div>
              <h3 className="font-medium mb-2">Urutkan</h3>
              <select className="select select-bordered w-full">
                <option value="newest">Terbaru</option>
                <option value="oldest">Terlama</option>
                <option value="a-z">Buku (A-Z)</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end mt-4">
            <button className="btn btn-sm btn-ghost">Reset</button>
            <button className="btn btn-sm btn-primary ml-2">Terapkan</button>
          </div>
        </div>
      )}

      {/* Annotations List */}
      <div className="space-y-6">
        {annotations.length > 0 ? (
          annotations.map((annotation) => (
            <div
              key={annotation.id}
              className="bg-base-100 rounded-lg shadow overflow-hidden"
            >
              <div className="p-4">
                {/* Book Info */}
                <div className="flex items-center gap-3 mb-3">
                  <div className="relative w-10 h-14 shrink-0">
                    <img
                      src={annotation.book.cover || `/api/placeholder/40/56`}
                      alt={`Cover buku ${annotation.book.title}`}
                      className="w-full h-full object-cover rounded"
                    />
                  </div>
                  <div>
                    <h3 className="font-medium">{annotation.book.title}</h3>
                    <p className="text-sm opacity-70">
                      {annotation.book.author}
                    </p>
                  </div>
                  <div className="ml-auto text-xs opacity-70">
                    {annotation.location} • {annotation.addedAt}
                  </div>
                </div>

                {/* Highlighted Text */}
                <div
                  className={`${getColorClass(
                    annotation.color
                  )} border-l-4 p-3 rounded-r mb-3`}
                >
                  <p className="relative pl-6">
                    <Highlighter
                      size={16}
                      className="absolute left-0 top-1 opacity-50"
                    />
                    <span className="italic">"{annotation.text}"</span>
                  </p>
                </div>

                {/* Note */}
                {annotation.note && (
                  <div className="bg-base-200 p-3 rounded-lg mb-3">
                    <p className="text-sm">{annotation.note}</p>
                  </div>
                )}

                {/* Actions */}
                <div className="flex justify-end gap-2">
                  <button
                    className="btn btn-ghost btn-sm btn-square"
                    onClick={() => confirmDelete(annotation)}
                  >
                    <Trash2 size={16} className="text-error" />
                  </button>
                  <button
                    className="btn btn-ghost btn-sm btn-square"
                    onClick={() => openEditModal(annotation)}
                  >
                    <Edit2 size={16} />
                  </button>
                  <Link
                    href={`/baca/${annotation.book.id}?annotation=${annotation.id}`}
                    className="btn btn-primary btn-sm gap-1"
                  >
                    Buka <ChevronRight size={16} />
                  </Link>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="bg-base-100 rounded-lg shadow py-12 text-center">
            <Highlighter size={48} className="mx-auto opacity-20 mb-4" />
            <h3 className="text-lg font-medium mb-2">Belum Ada Anotasi</h3>
            <p className="text-base-content/70 mb-4">
              Sorot dan catat bagian penting saat Anda membaca.
            </p>
            <Link href="/katalog" className="btn btn-primary">
              Mulai Membaca
            </Link>
          </div>
        )}
      </div>

      {/* Pagination */}
      {annotations.length > 0 && (
        <div className="flex justify-center my-8">
          <div className="btn-group">
            <button className="btn btn-sm">«</button>
            <button className="btn btn-sm btn-active">1</button>
            <button className="btn btn-sm">2</button>
            <button className="btn btn-sm">»</button>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Hapus Anotasi</h3>
            <p className="py-4">
              Apakah Anda yakin ingin menghapus anotasi ini dari buku
              <span className="font-medium">
                {" "}
                "{selectedAnnotation.book.title}"
              </span>
              ?
            </p>
            <div className="modal-action">
              <button
                className="btn btn-ghost"
                onClick={() => setShowDeleteModal(false)}
              >
                Batal
              </button>
              <button className="btn btn-error" onClick={handleDelete}>
                Hapus
              </button>
            </div>
          </div>
          <div
            className="modal-backdrop"
            onClick={() => setShowDeleteModal(false)}
          ></div>
        </div>
      )}

      {/* Edit Note Modal */}
      {showEditModal && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Edit Catatan</h3>

            <div
              className={`${getColorClass(
                selectedAnnotation.color
              )} border-l-4 p-3 rounded-r my-4`}
            >
              <p className="italic">"{selectedAnnotation.text}"</p>
            </div>

            <div className="form-control">
              <textarea
                className="textarea textarea-bordered h-32"
                placeholder="Tambahkan catatan Anda..."
                value={noteText}
                onChange={(e) => setNoteText(e.target.value)}
              ></textarea>
            </div>

            <div className="modal-action">
              <button
                className="btn btn-ghost"
                onClick={() => setShowEditModal(false)}
              >
                Batal
              </button>
              <button className="btn btn-primary" onClick={handleSaveNote}>
                Simpan
              </button>
            </div>
          </div>
          <div
            className="modal-backdrop"
            onClick={() => setShowEditModal(false)}
          ></div>
        </div>
      )}
    </div>
  );
}
