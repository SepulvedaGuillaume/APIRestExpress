import { useRouter } from "next/router";
import styles from "@/styles/GoBackButton.module.sass";

export default function GoBackButton() {
  const router = useRouter();

  return (
    <button onClick={() => router.back()} className={styles["button-go-back"]}>
      Go back
    </button>
  );
}
