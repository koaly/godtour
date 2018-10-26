import http from "./httpService";
import { apiUrl } from "../config.json";

const apiEndpoint = apiUrl + "/users/login";

export function login(email, password) {
  return http.post(apiEndpoint, { email, password });
}
