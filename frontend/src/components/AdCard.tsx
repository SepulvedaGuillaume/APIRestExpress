import Link from "next/link";
import styles from "../styles/AdCard.module.sass";

export interface AdCardProps {
  title: string;
  imgUrl: string;
  price: number;
  link: string;
};

export default function AdCard({ title, imgUrl, price, link }: AdCardProps) {
  return (
    <div className={styles["ad-card-container"]}>
      <Link href={{
        pathname: link,
        query: { title, imgUrl, price }
      }} className={styles["ad-card-link"]}>
        <img className={styles["ad-card-image"]} src={imgUrl} />
        <div className={styles["ad-card-text"]}>
          <div className={styles["ad-card-title"]}>{title}</div>
          <div className={styles["ad-card-price"]}>{price} €</div>
        </div>
      </Link>
    </div>
  );
}
