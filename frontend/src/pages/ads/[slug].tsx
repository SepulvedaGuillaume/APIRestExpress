import { useRouter } from "next/router";
import AdDetails from "@/components/AdDetails";
import GoBackButton from "@/components/GoBackButton";
import styles from "@/styles/AdDetailsPage.module.sass";

export interface AdDetailProps {
  title: string;
  imgUrl: string;
  price: number;
}

export default function AdDetailsPage() {
  const router = useRouter();
  const query = router.query;
  const title = query.title as AdDetailProps["title"];
  const imgUrl = query.imgUrl as AdDetailProps["imgUrl"];
  const price = parseFloat(query.price as string) as AdDetailProps["price"];

  if (!title || !imgUrl || isNaN(price)) {
    return <div>Invalid ad details</div>;
  }

  return (
    <div className={styles["ad-details-page-container"]}>
      <GoBackButton />
      <AdDetails title={title} imgUrl={imgUrl} price={price} />
    </div>
  );
}
