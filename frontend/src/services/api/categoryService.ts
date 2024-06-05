import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

const categoryService = {
  getCategories: async () => {
    try {
      const response = await axios.get(`${BASE_URL}/categories-orm`);
      return response.data;
    } catch (error) {
      console.error("Failed to fetch categories:", error);
    }
  },

  getCategory: async (id: number) => {
    try {
      const response = await axios.get(`${BASE_URL}/categories-orm/${id}`);
      return response.data;
    } catch (error) {
      console.error("Failed to fetch category:", error);
    }
  },

  getAdsByCategory: async (id: number) => {
    try {
      const response = await axios.get(`${BASE_URL}/categories-orm/ads/${id}`);
      return response.data;
    } catch (error) {
      console.error("Failed to fetch ads with category:", error);
    }
  }
};

export default categoryService;
