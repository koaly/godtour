import http from "./httpService";
import { apiUrl } from "../config.json";

const apiEndpoint = apiUrl + "/users/mika";

export function getAllUsers() {
  return http.get(apiEndpoint);
}
