/** @format */

"use client";

import { ReactNode, useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Menu,
  Bookmark,
  Highlighter,
  Search,
  Settings,
  ChevronLeft,
  ChevronRight,
  List,
} from "lucide-react";
import BookmarkButton from "./BookmarkButton";
import HighlightButton from "./HighlightButton";
import BookmarkList from "./BookmarkList";
import AnnotationList from "./AnnotationList";

interface ReaderLayoutProps {
  bookId: string;
  bookTitle: string;
  children: ReactNode;
  currentLocation?: string;
  selectedText?: string;
  onBookmarkSelect?: (location: string) => void;
  onAnnotationSelect?: (location: string) => void;
}

const ReaderLayout = ({
  bookId,
  bookTitle,
  children,
  currentLocation = "",
  selectedText = "",
  onBookmarkSelect = () => {},
  onAnnotationSelect = () => {},
}: ReaderLayoutProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<
    "contents" | "bookmarks" | "annotations"
  >("contents");
  const [fileType, setFileType] = useState(""); // Akan diambil dari parameter URL atau props
  useEffect(() => {
    setFileType("epub");
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-base-100">
      {/* Reader Header */}
      <header className="navbar bg-base-200 shadow-md z-10">
        <div className="navbar-start">
          <Link href={`/buku/${bookId}`} className="btn btn-ghost btn-sm gap-1">
            <ArrowLeft size={16} /> Kembali
          </Link>
        </div>

        <div className="navbar-center">
          <h1 className="text-lg font-medium truncate max-w-md">{bookTitle}</h1>
        </div>

        <div className="navbar-end">
          <button
            className="btn btn-ghost btn-circle"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            <Menu size={20} />
          </button>
        </div>
      </header>

      <div className="flex flex-1 relative">
        {/* Reader Content */}
        <main className="flex-1 flex flex-col items-center p-4">
          <div className="w-full max-w-3xl mx-auto flex items-center mb-4">
            <button className="btn btn-ghost btn-circle">
              <ChevronLeft size={24} />
            </button>
            <div className="flex-1 text-center text-sm opacity-70">
              Halaman 45 dari 230
            </div>
            <button className="btn btn-ghost btn-circle">
              <ChevronRight size={24} />
            </button>
          </div>

          <div className="w-full max-w-3xl mx-auto bg-base-200 rounded-lg shadow-lg flex-1">
            {children}
          </div>
        </main>

        {/* Reader Sidebar */}
        <aside
          className={`
          fixed top-16 right-0 bottom-0 w-72 bg-base-200 shadow-lg transition-transform z-20
          ${isSidebarOpen ? "translate-x-0" : "translate-x-full"}
        `}
        >
          <div className="tabs w-full">
            <a
              className={`tab tab-bordered flex-1 ${
                activeTab === "contents" ? "tab-active" : ""
              }`}
              onClick={() => setActiveTab("contents")}
            >
              <List size={16} className="mr-1" /> Konten
            </a>
            <a
              className={`tab tab-bordered flex-1 ${
                activeTab === "bookmarks" ? "tab-active" : ""
              }`}
              onClick={() => setActiveTab("bookmarks")}
            >
              <Bookmark size={16} className="mr-1" /> Bookmark
            </a>
            <a
              className={`tab tab-bordered flex-1 ${
                activeTab === "annotations" ? "tab-active" : ""
              }`}
              onClick={() => setActiveTab("annotations")}
            >
              <Highlighter size={16} className="mr-1" /> Catatan
            </a>
          </div>

          <div className="overflow-y-auto h-[calc(100%-48px)]">
            {activeTab === "contents" && (
              <div className="p-4">
                <h3 className="font-medium mb-2">Daftar Isi</h3>
                <ul className="menu menu-compact">
                  <li>
                    <a>Bab 1: Pengenalan</a>
                  </li>
                  <li>
                    <a>Bab 2: Dasar-dasar</a>
                  </li>
                  <li>
                    <a className="active">Bab 3: Implementasi</a>
                  </li>
                  <li>
                    <a>Bab 4: Studi Kasus</a>
                  </li>
                  <li>
                    <a>Bab 5: Kesimpulan</a>
                  </li>
                </ul>
              </div>
            )}

            {activeTab === "bookmarks" && (
              <BookmarkList
                bookId={bookId}
                fileType={fileType}
                onBookmarkSelect={onBookmarkSelect}
              />
            )}

            {activeTab === "annotations" && (
              <AnnotationList
                bookId={bookId}
                fileType={fileType}
                onAnnotationSelect={onAnnotationSelect}
              />
            )}
          </div>
        </aside>
      </div>

      {/* Reader Footer Toolbar */}
      <footer className="btm-nav bg-base-200 shadow-lg z-10 h-16">
        <BookmarkButton
          bookId={bookId}
          fileType={fileType}
          currentLocation={currentLocation}
        />
        <HighlightButton
          bookId={bookId}
          fileType={fileType}
          selectedText={selectedText}
          currentLocation={currentLocation}
        />
        <button className="flex flex-col items-center justify-center">
          <Search size={20} />
          <span className="btm-nav-label">Cari</span>
        </button>
        <button className="flex flex-col items-center justify-center">
          <Settings size={20} />
          <span className="btm-nav-label">Pengaturan</span>
        </button>
      </footer>
    </div>
  );
};

export default ReaderLayout;
