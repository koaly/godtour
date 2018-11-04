import http from "./httpService";
import auth from "./authService";

const apiEndpoint = "/api/users/current/offers";
<<<<<<< HEAD

=======
>>>>>>> b1b4d7fe9e369b9b297a989063bd8309ed7ab9cd

const config = {
    headers: {
        Authorization: "JWT " + auth.getJwt()
    }
};

export function getOwnOffer() {
    return http.get(apiEndpoint, config);
}