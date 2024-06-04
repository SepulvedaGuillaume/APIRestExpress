import styles from "@/styles/Button.module.sass";

interface ButtonProps {
  label: string;
  onClickButton: () => void;
  stylesName: string;
}

export default function Button({ label, onClickButton, stylesName }: ButtonProps) {
  return (
    <button className={styles[stylesName]} onClick={onClickButton}>
      {label}
    </button>
  );
}
