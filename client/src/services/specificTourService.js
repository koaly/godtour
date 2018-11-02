import http from "./httpService";
import { apiUrl } from "../config.json";
import auth from "./authService";

const apiEndpoint = apiUrl + "/tours/";
const config = {
  headers: { Authorization: "JWT " + auth.getJwt() }
};

export function getSpecificTour(id) {
  return http.get(apiEndpoint + id, config);
}

export function booking(id, field) {
  return http.post(apiEndpoint + id, field, config);
}
