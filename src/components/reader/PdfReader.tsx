/** @format */

// src/components/reader/PdfReader.tsx
import { useEffect, useState } from "react";

interface PdfReaderProps {
  bookId: string;
  fileId: string;
}

const PdfReader = ({ bookId, fileId }: PdfReaderProps) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Di sini akan terintegrasi dengan library pembaca PDF
    // seperti PDF.js atau serupa
    const loadPdf = async () => {
      try {
        // Kode untuk memuat PDF
        setTimeout(() => {
          setIsLoading(false);
        }, 1000);
      } catch (error) {
        console.error("Error loading PDF:", error);
      }
    };

    loadPdf();
  }, [bookId, fileId]);

  return (
    <div className="w-full h-full flex items-center justify-center p-4">
      {isLoading ? (
        <div className="flex flex-col items-center">
          <span className="loading loading-spinner loading-lg text-primary"></span>
          <p className="mt-2">Memuat buku...</p>
        </div>
      ) : (
        <div className="w-full h-full" id="pdf-viewer">
          {/* Konten PDF akan ditampilkan di sini */}
          <p className="text-center py-8">
            Ini adalah tempat untuk menampilkan konten PDF menggunakan library
            seperti PDF.js
          </p>
        </div>
      )}
    </div>
  );
};

export default PdfReader;
