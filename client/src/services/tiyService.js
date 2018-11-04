import http from "./httpService";
import auth from "./authService";

const apiEndpoint = "/users/current/offers";

const config = {
    headers: {
        Authorization: "JWT " + auth.getJwt()
    }
};

export function getOwnOffer() {
    return http.get(apiEndpoint, config);
}