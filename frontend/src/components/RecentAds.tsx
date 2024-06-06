import { useState } from "react";
import AdCard from "./AdCard";
import styles from "@/styles/RecentAds.module.sass";
import adService from "@/services/api/adService";
import Loader from "./Loader";
import { CategoryProps } from "./Category";
import { TagProps } from "@/services/api/tagService";
import { useSearch } from "@/contexts/searchContext";

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
  const { searchResults, updateAds, isLoading } = useSearch();

  return (
    <div>
      <h2>Annonces récentes</h2>
      {isLoading ? (
        <Loader />
      ) : (
        <section className={styles["recent-ads"]}>
          {searchResults && searchResults.length > 0 && !isLoading ? searchResults.map((ad) => (
            <AdCard key={ad.id} updateAds={updateAds} {...ad} />
          )) : (
            <p>Aucune annonce trouvée</p>
          )}
        </section>
      )}
    </div>
  );
}
