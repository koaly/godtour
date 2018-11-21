import axios from "axios";
import { toast } from "react-toastify";


//this will do before .than and catch
//Add a response interceptor
axios.interceptors.response.use(response => {
  //if response success return response

  console.log(response)
  return Promise.resolve(response)

}, error => {
  //if doesn't sucess return err and response of err
  const expectedError = error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;

  if (!expectedError) {
    toast.error("An unexpected error occurrred.");
  }

  //return error with error response
  return Promise.reject(error);
});

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete
};
