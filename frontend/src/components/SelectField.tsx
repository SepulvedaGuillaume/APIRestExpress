import styles from "@/styles/NewAd.module.sass";
import CreatableSelect from 'react-select/creatable';

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
      <CreatableSelect
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
