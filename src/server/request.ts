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
  async (response) => {
    return response;
  },
  (err) => {
    if (err?.message === "Network Error") {
      toast.error(`${err?.message}`);
    } else {
      toast.error(`${err?.response?.data?.msg}`);
    }
    return Promise.reject(err);
  }
);

export default request;
