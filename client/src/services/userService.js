import http from "./httpService";

const apiEndpoint = "/users/signup";

export function register(user) {
  const {
    email,
    password,
    username,
    displayName,
    imgsrc,
    gender
  } = user;
  return http.post(apiEndpoint, {
      email,
      password,
      username,
      displayName,
      imgsrc,
      gender,
    })
    .then(response => {
      console.log(JSON.stringify(response))
    })

  //.catch()
  //don't need to handle error interceptor will handle
}