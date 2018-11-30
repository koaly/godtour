import http from "./httpService";
import auth from "./authService";

const apiEndpoint = "/api/tours";
const config = {
  headers: {
    Authorization: "JWT " + auth.getJwt()
  }
};

export function getSpecificTour(id) {
  //  return http.get(apiEndpoint + id, config);
  return http.get(apiEndpoint + "?id=" + id);
}

export function booking(id, field) {
  return http.post(apiEndpoint + "/" + id, field, config);
}
