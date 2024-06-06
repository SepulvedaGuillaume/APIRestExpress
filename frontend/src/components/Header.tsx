import Category from "./Category";
import styles from "@/styles/Header.module.sass";
import { useBasket } from "@/contexts/basketContext";
import { useCategory } from "@/contexts/categoryContext";
import SearchBar from "./SearchBar";

export default function Header() {
  const { totalBasketPrice } = useBasket();
  const { categories } = useCategory();
  
  return (
    <header className={styles.header}>
      <div className={styles["main-menu"]}>
        <h1>
          <a
            href="/"
            className={`${styles.button} ${styles.logo} ${styles["link-button"]}`}
          >
            <span className={`${styles["mobile-short-label"]}`}>TGC</span>
            <span className={`${styles["desktop-long-label"]}`}>
              THE GOOD CORNER
            </span>
          </a>
        </h1>
        <SearchBar />
        <p className={styles["basket-total"]}>
        Prix total :{" "}
        <span className={styles["basket-total-price"]}>{totalBasketPrice} €</span>
      </p>
        <a
          href="/ad/new"
          className={`${styles.button} ${styles["link-button"]}`}
        >
          <span className={`${styles["mobile-short-label"]}`}>Publier</span>
          <span className={`${styles["desktop-long-label"]}`}>
            Publier une annonce
          </span>
        </a>
      </div>
      <nav className={styles["categories-navigation"]}>
        {categories.map((category) => (
          <Category key={category.id} {...category} />
        ))}
      </nav>
    </header>
  );
}
