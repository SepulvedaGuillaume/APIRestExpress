import AdCard from "./AdCard";
import styles from "@/styles/RecentAds.module.sass";
import { useState } from "react";

interface Ad {
  title: string;
  imgUrl: string;
  price: number;
  link: string;
}

const ads: Ad[] = [
  {
    title: "Table",
    imgUrl: "/images/table.webp",
    price: 120,
    link: "/ads/table",
  },
  {
    title: "Dame-jeanne",
    imgUrl: "/images/dame-jeanne.webp",
    price: 75,
    link: "/ads/dame-jeanne",
  },
  {
    title: "Vide-poche",
    imgUrl: "/images/vide-poche.webp",
    price: 4,
    link: "/ads/vide-poche",
  },
  {
    title: "Vaisselier",
    imgUrl: "/images/vaisselier.webp",
    price: 900,
    link: "/ads/vaisselier",
  },
  {
    title: "Bougie",
    imgUrl: "/images/bougie.webp",
    price: 8,
    link: "/ads/bougie",
  },
  {
    title: "Porte-magazine",
    imgUrl: "/images/porte-magazine.webp",
    price: 45,
    link: "/ads/porte-magazine",
  },
];

export default function RecentAds() {
  const [total, setTotal] = useState<number>(0);

  const handleToggleCardPrice = (price: number, isAdded: boolean) => {
    if (isAdded) {
      setTotal(total - price);
    } else {
      setTotal(total + price);
    }
  };

  return (
    <>
      <h2>Annonces récentes</h2>
      <p className={styles["recent-total"]}>
        Prix total : <span className={styles["recent-total-price"]}>{total} €</span>
      </p>
      <section className={styles["recent-ads"]}>
        {ads.map((ad, index) => (
          <AdCard
            key={index}
            onToggleCardPrice={handleToggleCardPrice}
            {...ad}
          />
        ))}
      </section>
    </>
  );
}
