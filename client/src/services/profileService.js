import http from "./httpService";
import auth from "./authService";

const apiEndpoint = "/users/current/bookings";
const config = {
    headers: {
        Authorization: "JWT " + auth.getJwt()
    }
};


export function showCurrentBookings() {
    return http.get(apiEndpoint, config);
}