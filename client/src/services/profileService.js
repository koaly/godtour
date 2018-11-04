import http from "./httpService";
import auth from "./authService";

const apiEndpoint = "/api/users/current/bookings";
const config = {
    headers: {
        Authorization: "JWT " + auth.getJwt()
    }
};

export function removeCurrentBookings(id) {
    return http.delete(apiEndpoint + '/' + id, config)
}
export function showCurrentBookings() {
    return http.get(apiEndpoint, config);
}