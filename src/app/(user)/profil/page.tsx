/** @format */
"use client";
// pages/profil.js
import { useState } from "react";
import {
  Edit2,
  Save,
  Camera,
  Book,
  BookOpen,
  Bookmark,
  Edit3,
  ClipboardList,
} from "lucide-react";

export default function ProfilePage() {
  const [editing, setEditing] = useState(false);
  const [userData, setUserData] = useState({
    name: "Ahmad Rizki",
    email: "ahmad@example.com",
    bio: "Pecinta buku dan sastra Indonesia. Senang membaca novel sejarah dan pengembangan diri.",
    joined: "Januari 2022",
  });

  // Sample reading statistics
  const stats = [
    { icon: <Book size={20} />, label: "Total Buku", value: 27 },
    { icon: <BookOpen size={20} />, label: "Sedang Dibaca", value: 4 },
    { icon: <Bookmark size={20} />, label: "Bookmark", value: 36 },
    { icon: <Edit3 size={20} />, label: "Anotasi", value: 58 },
    { icon: <ClipboardList size={20} />, label: "Koleksi", value: 5 },
  ];

  // Sample reading history - recently completed books
  const recentlyCompleted = [
    {
      id: 3,
      title: "Laut Bercerita",
      author: "Leila S. Chudori",
      cover: "/covers/laut-bercerita.jpg",
      completedDate: "3 hari yang lalu",
      rating: 5,
    },
    {
      id: 8,
      title: "Sang Pemimpi",
      author: "Andrea Hirata",
      cover: "/covers/sang-pemimpi.jpg",
      completedDate: "2 minggu yang lalu",
      rating: 4,
    },
    {
      id: 9,
      title: "Perahu Kertas",
      author: "Dee Lestari",
      cover: "/covers/perahu-kertas.jpg",
      completedDate: "1 bulan yang lalu",
      rating: 4,
    },
  ];

  const handleSaveProfile = () => {
    // Logic to save profile changes would go here
    setEditing(false);
  };

  return (
    <div className="p-6">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Left column - Profile Info */}
        <div className="md:w-1/3">
          <div className="bg-base-100 rounded-lg shadow-md overflow-hidden">
            {/* Profile Header */}
            <div className="bg-primary h-32 relative">
              {/* Profile Avatar */}
              <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2">
                <div className="avatar">
                  <div className="w-32 h-32 rounded-full bg-base-300 border-4 border-base-100 relative">
                    <div className="w-full h-full flex items-center justify-center text-3xl font-bold text-base-content/50">
                      AR
                    </div>
                    <button className="absolute bottom-0 right-0 btn btn-circle btn-sm bg-base-100">
                      <Camera size={14} />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Profile Details */}
            <div className="p-6 pt-20">
              <div className="flex justify-between items-center mb-4">
                {editing ? (
                  <button
                    className="btn btn-primary btn-sm gap-1"
                    onClick={handleSaveProfile}
                  >
                    <Save size={16} />
                    Simpan
                  </button>
                ) : (
                  <button
                    className="btn btn-ghost btn-sm gap-1"
                    onClick={() => setEditing(true)}
                  >
                    <Edit2 size={16} />
                    Edit Profil
                  </button>
                )}
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-xs font-medium opacity-70">Nama</label>
                  {editing ? (
                    <input
                      type="text"
                      className="input input-bordered w-full mt-1"
                      value={userData.name}
                      onChange={(e) =>
                        setUserData({ ...userData, name: e.target.value })
                      }
                    />
                  ) : (
                    <p className="font-medium">{userData.name}</p>
                  )}
                </div>

                <div>
                  <label className="text-xs font-medium opacity-70">
                    Email
                  </label>
                  <p className="opacity-80">{userData.email}</p>
                </div>

                <div>
                  <label className="text-xs font-medium opacity-70">Bio</label>
                  {editing ? (
                    <textarea
                      className="textarea textarea-bordered w-full mt-1"
                      rows={4}
                      value={userData.bio}
                      onChange={(e) =>
                        setUserData({ ...userData, bio: e.target.value })
                      }
                    ></textarea>
                  ) : (
                    <p className="text-sm">{userData.bio}</p>
                  )}
                </div>

                <div>
                  <label className="text-xs font-medium opacity-70">
                    Bergabung sejak
                  </label>
                  <p className="opacity-80">{userData.joined}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Reading Stats */}
          <div className="bg-base-100 rounded-lg shadow-md mt-6 p-6">
            <h2 className="text-lg font-bold mb-4">Statistik Membaca</h2>

            <div className="grid grid-cols-2 md:grid-cols-1 lg:grid-cols-2 gap-4">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 p-3 bg-base-200 rounded-lg"
                >
                  <div className="text-primary">{stat.icon}</div>
                  <div>
                    <div className="text-2xl font-bold">{stat.value}</div>
                    <div className="text-xs opacity-70">{stat.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right column - Reading Activity */}
        <div className="md:w-2/3">
          {/* Currently Reading Section */}
          <div className="bg-base-100 rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-lg font-bold mb-4">Sedang Dibaca</h2>

            <div className="overflow-x-auto">
              <table className="table w-full">
                <thead>
                  <tr>
                    <th>Buku</th>
                    <th>Progres</th>
                    <th className="hidden lg:table-cell">Terakhir Dibaca</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-14 rounded overflow-hidden">
                          <img
                            src="/api/placeholder/40/56"
                            alt="Book cover"
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <div className="font-bold">Laskar Pelangi</div>
                          <div className="text-xs opacity-70">
                            Andrea Hirata
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="w-24 lg:w-32">
                        <div className="mb-1 text-xs">75%</div>
                        <progress
                          className="progress progress-primary h-1.5"
                          value="75"
                          max="100"
                        ></progress>
                      </div>
                    </td>
                    <td className="hidden lg:table-cell">2 jam yang lalu</td>
                    <td>
                      <button className="btn btn-ghost btn-xs">
                        Lanjutkan
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-14 rounded overflow-hidden">
                          <img
                            src="/api/placeholder/40/56"
                            alt="Book cover"
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <div className="font-bold">Bumi Manusia</div>
                          <div className="text-xs opacity-70">
                            Pramoedya Ananta Toer
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="w-24 lg:w-32">
                        <div className="mb-1 text-xs">42%</div>
                        <progress
                          className="progress progress-primary h-1.5"
                          value="42"
                          max="100"
                        ></progress>
                      </div>
                    </td>
                    <td className="hidden lg:table-cell">Kemarin</td>
                    <td>
                      <button className="btn btn-ghost btn-xs">
                        Lanjutkan
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Recently Completed Books */}
          <div className="bg-base-100 rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-lg font-bold mb-4">Baru Selesai Dibaca</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {recentlyCompleted.map((book) => (
                <div
                  key={book.id}
                  className="flex bg-base-200 rounded-lg overflow-hidden h-full"
                >
                  <div className="w-20 shrink-0">
                    <img
                      src={book.cover || "/api/placeholder/80/112"}
                      alt={`Cover buku ${book.title}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-3 flex flex-col flex-1">
                    <h3 className="font-medium text-sm">{book.title}</h3>
                    <p className="text-xs opacity-70 mb-2">{book.author}</p>
                    <div className="mt-auto">
                      <div className="flex text-warning mb-1">
                        {[...Array(5)].map((_, i) => (
                          <span key={i}>{i < book.rating ? "★" : "☆"}</span>
                        ))}
                      </div>
                      <p className="text-xs opacity-70">
                        Selesai {book.completedDate}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Reading Activity Chart - Placeholder */}
          <div className="bg-base-100 rounded-lg shadow-md p-6">
            <h2 className="text-lg font-bold mb-4">Aktivitas Membaca</h2>

            {/* Simple chart placeholder */}
            <div className="bg-base-200 rounded-lg p-6 h-64 flex items-center justify-center">
              <div className="text-center">
                <h3 className="font-medium mb-2">Grafik Aktivitas Membaca</h3>
                <p className="text-sm opacity-70">
                  Grafik menampilkan jumlah halaman yang dibaca per hari dalam
                  30 hari terakhir.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
