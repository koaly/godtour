import http from "./httpService";
import auth from "./authService";

const apiEndpoint = "/request/upgrade/";
const config = {
  headers: {
    Authorization: "JWT " + auth.getJwt()
  }
};

export function acceptStatus(id) {
  return http.put(apiEndpoint + id, config);
  //how to use put bro
}
