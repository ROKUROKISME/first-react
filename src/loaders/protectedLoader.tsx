import { redirect } from "react-router-dom";
import { isAuthenticated } from "@/utils/auth";

export function protectedLoader() {
  if (!isAuthenticated()) {
    // Jika tidak login, kembalikan redirect ke halaman login
    // Ini adalah cara "middleware" mencegat navigasi
    return redirect("/admin/login");
  }
  // Jika login, biarkan rute berjalan normal (kembalikan null atau data lain)
  return null;
}