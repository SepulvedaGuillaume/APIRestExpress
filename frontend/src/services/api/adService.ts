import axios from "axios";
import { AdCardProps } from "@/components/AdCard";
import { FormData } from "@/pages/ad/new";

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
  },

  postAd: async (ad: FormData) => {
    try {
      const response = await axios.post<AdCardProps>(`${BASE_URL}/ads-orm`, ad);
      return response.data;
    } catch (error) {
      console.error("Failed to post ad:", error);
    }
  },
};

export default adService;
