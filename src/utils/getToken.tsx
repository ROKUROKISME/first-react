import { jwtDecode, type JwtPayload } from "jwt-decode";
import Cookies from "js-cookie";

export interface MyJwtPayload extends JwtPayload {
  role: string;
}

export function getToken() {
  const token = Cookies.get("token");
  return token;
}

export function isAuthenticated() {
  return !!getToken();
}

export function getUserRole() {
  const token = getToken();
  if (!token) return null;
  try {
    const decoded = jwtDecode<MyJwtPayload>(token);
    return decoded.role || null;
  } catch (error) {
    console.log(error);
    return null;
  }
}
