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
import useReadingProgress from "@/stores/crud/ReadingProgress";
import Cookies from "js-cookie";
import { url_storage } from "@/services/baseURL";

export default function BookReaderPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const id = params.id as string;
  const format = searchParams.get("type") || "EPUB";
  const user = JSON.parse(Cookies.get("user") || "{}");
  // state
  const [file, setFile] = useState<BookFileType | null>(null);
  const [selectedText, setSelectedText] = useState("");
  const [currentLocation, setCurrentLocation] = useState("");
  const [initialLoad, setInitialLoad] = useState(true);
  const [numPages, setNumPages] = useState<number | null>(null);
  const [completionPercentage, setCompletionPercentage] = useState(0);

  // store
  const { setShowBook, showDtBook } = useBook();
  const { setReadingProgress, addData, updateData } = useReadingProgress();

  console.log({ numPages });

  console.log({ showDtBook });

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

  // Fetch existing reading progress
  useEffect(() => {
    if (id && format) {
      setReadingProgress({
        book: id,
        file_type: format,
      });
    }
  }, [id, format, setReadingProgress]);

  // Create or update reading progress on initial load
  useEffect(() => {
    const saveInitialProgress = async () => {
      if (!initialLoad || !showDtBook || !format) return;

      // Read saved location from localStorage if available
      let savedLocation = "";
      if (format === "EPUB") {
        savedLocation = localStorage.getItem(`epub-location-${id}`) || "";
      } else if (format === "PDF") {
        savedLocation = localStorage.getItem(`pdf-page-${id}`) || "1";
      }

      try {
        const result = await setReadingProgress({
          book: id,
          file_type: format,
          per_page: 1,
        });

        // Check if we have existing reading progress
        if (
          result.status === "berhasil" &&
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          result.data?.data?.data?.length > 0
        ) {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          const existingProgress = result.data.data.data[0];

          // Update existing progress with current timestamp
          await updateData(existingProgress.id, {
            ...existingProgress,
            last_read: new Date().toISOString(),
            current_location:
              savedLocation || existingProgress.current_location,
          });
        } else {
          // Create new reading progress
          await addData({
            book: id,
            file_type: format,
            current_location: savedLocation,
            completion_percentage: 0,
            last_read: new Date().toISOString(),
            user: user.id, // This will be filled by the backend
            id: "",
          });
        }

        setInitialLoad(false);
      } catch (error) {
        console.error("Error saving reading progress:", error);
        setInitialLoad(false);
      }
    };

    saveInitialProgress();
  }, [
    showDtBook,
    id,
    format,
    setReadingProgress,
    addData,
    updateData,
    initialLoad,
    user.id,
  ]);

  // Save reading progress periodically and on location change
  useEffect(() => {
    if (!currentLocation || !showDtBook || initialLoad) return;

    const updateReadingProgressWithLocation = async () => {
      try {
        const result = await setReadingProgress({
          book: id,
          file_type: format,
          per_page: 1,
        });

        if (
          result.status === "berhasil" &&
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          result.data?.data?.data?.length > 0
        ) {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          const existingProgress = result.data.data.data[0];

          // Gunakan completionPercentage baru dari state, bukan dari existingProgress
          const finalPercentage = completionPercentage || 0;

          await updateData(existingProgress.id, {
            ...existingProgress,
            current_location: currentLocation,
            completion_percentage: finalPercentage,
            lastRead: new Date().toISOString(),
          });
        }
      } catch (error) {
        console.error("Error updating reading progress:", error);
      }
    };

    const debounceTimeout = setTimeout(updateReadingProgressWithLocation, 5000);

    return () => clearTimeout(debounceTimeout);
  }, [
    currentLocation,
    showDtBook,
    id,
    format,
    setReadingProgress,
    updateData,
    initialLoad,
    completionPercentage,
  ]);

  const handleTextSelection = (text: any, location: string) => {
    setSelectedText(text);
    setCurrentLocation(location);
  };

  const handleLocationChange = (
    location: string,
    completionPercentage?: number
  ) => {
    setCurrentLocation(location);

    // Jika completionPercentage disediakan, simpan untuk digunakan dalam updateReadingProgress
    if (completionPercentage !== undefined) {
      setCompletionPercentage(completionPercentage);
    }
  };

  return showDtBook && file ? (
    <div className="">
      <ReaderLayout
        bookId={showDtBook.id}
        bookTitle={showDtBook.title}
        selectedText={selectedText}
        currentLocation={currentLocation}
        fileType={format}
      >
        {format === "PDF" ? (
          <PdfReader
            bookId={showDtBook.id}
            file_book={url_storage + file.file_book}
            onPageChange={(page, completionPercentage) => {
              const pageStr = page.toString();
              setCurrentLocation(pageStr);

              if (completionPercentage !== undefined) {
                setCompletionPercentage(completionPercentage);
              }
            }}
            onDocumentLoaded={(total) => {
              setNumPages(total);
            }}
          />
        ) : (
          <EpubReader
            bookId={showDtBook.id}
            file_book={url_storage + file.file_book}
            onTextSelection={handleTextSelection}
            onLocationChange={handleLocationChange}
          />
        )}
      </ReaderLayout>
    </div>
  ) : (
    <span className="loading loading-spinner"></span>
  );
}
