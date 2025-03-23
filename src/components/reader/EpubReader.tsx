/** @format */

// src/components/reader/EpubReader.tsx
import { useEffect, useState } from "react";

interface EpubReaderProps {
  bookId: string;
  fileId: string;
}

const EpubReader = ({ bookId, fileId }: EpubReaderProps) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Di sini akan terintegrasi dengan library pembaca EPUB
    // seperti epubjs atau serupa
    const loadEpub = async () => {
      try {
        // Kode untuk memuat EPUB
        setTimeout(() => {
          setIsLoading(false);
        }, 1000);
      } catch (error) {
        console.error("Error loading EPUB:", error);
      }
    };

    loadEpub();
  }, [bookId, fileId]);

  return (
    <div className="w-full h-full flex items-center justify-center p-4">
      {isLoading ? (
        <div className="flex flex-col items-center">
          <span className="loading loading-spinner loading-lg text-primary"></span>
          <p className="mt-2">Memuat buku...</p>
        </div>
      ) : (
        <div className="w-full h-full" id="epub-viewer">
          {/* Konten EPUB akan ditampilkan di sini */}
          <p className="text-center py-8">
            Ini adalah tempat untuk menampilkan konten EPUB menggunakan library
            seperti epub.js
          </p>
        </div>
      )}
    </div>
  );
};

export default EpubReader;
