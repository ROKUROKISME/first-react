import { redirect } from "react-router-dom";
import { isAuthenticated } from "@/utils/auth";
import { getUserRole } from "@/utils/getToken";

export function restrictedLoader() {
  if (isAuthenticated()) {

    const role = getUserRole();
    if (role == "SuperAdmin") return redirect("/admin");
    if (role == "Admin") return redirect("/admin");
    if (role == "User") return redirect("/");
  }

  return null;
}