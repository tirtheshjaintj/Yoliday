import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const getProjects = async (page = 1, limit = 10) => {
  try {
    const response = await api.get(`/projects?page=${page}&limit=${limit}`);
    console.log(response);
    return response.data;
  } catch (error) {
    console.error("Error fetching projects:", error);
  }
};

export const addToCart = async (projectId: string, userId: number) => {
  try {
    const response = await api.post("/cart", {
      project_id: projectId,
      user_id: userId,
    });
    return response.data;
  } catch (error) {
    console.error("Error adding to cart:", error);
    throw error;
  }
};

export const getCart = async (userId: number) => {
  try {
    const response = await api.get(`/cart/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching cart:", error);
    throw error;
  }
};
