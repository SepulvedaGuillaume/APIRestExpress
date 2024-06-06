import styles from "@/styles/AdDetails.module.sass";
import Button from "./Button";
import { useBasket } from "@/contexts/basketContext";
import adService from "@/services/api/adService";

interface AdDetailsProps {
  id: number;
  title: string;
  description: string;
  owner: string;
  location: string;
  price: number;
  picture: string;
  createdAt: string;
  category: { name: string };
  tags: { name: string }[];
  updateAds: () => void;
}

export default function AdDetails({
  id,
  title,
  description,
  owner,
  location,
  price,
  picture,
  createdAt,
  category,
  tags,
  updateAds,
}: AdDetailsProps) {
  const createdAtTransform = new Date(createdAt).toLocaleDateString("fr-FR");

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
    <div className={styles["ad-details-container"]}>
      <span className={styles["ad-details-delete-button"]} onClick={handleDeleteAd}>X</span>
      <h1 className={styles["ad-details-title"]}>{title}</h1>
      {description && (
        <div className={styles["ad-details-description"]}>{description}</div>
      )}
      {tags && tags.length > 0 && (
        <div className={styles["ad-details-tags"]}>
          Mots clés: {tags.map((tag) => tag.name).join(", ")}
        </div>
      )}
      <div className={styles["ad-details-category"]}>
        Catégorie: {category.name}
      </div>
      <div className={styles["ad-details-owner"]}>Vendeur: {owner}</div>
      <div className={styles["ad-details-location"]}>
        Localisation: {location}
      </div>
      <div className={styles["ad-details-price"]}>Prix: {price} €</div>
      {picture ? (
        <img className={styles["ad-details-image"]} src={picture} />
      ) : (
        <img
          className={styles["ad-details-image"]}
          src="https://via.placeholder.com/200"
        />
      )}
      <div className={styles["ad-details-created-at"]}>
        Annonce crée le : {createdAtTransform}
      </div>
      <div className={styles["ad-details-button-container"]}>
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
