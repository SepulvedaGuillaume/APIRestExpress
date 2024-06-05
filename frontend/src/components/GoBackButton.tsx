import styles from "@/styles/GoBackButton.module.sass";
import Link from "next/link";

export default function GoBackButton() {
  return (
    <Link href="/" className={styles["button-go-back"]}>
      Retour
    </Link>
  );
}
