/** @format */

import Image from "next/image";
import Link from "next/link";
import { Book, Heart, Share, BookOpen } from "lucide-react";
import { useEffect, useState } from "react";
import { url_storage } from "@/services/baseURL";

interface BookDetailProps {
  id: string;
  title: string;
  author: string;
  year: string;
  publisher?: string;
  description?: string;
  cover_image?: string;
  categories: { id: string; category_nm: string }[];
  files: { id: string; file_type: string }[];
}

const BookDetail = ({
  id,
  title,
  author,
  year,
  publisher,
  description,
  cover_image,
  categories,
  files,
}: BookDetailProps) => {
  // state
  const [activeTab, setActiveTab] = useState("format");
  const [fileType, setFileType] = useState<string | null>(null);

  // Effect untuk mengatur fileType secara otomatis saat komponen dimuat
  useEffect(() => {
    // Mengatur fileType ke tipe file pertama yang tersedia jika ada
    if (files && files.length > 0) {
      setFileType(files[0].file_type);
    }
  }, [files]); // Efek ini akan dijalankan setiap kali files berubah

  // Fungsi untuk menangani perubahan pilihan fileType
  const handleFileTypeChange = (type: string) => {
    setFileType(type);
  };

  return (
    <div className="card lg:card-side bg-base-100 shadow-xl">
      <figure className="lg:w-1/3 h-80 lg:h-auto relative bg-base-200">
        {cover_image ? (
          <Image
            src={url_storage + cover_image}
            alt={title}
            layout="fill"
            objectFit="cover"
            className="rounded-t-lg lg:rounded-l-lg lg:rounded-t-none"
          />
        ) : (
          <div className="flex items-center justify-center w-full h-full">
            <BookOpen size={80} className="opacity-30" />
          </div>
        )}
      </figure>
      <div className="card-body lg:w-2/3">
        <h1 className="card-title text-2xl md:text-3xl font-bold">{title}</h1>
        <h2 className="text-lg opacity-80">Oleh: {author}</h2>

        <div className="flex flex-wrap gap-2 my-2">
          {categories &&
            categories.map((category) => (
              <Link
                key={category.id}
                href={`/kategori/${category.id}`}
                className="badge badge-accent badge-outline"
              >
                {category.category_nm}
              </Link>
            ))}
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm my-4">
          <div>
            <span className="font-semibold">Tahun Terbit:</span> {year}
          </div>
          {publisher && (
            <div>
              <span className="font-semibold">Penerbit:</span> {publisher}
            </div>
          )}
        </div>

        <div className="tabs tabs-boxed my-4">
          <a
            className={`tab ${activeTab === "deskripsi" ? "tab-active" : ""}`}
            onClick={() => setActiveTab("deskripsi")}
          >
            Deskripsi
          </a>
          <a
            className={`tab ${activeTab === "format" ? "tab-active" : ""}`}
            onClick={() => setActiveTab("format")}
          >
            Format Buku
          </a>
        </div>

        <div>
          {activeTab === "deskripsi" && (
            <div className="text-sm opacity-80">
              {description || <em>Tidak ada deskripsi untuk buku ini.</em>}
            </div>
          )}

          {activeTab === "format" && (
            <div>
              <h3 className="font-semibold mb-2">Format yang tersedia:</h3>
              <div className="flex flex-wrap gap-2">
                {files && files.length > 0 ? (
                  <div className="file-type-badges flex flex-wrap gap-2">
                    {files.map((file) => (
                      <div
                        key={file.id}
                        className={`badge badge-lg cursor-pointer ${
                          fileType === file.file_type
                            ? "bg-accent text-white"
                            : "badge-outline"
                        }`}
                        onClick={() => handleFileTypeChange(file.file_type)}
                      >
                        {file.file_type.toUpperCase()}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm opacity-70">
                    Tidak ada file yang tersedia
                  </p>
                )}
              </div>
            </div>
          )}
        </div>

        <div className="card-actions justify-end mt-4">
          <button className="btn btn-outline btn-primary gap-2">
            <Heart size={16} /> Favorit
          </button>
          <button className="btn btn-outline btn-accent gap-2">
            <Share size={16} /> Bagikan
          </button>
          <Link
            href={`/buku/${id}/baca?type=${fileType}`}
            className="btn btn-primary gap-2"
          >
            <Book size={16} /> Baca Sekarang
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BookDetail;
