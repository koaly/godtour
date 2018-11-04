import http from "./httpService";
import auth from "./authService";

const apiEndpoint = "/api/admin/request/upgrade/";
const config = {
  headers: {
    Authorization: "JWT " + auth.getJwt()
  }
};

export function acceptStatus(id) {
  return http.get(apiEndpoint + id + "/accept", config);
  //how to use put bro
}
