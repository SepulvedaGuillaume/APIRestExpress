import { useEffect, useState } from "react";
import AdCard from "./AdCard";
import styles from "@/styles/RecentAds.module.sass";
import adService from "@/services/api/adService";
import Loader from "./Loader";
import { CategoryProps } from "./Category";
import { TagProps } from "@/services/api/tagService";

export interface Ad {
  id: number;
  title: string;
  description?: string;
  owner: string;
  price: number;
  picture?: string;
  location: string;
  createdAt: string;
  category: CategoryProps;
  tags?: TagProps[];
}

export default function RecentAds() {
  const [ads, setAds] = useState<Ad[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchAds = async () => {
      try {
        const ads = await adService.getAds();
        const sortedAds = ads ? ads.sort((a, b) => a.title > b.title ? 1 : -1) as Ad[] : [];
        setAds(sortedAds);
      } catch (error) {
        console.error("Failed to fetch ads:", error);
      } finally {
        setTimeout(() => {
          setIsLoading(false);
        }, 100);
      }
    };

    fetchAds();
  }, []);

  return (
    <>
      <h2>Annonces récentes</h2>
      {isLoading ? (
        <Loader />
      ) : (
        <section className={styles["recent-ads"]}>
          {ads &&
            ads.map((ad, index) => (
              <AdCard
                key={index}
                {...ad}
              />
            ))}
        </section>
      )}
    </>
  );
}
