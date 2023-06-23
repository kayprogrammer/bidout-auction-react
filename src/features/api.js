import axios from "axios";

const instance = axios.create({
  baseURL: process.env.REACT_APP_BASE_API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export default instance;
