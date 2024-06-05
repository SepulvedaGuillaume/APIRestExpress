import styles from "@/styles/Loader.module.sass";

export default function Loader() {
  return (
    <div className={styles.loader}>
      <div className={styles["loader-spinner"]}></div>
    </div>
  );
}
