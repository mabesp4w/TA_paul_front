/** @format */

// src/components/reader/AnnotationList.tsx
"use client";

import { useState, useEffect } from "react";
import { Highlighter, Trash2, Edit } from "lucide-react";

interface AnnotationItem {
  id: string;
  text: string;
  note?: string;
  color: string;
  location: string;
  created_at: string;
}

interface AnnotationListProps {
  bookId: string;
  fileType: string;
  onAnnotationSelect: (location: string) => void;
}

const AnnotationList = ({
  bookId,
  fileType,
  onAnnotationSelect,
}: AnnotationListProps) => {
  const [annotations, setAnnotations] = useState<AnnotationItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingNote, setEditingNote] = useState("");

  useEffect(() => {
    const fetchAnnotations = async () => {
      try {
        // Panggil API untuk mendapatkan anotasi
        // Contoh:
        // const data = await AnnotationService.getByBook(bookId, fileType);

        // Untuk sementara, gunakan data tiruan
        const mockData: AnnotationItem[] = [
          {
            id: "1",
            text: "Dikotomi kendali adalah konsep penting dalam filosofi Stoa yang mengajarkan kita untuk fokus pada hal-hal yang dapat kita kendalikan.",
            note: "Ini konsep yang bisa saya terapkan untuk mengurangi kecemasan.",
            color: "yellow",
            location: "epubcfi(/6/12!/4/2/4/2[pgepubid00035]/1:0)",
            created_at: "2025-03-20T10:15:00",
          },
          {
            id: "2",
            text: "You do not rise to the level of your goals. You fall to the level of your systems.",
            note: "Sistem lebih penting daripada tujuan. Fokus pada proses!",
            color: "green",
            location: "epubcfi(/6/14!/4/2/10/2[ch04]/1:0)",
            created_at: "2025-03-18T16:30:00",
          },
        ];

        setAnnotations(mockData);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching annotations:", error);
        setIsLoading(false);
      }
    };

    fetchAnnotations();
  }, [bookId, fileType]);

  const handleDeleteAnnotation = async (id: string) => {
    try {
      // Panggil API untuk menghapus anotasi
      // Contoh:
      // await AnnotationService.delete(id);

      // Perbarui state untuk menghapus anotasi dari daftar
      setAnnotations(annotations.filter((annotation) => annotation.id !== id));

      // Tampilkan notifikasi sukses
      // ...
    } catch (error) {
      console.error("Error deleting annotation:", error);
      // Tampilkan notifikasi error
      // ...
    }
  };

  const handleEditAnnotation = (annotation: AnnotationItem) => {
    setEditingId(annotation.id);
    setEditingNote(annotation.note || "");
  };

  const handleSaveNote = async () => {
    if (!editingId) return;

    try {
      // Panggil API untuk memperbarui anotasi
      // Contoh:
      // await AnnotationService.update(editingId, { note: editingNote });

      // Perbarui state
      setAnnotations(
        annotations.map((annotation) =>
          annotation.id === editingId
            ? { ...annotation, note: editingNote }
            : annotation
        )
      );

      setEditingId(null);
      setEditingNote("");

      // Tampilkan notifikasi sukses
      // ...
    } catch (error) {
      console.error("Error updating annotation:", error);
      // Tampilkan notifikasi error
      // ...
    }
  };

  // Mendapatkan warna latar belakang berdasarkan warna anotasi
  const getHighlightColor = (color: string) => {
    switch (color) {
      case "yellow":
        return "bg-yellow-200";
      case "green":
        return "bg-green-200";
      case "blue":
        return "bg-blue-200";
      case "purple":
        return "bg-purple-200";
      case "pink":
        return "bg-pink-200";
      default:
        return "bg-yellow-200";
    }
  };

  // Format tanggal ke format lokal Indonesia
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (isLoading) {
    return (
      <div className="flex justify-center p-4">
        <span className="loading loading-spinner loading-md"></span>
      </div>
    );
  }

  if (annotations.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-6 text-center">
        <Highlighter size={32} className="opacity-30 mb-2" />
        <p className="text-sm opacity-70">
          Anda belum memiliki anotasi untuk buku ini.
        </p>
      </div>
    );
  }

  return (
    <div className="divide-y">
      {annotations.map((annotation) => (
        <div
          key={annotation.id}
          className="p-4 hover:bg-base-200 transition-colors"
        >
          <div className="flex items-start gap-2">
            <div
              className={`w-4 h-4 rounded-full mt-1 ${getHighlightColor(
                annotation.color
              )}`}
            ></div>
            <div className="flex-1">
              <button
                className="w-full text-left"
                onClick={() => onAnnotationSelect(annotation.location)}
              >
                <p className="text-sm italic">{annotation.text}</p>
              </button>

              {editingId === annotation.id ? (
                <div className="mt-2">
                  <textarea
                    className="textarea textarea-bordered w-full text-xs"
                    value={editingNote}
                    onChange={(e) => setEditingNote(e.target.value)}
                  ></textarea>
                  <div className="flex justify-end gap-2 mt-2">
                    <button
                      className="btn btn-ghost btn-xs"
                      onClick={() => setEditingId(null)}
                    >
                      Batal
                    </button>
                    <button
                      className="btn btn-primary btn-xs"
                      onClick={handleSaveNote}
                    >
                      Simpan
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  {annotation.note && (
                    <div className="bg-base-200 p-2 rounded mt-2">
                      <p className="text-xs">{annotation.note}</p>
                    </div>
                  )}
                </>
              )}

              <p className="text-xs opacity-70 mt-1">
                {formatDate(annotation.created_at)}
              </p>
            </div>

            <div className="flex flex-col gap-1">
              <button
                className="btn btn-ghost btn-xs btn-circle"
                onClick={() => handleEditAnnotation(annotation)}
              >
                <Edit size={14} />
              </button>
              <button
                className="btn btn-ghost btn-xs btn-circle text-error"
                onClick={() => handleDeleteAnnotation(annotation.id)}
              >
                <Trash2 size={14} />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AnnotationList;
