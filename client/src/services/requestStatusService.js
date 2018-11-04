import http from "./httpService";
import auth from "./authService";

const apiEndpoint = "/api/admin/request/upgrade/";
const requestStatusEndpoint = "/api/users/current/request/upgrade";
const config = {
  headers: {
    Authorization: "JWT " + auth.getJwt()
  }
};

export function acceptStatus(id) {
  return http.get(apiEndpoint + id + "/accept", config);
  //how to use put bro
}

export function requestStatus(data) {
  const { reasonToUpgrade } = data;
  return http.put(requestStatusEndpoint, { reasonToUpgrade }, config);
}

export function refuseStatus(id) {
  return http.get(apiEndpoint + id + "/refuse", config);
  //how to use put bro
}
