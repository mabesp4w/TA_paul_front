/** @format */

// src/components/reader/ReaderLayout.tsx
"use client";

import { ReactNode, useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowLeft, Search, Settings } from "lucide-react";
import BookmarkButton from "./BookmarkButton";
import HighlightButton from "./HighlightButton";
import ReaderSettings from "./ReaderSettings";

interface ReaderLayoutProps {
  bookId: string;
  bookTitle: string;
  children: ReactNode;
  currentLocation?: string;
  selectedText?: string;
  onBookmarkSelect?: (location: string) => void;
  onAnnotationSelect?: (location: string) => void;
  onSettingsChange?: (settings: any) => void;
  fileType?: string;
}

const ReaderLayout = ({
  bookId,
  bookTitle,
  children,
  currentLocation = "",
  selectedText = "",
  onBookmarkSelect = () => {},
  onSettingsChange = () => {},
  fileType,
}: ReaderLayoutProps) => {
  const [isMobile, setIsMobile] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const drawerCheckboxRef = useRef<HTMLInputElement>(null);

  console.log({ isMobile, onBookmarkSelect });

  // Initial reader settings
  const [readerSettings, setReaderSettings] = useState({
    fontSize: 16,
    fontFamily: "serif",
    theme: "light", // Default theme dari DaisyUI
    lineSpacing: 1.5,
  });

  // Deteksi layar mobile
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Set pada awal load
    checkIsMobile();

    // Update ketika resize
    window.addEventListener("resize", checkIsMobile);

    // Cleanup
    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);

  // Apply theme to html element
  useEffect(() => {
    // Set the data-theme attribute on the html element
    document.documentElement.setAttribute("data-theme", readerSettings.theme);

    return () => {
      // You might want to restore the previous theme on unmount
      // This depends on your app's theme management approach
    };
  }, [readerSettings.theme]);

  const handleSettingsChange = (newSettings: any) => {
    setReaderSettings(newSettings);
    onSettingsChange(newSettings);

    // Save settings to localStorage for persistence
    localStorage.setItem("readerSettings", JSON.stringify(newSettings));
  };

  // Load saved settings from localStorage on mount
  useEffect(() => {
    const savedSettings = localStorage.getItem("readerSettings");
    if (savedSettings) {
      try {
        const parsedSettings = JSON.parse(savedSettings);
        setReaderSettings(parsedSettings);
      } catch (e) {
        console.error("Error parsing saved reader settings:", e);
      }
    } else {
      localStorage.setItem("readerSettings", JSON.stringify(readerSettings));
    }
  }, []);

  // Content style based on settings (font size, family, spacing)
  const contentStyle = {
    fontSize: `${readerSettings.fontSize}px`,
    fontFamily: readerSettings.fontFamily,
    lineHeight: readerSettings.lineSpacing,
  };

  return (
    <div className="drawer drawer-end min-h-screen">
      <input
        id="reader-sidebar-drawer"
        type="checkbox"
        className="drawer-toggle"
        ref={drawerCheckboxRef}
      />

      <div className="drawer-content flex flex-col">
        {/* Reader Header */}
        <header className="navbar bg-base-200 shadow-md z-10">
          <div className="navbar-start">
            <Link
              href={`/buku/${bookId}`}
              className="btn btn-ghost btn-sm gap-1"
            >
              <ArrowLeft size={16} /> Kembali
            </Link>
          </div>

          <div className="navbar-center">
            <h1 className="text-lg font-medium truncate max-w-md">
              {bookTitle}
            </h1>
          </div>
        </header>

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          <main className="flex-1 flex flex-col items-center md:p-4">
            {/* Reader Content */}
            <div
              className="w-full max-w-3xl mx-auto bg-base-100 rounded-lg shadow-lg flex-1 overflow-hidden"
              style={contentStyle}
            >
              {children}
            </div>
          </main>

          <footer className="btm-nav bg-base-200 shadow-lg z-10 h-16 flex">
            <BookmarkButton
              bookId={bookId}
              fileType={fileType || ""}
              currentLocation={currentLocation}
            />
            <HighlightButton
              bookId={bookId}
              fileType={fileType || ""}
              selectedText={selectedText}
              currentLocation={currentLocation}
              onAnnotationCreated={(annotation) => {
                // Optional: Lakukan sesuatu saat anotasi berhasil dibuat
                console.log("Anotasi berhasil dibuat:", annotation);
              }}
            />
            <button className="flex flex-col items-center justify-center">
              <Search size={20} />
              <span className="btm-nav-label">Cari</span>
            </button>
            <button
              className="flex flex-col items-center justify-center"
              onClick={() => setIsSettingsOpen(true)}
            >
              <Settings size={20} />
              <span className="btm-nav-label">Pengaturan</span>
            </button>
          </footer>
        </div>

        {/* Settings Modal */}
        <ReaderSettings
          isOpen={isSettingsOpen}
          onClose={() => setIsSettingsOpen(false)}
          settings={readerSettings}
          onSettingsChange={handleSettingsChange}
        />
      </div>
    </div>
  );
};

export default ReaderLayout;
