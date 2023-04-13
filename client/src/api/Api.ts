import defaultAxios from "axios";

export const axios = defaultAxios.create({
  baseURL: "http://localhost:8080",
});
