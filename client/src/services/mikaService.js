import http from "./httpService";

const apiEndpoint = "/users/mika";

export function getAllUsers() {
  return http.get(apiEndpoint);
}