import axios from "axios";

export const api = axios.create({
  baseURL: !process.env.BASE_URL_BACKEND
    ? 'https://dev.codeleap.co.uk/careers/'
    : process.env.BASE_URL_BACKEND,
});

export const api_next = axios.create({
  baseURL: '/api'
});