/** @format */

// src/app/buku/[id]/baca/page.tsx
"use client";

import { useParams, useSearchParams } from "next/navigation";
import ReaderLayout from "@/components/reader/ReaderLayout";
import EpubReader from "@/components/reader/EpubReader";
import PdfReader from "@/components/reader/PdfReader";
import { useEffect, useState } from "react";
import useBook from "@/stores/crud/Book";
import { BookFileType } from "@/types/BookFileType";

export default function BookReaderPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const id = params.id as string;
  const format = searchParams.get("type") || "epub";
  const [file, setFile] = useState<BookFileType | null>(null);

  // store
  const { setShowBook, showDtBook } = useBook();
  // effect
  useEffect(() => {
    setShowBook(id);
  }, [id, setShowBook]);

  // effect setfile from showDtBook find file
  useEffect(() => {
    if (showDtBook) {
      const file = showDtBook.files.find(
        (file: BookFileType) => file.file_type === format
      );
      setFile(file || null);
    }
  }, [showDtBook, format]);

  return showDtBook && file ? (
    <div className="">
      <ReaderLayout bookId={showDtBook.id} bookTitle={showDtBook.title}>
        {format === "PDF" ? (
          <PdfReader bookId={showDtBook.id} file_book={file.file_book} />
        ) : (
          <EpubReader bookId={showDtBook.id} file_book={file.file_book} />
        )}
      </ReaderLayout>
    </div>
  ) : (
    <span className="loading loading-spinner"></span>
  );
}
