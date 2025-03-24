/** @format */

// src/components/reader/BookmarkButton.tsx
import { useState, useEffect } from "react";
import { Bookmark } from "lucide-react";
import { toast } from "react-hot-toast";

interface BookmarkButtonProps {
  bookId: string;
  currentLocation: string;
  fileType?: string;
}

interface BookmarkItem {
  id: string;
  location: string;
  title: string;
  createdAt: number;
  excerpt?: string;
}

const BookmarkButton = ({ bookId, currentLocation }: BookmarkButtonProps) => {
  const [isBookmarked, setIsBookmarked] = useState(false);

  // Mengecek apakah lokasi saat ini sudah di-bookmark
  useEffect(() => {
    if (!currentLocation) return;

    const storedBookmarks = localStorage.getItem(`bookmarks_${bookId}`);
    if (storedBookmarks) {
      const bookmarks: BookmarkItem[] = JSON.parse(storedBookmarks);
      const exists = bookmarks.some(
        (bookmark) => bookmark.location === currentLocation
      );
      setIsBookmarked(exists);
    }
  }, [bookId, currentLocation]);

  const toggleBookmark = async () => {
    if (!currentLocation) {
      toast.error("Tidak dapat menandai lokasi ini");
      return;
    }

    // Mengambil bookmark yang tersimpan
    const storedBookmarks = localStorage.getItem(`bookmarks_${bookId}`);
    let bookmarks: BookmarkItem[] = storedBookmarks
      ? JSON.parse(storedBookmarks)
      : [];

    if (isBookmarked) {
      // Hapus bookmark jika sudah ada
      bookmarks = bookmarks.filter(
        (bookmark) => bookmark.location !== currentLocation
      );
      localStorage.setItem(`bookmarks_${bookId}`, JSON.stringify(bookmarks));
      setIsBookmarked(false);
      toast.success("Bookmark dihapus");
    } else {
      // Tambah bookmark baru
      const newBookmark: BookmarkItem = {
        id: `bm_${Date.now()}`,
        location: currentLocation,
        title: `Halaman ${currentLocation}`, // Idealnya diambil dari konten buku
        createdAt: Date.now(),
        excerpt: "...", // Idealnya diambil dari konten di sekitar lokasi
      };

      bookmarks.push(newBookmark);
      localStorage.setItem(`bookmarks_${bookId}`, JSON.stringify(bookmarks));
      setIsBookmarked(true);
      toast.success("Bookmark ditambahkan");
    }
  };

  return (
    <button
      className={`flex flex-col items-center justify-center ${
        isBookmarked ? "text-primary" : ""
      }`}
      onClick={toggleBookmark}
    >
      <Bookmark size={20} fill={isBookmarked ? "currentColor" : "none"} />
      <span className="btm-nav-label">Bookmark</span>
    </button>
  );
};

export default BookmarkButton;
