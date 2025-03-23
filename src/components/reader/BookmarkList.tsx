/** @format */

// src/components/reader/BookmarkList.tsx
"use client";

import { useState, useEffect } from "react";
import { Bookmark, Trash2 } from "lucide-react";

interface BookmarkItem {
  id: string;
  title?: string;
  location: string;
  created_at: string;
}

interface BookmarkListProps {
  bookId: string;
  fileType: string;
  onBookmarkSelect: (location: string) => void;
}

const BookmarkList = ({
  bookId,
  fileType,
  onBookmarkSelect,
}: BookmarkListProps) => {
  const [bookmarks, setBookmarks] = useState<BookmarkItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBookmarks = async () => {
      try {
        // Panggil API untuk mendapatkan bookmark
        // Contoh:
        // const data = await BookmarkService.getByBook(bookId, fileType);

        // Untuk sementara, gunakan data tiruan
        const mockData: BookmarkItem[] = [
          {
            id: "1",
            title: "Bab 3: Konsep Dikotomi Kendali",
            location: "epubcfi(/6/12!/4/2/4/2[pgepubid00035]/1:0)",
            created_at: "2025-03-20T10:15:00",
          },
          {
            id: "2",
            title: undefined,
            location: "epubcfi(/6/14!/4/2/10/2[ch04]/1:0)",
            created_at: "2025-03-18T16:30:00",
          },
        ];

        setBookmarks(mockData);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching bookmarks:", error);
        setIsLoading(false);
      }
    };

    fetchBookmarks();
  }, [bookId, fileType]);

  const handleDeleteBookmark = async (id: string) => {
    try {
      // Panggil API untuk menghapus bookmark
      // Contoh:
      // await BookmarkService.delete(id);

      // Perbarui state untuk menghapus bookmark dari daftar
      setBookmarks(bookmarks.filter((bookmark) => bookmark.id !== id));

      // Tampilkan notifikasi sukses
      // ...
    } catch (error) {
      console.error("Error deleting bookmark:", error);
      // Tampilkan notifikasi error
      // ...
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

  if (bookmarks.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-6 text-center">
        <Bookmark size={32} className="opacity-30 mb-2" />
        <p className="text-sm opacity-70">
          Anda belum memiliki bookmark untuk buku ini.
        </p>
      </div>
    );
  }

  return (
    <div className="divide-y">
      {bookmarks.map((bookmark) => (
        <div
          key={bookmark.id}
          className="p-4 hover:bg-base-200 transition-colors"
        >
          <div className="flex justify-between items-start">
            <button
              className="flex-1 text-left"
              onClick={() => onBookmarkSelect(bookmark.location)}
            >
              <div className="flex items-center gap-2">
                <Bookmark size={16} className="text-primary" />
                <h3 className="font-medium">
                  {bookmark.title || "Bookmark tanpa judul"}
                </h3>
              </div>
              <p className="text-xs opacity-70 mt-1">
                {formatDate(bookmark.created_at)}
              </p>
            </button>
            <button
              className="btn btn-ghost btn-xs btn-circle text-error"
              onClick={() => handleDeleteBookmark(bookmark.id)}
            >
              <Trash2 size={14} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BookmarkList;
