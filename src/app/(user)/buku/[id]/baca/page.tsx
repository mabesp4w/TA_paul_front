/** @format */

// src/app/buku/[id]/baca/page.tsx
"use client";

import { useParams, useSearchParams } from "next/navigation";
import ReaderLayout from "@/components/reader/ReaderLayout";
import EpubReader from "@/components/reader/EpubReader";
import PdfReader from "@/components/reader/PdfReader";

export default function BookReaderPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const id = params.id as string;
  const format = searchParams.get("format") || "epub";

  // Contoh data buku untuk UI (dalam implementasi nyata, ini akan diambil dari API)
  const bookData = {
    id,
    title: "Filosofi Teras",
    author: "Henry Manampiring",
    files: {
      epub: { id: "101", file_type: "epub" },
      pdf: { id: "102", file_type: "pdf" },
    },
  };

  return (
    <ReaderLayout bookId={bookData.id} bookTitle={bookData.title}>
      {format === "pdf" ? (
        <PdfReader bookId={bookData.id} fileId={bookData.files.pdf.id} />
      ) : (
        <EpubReader bookId={bookData.id} fileId={bookData.files.epub.id} />
      )}
    </ReaderLayout>
  );
}
