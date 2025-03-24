/** @format */

// src/components/reader/PdfReader.tsx
import { useEffect, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";

// Gunakan versi spesifik yang tersedia di CDN
const PDFJS_VERSION = "3.6.172";
pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${PDFJS_VERSION}/pdf.worker.min.js`;

interface PdfReaderProps {
  bookId: string;
  file_book: string;
}

const PdfReader = ({ file_book }: PdfReaderProps) => {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [scale, setScale] = useState<number>(1.0);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [pdfBlob, setPdfBlob] = useState<Blob | null>(null);

  // Fetch PDF sebagai blob untuk menghindari masalah CORS
  useEffect(() => {
    const fetchPdf = async () => {
      try {
        console.log("Fetching PDF from:", file_book);
        const response = await fetch(file_book);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const blob = await response.blob();
        setPdfBlob(blob);
        console.log("PDF fetched successfully as blob");
      } catch (error) {
        console.error("Error fetching PDF:", error);
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        setErrorMessage(`Error fetching PDF: ${error.message}`);
      }
    };

    fetchPdf();
  }, [file_book]);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
    console.log("PDF loaded successfully with", numPages, "pages");
    setNumPages(numPages);
    setErrorMessage(null);
  }

  function onDocumentLoadError(error: Error): void {
    console.error("Error loading PDF:", error);
    setErrorMessage(`Error loading PDF: ${error.message}`);
  }

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-4">
      {errorMessage ? (
        <div className="text-red-500 p-4 bg-red-50 rounded-lg">
          <h3 className="font-semibold mb-2">Gagal memuat PDF</h3>
          <p>{errorMessage}</p>
          <div className="mt-4 text-sm">
            <p>URL: {file_book}</p>
            <button
              className="btn btn-sm btn-primary mt-2"
              onClick={() => {
                setErrorMessage(null);
                // Mencoba reload halaman
                window.location.reload();
              }}
            >
              Coba Lagi
            </button>
          </div>
        </div>
      ) : (
        <div
          className="w-full h-full flex flex-col items-center"
          id="pdf-viewer"
        >
          <div className="controls mb-4 flex gap-2 items-center">
            <button
              className="btn btn-sm"
              disabled={pageNumber <= 1}
              onClick={() => setPageNumber((prev) => Math.max(prev - 1, 1))}
            >
              Sebelumnya
            </button>
            <span>
              Halaman {pageNumber} dari {numPages}
            </span>
            <button
              className="btn btn-sm"
              disabled={pageNumber >= (numPages || 1)}
              onClick={() =>
                setPageNumber((prev) => Math.min(prev + 1, numPages || 1))
              }
            >
              Selanjutnya
            </button>
            <div className="ml-4">
              <button
                className="btn btn-sm"
                onClick={() => setScale((prev) => Math.max(prev - 0.2, 0.5))}
              >
                -
              </button>
              <span className="mx-2">{Math.round(scale * 100)}%</span>
              <button
                className="btn btn-sm"
                onClick={() => setScale((prev) => Math.min(prev + 0.2, 2.5))}
              >
                +
              </button>
            </div>
          </div>

          <div className="pdf-container overflow-auto max-h-[80vh] border border-gray-300 rounded">
            <Document
              file={pdfBlob}
              onLoadSuccess={onDocumentLoadSuccess}
              onLoadError={onDocumentLoadError}
              loading={
                <div className="flex flex-col items-center p-4">
                  <span className="loading loading-spinner loading-lg text-primary"></span>
                  <p className="mt-2">Memuat dokumen...</p>
                </div>
              }
            >
              <Page
                pageNumber={pageNumber}
                scale={scale}
                renderTextLayer={true}
                renderAnnotationLayer={true}
              />
            </Document>
          </div>
        </div>
      )}
    </div>
  );
};

export default PdfReader;
