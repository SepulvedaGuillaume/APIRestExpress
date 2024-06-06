import styles from "@/styles/NewAd.module.sass";

interface TextAreaFieldProps {
  label: string;
  name: string;
  register: any;
  required: boolean;
}

export default function TextAreaField({
  label,
  name,
  register,
  required,
}: TextAreaFieldProps) {
  return (
    <>
      <label className={styles["new-ad-form-label"]}>{label}</label>
      <textarea
        {...register(name, { required })}
        className={styles["new-ad-form-textarea"]}
      />
    </>
  );
}
