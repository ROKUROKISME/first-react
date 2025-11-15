import { redirect } from "react-router-dom";
import { isAuthenticated } from "@/utils/auth";

export function protectedLoader() {
  if (!isAuthenticated()) {
    // Jika tidak login atau tidak ada token arahkan ke
    return redirect("/admin/login");
  }
  // Jika login, biarkan rute berjalan normal (kembalikan null atau data lain)
  return null;
}