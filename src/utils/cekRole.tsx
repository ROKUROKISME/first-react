import { jwtDecode, type JwtPayload } from "jwt-decode";
import Cookies from "js-cookie";
// import { getToken } from "@/utils/auth";

export interface MyJwtPayload extends JwtPayload {
  role: string;
}

export function getRole() {
  const token = Cookies.get("token");
  //   const token = getToken();
  if (!token) return null;

  try {
    const decoded = jwtDecode<MyJwtPayload>(token);
    return decoded.role ?? null;
  } catch {
    return null;
  }
}
