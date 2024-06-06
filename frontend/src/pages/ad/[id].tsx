import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import AdDetails from "@/components/AdDetails";
import { AdDetailsProps } from "@/pages/category/[id]";
import GoBackButton from "@/components/GoBackButton";
import styles from "@/styles/AdDetailsPage.module.sass";
import adService from "@/services/api/adService";
import Loader from "@/components/Loader";

export default function AdDetailsPage() {
  const router = useRouter();
  const { id } = router.query;

  const idInt = parseInt(id as string);

  const [ad, setAd] = useState<AdDetailsProps | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchAd = async () => {
    if (id) {
      try {
        const ad = await adService.getAd(idInt);
        setAd(ad as AdDetailsProps);
      } catch (error) {
        console.error("Failed to fetch ad:", error);
      } finally {
        setTimeout(() => {
          setIsLoading(false);
        }, 100);
      }
    }
  };

  useEffect(() => {
    fetchAd();
  }, [id]);

  const handleUpdateAds = () => {
    fetchAd();
    router.push("/");
  };

  return (
    <div className={styles["ad-details-page-container"]}>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <GoBackButton />
          {ad && <AdDetails {...ad} updateAds={handleUpdateAds} />}
        </>
      )}
    </div>
  );
}
