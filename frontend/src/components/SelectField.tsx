import styles from "@/styles/NewAd.module.sass";
import Select from "react-select";

interface SelectFieldProps {
  label: string;
  required: boolean;
  options: any;
  isMulti: boolean;
  value: any;
  onChange: any;
  error: any;
}

export default function SelectField({
  label,
  required,
  options,
  isMulti,
  value,
  onChange,
  error,
}: SelectFieldProps) {
  return (
    <>
      <label className={styles["new-ad-form-label"]}>
        {label} {required && <span className={styles["new-ad-form-required"]}>*</span>}
      </label>
      <Select
        options={options}
        isMulti={isMulti}
        isClearable
        value={value}
        onChange={onChange}
        className={styles["new-ad-form-select"]}
      />
      {error && <span className="new-ad-form-error">{error}</span>}
    </>
  );
}
