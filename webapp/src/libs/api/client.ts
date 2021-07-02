import axios, { AxiosInstance } from "axios";

const client: AxiosInstance = axios.create({
  baseURL: `http://localhost:8080/api`,
  headers: {
    "Content-Type": "application/json;charset=UTF-8",
  },
});

export default client;
