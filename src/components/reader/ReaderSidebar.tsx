/** @format */

// components/Reader/ReaderSidebar.jsx
import { useState } from "react";
import { X } from "lucide-react";

type Props = {
  onClose: () => void;
};

export default function ReaderSidebar({ onClose }: Props) {
  const [activeTab, setActiveTab] = useState("contents");

  // Sample data for the sidebar
  const tableOfContents = [
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

  const bookmarks = [
    {
      id: 1,
      title: "Pertemuan Pertama dengan Bu Muslimah",
      location: "Halaman 24",
    },
    { id: 2, title: "Ujian Pertama", location: "Halaman 42" },
    { id: 3, title: "Karnaval 17 Agustus", location: "Halaman 67" },
  ];

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

  return (
    <div className="w-80 bg-base-100 border-r flex flex-col h-full overflow-hidden">
      {/* Sidebar Header */}
      <div className="px-4 py-3 flex items-center justify-between border-b">
        <div className="tabs">
          <a
            className={`tab tab-bordered ${
              activeTab === "contents" ? "tab-active" : ""
            }`}
            onClick={() => setActiveTab("contents")}
          >
            Daftar Isi
          </a>
          <a
            className={`tab tab-bordered ${
              activeTab === "bookmarks" ? "tab-active" : ""
            }`}
            onClick={() => setActiveTab("bookmarks")}
          >
            Bookmark
          </a>
          <a
            className={`tab tab-bordered ${
              activeTab === "annotations" ? "tab-active" : ""
            }`}
            onClick={() => setActiveTab("annotations")}
          >
            Anotasi
          </a>
        </div>
        <button className="btn btn-ghost btn-sm btn-square" onClick={onClose}>
          <X size={18} />
        </button>
      </div>

      {/* Sidebar Content */}
      <div className="flex-1 overflow-y-auto">
        {activeTab === "contents" && (
          <ul className="menu menu-md p-0">
            {tableOfContents.map((item) => (
              <li key={item.id}>
                <a
                  className={`
                    ${item.active ? "active" : ""}
                    ${item.level === 1 ? "pl-8 text-sm" : ""}
                    ${item.level === 2 ? "pl-12 text-xs opacity-70" : ""}
                  `}
                >
                  {item.title}
                </a>
              </li>
            ))}
          </ul>
        )}

        {activeTab === "bookmarks" && (
          <ul className="menu p-0">
            {bookmarks.map((bookmark) => (
              <li key={bookmark.id}>
                <a className="py-3">
                  <div>
                    <div className="font-medium">{bookmark.title}</div>
                    <div className="text-xs opacity-70">
                      {bookmark.location}
                    </div>
                  </div>
                </a>
              </li>
            ))}
          </ul>
        )}

        {activeTab === "annotations" && (
          <div className="p-0">
            {annotations.map((annotation) => (
              <div key={annotation.id} className="border-b p-4">
                <div
                  className={`
                  p-2 mb-2 rounded
                  ${
                    annotation.color === "yellow"
                      ? "bg-amber-100 border-l-4 border-amber-400"
                      : ""
                  }
                  ${
                    annotation.color === "green"
                      ? "bg-green-100 border-l-4 border-green-400"
                      : ""
                  }
                  ${
                    annotation.color === "blue"
                      ? "bg-blue-100 border-l-4 border-blue-400"
                      : ""
                  }
                `}
                >
                  <p className="text-sm">{annotation.text}</p>
                </div>
                {annotation.note && (
                  <p className="text-xs opacity-70 pl-2">{annotation.note}</p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
