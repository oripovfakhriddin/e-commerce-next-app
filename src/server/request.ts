import { ENDPOINT, TOKEN } from "@/constants";
import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

const request = axios.create({
  baseURL: `${ENDPOINT}api/v1/`,
  timeout: 20000,
  headers: { Authorization: `Bearer ${Cookies.get(TOKEN)}` },
});

request.interceptors.response.use(
  (response) => {
    return response;
  },
  (err) => {
    toast.error(`${err.message}`);
    return Promise.reject(err);
  }
);

export default request;
