/** @format */

// src/components/reader/HighlightButton.tsx
"use client";

import { useState } from "react";
import { Highlighter } from "lucide-react";
import { Annotation } from "@/types";
import useAnnotations from "@/stores/crud/annotations";

interface HighlightButtonProps {
  bookId: string;
  fileType: string;
  selectedText: string;
  currentLocation: string;
  onAnnotationCreated?: (annotation: Annotation) => void;
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
  const { addData } = useAnnotations(); // Gunakan store annotations

  const handleCreateHighlight = async () => {
    try {
      // Buat objek anotasi untuk disimpan
      const newAnnotation = {
        book: bookId,
        file_type: fileType,
        location: currentLocation,
        text: selectedText,
        note: note || undefined,
        color,
      };

      // Simpan ke database menggunakan store
      const response = await addData(newAnnotation as any);

      if (response.status === "berhasil tambah") {
        if (onAnnotationCreated && response.data && response.data.data) {
          onAnnotationCreated(response.data.data);
        }

        // Reset state dan tutup modal
        setIsModalOpen(false);
        setNote("");

        // Tambahkan notifikasi sukses di sini jika perlu
        // misalnya: toast.success("Highlight berhasil disimpan");
      } else {
        throw new Error(response.data || "Gagal menyimpan highlight");
      }
    } catch (error) {
      console.error("Error creating annotation:", error);
      // Tampilkan notifikasi error
      // misalnya: toast.error("Gagal menyimpan highlight");
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
