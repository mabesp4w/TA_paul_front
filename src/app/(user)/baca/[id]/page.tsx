/** @format */
"use client";
// pages/baca/[id].js
import { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";

import {
  ArrowLeft,
  BookOpen,
  Bookmark,
  Settings,
  ChevronLeft,
  ChevronRight,
  X,
  Moon,
  Sun,
  Coffee,
} from "lucide-react";
import TableOfContents from "@/components/reader/TableOfContents";
import BookmarkList from "@/components/reader/BookmarkList";
import AnnotationList from "@/components/reader/AnnotationList";
import BookContent from "@/components/reader/BookContent";
import HighlightMenu from "@/components/reader/HighlightMenu";
import ReadingProgress from "@/components/reader/ReadingProgress";

export default function Reader({ params }: { params: { id: string } }) {
  const { id } = params;
  const [showSidebar, setShowSidebar] = useState(false);
  const [sidebarTab, setSidebarTab] = useState("contents"); // 'contents', 'bookmarks', 'annotations'
  const [showSettings, setShowSettings] = useState(false);
  const [settingsTab, setSettingsTab] = useState("appearance");
  const [fontSize, setFontSize] = useState("medium");
  const [theme, setTheme] = useState("light");
  const [lineSpacing, setLineSpacing] = useState(2);
  const [marginWidth, setMarginWidth] = useState(3);
  const [showHighlightMenu, setShowHighlightMenu] = useState(false);
  const [highlightPosition, setHighlightPosition] = useState({ x: 0, y: 0 });
  const [isAddingBookmark, setIsAddingBookmark] = useState(false);
  const [bookmarkTitle, setBookmarkTitle] = useState("");

  // Book sample data
  const book = {
    id: id,
    title: "Laskar Pelangi",
    author: "Andrea Hirata",
    totalPages: 368,
    currentPage: 14,
  };

  // Sample content for this book
  const bookContent = [
    {
      title: "Bab 1: Sepuluh Anak Luar Biasa",
      paragraphs: [
        "Pagi itu, aku duduk di bangku panjang di depan sebuah kelas. Sebatang kayu cempedak yang susah payah ditanam Ayahku di depan rumah kami, kini telah menjelma menjadi bangku sekolah yang nyaman. Di kanan-kiriku, belasan anak seusia, semuanya tegang dan gugup karena hari ini adalah hari pertama kami sekolah.",
        "Bu Muslimah yang sederhana dan bersahaja, kelihatan cantik dengan baju kurung dan selendang yang diselempangkan menutupi dadanya. Dia memakai bilah bambu tipis yang mudah menyala, melengkung, dan rapi untuk menusuk sanggulnya. Jepit rambut yang menyerupai bunga-bunga dahlia menghiasi rambutnya yang mulai memutih.",
        "Sekolah Muhammadiyah ini berada di sebuah desa kecil Belitong. Bangunan sekolah kami nyaris rubuh. Dindingnya miring bersender ke utara. Lantainya berderak ditiup angin, dan atapnya bocor di mana-mana. Namun begitu, para guru mengatakan bahwa sekolah ini didirikan untuk mencetak generasi yang akan menggerakkan roda zaman.",
        "Kami adalah bagian dari sekolah yang tak punya apa-apa, kecuali tekad besar untuk membuat anak-anak pinggiran seperti kami mendapatkan kesempatan untuk maju. Memperjuangkan cita-cita tinggi dengan fasilitas terbatas. Itulah gambaran keseharian di sekolah kami yang sederhana ini.",
        "Di masa depan, sekolah ini akan menjadi latar belakang dari kisah persahabatan yang luar biasa. Kisah tentang kesetiaan, pengkhianatan, cinta, dan impian-impian yang tak kenal menyerah. Suatu hari nanti, kami akan dikenal sebagai Laskar Pelangi.",
      ],
    },
    {
      title: "Robohnya Surau Kami",
      paragraphs: [
        'Kepala sekolah kami, Pak Harfan, adalah seorang pria tua dengan jiwa pendidik sejati. Ia berdiri di depan kelas dengan wajah cerah. "Selamat pagi, anak-anak!" Suaranya penuh semangat meskipun fisiknya sudah renta.',
        'Kami menjawab dengan gugup, "Selamat pagi, Pak!"',
        "Hari pertama sekolah bukanlah seremoni formal, melainkan penantian menegangkan. Jika tak mencapai sepuluh siswa, sekolah Muhammadiyah ini akan ditutup. Kami hanya sembilan anak. Saat harapan mulai pupus, seorang anak berlari tergopoh-gopoh. Dia adalah Harun, anak kesepuluh, penyelamat nasib sekolah kami.",
        '"Sembilan atau sepuluh, ini adalah kehendak-Nya," ujar Pak Harfan, "Takdir sudah berbicara, sekolah muhammadiyah resmi dimulai! Bersyukurlah kita kepada-Nya melebihi syukur seribu pasukan Nabi Sulaiman."',
      ],
    },
    {
      title: "Mimpi-mimpi Lintang",
      paragraphs: [
        "Di antara kami, ada seorang anak bernama Lintang. Dia berasal dari keluarga nelayan miskin. Setiap hari, ia harus menempuh jarak 80 kilometer pulang pergi menggunakan sepeda untuk bisa sampai ke sekolah. Melewati rawa-rawa dan bertarung dengan buaya untuk mendapatkan pendidikan.",
        "Aku sering mengamati wajah Lintang saat mengikuti pelajaran. Ada kelaparan akan ilmu pengetahuan di matanya. Dia adalah anak paling cerdas yang pernah kukenal. Di tengah keterbatasan, dia memiliki ambisi besar untuk mengubah nasib.",
      ],
    },
  ];

  // Sample chapters for Table of Contents
  const chapters = [
    { id: 1, title: "Bab 1: Sepuluh Anak Luar Biasa", level: 0, active: true },
    { id: 2, title: "Robohnya Surau Kami", level: 1 },
    { id: 3, title: "Mimpi-mimpi Lintang", level: 1 },
    { id: 4, title: "Bab 2: Tuk Bayan Tula", level: 0 },
    { id: 5, title: "Dermaga Olivir", level: 1 },
    { id: 6, title: "Kuburan Tambang Timah", level: 1 },
    { id: 7, title: "Karanganku yang Pertama", level: 2 },
    { id: 8, title: "Bab 3: Langit Ketiga", level: 0 },
    { id: 9, title: "Bab 4: Ujian Akhir", level: 0 },
    { id: 10, title: "Bab 5: Laskar Pelangi", level: 0 },
  ];

  // Sample bookmarks
  const bookmarks = [
    {
      id: 1,
      title: "Pertemuan Pertama dengan Bu Muslimah",
      location: "Halaman 24",
    },
    { id: 2, title: "Ujian Pertama", location: "Halaman 42" },
    { id: 3, title: "Karnaval 17 Agustus", location: "Halaman 67" },
  ];

  // Sample annotations
  const annotations = [
    {
      id: 1,
      text: "Pada hari pertama di sekolah, pagi itu, kami duduk di bangku panjang di depan kelas seperti deretan bebek yang berjalan ke sungai.",
      note: "Metafora yang sangat menarik tentang anak-anak di hari pertama sekolah.",
      color: "yellow",
    },
    {
      id: 2,
      text: "Ilmu adalah seberkas cahaya di kegelapan gulita, yang menerangi jalan raya peradaban manusia.",
      note: "Pernyataan kuat tentang pentingnya pendidikan.",
      color: "blue",
    },
  ];

  // Handle font size changes
  const fontSizes = {
    small: "text-sm",
    medium: "text-base",
    large: "text-lg",
    xlarge: "text-xl",
  };

  // Handle text selection for highlighting
  const handleTextSelection = () => {
    const selection = window.getSelection();
    if (selection.toString().length > 0) {
      const range = selection.getRangeAt(0);
      const rect = range.getBoundingClientRect();

      setHighlightPosition({
        x: rect.left + rect.width / 2,
        y: rect.top - 10,
      });
      setShowHighlightMenu(true);
    } else {
      setShowHighlightMenu(false);
    }
  };

  // Add bookmark handler
  const handleAddBookmark = () => {
    setIsAddingBookmark(true);
  };

  const saveBookmark = () => {
    // Logic to save bookmark would go here
    console.log("Saving bookmark:", {
      title: bookmarkTitle,
      page: book.currentPage,
    });
    setIsAddingBookmark(false);
    setBookmarkTitle("");
  };

  // Handle theme changes
  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.setAttribute("data-theme", "dark");
      document.body.classList.add("bg-base-300");
    } else if (theme === "sepia") {
      document.documentElement.setAttribute("data-theme", "light");
      document.body.classList.add("bg-amber-50");
    } else {
      document.documentElement.setAttribute("data-theme", "light");
      document.body.classList.remove("bg-base-300", "bg-amber-50");
    }

    return () => {
      document.documentElement.setAttribute("data-theme", "light");
      document.body.classList.remove("bg-base-300", "bg-amber-50");
    };
  }, [theme]);

  // Add event listener for text selection
  useEffect(() => {
    document.addEventListener("mouseup", handleTextSelection);
    return () => {
      document.removeEventListener("mouseup", handleTextSelection);
    };
  }, []);

  return (
    <>
      <Head>
        <title>Membaca: {book.title}</title>
      </Head>

      <div className="flex flex-col h-screen">
        {/* Reader Header */}
        <header className="navbar bg-base-100 shadow-sm z-10">
          <div className="flex-1">
            <Link href="/" className="btn btn-ghost btn-sm gap-1">
              <ArrowLeft size={18} />
              Kembali
            </Link>
            <div className="hidden md:flex ml-4">
              <h1 className="font-bold">{book.title}</h1>
              <span className="mx-2 opacity-40">•</span>
              <span className="opacity-60">{book.author}</span>
            </div>
          </div>
          <div className="flex-none gap-2">
            <button
              className={`btn btn-sm gap-1 ${
                showSidebar ? "btn-primary" : "btn-ghost"
              }`}
              onClick={() => setShowSidebar(!showSidebar)}
            >
              <BookOpen size={18} />
              <span className="hidden md:inline">Daftar Isi</span>
            </button>
            <button
              className="btn btn-ghost btn-sm gap-1"
              onClick={handleAddBookmark}
            >
              <Bookmark size={18} />
              <span className="hidden md:inline">Tandai</span>
            </button>
            <div className="dropdown dropdown-end">
              <label
                tabIndex={0}
                className="btn btn-ghost btn-sm gap-1"
                onClick={() => setShowSettings(!showSettings)}
              >
                <Settings size={18} />
                <span className="hidden md:inline">Pengaturan</span>
              </label>
              {showSettings && (
                <div
                  tabIndex={0}
                  className="dropdown-content z-[1] card card-compact w-72 shadow bg-base-100 mt-2"
                >
                  <div className="card-body">
                    <div className="tabs tabs-boxed bg-base-200 mb-4">
                      <a
                        className={`tab ${
                          settingsTab === "appearance" ? "tab-active" : ""
                        }`}
                        onClick={() => setSettingsTab("appearance")}
                      >
                        Tampilan
                      </a>
                      <a
                        className={`tab ${
                          settingsTab === "reading" ? "tab-active" : ""
                        }`}
                        onClick={() => setSettingsTab("reading")}
                      >
                        Membaca
                      </a>
                    </div>

                    {settingsTab === "appearance" && (
                      <>
                        <div className="form-control">
                          <label className="label">
                            <span className="label-text font-medium">
                              Ukuran Font
                            </span>
                          </label>
                          <div className="flex gap-2">
                            {Object.keys(fontSizes).map((size) => (
                              <button
                                key={size}
                                className={`btn flex-1 ${
                                  fontSize === size
                                    ? "btn-primary"
                                    : "btn-outline"
                                }`}
                                onClick={() => setFontSize(size)}
                              >
                                {size === "small" && "A"}
                                {size === "medium" && "A"}
                                {size === "large" && "A"}
                                {size === "xlarge" && "A"}
                              </button>
                            ))}
                          </div>
                        </div>

                        <div className="form-control mt-4">
                          <label className="label">
                            <span className="label-text font-medium">Tema</span>
                          </label>
                          <div className="flex gap-2">
                            <button
                              className={`btn flex-1 ${
                                theme === "light"
                                  ? "btn-primary"
                                  : "btn-outline"
                              }`}
                              onClick={() => setTheme("light")}
                            >
                              <Sun size={16} />
                            </button>
                            <button
                              className={`btn flex-1 ${
                                theme === "sepia"
                                  ? "btn-primary"
                                  : "btn-outline"
                              }`}
                              onClick={() => setTheme("sepia")}
                            >
                              <Coffee size={16} />
                            </button>
                            <button
                              className={`btn flex-1 ${
                                theme === "dark" ? "btn-primary" : "btn-outline"
                              }`}
                              onClick={() => setTheme("dark")}
                            >
                              <Moon size={16} />
                            </button>
                          </div>
                        </div>
                      </>
                    )}

                    {settingsTab === "reading" && (
                      <>
                        <div className="form-control">
                          <label className="label">
                            <span className="label-text font-medium">
                              Jarak Baris
                            </span>
                            <span className="label-text-alt">
                              {lineSpacing}x
                            </span>
                          </label>
                          <input
                            type="range"
                            min="1"
                            max="3"
                            step="0.5"
                            className="range range-primary"
                            value={lineSpacing}
                            onChange={(e) =>
                              setLineSpacing(parseFloat(e.target.value))
                            }
                          />
                        </div>

                        <div className="form-control mt-4">
                          <label className="label">
                            <span className="label-text font-medium">
                              Lebar Margin
                            </span>
                            <span className="label-text-alt">
                              {marginWidth}
                            </span>
                          </label>
                          <input
                            type="range"
                            min="1"
                            max="6"
                            step="1"
                            className="range range-primary"
                            value={marginWidth}
                            onChange={(e) =>
                              setMarginWidth(parseInt(e.target.value))
                            }
                          />
                        </div>
                      </>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Reader Content */}
        <div className="flex flex-1 overflow-hidden relative">
          {/* Sidebar */}
          {showSidebar && (
            <div className="w-80 bg-base-100 border-r flex flex-col h-full overflow-hidden">
              {/* Sidebar Header */}
              <div className="px-4 py-3 flex items-center justify-between border-b">
                <div className="tabs">
                  <a
                    className={`tab tab-bordered ${
                      sidebarTab === "contents" ? "tab-active" : ""
                    }`}
                    onClick={() => setSidebarTab("contents")}
                  >
                    Daftar Isi
                  </a>
                  <a
                    className={`tab tab-bordered ${
                      sidebarTab === "bookmarks" ? "tab-active" : ""
                    }`}
                    onClick={() => setSidebarTab("bookmarks")}
                  >
                    Bookmark
                  </a>
                  <a
                    className={`tab tab-bordered ${
                      sidebarTab === "annotations" ? "tab-active" : ""
                    }`}
                    onClick={() => setSidebarTab("annotations")}
                  >
                    Anotasi
                  </a>
                </div>
                <button
                  className="btn btn-ghost btn-sm btn-square"
                  onClick={() => setShowSidebar(false)}
                >
                  <X size={18} />
                </button>
              </div>

              {/* Sidebar Content */}
              <div className="flex-1 overflow-y-auto">
                {sidebarTab === "contents" && (
                  <TableOfContents
                    chapters={chapters}
                    currentChapter={1}
                    onSelectChapter={(id) =>
                      console.log(`Selected chapter: ${id}`)
                    }
                  />
                )}

                {sidebarTab === "bookmarks" && (
                  <BookmarkList
                    bookmarks={bookmarks}
                    currentBookmark={null}
                    onSelectBookmark={(id) =>
                      console.log(`Selected bookmark: ${id}`)
                    }
                  />
                )}

                {sidebarTab === "annotations" && (
                  <AnnotationList
                    annotations={annotations}
                    currentAnnotation={null}
                    onSelectAnnotation={(id: string) =>
                      console.log(`Selected annotation: ${id}`)
                    }
                  />
                )}
              </div>
            </div>
          )}

          {/* Main Reading Area */}
          <main
            className={`flex-1 overflow-y-auto ${
              theme === "sepia" ? "bg-amber-50" : ""
            }`}
            style={{
              lineHeight: lineSpacing,
            }}
          >
            <div
              className={`mx-auto px-4 py-10 ${fontSizes[fontSize]}`}
              style={{
                maxWidth: `calc(800px - ${marginWidth * 2}rem)`,
                padding: `2.5rem ${marginWidth}rem`,
              }}
            >
              <BookContent
                content={bookContent}
                fontSize={fontSizes[fontSize]}
              />

              {/* Highlight Menu (appears when text is selected) */}
              {showHighlightMenu && (
                <div
                  className="absolute z-50"
                  style={{
                    top: `${highlightPosition.y}px`,
                    left: `${highlightPosition.x}px`,
                    transform: "translate(-50%, -100%)",
                  }}
                >
                  <HighlightMenu />
                </div>
              )}
            </div>
          </main>

          {/* Add Bookmark Modal */}
          {isAddingBookmark && (
            <div className="fixed inset-0 bg-base-300 bg-opacity-50 flex items-center justify-center z-50">
              <div className="modal-box max-w-sm">
                <h3 className="font-bold text-lg mb-4">Tambah Bookmark</h3>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Judul Bookmark</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Masukkan judul bookmark"
                    className="input input-bordered w-full"
                    value={bookmarkTitle}
                    onChange={(e) => setBookmarkTitle(e.target.value)}
                    autoFocus
                  />
                </div>
                <div className="mt-2 text-sm">
                  <span className="opacity-70">
                    Halaman: {book.currentPage}
                  </span>
                </div>
                <div className="modal-action">
                  <button
                    className="btn btn-ghost"
                    onClick={() => setIsAddingBookmark(false)}
                  >
                    Batal
                  </button>
                  <button
                    className="btn btn-primary"
                    onClick={saveBookmark}
                    disabled={!bookmarkTitle}
                  >
                    Simpan
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Reader Footer */}
        <footer className="bg-base-100 border-t py-2 px-4">
          <div className="flex items-center justify-between">
            <ReadingProgress
              currentPage={book.currentPage}
              totalPages={book.totalPages}
            />
            <div className="flex gap-2">
              <button className="btn btn-circle btn-primary btn-sm">
                <ChevronLeft size={18} />
              </button>
              <button className="btn btn-circle btn-primary btn-sm">
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
