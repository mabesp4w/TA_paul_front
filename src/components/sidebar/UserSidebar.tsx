/** @format */
"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import {
  BookOpen,
  Home,
  Library,
  Tag,
  Book,
  Bookmark,
  Edit3,
  User,
  Settings,
  LogOut,
  Menu,
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import useLogout from "@/stores/auth/logout";
import handleLogout from "@/app/auth/logout/logout";
import useUserApi from "@/stores/api/User";
import Cookies from "js-cookie";

const { id } = JSON.parse(Cookies.get("user") || "{}");
const token = Cookies.get("token");

const UserSidebar = () => {
  const pathname = usePathname();
  // state
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [loadLogout, setLoadLogout] = useState(false);
  // store
  const { setLogout } = useLogout();
  const { setShowUser, showUser } = useUserApi();
  // router
  const router = useRouter();
  // useEffect
  useEffect(() => {
    if (id && token) {
      setShowUser(id);
    }
  }, [id, token]);

  console.log({ showUser });

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const isActive = (href: string) => {
    return pathname === href;
  };

  const signOut = () => {
    handleLogout({ setLogout, setLoadLogout, router });
  };
  return (
    <>
      {/* Tombol hamburger yang hanya muncul di layar kecil */}
      <div className="lg:hidden fixed top-6 right-4 z-30">
        <button
          onClick={toggleDrawer}
          className="btn btn-circle btn-primary"
          aria-label="Toggle menu"
        >
          <Menu size={24} />
        </button>
      </div>

      <div
        className={`drawer ${isDrawerOpen ? "drawer-open" : ""} lg:drawer-open`}
      >
        <input
          id="drawer"
          type="checkbox"
          className="drawer-toggle"
          checked={isDrawerOpen}
          onChange={toggleDrawer}
        />

        <div className="drawer-side">
          <label
            htmlFor="drawer"
            className="drawer-overlay"
            onClick={toggleDrawer}
          ></label>
          <aside className="bg-base-200 w-80 min-h-screen border-r border-base-300">
            {/* Logo and App title */}
            <div className="px-6 py-4 border-b border-base-300">
              <div className="flex items-center gap-3">
                <div className="h-10 bg-primary text-primary-content flex items-center justify-center rounded-lg text-xl font-bold px-2">
                  WWF
                </div>
                <span className="text-xl font-bold">Ruang Baca</span>
              </div>
            </div>

            {/* Navigation */}
            <div className="px-4 py-4">
              <div className="mb-4">
                <p className="text-xs uppercase font-semibold opacity-60 px-2 pb-2">
                  Menu Utama
                </p>
                <ul className="menu menu-md gap-1">
                  <li>
                    <Link
                      href="/dashboard"
                      className={isActive("/dashboard") ? "active" : ""}
                      onClick={() => setIsDrawerOpen(false)}
                    >
                      <Home size={18} /> Beranda
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/katalog"
                      className={isActive("/katalog") ? "active" : ""}
                      onClick={() => setIsDrawerOpen(false)}
                    >
                      <Library size={18} /> Katalog Buku
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/kategori"
                      className={isActive("/kategori") ? "active" : ""}
                      onClick={() => setIsDrawerOpen(false)}
                    >
                      <Tag size={18} /> Kategori
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/sedang-dibaca"
                      className={isActive("/sedang-dibaca") ? "active" : ""}
                      onClick={() => setIsDrawerOpen(false)}
                    >
                      <BookOpen size={18} /> Sedang Dibaca
                    </Link>
                  </li>
                </ul>
              </div>

              <div className="mb-4">
                <p className="text-xs uppercase font-semibold opacity-60 px-2 pb-2">
                  Koleksi Pribadi
                </p>
                <ul className="menu menu-md gap-1">
                  <li>
                    <Link
                      href="/koleksi"
                      className={isActive("/koleksi") ? "active" : ""}
                      onClick={() => setIsDrawerOpen(false)}
                    >
                      <Book size={18} /> Koleksi Saya
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/bookmark"
                      className={isActive("/bookmark") ? "active" : ""}
                      onClick={() => setIsDrawerOpen(false)}
                    >
                      <Bookmark size={18} /> Bookmark
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/anotasi"
                      className={isActive("/anotasi") ? "active" : ""}
                      onClick={() => setIsDrawerOpen(false)}
                    >
                      <Edit3 size={18} /> Anotasi
                    </Link>
                  </li>
                </ul>
              </div>

              <div className="mb-4">
                <p className="text-xs uppercase font-semibold opacity-60 px-2 pb-2">
                  Akun
                </p>
                <ul className="menu menu-md gap-1">
                  <li>
                    <Link
                      href="/profil"
                      className={isActive("/profil") ? "active" : ""}
                      onClick={() => setIsDrawerOpen(false)}
                    >
                      <User size={18} /> Profil Saya
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/pengaturan"
                      className={isActive("/pengaturan") ? "active" : ""}
                      onClick={() => setIsDrawerOpen(false)}
                    >
                      <Settings size={18} /> Pengaturan
                    </Link>
                  </li>
                  <li>
                    {loadLogout ? (
                      <span className="loading loading-spinner"></span>
                    ) : (
                      <Link
                        href={"#"}
                        onClick={() => {
                          setIsDrawerOpen(false);
                          signOut();
                        }}
                        className="text-error"
                      >
                        <LogOut size={18} /> Keluar
                      </Link>
                    )}
                  </li>
                </ul>
              </div>
            </div>

            {/* User Profile */}
            <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-base-300">
              <div className="flex items-center gap-3">
                <div className="flex-1 overflow-hidden">
                  <p className="font-medium truncate">
                    {showUser?.first_name || "Pengguna"}
                  </p>
                  <p className="text-xs opacity-60 truncate">
                    {showUser?.email || "user@example.com"}
                  </p>
                </div>
              </div>
            </div>
          </aside>
        </div>

        {/* Konten utama halaman akan ditempatkan di sini */}
        <div className="drawer-content">{/* Konten utama aplikasi */}</div>
      </div>
    </>
  );
};

export default UserSidebar;
