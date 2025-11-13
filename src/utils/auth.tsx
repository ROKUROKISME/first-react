import Cookies from "js-cookie";

export const isAuthenticated = () => {
  // const token = localStorage.getItem("user_token");
  const token = Cookies.get("token");
  return !!token;
};
