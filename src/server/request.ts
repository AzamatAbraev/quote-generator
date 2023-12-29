import { message } from "antd";
import axios from "axios";

const request = axios.create({
  baseURL: "https://api.quotable.io/",
  timeout: 10000,
});


request.interceptors.response.use(
  (response) => response,
  (error) => {
    if (axios.isAxiosError(error)) {
      message.error(
        error.response?.data?.statusMessage,
      );
    } else {
      message.error("Something went wrong. Please contact IT department");
    }
    return Promise.reject(error);
  },
);

export default request;
