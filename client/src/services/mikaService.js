import http from "./httpService";

const apiEndpoint = "/api/users/mika";

export function getAllUsers() {
  return http.get(apiEndpoint);
}