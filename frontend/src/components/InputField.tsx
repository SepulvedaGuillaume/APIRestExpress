import styles from "@/styles/NewAd.module.sass";

interface InputFieldProps {
    label: string;
    name: string;
    register: any;
    required: boolean
    error: any;
    type?: string;
    min?: number;
}

export default function InputField({ label, name, register, required, error, type="text", min }: InputFieldProps) {
  return (
    <>
      <label className={styles["new-ad-form-label"]}>
        {label} {required && <span className={styles["new-ad-form-required"]}>*</span>}
      </label>
      <input
        type={type}
        min={min}
        {...register(name, { required })}
        className={styles["new-ad-form-input"]}
      />
      {error && (
        <span className={styles["new-ad-form-error"]}>Ce champ est obligatoire</span>
      )}
    </>
  );
}