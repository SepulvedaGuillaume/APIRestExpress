import styles from "../styles/Category.module.sass";

export type CategoryProps = {
  title: string;
  link: string;
};

export default function Category({ title, link }: CategoryProps) {
  return (
    <>
      <a href={link} className={styles['category-navigation-link']}>
        {title}
      </a>{" "}
      •
    </>
  );
}
