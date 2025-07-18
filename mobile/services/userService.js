import api from "./axios";

// 📌 Register user
export const registerUser = async (userData) => {
  const response = await api.post("/user/register", userData);
  return response.data;
};

// 📌 Login user
export const loginUser = async (credentials) => {
  const response = await api.post("/user/login", credentials);
  return response.data;
};

// 📌 Get all users
export const getAllUsers = async () => {
  const response = await api.get("/user");
  return response.data;
};

// 📌 Get one user by ID
export const getUserById = async (id) => {
  const response = await api.get(`/user/${id}`);
  return response.data;
};
