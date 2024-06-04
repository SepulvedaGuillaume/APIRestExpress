import Link from "next/link";
import styles from "@/styles/AdCard.module.sass";
import Button from "./Button";
import { useState, useEffect } from "react";
import { log } from "console";

export interface AdCardProps {
  title: string;
  imgUrl: string;
  price: number;
  link: string;
  onToggleCardPrice: (price: number, isAdded: boolean) => void;
}

export default function AdCard({
  title,
  imgUrl,
  price,
  link,
  onToggleCardPrice,
}: AdCardProps) {
  const [isAdded, setIsAdded] = useState<boolean>(false);

  useEffect(() => {
    const firstRenderONly = () => {
      console.log("First render only");
    };
    firstRenderONly();
  }, []);

  const handleToggleBasket = () => {
    onToggleCardPrice(price, isAdded);
    setIsAdded(!isAdded);
  };

  return (
    <div className={styles["ad-card-container"]}>
      <Link
        href={{
          pathname: link,
          query: { title, imgUrl, price },
        }}
        className={styles["ad-card-link"]}
      >
        <img className={styles["ad-card-image"]} src={imgUrl} />
        <div className={styles["ad-card-text"]}>
          <div className={styles["ad-card-title"]}>{title}</div>
          <div className={styles["ad-card-price"]}>{price} €</div>
        </div>
      </Link>
      <div className={styles["ad-card-button-container"]}>
        {isAdded ? (
          <Button
            label="Supprimer du panier"
            stylesName="ad-card-button-remove"
            onClickButton={handleToggleBasket}
          />
        ) : (
          <Button
            label="Ajouter au panier"
            stylesName="ad-card-button-add"
            onClickButton={handleToggleBasket}
          />
        )}
      </div>
    </div>
  );
}
