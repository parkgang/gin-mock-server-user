import axios, { AxiosInstance } from "axios";

const client: AxiosInstance = axios.create({
  baseURL: `${window.location.origin}/api`,
  headers: {
    "Content-Type": "application/json;charset=UTF-8",
  },
});

export default client;
