import styles from "@/styles/AdDetails.module.sass";
import { Ad } from "@/components/RecentAds";
import Button from "./Button";
import { useBasket } from "@/contexts/basketContext";

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
}: Ad) {
  const createdAtTransform = new Date(createdAt).toLocaleDateString("fr-FR");

  const { basket, toggleItemBasket } = useBasket();

  const isAdded = basket.some((item) => item.id === id);

  const handleToggleBasket = () => {
    toggleItemBasket({ id, price });
  };

  return (
    <div className={styles["ad-details-container"]}>
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
