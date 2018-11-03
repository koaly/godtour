import http from "./httpService";
import auth from "./authService";

const apiEndpoint = "/tours/browse";
const config = {
  headers: {
    Authorization: "JWT " + auth.getJwt()
  }
};

export function getAllTours() {
  return http.get(apiEndpoint, config);
}
