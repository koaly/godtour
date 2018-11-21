import http from "./httpService";
import auth from "./authService";

const apiEndpoint = "/api/admin/request/upgrade";


const config = {
    headers: {
        Authorization: "JWT " + auth.getJwt()
    }
};

export function getUserRequest() {
    return http.get(apiEndpoint, config);
}