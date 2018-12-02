import http from "./httpService";
import auth from "./authService";

const apiEndpoint = "/api/users/current/offers";
const tiyEndpoint = "/api/users/current/tiys";
const tiyDeleteEndpoint = "/api/tiys/";
const allTiysEndpoint = "/api/tiys";
const offerTiysEndpoint = "/api/tiys";

const config = {
  headers: {
    Authorization: "JWT " + auth.getJwt()
  }
};

export function getOwnOffer() {
  return http.get(apiEndpoint, config);
}

export function deleteSpecificOffer(tiyId, offerId) {
  return http.delete(
    offerTiysEndpoint + "/" + tiyId + "/offers/" + offerId,
    config
  );
}

export function getAllTiys() {
  return http.get(allTiysEndpoint + "/browse", config);
}

export function getOwnTiy() {
  return http.get(tiyEndpoint, config);
}

export function removeTiy(id) {
  return http.delete(tiyDeleteEndpoint + id, config);
}

export function showTiyOffered(id) {
  return http.get(offerTiysEndpoint + "/" + id + "/offers", config);
}

export function offerTiy(tiy) {
  const {
    name,
    price,
    dest,
    dayDuration,
    nightDuration,
    departDate,
    returnDate,
    airline,
    member,
    food,
    detail,
    highlight
  } = tiy.data;
  return http.post(
    offerTiysEndpoint + "/" + tiy.id + "/offers/create",
    {
      name,
      price,
      dest,
      dayDuration,
      nightDuration,
      departDate,
      returnDate,
      airline,
      member,
      food,
      detail,
      highlight
    },
    config
  );
}
