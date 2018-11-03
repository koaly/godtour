import http from "./httpService";

const apiEndpoint = "/users";

export function getAllUsers() {
  return http.get(apiEndpoint);
}