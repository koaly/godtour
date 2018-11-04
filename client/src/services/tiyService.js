import http from "./httpService";
import auth from "./authService";

const apiEndpoint = "/api/users/current/offers";
const tiyEndpoint = "/api/users/current/tiys";

const config = {
  headers: {
    Authorization: "JWT " + auth.getJwt()
  }
};

export function getOwnOffer() {
  return http.get(apiEndpoint, config);
}

export function getOwnTiy() {
  return http.get(tiyEndpoint, config);
}
