import http from "./httpService";
import auth from "./authService";

const apiEndpoint = "/api/users";
const config = {
  headers: {
    Authorization: "JWT " + auth.getJwt()
  }
};

export function getSpecificUser(username) {
  //  return http.get(apiEndpoint + id, config);
  return http.get(apiEndpoint + "?username=" + username);
}

function userUrl(id) {
  return apiEndpoint + "/" + id;
}

export function deleteSpecificUser(id) {
  return http.delete(userUrl(id), config);
}
