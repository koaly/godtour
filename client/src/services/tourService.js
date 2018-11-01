import http from "./httpService";
import { apiUrl } from "../config.json";

const apiEndpoint = apiUrl + "/tours/browse";

export function getAllTours() {
  return http.get(apiEndpoint);
}
