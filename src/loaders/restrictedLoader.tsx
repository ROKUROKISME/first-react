// src/loaders/restrictedLoader.js atau src/utils/authLoaders.js
import { redirect } from "react-router-dom";
import { isAuthenticated } from "@/utils/auth"; // Menggunakan fungsi cek autentikasi yang sama

export function restrictedLoader() {
  if (isAuthenticated()) {
    // JIKA PENGGUNA SUDAH LOGIN, alihkan mereka
    // ke halaman dashboard atau halaman utama admin
    return redirect("/admin");
  }
  // Jika belum login, biarkan rute berjalan normal (tampilkan halaman login)
  return null;
}