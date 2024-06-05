import axios from "axios";
import { AdCardProps } from "@/components/AdCard";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

const adService = {
  getAds: async () => {
    try {
      const response = await axios.get<AdCardProps[]>(`${BASE_URL}/ads-orm`);
      return response.data;
    } catch (error) {
      console.error("Failed to fetch ad:", error);
    }
  },

  getAd: async (id: number) => {
    try {
      const response = await axios.get<AdCardProps>(`${BASE_URL}/ads-orm/${id}`);
      return response.data;
    } catch (error) {
      console.error("Failed to fetch ad:", error);
    }
  }
};

export default adService;
