import axios from "axios";

export const api = axios.create({
  baseURL: !process.env.BASE_URL_BACKEND
    ? 'https://dev.codeleap.co.uk/careers/'
    : process.env.BASE_URL_BACKEND,
});