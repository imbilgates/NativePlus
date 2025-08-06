import axios from "axios";

const BASE_URL = "http://172.20.10.3:5000/api"; 

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
