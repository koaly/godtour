import http from "./httpService";
import { apiUrl } from "../config.json";

const apiEndpoint = apiUrl + "/users/signup";

export function register(user) {
  return http.post(apiEndpoint, {
    email: user.email,
    password: user.password,
    username: user.username,
    displayName: user.displayName,
    imgsrc: user.imgsrc,
    gender: user.gender
  });
}
