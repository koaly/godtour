import http from "./httpService";
import auth from "./authService";

const apiEndpoint = "/tours/browse";
const tourAddEndpoint = "/tours/create";
const config = {
  headers: {
    Authorization: "JWT " + auth.getJwt()
  }
};

export function getAllTours() {
  return http.get(apiEndpoint, config);
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
