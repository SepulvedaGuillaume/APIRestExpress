import styles from "@/styles/Category.module.sass";
import Link from "next/link";

export interface CategoryProps {
  id: number;
  name: string;
}

export default function Category({id, name}: CategoryProps) {
  const nameToCapitalize = name.charAt(0).toUpperCase() + name.slice(1);
  return (
    <>
      <Link
        href={{
          pathname: `/category/${id}`,
        }}
        className={styles["category-navigation-link"]}
      >
        {nameToCapitalize}
      </Link>
      •
    </>
  );
}
