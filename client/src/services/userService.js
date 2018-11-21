import http from "./httpService";
import auth from "./authService";

const apiEndpoint = "/api/users/signup";
const allUserEndpoint = "/api/users/browse";

const config = {
  headers: {
    Authorization: "JWT " + auth.getJwt()
  }
};

export function getAllUsers(user) {
  return http.get(allUserEndpoint, config);
}

export function register(user) {
  const { email, password, username, displayName, imgsrc, gender } = user;
  return http
    .post(apiEndpoint, {
      email,
      password,
      username,
      displayName,
      imgsrc,
      gender
    })
    .then(response => {
      console.log(JSON.stringify(response));
    });

  //.catch()
  //don't need to handle error interceptor will handle
}
