import http from "./httpService";
import auth from "./authService";

const apiEndpoint = "/api/tours/browse";
const tourAddEndpoint = "/api/tours/create";

const tourDeleteEndpoint = "/api/tours";

const ownTourEndpoint = "/api/users/current/tours";

const config = {
  headers: {
    Authorization: "JWT " + auth.getJwt()
  }
};

function tourUrl(id) {
  return tourDeleteEndpoint + "/" + id;
}

export function deleteTour(tourId) {
  return http.delete(tourUrl(tourId), config);
}

export function getAllTours() {
  return http.get(apiEndpoint, config);
}
export function getOwnTours() {
  return http.get(ownTourEndpoint, config);
}
export function addTour(tour) {
  console.log(tour);
  console.log(config);
  const {
    name,
    price,
    dest,
    dayDuration,
    nightDuration,
    startBookDate,
    startBookTime,
    endBookDate,
    endBookTime,
    departDate,
    returnDate,
    airline,
    seat,
    food,
    detail,
    highlight,
    imgsrc
  } = tour;
  return http.post(
    tourAddEndpoint,
    {
      name,
      price,
      dest,
      dayDuration,
      nightDuration,
      startBookDate,
      startBookTime,
      endBookDate,
      endBookTime,
      departDate,
      returnDate,
      airline,
      seat,
      food,
      detail,
      highlight,
      imgsrc
    },
    config
  );
}
