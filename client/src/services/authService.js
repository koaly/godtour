import http from "./httpService";
import jwtDecode from "jwt-decode";

const apiEndpoint = "/users/login";
const tokenKey = "token";
export async function login(email, password) {
  const {
    data: jwt
  } = await http.post(apiEndpoint, {
    email,
    password
  });
  localStorage.setItem(tokenKey, jwt.user.token);
}

export function logout() {
  localStorage.removeItem(tokenKey);
}

export function getCurrentUser() {
  try {
    const jwt = localStorage.getItem(tokenKey);
    return jwtDecode(jwt);
  } catch (ex) {
    return null;
  }
}
export function getJwt() {
  return localStorage.getItem("token");
}

export default {
  login,
  logout,
  getCurrentUser,
  getJwt
};