import clsx from "clsx";
import styles from "./FormInput.module.scss";

function FormInput({ label, name, type, defaultValue, size }) {
   return (
      <div className={clsx(styles.formControl)}>
         <label className={clsx(styles.label)}>
            <span className={clsx(styles.labelText)}>{label}</span>
         </label>
         <input
            type={type}
            name={name}
            defaultValue={defaultValue}
            className={clsx(styles.input, styles[size])}
         />
      </div>
   );
}
export default FormInput;
