/** @format */

// src/components/reader/BookmarkButton.tsx
"use client";

import { useState } from "react";
import { Bookmark } from "lucide-react";

interface BookmarkButtonProps {
  bookId: string;
  fileType: string;
  currentLocation: string;
  onBookmarkCreated?: (bookmark: any) => void;
}

const BookmarkButton = ({
  bookId,
  fileType,
  currentLocation,
  onBookmarkCreated,
}: BookmarkButtonProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [bookmarkTitle, setBookmarkTitle] = useState("");

  const handleCreateBookmark = async () => {
    try {
      // Panggil API untuk membuat bookmark
      // Contoh:
      // const newBookmark = await BookmarkService.create({
      //   book_id: bookId,
      //   file_type: fileType,
      //   location: currentLocation,
      //   title: bookmarkTitle || undefined
      // });

      // Untuk sementara, buat objek tiruan
      const newBookmark = {
        id: Math.random().toString(36).substring(2, 9),
        book_id: bookId,
        file_type: fileType,
        location: currentLocation,
        title: bookmarkTitle || undefined,
        created_at: new Date().toISOString(),
      };

      if (onBookmarkCreated) {
        onBookmarkCreated(newBookmark);
      }

      setIsModalOpen(false);
      setBookmarkTitle("");

      // Tampilkan notifikasi sukses
      // ...
    } catch (error) {
      console.error("Error creating bookmark:", error);
      // Tampilkan notifikasi error
      // ...
    }
  };

  return (
    <>
      <button
        className="flex flex-col items-center justify-center"
        onClick={() => setIsModalOpen(true)}
      >
        <Bookmark size={20} />
        <span className="text-xs mt-1">Bookmark</span>
      </button>

      {/* Modal untuk membuat bookmark */}
      <dialog
        className={`modal ${isModalOpen ? "modal-open" : ""}`}
        onClick={(e) => e.target === e.currentTarget && setIsModalOpen(false)}
      >
        <div className="modal-box">
          <h3 className="font-bold text-lg mb-4">Tambah Bookmark</h3>
          <div className="form-control mb-4">
            <label className="label">
              <span className="label-text">Judul Bookmark (Opsional)</span>
            </label>
            <input
              type="text"
              placeholder="Masukkan judul untuk bookmark ini"
              className="input input-bordered w-full"
              value={bookmarkTitle}
              onChange={(e) => setBookmarkTitle(e.target.value)}
            />
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
              onClick={handleCreateBookmark}
            >
              Simpan
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default BookmarkButton;
