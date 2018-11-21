import http from "./httpService";

const apiEndpoint = "/api/users";

export function getAllUsers() {
  return http.get(apiEndpoint);
}