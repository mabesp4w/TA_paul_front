/** @format */

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Book, Heart, Share, BookOpen } from "lucide-react";

interface BookDetailProps {
  id: string;
  title: string;
  author: string;
  year: string;
  publisher?: string;
  description?: string;
  coverImage?: string;
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
  coverImage,
  categories,
  files,
}: BookDetailProps) => {
  const [activeTab, setActiveTab] = useState("deskripsi");

  return (
    <div className="card lg:card-side bg-base-100 shadow-xl">
      <figure className="lg:w-1/3 h-80 lg:h-auto relative bg-base-200">
        {coverImage ? (
          <Image
            src={coverImage}
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
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/kategori/${category.id}`}
              className="badge badge-primary badge-outline"
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

        <div className="tab-content">
          {activeTab === "deskripsi" && (
            <div className="text-sm opacity-80">
              {description || <em>Tidak ada deskripsi untuk buku ini.</em>}
            </div>
          )}

          {activeTab === "format" && (
            <div>
              <h3 className="font-semibold mb-2">Format yang tersedia:</h3>
              <div className="flex flex-wrap gap-2">
                {files.length > 0 ? (
                  files.map((file) => (
                    <div key={file.id} className="badge badge-lg">
                      {file.file_type.toUpperCase()}
                    </div>
                  ))
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
          <Link href={`/buku/${id}/baca`} className="btn btn-primary gap-2">
            <Book size={16} /> Baca Sekarang
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BookDetail;
