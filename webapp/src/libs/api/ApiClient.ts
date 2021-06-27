import axios, { AxiosInstance } from "axios";

export default class ApiClient {
  private readonly axios: AxiosInstance;

  constructor() {
    this.axios = axios.create({
      baseURL: `${window.location.origin}/api`,
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
      },
    });
  }
}
