import { redirect } from "react-router-dom";
import { isAuthenticated } from "@/utils/auth";

export function protectedLoader() {
  if (!isAuthenticated()) {
    return redirect("/admin/login");
  }
  return null;
}