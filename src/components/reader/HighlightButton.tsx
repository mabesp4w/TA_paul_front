/** @format */

// src/components/reader/HighlightButton.tsx
"use client";

import { useState } from "react";
import { Highlighter } from "lucide-react";

interface HighlightButtonProps {
  bookId: string;
  fileType: string;
  selectedText: string;
  currentLocation: string;
  onAnnotationCreated?: (annotation: any) => void;
}

const HighlightButton = ({
  bookId,
  fileType,
  selectedText,
  currentLocation,
  onAnnotationCreated,
}: HighlightButtonProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [note, setNote] = useState("");
  const [color, setColor] = useState("yellow");

  const handleCreateHighlight = async () => {
    try {
      // Panggil API untuk membuat anotasi
      // Contoh:
      // const newAnnotation = await AnnotationService.create({
      //   book_id: bookId,
      //   file_type: fileType,
      //   location: currentLocation,
      //   text: selectedText,
      //   note: note || undefined,
      //   color
      // });

      // Untuk sementara, buat objek tiruan
      const newAnnotation = {
        id: Math.random().toString(36).substring(2, 9),
        book_id: bookId,
        file_type: fileType,
        location: currentLocation,
        text: selectedText,
        note: note || undefined,
        color,
        created_at: new Date().toISOString(),
      };

      if (onAnnotationCreated) {
        onAnnotationCreated(newAnnotation);
      }

      setIsModalOpen(false);
      setNote("");

      // Tampilkan notifikasi sukses
      // ...
    } catch (error) {
      console.error("Error creating annotation:", error);
      // Tampilkan notifikasi error
      // ...
    }
  };

  const colorOptions = [
    { value: "yellow", label: "Kuning", bgClass: "bg-yellow-200" },
    { value: "green", label: "Hijau", bgClass: "bg-green-200" },
    { value: "blue", label: "Biru", bgClass: "bg-blue-200" },
    { value: "purple", label: "Ungu", bgClass: "bg-purple-200" },
    { value: "pink", label: "Merah Muda", bgClass: "bg-pink-200" },
  ];

  return (
    <>
      <button
        className="flex flex-col items-center justify-center"
        onClick={() => {
          if (selectedText) {
            setIsModalOpen(true);
          } else {
            // Tampilkan pesan untuk memilih teks terlebih dahulu
            alert("Pilih teks terlebih dahulu untuk membuat highlight");
          }
        }}
      >
        <Highlighter size={20} />
        <span className="text-xs mt-1">Highlight</span>
      </button>

      {/* Modal untuk membuat anotasi */}
      <dialog
        className={`modal ${isModalOpen ? "modal-open" : ""}`}
        onClick={(e) => e.target === e.currentTarget && setIsModalOpen(false)}
      >
        <div className="modal-box">
          <h3 className="font-bold text-lg mb-4">Highlight dan Anotasi</h3>

          <div className={`p-4 my-3 rounded-md bg-${color}-200`}>
            <p className="text-sm italic">{selectedText}</p>
          </div>

          <div className="form-control mb-4">
            <label className="label">
              <span className="label-text">Warna</span>
            </label>
            <div className="flex flex-wrap gap-2">
              {colorOptions.map((option) => (
                <button
                  key={option.value}
                  className={`w-8 h-8 rounded-full ${option.bgClass} ${
                    color === option.value
                      ? "ring-2 ring-primary ring-offset-2"
                      : ""
                  }`}
                  onClick={() => setColor(option.value)}
                  title={option.label}
                ></button>
              ))}
            </div>
          </div>

          <div className="form-control mb-4">
            <label className="label">
              <span className="label-text">Catatan (Opsional)</span>
            </label>
            <textarea
              className="textarea textarea-bordered h-24"
              placeholder="Tambahkan catatan tentang teks yang dipilih"
              value={note}
              onChange={(e) => setNote(e.target.value)}
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
              onClick={handleCreateHighlight}
            >
              Simpan
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default HighlightButton;
