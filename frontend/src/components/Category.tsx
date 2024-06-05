import styles from "@/styles/Category.module.sass";
import Link from "next/link";

export interface CategoryProps {
  id: number;
  name: string;
}

export default function Category({id, name}: CategoryProps) {
  return (
    <>
      <Link
        href={{
          pathname: `/category/${id}`,
        }}
        className={styles["category-navigation-link"]}
      >
        {name}
      </Link>
      •
    </>
  );
}
