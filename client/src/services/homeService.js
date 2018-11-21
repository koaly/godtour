import http from "./httpService";

const apiEndpoint = "/api/";

export function showRandomTour() {
    return http.get(apiEndpoint);
}