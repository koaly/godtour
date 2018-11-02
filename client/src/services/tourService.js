import http from "./httpService";
import { apiUrl } from "../config.json";
import auth from "./authService";

const apiEndpoint = apiUrl + "/tours/browse";
const config = {
  headers: { Authorization: "JWT " + auth.getJwt() }
};

export function getAllTours() {
  return http.get(apiEndpoint);
}
