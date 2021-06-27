import axios, { AxiosInstance } from "axios";

const apiClient: AxiosInstance = axios.create({
  baseURL: `http://localhost:8080/api`,
  headers: {
    "Content-Type": "application/json;charset=UTF-8",
  },
});

export async function getUser() {
  const { data } = await apiClient.get(`/`);
  return data;
}
