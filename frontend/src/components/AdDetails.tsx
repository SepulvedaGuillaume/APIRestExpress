import styles from "../styles/AdDetails.module.sass";
import { AdDetailProps } from "../pages/ads/[slug]";

export default function AdDetails ({ title, imgUrl, price}: AdDetailProps) {
  return (
    <div className={styles["ad-details-container"]}>
      <h1 className={styles["ad-details-title"]}>{title}</h1>
      <div className={styles["ad-details-price"]}>{price} €</div>
      <img className={styles["ad-details-image"]} src={imgUrl} />
    </div>
  );
}