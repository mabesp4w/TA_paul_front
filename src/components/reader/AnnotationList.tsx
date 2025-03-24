/** @format */

// src/components/reader/AnnotationList.tsx
import { useState, useEffect } from "react";
import { Trash2, Edit } from "lucide-react";

interface AnnotationListProps {
  bookId: string;
  fileType?: string;
  onAnnotationSelect: (location: string) => void;
}

interface AnnotationItem {
  id: string;
  location: string;
  text: string;
  note?: string;
  color: string;
  createdAt: number;
}

const AnnotationList = ({
  bookId,
  onAnnotationSelect,
}: AnnotationListProps) => {
  const [annotations, setAnnotations] = useState<AnnotationItem[]>([]);
  const [editId, setEditId] = useState<string | null>(null);
  const [editNote, setEditNote] = useState("");

  // Memuat anotasi dari penyimpanan
  useEffect(() => {
    const storedAnnotations = localStorage.getItem(`annotations_${bookId}`);
    if (storedAnnotations) {
      try {
        const parsedAnnotations: AnnotationItem[] =
          JSON.parse(storedAnnotations);
        // Urutkan berdasarkan waktu terbaru
        parsedAnnotations.sort((a, b) => b.createdAt - a.createdAt);
        setAnnotations(parsedAnnotations);
      } catch (e) {
        console.error("Error parsing annotations:", e);
      }
    }
  }, [bookId]);

  // Format tanggal untuk tampilan
  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleString("id-ID", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Menangani klik pada anotasi untuk navigasi
  const handleAnnotationClick = (location: string) => {
    onAnnotationSelect(location);
  };

  // Memulai edit catatan
  const startEdit = (annotation: AnnotationItem) => {
    setEditId(annotation.id);
    setEditNote(annotation.note || "");
  };

  // Simpan catatan yang diedit
  const saveNote = (id: string) => {
    const updatedAnnotations = annotations.map((ann) =>
      ann.id === id ? { ...ann, note: editNote } : ann
    );

    setAnnotations(updatedAnnotations);
    localStorage.setItem(
      `annotations_${bookId}`,
      JSON.stringify(updatedAnnotations)
    );
    setEditId(null);
  };

  // Hapus anotasi
  const deleteAnnotation = (id: string) => {
    if (window.confirm("Hapus catatan ini?")) {
      const updatedAnnotations = annotations.filter((ann) => ann.id !== id);
      setAnnotations(updatedAnnotations);
      localStorage.setItem(
        `annotations_${bookId}`,
        JSON.stringify(updatedAnnotations)
      );
    }
  };

  return (
    <div className="p-4">
      <h3 className="font-medium mb-2">Catatan & Sorotan</h3>

      {annotations.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          Belum ada catatan atau sorotan
        </div>
      ) : (
        <div className="space-y-4">
          {annotations.map((annotation) => (
            <div key={annotation.id} className="card bg-base-100 shadow-sm">
              <div className="card-body p-3">
                <div
                  className="cursor-pointer mb-2 pb-1 border-b border-base-300"
                  onClick={() => handleAnnotationClick(annotation.location)}
                >
                  <div
                    className="text-sm line-clamp-2"
                    style={{
                      backgroundColor: `${annotation.color}40`, // Add transparency
                      borderLeft: `3px solid ${annotation.color}`,
                      paddingLeft: "0.5rem",
                    }}
                  >
                    {annotation.text}
                  </div>
                  <div className="text-xs opacity-70 mt-1">
                    {formatDate(annotation.createdAt)}
                  </div>
                </div>

                {editId === annotation.id ? (
                  <div>
                    <textarea
                      className="textarea textarea-sm textarea-bordered w-full mb-2"
                      value={editNote}
                      onChange={(e) => setEditNote(e.target.value)}
                      placeholder="Tambahkan catatan..."
                      rows={2}
                    />
                    <div className="flex justify-end">
                      <button
                        className="btn btn-xs"
                        onClick={() => setEditId(null)}
                      >
                        Batal
                      </button>
                      <button
                        className="btn btn-xs btn-primary ml-2"
                        onClick={() => saveNote(annotation.id)}
                      >
                        Simpan
                      </button>
                    </div>
                  </div>
                ) : (
                  <div>
                    {annotation.note ? (
                      <p className="text-sm">{annotation.note}</p>
                    ) : (
                      <p className="text-xs text-gray-500 italic">
                        Belum ada catatan
                      </p>
                    )}

                    <div className="flex justify-end space-x-2 mt-2">
                      <button
                        className="btn btn-xs btn-ghost"
                        onClick={() => startEdit(annotation)}
                      >
                        <Edit size={14} />
                      </button>
                      <button
                        className="btn btn-xs btn-ghost text-error"
                        onClick={() => deleteAnnotation(annotation.id)}
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AnnotationList;
