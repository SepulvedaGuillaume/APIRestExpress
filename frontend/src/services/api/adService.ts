import axios from "axios";
import { AdCardProps } from "@/components/AdCard";
import { FormData } from "@/pages/ad/new";

interface PostAd {
  data: AdCardProps;
  status: number;
}

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
      const response = await axios.post<PostAd>(`${BASE_URL}/ads-orm`, ad);
      return { data: response.data, status: response.status };
    } catch (error) {
      console.error("Failed to post ad:", error);
    }
  },
};

export default adService;
