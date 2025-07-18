import axios from "axios";

const BASE_URL = "http://192.168.0.111:5000/api"; 

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
