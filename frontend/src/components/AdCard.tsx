import Link from "next/link";
import styles from "@/styles/AdCard.module.sass";
import Button from "./Button";
import { useBasket } from "@/contexts/basketContext";
import { CategoryProps } from "./Category";
import { TagProps } from "@/services/api/tagService";
import adService from "@/services/api/adService";

export interface AdCardProps {
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
  updateAds: () => void;
}

export default function AdCard({
  id,
  title,
  price,
  picture,
  updateAds,
}: AdCardProps) {
  const { basket, toggleItemBasket } = useBasket();

  const isAdded = basket.some((item) => item.id === id);

  const handleToggleBasket = () => {
    toggleItemBasket({ id, price });
  };

  const handleDeleteAd = async () => {
    try {
      await adService.deleteAd(id);
      updateAds();
    } catch (error) {
      console.error("Failed to delete ad:", error);
    }
  };

  return (
    <div className={styles["ad-card-container"]}>
      <span
        className={styles["ad-details-delete-button"]}
        onClick={handleDeleteAd}
      >
        X
      </span>
      <Link
        href={{
          pathname: `/ad/${id}`,
        }}
        className={styles["ad-card-link"]}
      >
        {picture ? (
          <img className={styles["ad-card-image"]} src={picture} />
        ) : (
          <img
            className={styles["ad-card-image"]}
            src="https://via.placeholder.com/200"
          />
        )}
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
