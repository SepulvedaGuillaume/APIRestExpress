import { useEffect, useState } from "react";
import AdCard from "./AdCard";
import styles from "@/styles/RecentAds.module.sass";
import adService from "@/services/api/adService";
import Loader from "./Loader";

export interface Ad {
  id: number;
  title: string;
  description?: string;
  owner: string;
  price: number;
  picture?: string;
  location: string;
  createdAt: string;
}

export default function RecentAds() {
  const [ads, setAds] = useState<Ad[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchAds = async () => {
      try {
        const ads = await adService.getAds();
        setAds(ads as Ad[]);
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
